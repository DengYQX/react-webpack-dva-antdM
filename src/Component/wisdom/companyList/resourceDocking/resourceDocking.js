//资源对接 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, ListView, Tabs, NavBar, WhiteSpace } from 'antd-mobile';
import './resourceDocking.less'
import infoAdd from '%/infoAdd.png';

import interfaces from '@/api/index'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
class ResourceDocking extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      changeTab: 0,   //当前切换tab获取的值
      page1: 1,
      page2: 1,
      pageSize: 10,
      height: 0,
      list1: [],
      list2: [],
      isMore1: true,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      isMore2: true,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    if(this.state['isMore'+(this.state.changeTab+1)]){
      interfaces.GetResourceDockingList({ResourceType: this.state.changeTab+1, UserType: 0, pageIndex: this.state['page'+(this.state.changeTab+1)], 
        pageSize: this.state.pageSize}).then(res=>{
        if(res && res.length > 0) {
          this.setState({
            valType:1,
            ['page'+(this.state.changeTab+1)]: this.state['page'+(this.state.changeTab+1)]+1,
            ['list'+(this.state.changeTab+1)]:[...this.state['list'+(this.state.changeTab+1)], ...res],
            ['isMore'+(this.state.changeTab+1)]:res.length < this.state.pageSize ? false : true,
          })
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      })

    }
    
  }

  changTab(tab, index) {
    console.log(tab, index)
    this.setState({
      changeTab: index,
    }, ()=>{
      console.log(this.state.changeTab)
      this.getData()
    })
  }

  // 新增
  add() {
    hashHistory.push('/addResource')
  }

  //点击单个查看详情
  clickSingle(e) {
    hashHistory.push({ pathname: '/resourceInfor', state: { data: e } })
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
            <p className='passingThing_list_company fontBold'>{item.CompanyName}</p>
            <p className='passingThing_list_number'>{item.ResourceIntroduction}</p>
            <p className='passingThing_list_time'>对接人：{item.Contacter}</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const tabs2 = [
      { title: '我要资源', sub: 0 },
      { title: '我有资源', sub: 1 }
    ];
    const {valType} = this.state;
    return (
      <div className='resource_docking'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          rightContent={<img src={infoAdd} alt="" onClick={this.add.bind(this)} />}
          className="goods_title fontBold"
        >资源对接</NavBar>
        <div>
          <Tabs tabs={tabs2}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={(tab,index) => this.changTab(tab,index)}>
            <div ref="listV">
            {
              valType == 1 ?
              (
              <ListView
                dataSource={this.state.dataSource.cloneWithRows(this.state['list'+(this.state.changeTab+1)])}
                style={{ height: 'calc(100vh - 4rem)', overflow: 'auto' }}
                pageSize={this.state.pageSize}
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

export default ResourceDocking;