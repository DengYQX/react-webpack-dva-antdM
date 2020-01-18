import React, { Component } from "react";
import Navigation from '@/util/navigation'
import Jianshe from '../jianshezujian';

import interfaces from '@/api/index'

/** 组织生活 */
class OrganizationLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    }
  }
  
  componentDidMount() {
    interfaces.GetBranchConstructionList({Type: 2}).then(res=>{
      this.setState({
        info: res
      })
    })
  }

  render() {
    const { info } = this.state
    return (
      <div className='branch_setting'>
        <Navigation title="组织生活正常化" />
        <Jianshe info={info}/>
      </div>
    )
  }
}

export default OrganizationLife;