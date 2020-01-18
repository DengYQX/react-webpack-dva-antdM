//行业活动
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, WhiteSpace, Tabs, ListView } from 'antd-mobile';
import './industryActivities.less'
import Navigation from '@/util/navigation.jsx'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

import interfaces from '@/api/index'

class IndustryActivities extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      changeTab: 1,   //当前切换tab获取的值
      page1: 1,
      page2: 1,
      page3: 1,
      pageSize: 10,
      list1: [],
      list2: [],
      list3: [],
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      isMore1:true,
      isMore2:true,
      isMore3:true,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    if(this.state['isMore'+this.state.changeTab]){
      interfaces.GetParkActivitiesList({ Types: 3, OrganizersCompany: 0, Status: this.state.changeTab,
        pageIndex: this.state['page'+this.state.changeTab], pageSize: this.state.pageSize }).then(res => {
        if(res && res.length > 0) {
          this.setState({
            valType:1,
            ['page'+this.state.changeTab]: this.state['page'+this.state.changeTab]+1,
            ['list'+this.state.changeTab]:[...this.state['list'+this.state.changeTab], ...res],
            ['isMore'+this.state.changeTab]:res.length<this.state.pageSize?false:true
          })
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      })
    }
  }

  changTab(tab,index) {
    this.setState({
      changeTab: index+1
    }, () => {
      this.getData()
    })
    console.log(this.state.changeTab)
  }

  //点击单个查看详情
  clickSingle(e) {
    hashHistory.push({ pathname: '/campusInfor', state: { id: e } })
  }

  onEndReached = () => {
    this.getData()
  }

  renderRow(item) {
    return (
      <div>
        <WhiteSpace />
        <div className='passingThing_list' onClick={this.clickSingle.bind(this, item.ID)}>
          <div className='passingThing_list_img'>
            <img src={item.Pic?item.Pic :require('%/noImg.jpg')} />
          </div>
          <div className='passingThing_list_text'>
            <p className='passingThing_list_company'><span>{item.Title}</span> <span className="free_admission">{item.price}</span></p>
            <p className='passingThing_list_time'>报名时间:{item.RegistStartTime ? item.RegistStartTime.split(' ')[0] : ''}-{item.RegistEndTime ? item.RegistEndTime.split(' ')[0] : ''}</p>
            <p className='passingThing_list_number'>{this.state.changeTab == '1' ? '近期将举办' : this.state.changeTab == '2' ? '正在进行' : '已结束'}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const tabs2 = [
      { title: '近期将举办', sub: 1 },
      { title: '正在进行', sub: 2 },
      { title: '已结束', sub: 3 },
    ];
    const { dataSource, pageSize,valType } = this.state
    return (
      <div className='industry_activities'>
        <Navigation title="行业活动" />
        <div className="active_content">
          <Tabs tabs={tabs2}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={(tab,index) => this.changTab(tab,index)}>
            <div>
            {
              valType == 1 ?
              (
              <ListView
                dataSource={dataSource.cloneWithRows(this.state['list'+this.state.changeTab])}
                style={{ height: '100%', overflow: 'auto' }}
                pageSize={pageSize}
                renderRow={(item) => this.renderRow(item)}
                onEndReached={this.onEndReached}
              />
              ):(
               <UnData/>
              )
            }
            </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default IndustryActivities;