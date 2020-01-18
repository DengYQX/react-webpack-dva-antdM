//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, TextareaItem, WhiteSpace } from 'antd-mobile';
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
      disputeInfo:[],
      fileList: [],
    }
  }

  componentDidMount() {
    interfaces.GetDisputeMediationCenterDetails({}).then(res=>{
      if(res){
        this.setState({
          disputeInfo:[...this.state.disputeInfo,...res[0].Info],
          fileList: [...this.state.fileList,...res[0].Filelist]
        })
      }
    })
  }

  // 返回顶部
  goTop() {
    this.refs.legal_box.scrollTop = 0
  }

  render() {
    return (
      <div className='legal_service'>
        <Navigation title="纠纷调解中心" />
        <div className="legal_box" ref="legal_box">
          {
            this.state.disputeInfo.map((item,index) => {
              return (
                <div key={index}>
                  <WhiteSpace />
                  <div className="service_content">
                    <div className="service_title">{item.Title}</div>
                    <div className="service_text">
                      <TextareaItem 
                          style={{fontSize: '0.56rem'}}
                          value={item.MediationDetail}
                          editable={false}
                          autoHeight
                      />
                    </div>
                  </div>
                </div>
              )
            })
          }
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">相关附件</div>
            {
              this.state.fileList.map((item,index) => {
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