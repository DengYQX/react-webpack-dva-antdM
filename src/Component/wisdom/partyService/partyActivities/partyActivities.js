//党内活动
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, WhiteSpace, Tabs, ListView } from 'antd-mobile';
import './partyActivities.less'
import Navigation from '@/util/navigation.jsx'

import interfaces from '@/api/index'
import { ENGINE_METHOD_DIGESTS } from 'constants';

import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
class PartyActivities extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      list1: [],
      list2: [],
      list3: [],
      type: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      pageSize: 10,
      isMore1: true,
      isMore2: true,
      isMore3: true,
    }
  }

  componentDidMount() {
    this.getData()
  }

  // 获取数据
  getData() {
    if(this.state['isMore'+this.state.type]){
      interfaces.GetPartyActivitiesList({ Type: this.state.type, pageIndex: this.state['page'+this.state.type], pageSize: this.state.pageSize }).then(res => {
        if(res && res.length > 0) {
          this.setState({
            valType:1,
            ['page'+this.state.type]: this.state['page'+this.state.type]+1,
            ['list'+this.state.type]: [...this.state['list'+this.state.type], ...res],
            ['isMore'+this.state.type]: res.length < this.state.pageSize ? false : true
          })
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      })
    }
  }

  // 切换tab
  changTab(tab, index) {
    console.log(tab, index)
    this.setState({
      type: index + 1,
    }, () => {
      this.getData()
    })
  }

  //点击单个查看详情
  clickSingle(id) {
    hashHistory.push({ pathname: '/activeInfor', state: { id: id } })
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
            <img src={ item.Pic?item.Pic :require('%/noImg.jpg')} />
          </div>
          <div className='passingThing_list_text'>
            <p className='passingThing_list_company'>{item.Title}</p>
            <p className='passingThing_list_time'>报名时间:{item.EnrollStartTimeStr.split(' ')[0]}-{item.EnrollEndTimeStr.split(' ')[0]}</p>
            <p className='passingThing_list_number'>{item.Status == 1 ? '近期将举办' : item.Status == 2 ? '进行中' : '已结束'}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { dataSource, pageSize,valType } = this.state
    const tabs2 = [
      { title: '近期将举办', sub: '1' },
      { title: '正在进行', sub: '2' },
      { title: '已结束', sub: '3' },
    ];
    return (
      <div className='party_activities'>
        <Navigation title="党内活动" />
        <div className="active_content">
          <Tabs tabs={tabs2}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={(tab, index) => this.changTab(tab, index)}>
            <div>
            {
                valType == 1 ?
                (
              <ListView
                dataSource={dataSource.cloneWithRows(this.state['list'+this.state.type])}
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

export default PartyActivities;