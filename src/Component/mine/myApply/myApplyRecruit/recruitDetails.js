//个人中心--招聘会详情
import React, { Component } from "react";
import { Tabs, WhiteSpace, Button, InputItem, Picker, List, PickerView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import './myApplyRecruit.less'
import interfaces from '@/api/index'

class RecruitDetails extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    console.log(data)
    this.state = {
      data:data,
      list:{}
    }
  }
  componentDidMount(){
    interfaces.GetMyRecruitmentApplyDetails({UserID:localStorage.getItem("userId"),RecruitmentID:this.state.data.RecruitmentID}).then(res=>{
      if(res){
        this.setState({
          list:res[0]
        })
      }
    })
  }

  render() {
    return (
      <div className='recruit_details'>
        <Navigation title="详情" />
        <WhiteSpace />
        <div className="details_title">
          <div>{this.state.list.Title}</div>
          <div className="details_state">
            {
              this.state.data.Statusstr == '审核中' ? <i className="bgcolor1">审核中</i> : 
              this.state.data.Statusstr == '已通过' ? <i className="bgcolor1">已通过</i> : 
              this.state.data.Statusstr == '已拒绝' ? <i className="bgcolor3">已拒绝</i> :  null
            }
          </div>
        </div>
        <div className="details_text">
          <p>{this.state.list.Content}</p>
          <p>招聘类型：{this.state.list.Typestr}</p>
          <p>活动开始时间：{this.state.list.StartTimestr}</p>
          <p>活动结束时间：{this.state.list.EndTimestr}</p>
        </div>
      </div>
    )
  }
}

export default RecruitDetails;