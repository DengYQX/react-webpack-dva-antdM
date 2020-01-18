import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon } from 'antd-mobile';
import './index.less' //样式文件  

class AgentDetail extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    const title = this.props.location.state.title;
    this.state = {
      data,
      title,
    }
  }

  render() {
    const { data,title } = this.state
    return (
      <div className="goods_details">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
        >详情</NavBar>
        <div className="details_title">
          <span className="people">{title}</span>
        </div>
        <div className="details_content">{data.Details}
            <div style={{ color:'gray' }}>申请时间:{data.ApplyTime}</div>
        </div>
      </div>
    );
  }
}

export default AgentDetail;