//检察联络室
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, Popover, Tabs, WhiteSpace } from 'antd-mobile';
import '../legalService/legalService.less'
import Navigation from '@/util/navigation.jsx'
import enclosure_forward from '%/enclosure_forward.png';
import goTop from '%/goTop.png';
import DownloadFlle from '@/util/download.js'
import interfaces from '@/api/index'

class LegalService extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Filelist:[],
      Info:{},
    }
  }
  componentDidMount(){
    interfaces.GetProsecutionLiaisonDetails().then(res=>{
      console.log(res)
      this.setState({
        Filelist:res[0].Filelist,
        Info:res[0].Info[0],
      })
    })
  }
  // 返回顶部
  goTopScorll =() => {
    this.refs.legal_box.scrollTop = 0
  } 
  // getFile(){  
  //   var src = this.state.Filelist[0].FullUrl
  //   var iframe = document.createElement('iframe');
  //   iframe.style.display = 'none';
  //   iframe.src = "javascript: '<script>location.href=\"" + src + "\"<\/script>'";
  //   document.getElementsByTagName('body')[0].appendChild(iframe)
  // }

  render() {
    return (
      <div className='legal_service'>
        <Navigation title="检察联络室" />
        <div className="legal_box" ref="legal_box">
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">检察产品清单</div>
            <div className="service_text">
              {this.state.Info.InspectionProList}
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">法治护企理念</div>
            <div className="service_text">
              {this.state.Info.RuleOfLaw}
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">联系方式</div>
            <div className="service_text">
              监督电话：{this.state.Info.SuperviseTel} <br/>
              咨询电话: {this.state.Info.AdvisoryTel}<br/>   
              拨打全国检察机关统一服务热线12309按语音提示转接天心区检察院控告申诉大厅处理。 <br/>
              通信地址：{this.state.Info.Address} <br/>
              邮编：{this.state.Info.PostNo}<br/>
              电子邮箱：{this.state.Info.Email}
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">相关附件</div>
            <div className="service_apply">
              <div>相关附件</div>
              <div className="apply_book" >
                {
                  this.state.Filelist.map(item => (<DownloadFlle url={item.FullUrl} name={item.Name} key={item.ID}/>))
                }
                <img src={enclosure_forward} alt=""/>
                {/* 检察院立案监督申请书  onClick={this.getFile.bind(this)} */}
              </div>
            </div>
          </div>
          <img className="go_top" src={goTop} onClick={this.goTopScorll} alt=""/>
        </div>
      </div>
    )
  }
}

export default LegalService;