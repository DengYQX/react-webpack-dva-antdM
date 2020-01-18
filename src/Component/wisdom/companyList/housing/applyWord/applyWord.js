import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation.jsx'
import { WhiteSpace, WingBlank } from 'antd-mobile';
import './applyWord.less';
import DownloadFlle from '@/util/download.js'
import enclosure_forward from '%/enclosure_forward.png';
import api from "@/api"

class ApplyWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    }
  }
  componentWillMount(){
    // 开启分享服务
    api.GetPublicRentalInforDetails().then(res => {
      this.setState({
        fileList: res[0].FileList
      })
    })
  }
  render() {
    return (
      <div className="apply_word" >
        <Navigation title="公租房申请表" />
        <WhiteSpace />
        <div className="technological_process">
          <div className="technological_process_title fontBold">
          相关附件
          </div>
          <div className="technological_process_text">
            <div>相关附件</div>
            <div className="word" ref="word">
              {
                this.state.fileList.map(item => (<DownloadFlle url={item.FullUrl} name={item.Name} key={item.ID}/>))
              }
              <img src={enclosure_forward} alt=""/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
export default ApplyWord;