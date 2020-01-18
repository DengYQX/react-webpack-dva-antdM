//园区活动--报名
import React, { Component } from "react";
import { Tabs, WhiteSpace, Button, InputItem, Picker, List, PickerView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import interfaces from '@/api/index'
import './joinParty.less'

class JoinParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title:'',
      Contents:'',
    }
  }

  componentDidMount() {
    interfaces.GetPartyApplicationList().then(res=>{
      if(res){
        this.setState({
          Title:res[0].Title,
          Contents:res[0].Contents,
        })
      }
    })
  }

  render() {
    const{Title,Contents}=this.state;
    return (
      <div className='join_party'>
        <Navigation title="申请入党" />
        <WhiteSpace />
        <div className="processing_title">{Title}</div>
        <div className="processing_text">
          <div dangerouslySetInnerHTML={{__html: Contents}} />
        </div>
      </div>
    )
  }
}

export default JoinParty;