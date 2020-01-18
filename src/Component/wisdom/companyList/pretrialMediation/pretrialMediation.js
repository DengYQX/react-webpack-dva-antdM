//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, Popover, Tabs, WhiteSpace } from 'antd-mobile';
import '../legalService/legalService.less'
import Navigation from '@/util/navigation.jsx'
import DownloadFlle from '@/util/download.js'
import enclosure_forward from '%/enclosure_forward.png';
import goTop from '%/goTop.png';

import interfaces from '@/api/index'

class LegalService extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {},
      file: []
    }
  }

  componentDidMount() {
    interfaces.GetPreTrialMediaDetails({}).then(res=>{
      if(res){
        this.setState({
          info: res[0].Info[0],
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
    const { info, file } = this.state
    return (
      <div className='legal_service'>
        <Navigation title="庭前调解室" />
        <div className="legal_box">
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">{info.Title}</div>
            <div className="service_text">
              {info.HandlingGuideline}
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">联系方式</div>
            <div className="service_text">
              联系人:{info.Contacter}<br/>
              联系电话: {info.Contact}
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">相关附件</div>
            {
              file.map((item,index) => {
                return (
                  <div className="service_apply" key={index}>
                    <div>相关附件</div>
                    <div className="apply_book">
                      <DownloadFlle url={item.FullUrl} name={item.Name} key={item.ID} />
                      <img src={enclosure_forward} alt=""/>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/* <img className="go_top" src={goTop} onClick={this.goTop.bind(this)} alt=""/> */}
        </div>
      </div>
    )
  }
}

export default LegalService;