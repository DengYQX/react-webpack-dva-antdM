//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { WhiteSpace, Button, Tabs, SearchBar } from 'antd-mobile';
import Navigation from '@/util/navigation'
import './propertyPostInfor.less'
import campusInforImg from '%/campusInforImg.png';

class PropertyPostInfor extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data;
    this.state = {
      data: data
    }
  }

  // 接单
  submit() {
    const data={
      title: '接单',
      btn: '确定',   //按钮的字
      img: 1,  //1为成功，0为失败
      url: '/',    //按钮跳转的链接
      text: `接单成功`
    }
    hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
  }

  render() {
    return (
      <div className='property_post_infor'>
        <Navigation title={this.state.data.title} />
        <img src={campusInforImg} alt=""/>
        <div className="info_title">
          <div className="company_name">
            <span>湖南云盟科技有限公司</span>
            <span className={this.state.data.state == '1' ? 'color1' : 'color2'}>{this.state.data.state == '1' ? '待处理' : (this.state.data.state == '2' ? '已完成' : '已取消')}</span>
          </div>
          <div>{this.state.data.number}</div>
        </div>
        <WhiteSpace />
        <div className="info_content">
          <div>下单用户：<span className="info_text">云盟</span></div>
          <div>联系电话：<span className="info_text">15802582256</span></div>
          <div>详细地址：<span className="info_text">A1栋13楼</span></div>
          <div>商品名称：<span className="info_text">快餐</span></div>
          <div>商品单价：<span className="info_text">1e</span></div>
          <div>商品数量：<span className="info_text">1</span></div>
          <div>商品总价：<span className="info_text">1e</span></div>
          <div>下单时间：<span className="info_text">2019.11.27 16:00</span></div>
        </div>
        {
          this.state.data.state == '1' ? 
          <Button type="primary" className="submit" onClick={this.submit.bind(this)}>接单</Button> : null
        }
      </div>
    )
  }
}

export default PropertyPostInfor;