//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, Popover, Tabs, NavBar } from 'antd-mobile';
import './resourceInfor.less'
import Navigation from '@/util/navigation.jsx'
import infoBanner from '%/infoBanner.jpg';

class ResourceInfor extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data;
    this.state = {
      data,
    }
  }

  render() {
    const { data } = this.state
    return (
      <div className='resource_infor'>
        <Navigation title="详情" />
        <img src={infoBanner} alt=""/>
        <div className="info_details">
          <div className="details_title">公司名称：<span className="details_content">{data.CompanyName}</span></div>
          <div className="details_title">对接人：<span className="details_content">{data.Contacter}</span></div>
          <div className="details_title">联系方式：<span className="details_content">{data.Telphone}</span></div>
          {
            data.ResourceType == 1 ? 
            <div>
              <div className="details_title" style={{border: 0}}>需求介绍：</div>
              <p className="details_text">{data.ResourceIntroduction}</p>
            </div> : 
            <div>
              <div className="details_title" style={{border: 0}}>资源介绍：</div>
              <p className="details_text">{data.ResourceIntroduction}</p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default ResourceInfor;