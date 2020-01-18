//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon, InputItem, Tabs, SearchBar,Buttom } from 'antd-mobile';
import Navigation from '@/util/navigation'
import '../myWorkDesk.less'



class PropertyPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      changeTab: { title: "待处理", sub: "1" },   //当前切换tab获取的值
      //待处理
      beginPass: [{
        company: '湖南云口袋科技有限公司',
        number: '编号:XXXXXXX',
        time: '09-13 16:00',
        state: '1',
      }, {
        company: '湖南云口袋科技有限公司',
        number: '编号:XXXXXXX',
        time: '09-13 16:00',
        state: '1',
      }],
      //已完成
      overPass: [{
        company: '湖南云口袋科技有限公司',
        number: '编号:XXXXXXX',
        time: '09-13 16:00',
        state: '2',
      }],
      //已取消
      overTime: [{
        company: '湖南云口袋科技有限公司',
        number: '编号:XXXXXXX',
        time: '09-13 16:00',
        state: '3',
      }],
    }
  }
  onChangeSearch(e) {
    this.setState({
      search: e
    })
  }
  changTab(index) {
    this.setState({
      changeTab: index
    })
    console.log(this.state.changeTab)
  }
  //点击单个查看详情
  clickSingle(item) {
    console.log(item)
    item.title = item.state == '1' ? '待处理详情' : (item.state == '2' ? '已完成详情' : '已取消详情')
    console.log(item)
    hashHistory.push({ pathname: '/propertyPostInfor', state: { data: item } })
  }
  changeVal =(e)=> {
    console.log(e.target.value)
  }

  render() {
    const tabs2 = [
      { title: '待处理', sub: '1' },
      { title: '已完成', sub: '2' },
      { title: '已取消', sub: '3' },
    ];
    return (
      <div className='passingThing'>
        <Navigation title="物业驿站" />
        <div>
          <SearchBar
            value={this.state.search}
            placeholder="请输入姓名或者公司名称"
            onSubmit={value => console.log(value, 'onSubmit')}
            onClear={value => console.log(value, 'onClear')}
            onFocus={() => console.log('onFocus')}
            onBlur={() => console.log('onBlur')}
            onCancel={() => console.log('onCancel')}
            showCancelButton
            onChange={this.onChangeSearch.bind(this)}/>

          {/* <div className="inputElement" >
            <Icon type="search" style={{color: '#9B9B9B'}} className="Icons" size={'md'} />
            <input onBlur={this.changeVal} autocomplete="off" type="text" placeholder='请输入姓名或者公司名' ></input>
            <Buttom></Buttom>
          </div> */}
          <Tabs tabs={tabs2}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={this.changTab.bind(this)}>
            <div style={{ marginTop: '10px' }}>
              {this.state.beginPass.map((item, index) => {
                return (
                  <div className='passingThing_list' key={index} onClick={this.clickSingle.bind(this, item)}>
                    <div className='passingThing_list_img'>
                      <img src={require('%/homePhone.png')} />
                    </div>
                    <div className='passingThing_list_text'>
                      <p className='passingThing_list_company'>{item.company}</p>
                      <p className='passingThing_list_number'>{item.number}  <span className='passingThing_list_span'>去处理</span> </p>
                      <p className='passingThing_list_time'>{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: '10px' }}>
              {this.state.overPass.map((item, index) => {
                return (
                  <div className='passingThing_list' key={index} onClick={this.clickSingle.bind(this, item)}>
                    <div className='passingThing_list_img'>
                      <img src={require('%/homePhone.png')} />
                    </div>
                    <div className='passingThing_list_text'>
                      <p className='passingThing_list_company'>{item.company}</p>
                      <p className='passingThing_list_number'>{item.number}  </p>
                      <p className='passingThing_list_time'>{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{ marginTop: '10px' }}>
              {this.state.overTime.map((item, index) => {
                return (
                  <div className='passingThing_list' key={index} onClick={this.clickSingle.bind(this, item)}>
                    <div className='passingThing_list_img'>
                      <img src={require('%/homePhone.png')} />
                    </div>
                    <div className='passingThing_list_text'>
                      <p className='passingThing_list_company'>{item.company}</p>
                      <p className='passingThing_list_number'>{item.number}  </p>
                      <p className='passingThing_list_time'>{item.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Tabs>
        </div>
      </div>
    )
  }
}

export default PropertyPost;