import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, TextareaItem, WhiteSpace } from 'antd-mobile';
import './goodsDetails.less' //样式文件  
import povertyAlleviationBanner from '%/povertyAlleviationBanner.png';

class GoodsDetails extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data
    this.state = {
      data,
      content: '这是物品放行申请文字内容...这是物品放行申请文字内容这是物品放行申请文字内容...这是物品放行申请文字内容...这是物品放行申请文字内容...',
      isState: 1,
    }
  }

  render() {
    const { data } = this.state
    return (
      <div className="goods_details">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="goods_title"
        >申请详情</NavBar>
        <img src={data.ImgUrl} alt=""/>
        <div className="details_title">
          <span className="people">申请人:{data.UName}</span>
          {data.States == 1 ? <span className="state1">企业审核中</span> :
          data.States == 2 ? <span className="state1">物业审核中</span> : 
          data.States == 3 ? <span className="state1">待放行</span> : 
          data.States == 4 ? <span className="state4">已放行</span> : 
          data.States == 5 ? <span className="state5">已过期</span> : 
          data.States == 6 ? <span className="state6">已拒绝</span> : ''}
        </div>
        <div className="details_content">{data.ApplyContent}</div>
        <WhiteSpace />
        <div className="details_footer">
          <span>迁出时间</span>
          <span className="time">{data.ApplyTime}</span>
        </div>
        {
          data.States == 4 ? 
          <div className="details_footer release_border">
            <span>放行时间</span>
            <span className="time">{data.ReleaseTime}</span>
          </div> : ''
        }
        {
          data.States == 6 ? 
          <div className="refuse_reason">
            <WhiteSpace />
            <div className="details_footer title_border">拒绝原因</div>
            <div className="reason_content">{data.Remake}</div>
          </div> : ''
        }
      </div>
    );
  }
}

export default GoodsDetails;