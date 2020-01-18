import React, { Component, PropTypes } from 'react';
import { Link } from 'dva/router';
import Navigation from '@/util/navigation.jsx'
import { WhiteSpace, ListView } from 'antd-mobile';
import './notice.less';
import api from '@/api'
import accounting from '%/accounting.png';
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

class ApplyWord extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      pageIndex: 1,
      pageSize: 8,
      isLoading: true,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      isMore: false,
      list: [{ title: '园区政策标题1', isState: 1 },
      { title: '园区政策标题2', isState: 2 },
      { title: '园区政策标题3', isState: 3 },
      { title: '园区政策标题4', isState: 4 },
      { title: '园区政策标题5', isState: 5 }],
      dataSource
    }
  }
  componentWillMount() {
    api.GetParkNoticeList({
      Type: 4,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize
    }).then(res => {
      const sh = document.documentElement.clientHeight || plus.screen.resolutionHeight;
      const list = res || [];
      if(!isEmpty(list)){
      this.setState({
        list,
        dataSource: this.state.dataSource.cloneWithRows(list),
        height: sh - this.refs.listV.offsetTop,
        valType:1,
        isLoading: false,
        isMore: list.length < this.state.pageSize ? false : true
      });}else if (this.state.valType == 0){
        this.setState({ valType: 2 });
      }
    })
  }
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.isMore) {
      return;
    }
    console.log(this.state.pageIndex)

    api.GetParkNoticeList({
      Type: 4,
      pageIndex: this.state.pageIndex + 1,
      pageSize: this.state.pageSize
    }).then(res => {
      const list = res || [];
      this.setState({
        list: [...this.state.list, ...list],
        dataSource: this.state.dataSource.cloneWithRows([...this.state.list, ...list]),
        isLoading: false,
        pageIndex: this.state.pageIndex + 1,
        isMore: list.length < this.state.pageSize ? false : true
      });
    })

  }

  render() {
    const row = (rowData, rowKey) => {
      return (
        <div>
          <WhiteSpace />
          <Link to={{ pathname: 'noticeDetails', state: { ID: rowData.ID, Type: rowData.Type, title: rowData.Title } }} className="card">
            <img src={rowData.ImageUrl || accounting} alt="" />
            <div className="card_text">
              <div className="card_title">
                <span className="fontBold">{rowData.Title}</span>
              </div>
              <div className="card_content">{rowData.Content}</div>
              <div className="card_time">
                <span>发布时间: {rowData.PublishTime}</span>
              </div>
            </div>
          </Link>
        </div>
      )
    }
    const {valType} = this.state;
    return (
      <div className="notice_house" >
        <Navigation title="公租房公告" />
        <div ref="listV" className="notice_box">
        {
          valType == 1 ?
          (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={row}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            pageSize={4}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}
          />
          ):(
           <UnData/>
          )
        }
        </div>
      </div>
    )
  }

}
export default ApplyWord;