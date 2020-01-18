//园区活动--报名
import React, { Component } from "react";
import { WhiteSpace } from 'antd-mobile';
import Navigation from '@/util/navigation'
import './branchSetting.less'
import Jianshe from '../jianshezujian';

import interfaces from '@/api/index'

class BranchSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
  }

  componentDidMount() {
    interfaces.GetBranchConstructionList({Type: 1}).then(res=>{
      this.setState({
        info: res
      })
    })
  }

  render() {
    const { info } = this.state
    return (
      <div className='branch_setting'>
        <Navigation title="支部设置标准化" />
        <Jianshe info={info} />
      </div>
    )
  }
}

export default BranchSetting;