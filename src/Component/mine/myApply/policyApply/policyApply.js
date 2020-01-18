import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, WhiteSpace, Popover, Tabs,ListView  } from 'antd-mobile';
import './policyApply.less' //样式文件
import screen from '%/screen.png';
import UnData from "@/Component/unData";
import interfaces from '@/api/index'

class PolicyApply extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      tab: 0,   //当前切换tab获取的值
      list1: [ ],
      list2: [ ],
      visible: false,
      selected: 0,
      page1:1,
      page2:1,
      isMore1: true, //是否加载
      isMore2: true, //是否加载
      pageSize:10,
    }
  }
  componentDidMount(){
    this.getList()
  }
  getList(){
    if(this.state.tab==0){
      if(this.state.isMore1) {
        //园区政策--接口不同
        var post={
          UserID:localStorage.getItem('userId'),
          Status:this.state.selected,
          pageIndex:this.state.page1,
          pageSize:this.state.pageSize,
        }
        interfaces.GetParkPolicyApplyList(post).then(res=>{
          const list = res || [];
          if(res && res.length > 0){
            this.setState({
              list1: this.state.page1 === 1 ? [...list] : [...this.state.list1,...list],
              page1:this.state.page1+1,
              isMore1: res.length < this.state.pageSize ? false : true
            })
          }else {
            this.setState({
              list1: this.state.page1 === 1 ? res || [] : [...this.state.list1,...list],
              isMore1: false
            })
          }
  
        })
      }

    }else{
      if(this.state.isMore2) {
        //省市区政策
        var post={
          UserID:localStorage.getItem('userId'),
          Status:this.state.selected,
          pageIndex:this.state.page2,
          pageSize:this.state.pageSize,
        }
        interfaces.GetProvinceCityPolicyApplyList(post).then(res=>{
          const list = res || [];
          if(res && res.length > 0){
            this.setState({
              list2: this.state.page2 === 1 ? [...list] : [...this.state.list2,...list],
              page2:this.state.page2+1,
              isMore2: res.length < this.state.pageSize ? false : true
            })
          }else {
            this.setState({
              list2: this.state.page2 === 1 ? res || [] : [...this.state.list2,...list],
              isMore2: false
            })
          }
        })
      }

    }
    
  }
  // 切换tab
  changTab(index) {
    this.setState({
      changeTab: index.sub
    })
    console.log(this.state.changeTab)
  }

  // 发布详情
  policyDetails(item,num) {
    //num为1的时候，园区政策，否则为省市区政策
    hashHistory.push({ pathname: '/policyDetails', state: { data : item,num:num }})
  }

  onSelect(opt) {
    console.log(this.state.tab)
    if (this.state.tab === 0) {
      this.setState({
        visible: false,
        isMore1: true,
        page1: 1,
        selected: opt.props.value,
      },()=>{
        this.getList();
      });
    }else {
      this.setState({
        visible: false,
        isMore2: true,
        page2: 1,
        selected: opt.props.value,
      },()=>{
        this.getList();
      });
    }
   
  };

  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  };
  renderRow1(item){
    return(
      <div>
        <div className="card"  onClick={this.policyDetails.bind(this,item,1)}>
          <img src={item.Pic?item.Pic:require('%/noImg.jpg')}  style={{height:'80px',width:'80px'}} alt=""/>
          <div className="card_text">
            <div className="card_title">
              <span style={{width: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.Title}</span>
              {item.Status == 1 ? <i className="recruit bgcolor1">预约中</i> : 
              item.Status == 2 ? <i className="recruit bgcolor1">初审中</i> : 
              item.Status == 3 ? <i className="recruit bgcolor3">初审通过</i> : 
              item.Status == 4 ? <i className="recruit bgcolor4">初审拒绝</i> : 
              item.Status == 5 ? <i className="recruit bgcolor5">已公示</i> : ''}
            </div>
            <div className="card_content">{item.Content}</div>
            <div className="card_time">
              <span>申报时间:{item.SubmitTime}</span>
            </div>
          </div>
        </div>
        <WhiteSpace />
      </div>
    )
  }

  renderRow2(item){
    return(
      <div>
        <div className="card"  onClick={this.policyDetails.bind(this,item,2)}>
          <img src={item.Pic?item.Pic:require('%/noImg.jpg')} style={{height:'80px',width:'80px'}} alt=""/>
          <div className="card_text">
            <div className="card_title">
              <span style={{width: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.Title}</span>
              {item.Status == 1 ? <i className="recruit bgcolor1">预约中</i> : 
              item.Status == 2 ? <i className="recruit bgcolor1">初审中</i> : 
              item.Status == 3 ? <i className="recruit bgcolor3">初审通过</i> : 
              item.Status == 4 ? <i className="recruit bgcolor4">初审拒绝</i> : 
              item.Status == 5 ? <i className="recruit bgcolor5">已公示</i> : ''}
            </div>
            <div className="card_content">{item.Content}</div>
            <div className="card_time">
              <span>申报时间:{item.SubmitTime}</span>
            </div>
          </div>
        </div>
        <WhiteSpace />
      </div>
    )
  }
  onEndReached=()=>{
    this.getList();
  }
  render() {
    const tabs2 = [
      { title: '园区政策', sub: '1' },
      { title: '省市区政策', sub: '2' },
    ];
    console.log(this.state.list1.length, this.state.page1)
    return (
      <div className='policy_apply'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Popover.Item key="0" value="0" data-seed="logId">全部状态</Popover.Item>),
                (<Popover.Item key="2" value="2" style={{ whiteSpace: 'nowrap' }}>初审中</Popover.Item>),
                (<Popover.Item key="3" value="3"><span style={{ marginRight: 5 }}>初审通过</span></Popover.Item>),
                (<Popover.Item key="4" value="4"><span style={{ marginRight: 5 }}>初审拒绝</span></Popover.Item>),
                (<Popover.Item key="5" value="5"><span style={{ marginRight: 5 }}>已公示</span></Popover.Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange.bind(this)}
              onSelect={this.onSelect.bind(this)}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <img src={screen} alt=""/>
              </div>
            </Popover>
          }
          className="goods_title"
        >政策申请</NavBar>
        <div>
          <Tabs tabs={tabs2}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={(tab, index) => {this.setState({tab:index},()=>{this.getList()});}}>

            <div style={{ marginTop: '10px' }}>
            {this.state.list1.length < 1 && this.state.page1 === 1 ?  <UnData /> : <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.list1)}
              style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
              pageSize={this.state.pageSize}
              renderRow={(item) => this.renderRow1(item)}
              onEndReached={this.onEndReached}
            /> }
            </div>
            <div style={{ marginTop: '10px' }}>
            {this.state.list2.length < 1 && this.state.page2 === 1 ?  <UnData /> : <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.list2)}
              style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
              pageSize={this.state.pageSize}
              renderRow={(item) => this.renderRow2(item)}
              onEndReached={this.onEndReached}
            /> }
    
            </div>
          </Tabs>
        </div>
      </div>
    )
  }

}

export default PolicyApply;