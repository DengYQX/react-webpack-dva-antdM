//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, ListView, Tabs, WhiteSpace } from 'antd-mobile';
import './studyLink.less'
import Navigation from '@/util/navigation.jsx'
import api from '@/api'
import {isEmpty} from '@/util/common.js';

class StudyLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageSize: 99,
      newList:[],
      pageIndex:1,
    }
  }

  /** 组件挂载之前 */
  componentWillMount(){
    const {pageSize,pageIndex} = this.state;
    api.GetStudyLink({
      pageIndex,
      pageSize,
    }).then((res=>{
      if(!isEmpty(res)){
        this.setState({ newList:res })
      }
    }))
  }
  openLink(url) {
    if (window.plus.runtime) {
      plus.runtime.openURL(url)
    }else {
      window.open(url)
    }
    
  }
  render() {
    const{newList}=this.state;
    return (
      <div className='study_link'>
        <Navigation title="学习链接" />
        <WhiteSpace />
        <div className="service_content">
          {
            newList.length > 0
            ?<div className='service_content'>
                { newList.map(item=>(
                  <div className="service_apply">
                    <div style={{width: '50%'}}>{item.Name}</div>
                    <div onClick={this.openLink.bind(this, item.LinkUrl)} style={{width: '50%'}} className="apply_book">{item.LinkUrl}</div>
                  </div>
              ))}
              </div>
            :<div>暂无数据</div>
          }
        </div>
      </div>
    )
  }
}

export default StudyLink;