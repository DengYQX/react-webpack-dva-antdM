//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, Popover, Tabs, ListView } from 'antd-mobile';
import './advertisingService.less'
import Navigation from '@/util/navigation.jsx'

import interfaces from '@/api/index'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

class AdvertisingService extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      changeTab: { title: "大堂", sub: "1" },   //当前切换tab获取的值
      //近期将举办
      beginPass: [],
      //正在进行
      overPassing: [],
      page:1,
      isMore: true, // 是否加载
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      pageSize:10,
    }
  }
  componentDidMount(){
    this.getList()
  }
  getList(){
    if(this.state.isMore) {
      // isRent	是否租住 全部：-1，否：0，是：1
      interfaces.GetAdvertisingServicesList({isRent:0,pageIndex:this.state.page,pageSize:this.state.pageSize}).then(res=>{
        if(res && res.length > 0){
          this.setState({
            page:this.state.page+1
          })
          var datang=[];
          var duogong=[];
          res.forEach(element => {
            if(element.AdvertisingScene==1){
              //大堂
              datang.push(element)
            }else{
              duogong.push(element)
            }
          });
          this.setState({
            valType:1,
            beginPass:[...this.state.beginPass,...datang],
            overPassing:[...this.state.overPassing,...duogong],
            isMore: res.length < this.state.pageSize ? false : true
          })
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
        
      })
    }
  }

  changTab(index) {  
    this.setState({
      changeTab: index
    })
 
  }

  //点击单个查看详情
  clickSingle(e) {
    hashHistory.push({ pathname: '/advertisingServiceInfo', state: { data: e } })
  }
  renderRow(item){
    return(
      <div className='passingThing_list'  onClick={this.clickSingle.bind(this, item)}>
        <div className='passingThing_list_img'>
          <img src={item.Pic?item.Pic  :require('%/noImg.jpg')} />
        </div>
        <div className='passingThing_list_text'>
          <p className='passingThing_list_company'><span className="comany_text">{item.Position}</span><span className="free_admission">{item.PriceRange}</span></p>
          <p className='passingThing_list_number'>{item.AdvertisingIntroduction}</p>
        </div>
      </div>
    )
  }
  onEndReached=()=>{
    this.getList()
  }

  render() {
    const tabs2 = [
      { title: '大堂', sub: '1' },
      { title: '多功能厅', sub: '2' },
    ];
    const {valType} = this.state;
    return (
      <div className='advertising_service'>
        <Navigation title="广告服务" />
        <div className="active_content">
          <Tabs tabs={tabs2}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={this.changTab.bind(this)}>
            {
            valType == 1 ?
            (
              <div >

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.beginPass)}
                    style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                    pageSize={this.state.pageSize}
                    renderRow={(item) => this.renderRow(item)}
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
              <div >

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.state.overPassing)}
                    style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                    pageSize={this.state.pageSize}
                    renderRow={(item) => this.renderRow(item)}
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

export default AdvertisingService;