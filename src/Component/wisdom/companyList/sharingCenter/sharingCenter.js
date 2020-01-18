//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, ListView, Tabs, NavBar } from 'antd-mobile';
import './sharingCenter.less'
import infoAdd from '%/infoAdd.png';
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
import interfaces from '@/api/index'
import { connect } from 'dva'
const tabs2 = [
  { title: '空间共享', sub: 0 },
  { title: '设备共享', sub: 1 },
  { title: '人才共享', sub: 2 },
];

class SharingCenter extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      changeTab: 0,   //当前切换tab获取的值
      //空间共享
      list1: [],
      //设备共享
      list2: [],
      //人才共享
      list3: [],
      page1:1,
      page2:1,
      page3:1,
      isMore1: true,
      isMore2: true,
      isMore3: true,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      pageSize:10,
    }
  }
  componentDidMount(){

    this.getInfor()
  }
  getInfor(){
    //Type 0.全部 1.空间共享 2.设备共享 3.人才共享
    if(this.state['isMore'+(this.props.currentShareTab+1)]){
      interfaces.GetSharingCenterList({pageIndex:this.state['page'+(this.props.currentShareTab+1)],pageSize:this.state.pageSize,Type:this.props.currentShareTab+1}).then(res=>{
        if(res && res.length > 0){
          this.setState({
            valType:1,
            ['page'+(this.props.currentShareTab+1)]:this.state['page'+(this.props.currentShareTab+1)]+1,
            ['isMore'+(this.props.currentShareTab+1)]:res.length < this.state.pageSize ? false : true,
            ['list'+(this.props.currentShareTab+1)]:[...this.state['list'+(this.props.currentShareTab+1)],...res]
          })
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      })
    }
  }
  changTab(index, key) {
   // console.log(index, key)
    this.setState({
      changeTab: index.sub,
    },()=>{
      this.getInfor()
    })
    this.props.changeWisdomTabs(key)
  }
  onEndReached=()=>{
    this.getInfor()
  }
  // 新增
  add() {
    hashHistory.push('/addSharingInfo')
  }
  //点击单个查看详情
  clickSingle(e) {
    hashHistory.push({ pathname: '/sharingInfor', state: { data: e } })
  }
  renderRow1(item){
    return(
      <div className='passingThing_list'  onClick={this.clickSingle.bind(this, item)}>
        <div className='passingThing_list_img'>
          <img src={item.ImgUrl?item.ImgUrl:require('%/noImg.jpg')} />
        </div>
        <div className='passingThing_list_text'>
          <p className='passingThing_list_company'>{item.Name}</p>
          <p className='passingThing_list_number'>容纳人数：{item.ActivitieScale} <span className='passingThing_list_span'>在线申请</span> </p>
          <p className='passingThing_list_time'>{item.dCreateTime}</p>
        </div>
      </div>
    )
  }
  renderRow2(item){
    return (
      <div className='passingThing_list'  onClick={this.clickSingle.bind(this, item)}>
        <div className='passingThing_list_img'>
          <img src={item.ImgUrl?item.ImgUrl:require('%/noImg.jpg')} />
        </div>
        <div className='passingThing_list_text'>
          <p className='passingThing_list_company'>{item.Name}</p>
          <p className='passingThing_list_number'>设备价格：{item.Price} <span className='passingThing_list_span'>在线申请</span> </p>
          <p className='passingThing_list_time'>地点：{item.Address}</p>
        </div>
      </div>
    )
  }
  renderRow3(item){
    return (
      <div className='passingThing_list'  onClick={this.clickSingle.bind(this, item)}>
        <div className='passingThing_list_img'>
          <img src={item.ImgUrl?item.ImgUrl:require('%/noImg.jpg')} />
        </div>
        <div className='passingThing_list_text'>
          <p className='passingThing_list_company'>{item.Name}</p>
          <p className='passingThing_list_number'>工时费：{item.Price} <span className='passingThing_list_span'>在线申请</span> </p>
          <p className='passingThing_list_time'>地点：{item.Address}</p>
        </div>
      </div>
    )
  }
  render() {
    const {valType} = this.state;
    return (
      <div className='sharing_center'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          rightContent={<img src={infoAdd} alt="" onClick={this.add.bind(this)} />}
          className="goods_title"
        >共享中心</NavBar>
        <div>
          <Tabs tabs={tabs2}
            initialPage={this.props.currentShareTab}
            page={this.props.currentShareTab}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={this.changTab.bind(this)}>
            {
              valType == 1 ?
              (
                <div style={{ marginTop: '10px' }}>
                  <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.list1)}
                    style={{ height: 'calc(100vh - 4rem)', overflow: 'auto' }}
                    pageSize={this.state.pageSize}
                    renderRow={(item) => this.renderRow1(item)}
                    onEndReached={this.onEndReached}
                    />
                </div>
                ):(
                 <UnData/>
                )
              }
              {
              valType == 1 ?
              (
                <div style={{ marginTop: '10px' }}>
                  <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.list2)}
                    style={{ height: 'calc(100vh - 4rem)', overflow: 'auto' }}
                    pageSize={this.state.pageSize}
                    renderRow={(item) => this.renderRow2(item)}
                    onEndReached={this.onEndReached}
                    />
                </div>
                ):(
             <UnData/>
            )
          }
          {
              valType == 1 ?
              (
                <div style={{ marginTop: '10px' }}>
                  <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.list3)}
                    style={{ height: 'calc(100vh - 4rem)', overflow: 'auto' }}
                    pageSize={this.state.pageSize}
                    renderRow={(item) => this.renderRow3(item)}
                    onEndReached={this.onEndReached}
                    />
                </div>
                ):(
             <UnData/>
            )
          }
          </Tabs>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    currentShareTab: state.home.currentShareTab
  }
}
function dispatchToProps(dispatch) {
  return {
    changeWisdomTabs(payload, params) {
      dispatch({
        type: 'home/changeShareTabs',
        payload
      })
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(SharingCenter);