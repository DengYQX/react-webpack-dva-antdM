import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, ListView } from 'antd-mobile';
import './myInformation.less' //样式文件 

import infoAdd from '%/infoAdd.png';
import accounting from '%/accounting.png';

import interfaces from '@/api/index'


class MyInformation extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      list: [],
      dataSource: ds,
      page: 1,
      isMore: true, // 是否加载
      pageSize:10,
    }
  }
  componentDidMount() {
    this.getData()

  }
  getData() {  //GetOnlinePublishJobList
    if(this.state.isMore) {
      interfaces.GetMyOnlinePublishJobList({UserID:localStorage.getItem('userId'), Status: 0, pageIndex: this.state.page, pageSize: this.state.pageSize }).then(res => {
        if (res && res.length > 0) {
          res.forEach(element => {
            element.PublishTime = element.PublishTime.split(' ')[0]
          }); 
          this.setState({
            list: [...this.state.list, ...res],
            page: this.state.page + 1,
            isMore: res.length < this.state.pageSize ? false : true
          })
        }
      })
    }
  }

  // 新增
  add() {
    hashHistory.push({ pathname: '/addInfo', query: { name: '新增' } })
  }

  // 发布详情
  infoDetails(e) {
    hashHistory.push({ pathname: '/infoDetails', state: { data: e } })
  }
  onEndReached = () => {
    this.getData()
  }


  renderRow(item) {
    return (
      <div className="card" onClick={() => { this.infoDetails(item) }}>
        <img src={item.Pic?item.Pic:require('%/noImg.jpg')} alt="" />
        <div className="card_text">
          <div className="card_title">
            <span>{item.JobName}  {item.Status == '2' ? <i className="recruit">停止招聘</i> : ''} </span>
            <span className="price">{item.SalaryRangestr}</span>
          </div>
          <div className="card_content">{item.JobDescription}</div>
          <div className="card_time">
            <span>{item.EnterpriseName}</span>
            <span className="date">{item.PublishTime}</span>
          </div>
        </div>
      </div>
    )
  }



  render() {

    return (
      <div className='my_info'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => hashHistory.goBack()}
          rightContent={<img src={infoAdd} alt="" onClick={this.add.bind(this)} />}
          className="my_info_title"
        >我的发布</NavBar>

        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
          style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
          pageSize={this.state.pageSize}
          renderRow={(item) => this.renderRow(item)}
          onEndReached={this.onEndReached}
        />

      </div>
    )
  }

}

export default MyInformation;