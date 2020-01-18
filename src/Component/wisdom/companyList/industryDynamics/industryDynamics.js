import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, WhiteSpace, ListView } from 'antd-mobile';
import './industryDynamics.less' //样式文件
import Navigation from '@/util/navigation.jsx'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
import interfaces from '@/api/index'

class IndustryDynamics extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      list: [],
      pageIndex: 1,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      pageSize: 10,
      isMore:true
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    if(this.state.isMore){
      interfaces.GetIndustryNewsList({ pageIndex: this.state.pageIndex, pageSize: this.state.pageSize }).then(res => {
        console.log(res)
        if(res && res.length > 0) {
          this.setState({
            valType:1,
            pageIndex: this.state.pageIndex+1,
            list: [...this.state.list, ...res],
            isMore:res.length<this.state.pageSize?false:true,
          })
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      })
    }
  }

  // 发布详情
  goodsDetails(item) {
    hashHistory.push({ pathname: '/industryDynamicsDetails', state: { data: item } })
  }

  onEndReached = () => {
    this.getData()
  }

  renderRow(item) {
    return (
      <div>
        <WhiteSpace />
        <div className="card" onClick={this.goodsDetails.bind(this, item)}>
          <img src={item.Pic?item.Pic :require('%/noImg.jpg')} alt="" />
          <div className="card_text">
            <div className="card_title">
              <span>{item.Title}</span>
            </div>
            <div className="card_content">{item.Content}</div>
            <div className="card_time">
              <span>发布时间:{item.PublishTime}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {valType} = this.state;
    return (
      <div className='industry_dynamics'>
        <Navigation title="行业动态" />
        {
          valType == 1 ?
          (
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
            style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
            pageSize={this.state.pageSize}
            renderRow={(item) => this.renderRow(item)}
            onEndReached={this.onEndReached}
          />
        ):(
         <UnData/>
        )
      }
      </div>
    )
  }

}

export default IndustryDynamics;