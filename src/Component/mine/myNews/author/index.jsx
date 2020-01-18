import React, { Component } from 'react'
import Navigation from "@/util/navigation.jsx";
import head from '%/head.png';
import './index.less';
import { Button } from 'antd-mobile';
import api from '@/api'
/** 我的认证 */
class App extends Component {
  /** 初始化 */
  constructor(props) {
    super(props);
    const location = this.props.location.state;
    console.log(location)
    this.state={
        location,
        data: {
            Name: '',
            Position: ''
        }
    }
  }
  componentDidMount() {
    api.GetUserInfoByMasterId({
        MasterId: this.state.location.id
    }).then(res => {
        if (res && res.length > 0) {
            this.setState({
                data: res[0]
            })
        }
    })
  }
  onSubmit(type) {
    const params = {
        ID: this.state.location.id,
        UserID: localStorage.getItem('userId'),
        Status: type,
        Reason: ''
    }
    api.CheckCertification(params).then(res => {

        const data = {
            title: "操作",
            btn: "确定", //按钮的字
            img: 1, //1为成功，0为失败
            url: '/myMessage', //点击按钮跳转的链接 
            text: "操作成功"
          };
          //data为ok的时候，注册成功
      //    hashHistory.push( { pathname:'/campusInfor', state: {id: id} } )
          hashHistory.push({ pathname: "/registerOk", state: { data } });
    })
  }
  /** 组件挂载 */
  render() {
    return (
        <div className="author_element">
            <Navigation title="详情" />
            <div className="author_BOX">
                <img 
                    src={head}
                    style={{
                        width: '4rem'
                    }}
                />
                <div style={{
                    width: '100%',
                    marginTop: '0.5rem',
                    color:'#fff'
                }}>
                    <div>{this.state.data.Name}</div>
                    <div style={{marginTop:' 0.2rem'}}>职位: {this.state.data.Position}</div>
                </div>
            </div>
            <span>
            <Button className='App_btn' onClick={this.onSubmit.bind(this, 2)}>
                {'通过'}
            </Button>
            <Button className='App_btn' style={{ background:'gray' }} onClick={this.onSubmit.bind(this, 3)}>
                {'拒绝'}
            </Button>
            </span>
        </div>
    )
  }
}
export default App;
