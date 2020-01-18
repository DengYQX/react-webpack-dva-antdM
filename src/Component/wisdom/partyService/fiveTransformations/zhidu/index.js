import React, { Component } from "react";
import Navigation from '@/util/navigation'
import Jianshe from '../jianshezujian';

import interfaces from '@/api/index'

/** 工作制度 */
class ZhiDu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
  }
  
  componentDidMount() {
    interfaces.GetBranchConstructionList({Type: 4}).then(res=>{
      this.setState({
        info: res
      })
    })
  }

  render() {
    const { info } = this.state
    return (
      <div className='branch_setting'>
        <Navigation title="工作制度体系化" />
        <Jianshe info={info}/>
      </div>
    )
  }
}

export default ZhiDu;