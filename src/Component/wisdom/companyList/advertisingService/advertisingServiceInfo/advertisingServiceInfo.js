//广告服务详情
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { WhiteSpace, Button, Tabs, NavBar } from 'antd-mobile';
import './advertisingServiceInfo.less'
import Navigation from '@/util/navigation.jsx'
import parkInformation from '%/parkInformation.png';  

import interfaces from '@/api/index'

class AdvertisingServiceInfo extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data;
    console.log(data)
    this.state = {
      data:data,
      list:{},
    }
  }
  componentDidMount(){
    interfaces.GetAdvertisingServicesDetails({ID:this.state.data.ID}).then(res=>{
  //    console.log(res)
      this.setState({
        list:res[0].Detail
      })
    })
  }
  // 在线申请
  submit() {
    hashHistory.push({pathname:'/advertisementApply',state:{data:this.state.data}})
  }


  render() {
    return (
      <div className='advertising_service_info'>
        <Navigation title="广告服务详情" />
        <img src={this.state.list.Pic} alt=""/>
        <div className="info_title">
          <span>名称:{this.state.list.Position}</span>
          <span className="price">{this.state.list.PriceRange}</span>
        </div>
        <WhiteSpace />
        <div className="introduce_box">
          <div className="introduce_title">广告位介绍</div>
          <div className="introduce_content">{this.state.list.AdvertisingIntroduction}</div>
        </div>
        <WhiteSpace />
        <div className="introduce_box">
          <div className="introduce_title">申请流程</div>
          <div className="introduce_content">{this.state.list.ApplyProcess}</div>
        </div>
        <Button type="primary" className="submit" onClick={this.submit.bind(this)}>在线申请</Button>
      </div>
    )
  }
}

export default AdvertisingServiceInfo;