//法律服务站
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, Popover, Tabs, WhiteSpace } from 'antd-mobile';
import './legalService.less'
import Navigation from '@/util/navigation.jsx'
import enclosure_forward from '%/enclosure_forward.png';
import goTop from '%/goTop.png'; 
import DownloadFlle from '@/util/download.js'
import interfaces from '@/api/index'

class LegalService extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info:{},
      Filelist:[],
      
    }
  }
  componentDidMount(){
    interfaces.GetLegalServiceStationDetails().then(res=>{
      console.log(res)
      this.setState({
        info:res[0].Info[0],
        Filelist:res[0].Filelist
      })
    })
  }

  // 返回顶部
  goTop() {
    this.refs.legal_box.scrollTop = 0
  }
  
  // getFile(){
  //   var src = this.state.Filelist[0].FullUrl;
  //   var iframe = document.createElement('iframe');
  //   iframe.style.display = 'none';
  //   iframe.src = "javascript: '<script>location.href=\"" + src + "\"<\/script>'";
  //   document.getElementsByTagName('body')[0].appendChild(iframe)
  // }

  render() {
    const html=this.state.info.JobResponsibilities
    return (
      <div className='legal_service'>
        <Navigation title="法律服务站" />
        <div className="legal_box" ref="legal_box">
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">天心区公共法律服务中心</div>
            <div className="service_text">{this.state.info.ServiceIntroduction}</div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">黑石铺街道公共法律服务站工作范围</div>
            <div className="service_text">
            
              {this.state.info.WorkRange}
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">首问责任制度</div>
            <div className="service_text">   
              {this.state.info.AccouSystem}
      
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">工作职责</div>
            <div className="service_text"  dangerouslySetInnerHTML={{__html:html}}>     
            
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">联系方式</div>
            <div className="service_text">
              联系人：{this.state.info.Contacter}   <br/>
              联系电话：{this.state.info.Contact}
            </div>
          </div>
          <WhiteSpace />
          <div className="service_content">
            <div className="service_title">相关附件</div>

            {
               this.state.Filelist.map(item => (
               <div className="service_apply" >
                  <div>相关附件</div>
                  <div className="apply_book"  >
                    <DownloadFlle url={item.FullUrl} name={item.Name} key={item.ID}/>
                    <img src={enclosure_forward} alt=""/>
                  </div>
                </div>))
            }
            
          </div>
          <img className="go_top" src={goTop} onClick={this.goTop.bind(this)} alt=""/>
        </div>
      </div>
    )
  }
}

export default LegalService;