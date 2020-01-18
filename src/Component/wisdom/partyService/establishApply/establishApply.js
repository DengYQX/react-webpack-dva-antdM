//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, Popover, Tabs, WhiteSpace } from 'antd-mobile';
import './establishApply.less'
import Navigation from '@/util/navigation.jsx'
import DownloadFlle from '@/util/download.js'
import enclosure_forward from '%/enclosure_forward.png';
import goTop from '%/goTop.png'; 

import interfaces from '@/api/index'

class EstablishApply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info:{},
      file: []
    }
  }
  componentDidMount(){
    interfaces.GetOrganizationApplyDetails().then(res=>{
      if(res){
        this.setState({
          info:res[0].Info[0],
          file: [...this.state.file, ...res[0].Filelist]
        })
      }
    })
  }

  // 返回顶部
  goTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return (
      <div className='establish_apply'>
        <Navigation title="成立党组织申请" />
        <WhiteSpace />
        <div className="service_content">
          <div className="service_title">申请流程</div>
          <div className="service_text">{this.state.info.Process}</div>
        </div>
        <WhiteSpace />
        <div className="service_content">
          <div className="service_title">建设要求</div>
          <div className="service_text">
            {this.state.info.Requirement}
          </div>
        </div>
        <WhiteSpace />
        <div className="service_content">
          <div className="service_title">组建党支部的原因</div>
          <div className="service_text">   
            {this.state.info.Reason}
          </div>
        </div>
        <WhiteSpace />
        <div className="service_content">
          <div className="service_title">相关附件</div>
          {
            this.state.file.map((item,index) => {
              return (
                <div className="service_apply" key={index}>
                  <div>附件1</div>
                  <div className="apply_book">
                    <DownloadFlle url={item.FullUrl} name={item.Name} key={item.ID} />
                    <img src={enclosure_forward} alt=""/>
                  </div>
                </div>
              )
            })
          }
        </div>
        <img className="go_top" src={goTop} onClick={this.goTop.bind(this)} alt=""/>
      </div>
    )
  }
}

export default EstablishApply;