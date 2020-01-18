//园区活动详情  ---正在进行中/将要进行的  按钮（报名/转发）   已经结束的（反馈）
import React, { Component } from 'react'
import { NavBar, Icon, Button, Carousel } from 'antd-mobile';
import { hashHistory } from 'react-router'

import './infoDetails.less'

import interfaces from '@/api/index'


class ActiveInfo extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
   
    this.state = {
      data,
      page:{
        EnterpriseName:'',
        SalaryRange:'',
        Position:'',
        PositionDetails:'',
        ExperienceRequirement:'',
        MinimumEducation:'',
        // EnterpriseName:'',
      },
      imgHeight: 140,
      Imagelist: []
    }
  }
  //开场调用的时候
  componentWillMount() {

    this.getInformation()
  }
  getInformation(){
    interfaces.GetOnlinePublishJobDetails({ID:this.state.data.ID}).then(res=>{
      this.setState({
        Imagelist: res[0].Imagelist,
        page:res[0].Detail
      })
    })
  }

  // 编辑
  edit() {
    hashHistory.push({ pathname: '/addInfo', query: { name : '编辑'}, state:{data: this.state.page, files: this.state.Imagelist}})
  }
  //删除  
  delInfor(){
    interfaces.DelOnlinePublishJob({ID:this.state.data.ID}).then(res=>{
      const data={
        title:'删除',
        btn:'返回',   //按钮的字
        img:1,  //1为成功，0为失败
        url:'/',    //按钮跳转的链接  
        text:'删除成功'
      }
      hashHistory.push( { pathname:'/registerOk', state:{data} } )
    })
  }
  loadError(e) {
    e.target.src = "http://47.112.21.206:8090/resources/banner.png";
  }
  render() {
    return (
      <div className='infoDetails'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => hashHistory.goBack()}
        >详情</NavBar>
        <div className='activeInfo_body'>
          <div >
              {this.state.Imagelist.length>0? <Carousel
                 autoplay
                 infinite
                 dots
                 autoplayInterval="5000"
                 dotStyle={{marginBottom: 10}}
                 dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
                 >
                     {this.state.Imagelist.map(val => (
                         <div
                         key={val}
                         style={{ display: 'inline-block', width: '100%', height: 'auto' }}
                         >
                         <img
                             src={val.FullUrl}
                             alt=""
                             style={{ width: '100%', verticalAlign: 'top',height:'150px' }}
                             onError={this.loadError}
                             onLoad={(res) => {
                             this.setState({ imgHeight: res.target.height });
                             }}
                         />
                         </div>
                     ))}
               
              </Carousel>
             :''}
          </div>
          <div className='activeInfo_body_title'>
            <p>{this.state.page.EnterpriseName}<span>{this.state.page.SalaryRangestr}</span></p>
          </div>
          <div className='activeInfo_body_text'>
            <p>职位:{this.state.page.JobName}</p>
          </div>
          <div className='activeInfo_body_title'>
            <p>职位描述</p>
          </div>
          <div className='activeInfo_body_text'>
            <p>{this.state.page.JobDescription}</p>
  
          </div>
          <div className='activeInfo_body_title'>
            <p>岗位要求</p>
          </div>
          <div className='activeInfo_body_text'>  
            <p>{this.state.page.Educationstr}</p>
            <p>{this.state.page.ExperiRequistr}</p>
          </div>
        </div>
        <div className='activeInfo_foot'>
          <Button className='activeInfo_btn_helf' onClick={this.edit.bind(this)}>编辑</Button>
          <Button className='activeInfo_btn_helf btn_color' onClick={this.delInfor.bind(this)}>删除</Button>
        </div>
      </div>
    )
  }
}

export default ActiveInfo;



