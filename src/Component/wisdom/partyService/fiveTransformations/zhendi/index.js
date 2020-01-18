import React, { Component } from "react";
import Navigation from '@/util/navigation'
import Jianshe from '../jianshezujian';

import interfaces from '@/api/index'

/** 阵地建设 */
class ZhenDi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
  }
  
  componentDidMount() {
    interfaces.GetBranchConstructionList({Type: 5}).then(res=>{
      this.setState({
        info: res
      })
    })
  }

  render() {
    const { info } = this.state
    return (
      <div className='branch_setting'>
        <Navigation title="阵地建设规范化" />
        <Jianshe info={info}/>
      </div>
    )
  }
}

export default ZhenDi;