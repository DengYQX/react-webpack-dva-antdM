//园区活动--报名
import React, { Component } from "react";
import { Tabs, WhiteSpace, Button, InputItem, Picker, List, PickerView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import './relationalLink.less'
import interfaces from '@/api/index'

class RelationalLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  componentDidMount() {
    interfaces.GetPartyOrganization().then(res=>{
      if(res){
        this.setState({
          cValue:res[0].cValue,
          cName:res[0].cName,
        })
      }
    })
  }

  render() {
    const{cValue,cName} = this.state;
    return (
      <div className='relational_link'>
        <Navigation title="党员组织关系转接" />
        <WhiteSpace />
        <div className="processing_title">{cName}</div>
        <div className="processing_text">
          <div dangerouslySetInnerHTML={{__html: cValue}} />
        </div>
      </div>
    )
  }
}

export default RelationalLink;