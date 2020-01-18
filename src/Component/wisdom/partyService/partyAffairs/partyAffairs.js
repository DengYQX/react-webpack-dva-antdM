//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { List, ListView, Tabs, WhiteSpace } from 'antd-mobile';
import './partyAffairs.less'
import Navigation from '@/util/navigation.jsx'

import interfaces from '@/api/index'

const Item = List.Item;
const Brief = Item.Brief;

class PartyAffairs extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      list: [],
      pageIndex: 1,
      pageSize: 15,
      isMore: true,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    if(this.state.isMore){
      interfaces.GetPartyAffairsKnowledgeList({pageIndex: this.state.pageIndex, pageSize: this.state.pageSize}).then(res=>{
        if(res && res.length > 0) {
          this.setState({
            pageIndex: this.state.pageIndex+1,
            list: [...this.state.list, ...res],
            isMore: res.length < this.state.pageSize ? false : true
          })
        }
      })
    }
  }

  onEndReached = () => {
    this.getData()
  }

  renderRow(item) {
    return (
      <Item arrow="horizontal" onClick={() => {hashHistory.push({ pathname: '/affairsDetails', state: {data: item} })}}>{item.Title}</Item>
    )
  }

  render() {
    const { dataSource, pageSize } = this.state
    return (
      <div className='party_affairs'>
        <Navigation title="党务知识" />
        <ListView
          dataSource={dataSource.cloneWithRows(this.state.list)}
          style={{ height: '100%', overflow: 'auto' }}
          pageSize={pageSize}
          renderRow={(item) => this.renderRow(item)}
          onEndReached={this.onEndReached}
        />
      </div>
    )
  }
}

export default PartyAffairs;