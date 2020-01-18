//个人中心--招聘会申请
import React, { Component } from "react";
import { Tabs, WhiteSpace, ListView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import './myApplyRecruit.less'
import interfaces from '@/api/index'
import UnData from "@/Component/unData";

class MyApplyRecruit extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      list: [],
      page:1,
      isMore: true, // 是否加载
      pageSize:10,
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData(){
    var post={
      UserID:localStorage.getItem('userId'),
      pageIndex:this.state.page,
      pageSize:this.state.pageSize
    }
    if(this.state.isMore){
      interfaces.GetMyRecruitmentApplyList(post).then(res=>{
        if(res && res.length > 0){
          this.setState({
            list:[...this.state.list,...res],
            page:this.state.page+1,
            isMore:res.length < this.state.pageSize ? false : true,
          })
        }
      })
    }
  }
  // 发布详情
  recruitDetails(item) {
    hashHistory.push({ pathname: '/recruitDetails', state: { data : item }})
  }
  onEndReached=()=>{
    this.getData()
  }
  renderRow(item){
    return(
      <div>
        <div className="card"  onClick={this.recruitDetails.bind(this,item)}>

            <div className="card_title">
              <span style={{width: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.Title}</span>
              {item.Statusstr == '审核中'? <i className="recruit bgcolor1">审核中</i> : 
              item.Statusstr == '已通过' ? <i className="recruit bgcolor1">已通过</i> : 
              item.Statusstr == '已拒绝' ? <i className="recruit bgcolor3">已拒绝</i> :  null}
            </div>
            <div className="card_content">{item.Content}</div>
            <div className="card_time">
              <p>招聘类型:{item.Typestr}</p>  
              <p>活动时间:{item.StartTimestr}-{item.EndTimestr}</p>
            </div>
        </div>
      </div>

    )
  }

  render() {
    const { dataSource } = this.state
    return (
      <div className='myApply_recruit'>
        <Navigation title="招聘会申请" />
        {this.state.list.length < 1 && this.state.page === 1 ?  <UnData /> :
          <ListView
            dataSource={dataSource.cloneWithRows(this.state.list)}
            style={{ height: '100%', overflow: 'auto' }}
            pageSize={this.state.pageSize}
            renderRow={(item) => this.renderRow(item)}
            onEndReached={this.onEndReached}
          />
        }
      
      </div>
    )
  }
}

export default MyApplyRecruit;