//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { List, Popover, Tabs, WhiteSpace } from 'antd-mobile';
import './partyAffairs.less'
import Navigation from '@/util/navigation.jsx'

class AffairsDetails extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data
    this.state = {
      data,
    }
  }

  render() {
    return (
      <div className='affairs_details'>
        <Navigation title="详情" />
        <WhiteSpace />
        <div className="affairs_title">{this.state.data.Title}</div>
        <div className="affairs_text">
          解答内容：{this.state.data.Contents} <br/>
          内容来源：{this.state.data.Source}  <br/>
          发布时间：{this.state.data.PublishTime}
        </div>
      </div>
    )
  }
}

export default AffairsDetails;