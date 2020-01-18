//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, ListView, Tabs, WhiteSpace } from 'antd-mobile';
import './partyDiscipline.less'
import Navigation from '@/util/navigation.jsx'
import tu2 from '%/tu2.png'

import interfaces from '@/api/index'

class PartyDiscipline extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      type: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      pageSize: 20,
      isMore1: true,
      isMore2: true,
      isMore3: true,
      isMore4: true,
      isMore5: true,
    }
  }

  componentDidMount() {
    this.getData()
  }

  // 获取数据
  getData() {
    if(this.state['isMore'+this.state.type]){
      interfaces.GetPartyDisciRulesList({ Type: this.state.type, pageIndex: this.state['page'+this.state.type], pageSize: this.state.pageSize }).then(res => {
        if(res && res.length > 0) {
          this.setState({
            ['page'+this.state.type]: this.state['page'+this.state.type]+1,
            ['list'+this.state.type]:[...this.state['list'+this.state.type], ...res],
            ['isMore'+this.state.type]: res.length < this.state.pageSize ? false : true
          }, () => {
            console.log(this.state.list1.length)
          })
        }
      })
    }
  }

  // 详情
  goPartyDetails(item) {
    hashHistory.push({ pathname: '/partyDetails', state: { data: item } })
  }

  // 切换tab
  changeTab(tab, index) {
    console.log(tab, index)
    this.setState({
      type: index+1,
    }, ()=>{
      this.getData()
    })
  }

  onEndReached = () => {
    this.getData()
  }

  renderRow(item) {
    return (
      <div className="party_box" onClick={this.goPartyDetails.bind(this, item)}>
        <div>{item.Title}</div>
        <img src={tu2} alt="" />
      </div>
    )
  }

  render() {
    const { dataSource, pageSize } = this.state
    const tabs = [
      { title: '党章', sub: '1' },
      { title: '准则', sub: '2' },
      { title: '条例', sub: '3' },
      { title: '规则', sub: '4' },
      { title: '规定', sub: '5' },
    ];
    return (
      <div className='party_discipline'>
        <Navigation title="党纪党规" />
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={(tab, index) => { this.changeTab(tab, index) }}
        >
          <div>
            <WhiteSpace />
            <ListView
              dataSource={dataSource.cloneWithRows(this.state['list'+this.state.type])}
              style={{ height: '100%', overflow: 'auto' }}
              initialListSize={pageSize}
              pageSize="5"
              renderRow={(item) => this.renderRow(item)}
              onEndReached={this.onEndReached}
            />
          </div>
        </Tabs>
      </div>
    )
  }
}

export default PartyDiscipline;