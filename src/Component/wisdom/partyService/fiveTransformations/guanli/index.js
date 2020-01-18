import React, { Component } from "react";
import Navigation from '@/util/navigation'
import Jianshe from '../jianshezujian';

import interfaces from '@/api/index'

/** 管理服务 */
class GuanLi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
  }
  
  componentDidMount() {
    interfaces.GetBranchConstructionList({Type: 3}).then(res=>{
      this.setState({
        info: res
      })
    })
  }

  render() {
    const { info } = this.state
    return (
      <div className='branch_setting'>
        <Navigation title="管理服务精细化" />
        <Jianshe info={info}/>
      </div>
    )
  }
}

export default GuanLi;