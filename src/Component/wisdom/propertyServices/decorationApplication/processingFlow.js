//园区活动--报名
import React, { Component } from "react";
import { Tabs, WhiteSpace, Button, InputItem, Picker, List, PickerView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import './decorationApplication.less'

class ProcessingFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return (
      <div className='processing_flow'>
        <Navigation title="办理流程" />
        <WhiteSpace />
        <div className="processing_title">消防报件备案流程表</div>
        <div className="processing_text">
          一、准备相关资料登陆网址：http://218.77.58.140:8380/app/login.html湖南省施工图管理信息系统，进行网络窗口报备。<span className="means">（报建需提供的资料）</span> <br/>
          二、图纸审核成功后，下达《湖南省房屋建筑工程施工图设计文件审查合格书》，方可对现场进行消防改造。现场消防改造期间，天心区住建局将会对建设单位施工现场进行抽查检验。 <br/>
          三、现场消防改造施工完成后可办理《验收备案申报表》进行申报。资料通过天心区住建局将会对现场情况进行查验合格。<span className="means">（验收备案提供资料）</span> <br/>
          四、验收合格后下达《长沙市天心区住房和城乡建设局建设工程竣工验收消防备案凭证》加拟盖章的复印件交给物业公司存档，消防改造完成。
        </div>
      </div>
    )
  }
}

export default ProcessingFlow;

