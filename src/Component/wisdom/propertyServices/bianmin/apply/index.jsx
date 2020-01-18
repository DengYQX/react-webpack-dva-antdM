import React, { Component } from 'react';
import { Carousel, WingBlank, List, InputItem,Modal, TextareaItem, Picker, Icon } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import { hashHistory } from "react-router";
import { connect } from 'dva'
import {unLogin} from '@/util/common.js';
import './style.less';
import { createForm } from 'rc-form';
import api from '@/api'

class demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildList: [],
      data: ['1', '2', '3'],
      imgHeight: 140,
      open: false,
      docked: false,
      buildId: '',
      getFieldProps: {
        EnterpriseID: '测试公司',
        UName: '李四',
        UTel: '13233331111',
        Remakes: ' '
      }
    }
  }
  componentDidMount() {
    api.GetBuildToCbx({}).then(res=>{
      this.setState({
        buildList: [...this.state.buildList, ...res]
      })
    })
  }
  onOpenChange = args => {
    console.log(args);
    this.setState({ open: false });
  }
  openSelect = () => {
    if (this.state.open) {
      this.setState({ open: false });
    } else {
      console.log('jin')
      this.setState({ open: true });
    }
  }

  submit =() => {
    const token =this.props.token; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if(loginType){
     
      this.props.form.validateFields({ force: true }, (error, values) => {
        if (!error) {
          api.AddMaterialApplication({
            UserId: localStorage.getItem('userId'),
            GoodsId: this.props.location.state.data.ID,
            BuildId: this.state.buildId[0],
            ...values
          }).then(res => {
            hashHistory.push( { pathname:'/registerOk', state:{data: {
              url: '/',
              img: 1,
              title: '报名',
              text: '申请成功、请前往线下领取',
              btn: '确定'
            }}} )
          });
        }
      })
    }else{
      Modal.alert('您尚未登陆', '您是否需要登陆', [
          { text: '否', },
          { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
      ]);
    }
  }

  render() {
    const { getFieldProps , getFieldError} = this.props.form;
    const { buildList } = this.state
    return (
      <div className="appBox">
        <Navigation title="便民服务申请" />
        <List className="my_report_list">
          <Picker 
            value={this.state.buildId}
            onChange={v => this.setState({ buildId: v })}
            onOk={v => this.setState({ buildId: v })}
            data={buildList} 
            cols={1} 
            className="forss"
          >
            <List.Item arrow="horizontal"> <span style={{ fontSize: '0.597rem' }}>所在楼宇：</span></List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('EnterpriseName', {
              rules: [{ validator: (rule, value, callback) => {
                if (value) {
                  callback();
                } else {
                    callback(new Error('请输入公司名称'));
                 }
              } }],
            })}
            error={!!getFieldError('EnterpriseName')}
            placeholder="请输入公司名称"
          >公司名称：</InputItem>
          <InputItem
            {...getFieldProps('UName', {
              rules: [{ validator: (rule, value, callback) => {
                if (value) {
                  callback();
                } else {
                    callback(new Error('请输入联系人'));
                 }
              } }],
            })}
            error={!!getFieldError('UName')}
            placeholder="请输入联系人"
          >联系人：</InputItem>
          <InputItem
            {...getFieldProps('UTel', {
              rules: [{ validator: (rule, value, callback) => {
                const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                if (reg.test(value)) {
                  callback();
                } else {
                  callback(new Error('请输入联系人'));
                }
              } }],
            })}
            error={!!getFieldError('UTel')}
            placeholder="请输入联系电话"
          >联系电话：</InputItem>
          <TextareaItem
            title="备注："
            rows="3"
            {...getFieldProps('Remakes', {
            })}
            placeholder="请输入备注内容...200字以内"
            count={200}
          />
          <div className="submits" onClick={this.submit.bind(this)}>
            提交
          </div>
        </List>

        {this.state.open ? (<Drawer
          className="my-drawer"
          position="bottom"
          style={{ minHeight: document.documentElement.clientHeight }}
          transitions
          contentStyle={{ color: '#A6A6A6', textAlign: 'center' }}
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
          docked={this.state.docked}
        >
        </Drawer>) : null}

      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    data: state.demo.data,
    token: state.login.token
  }
}

function dispatchToProps(dispatch) {
  return {
    requerData(payload = {}) {
      dispatch({
        type: 'demo/queryList',
        payload
      })
    }
  }
}
export default connect(mapStateToProps, dispatchToProps)(createForm()(demo));