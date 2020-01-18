//人才培训 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, WhiteSpace, Tabs, ListView } from 'antd-mobile';
import './talentTraining.less'
import Navigation from '@/util/navigation.jsx'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

import interfaces from '@/api/index'

class TalentTraining extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      changeTab: 0,   //当前切换tab获取的值
      page1: 1,
      page2: 1,
      page3: 1,
      pageSize: 10,
      list1: [],
      list2: [],
      list3: [],
      isMore1: true,
      isMore2: true,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      isMore3: true,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    if(this.state['isMore'+(this.state.changeTab+1)]){
      console.log(1);
      interfaces.GetParkActivitiesList({ Types: 4, OrganizersCompany: 0, Status: this.state.changeTab+1, pageIndex: this.state['page'+(this.state.changeTab+1)], 
        pageSize: this.state.pageSize }).then(res => {
        const valTypes = this.state.changeTab+1;
        if(res && res.length > 0) {
          this.setState({
            ['page'+(this.state.changeTab+1)]: this.state['page'+(this.state.changeTab+1)]+1,
            valType: 1,
            ['list'+(this.state.changeTab+1)]:[...this.state['list'+(this.state.changeTab+1)], ...res],
            ['isMore'+(this.state.changeTab+1)]: res.length < this.state.pageSize ? false : true
          })
        }else if (valTypes == 1 && this.state.valType == 0){
          this.setState({ valType: 2 });
        }else if (valTypes == 2 && this.state.valType == 0){
          this.setState({ valType: 2 });
        }else if (valTypes == 3 && this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      })
    }
  }
  changTab(index) {
    this.setState({
      changeTab: index.sub,
    }, () => {
      console.log(index.sub)
      this.getData()
    })
  }

  //点击单个查看详情
  clickSingle(e) {
    hashHistory.push({ pathname: '/talentTrainingInfo', state: { id: e.ID } })
  }


  onEndReached = () => {
    this.getData()
  }

  renderRow(item) {
    return (
      <div>
        <WhiteSpace />
        <div className='passingThing_list' onClick={this.clickSingle.bind(this, item)}>
          <div className='passingThing_list_text'>
            <p className='passingThing_list_company'><span>{item.Title}</span></p>
            <p className='passingThing_list_time'>报名时间:{item.RegistStartTimestr ? item.RegistStartTimestr.split(' ')[0] : ''}——{item.RegistEndTimestr ? item.RegistEndTimestr.split(' ')[0]: ''}</p>
          </div>
          <div className='passingThing_list_img'>
            <img src={item.Pic?item.Pic :require('%/noImg.jpg')} />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const tabs2 = [
      { title: '近期将举办', sub: 0 },
      { title: '正在进行', sub: 1 },
      { title: '已结束', sub: 2 },
    ];
    const { dataSource, pageSize,valType } = this.state
    console.log(valType);
    return (
      <div className='talent_training'>
        <Navigation title="人才培训" />
        <div className="active_content">
          <Tabs tabs={tabs2}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={this.changTab.bind(this)}>
            <div>
            {
              valType == 1 ?
              (
              <ListView
                dataSource={dataSource.cloneWithRows(this.state['list'+(this.state.changeTab+1)])}
                style={{ height: 'calc(100vh - 4rem)', overflow: 'auto' }}
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

export default TalentTraining;