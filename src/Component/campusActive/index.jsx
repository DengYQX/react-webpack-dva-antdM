// 园区活动
import React, { Component }  from 'react'
import './campusActive.less'
import { Tabs, WhiteSpace, ListView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import { connect } from 'dva'
import  Navigation from '@/util/navigation.jsx'
import interfaces from '@/api/index'
import UnData from "@/Component/unData";
const tabs2 = [
    { title: '近期将举办', sub: '1' },
    { title: '正在进行', sub: '2' },
    { title: '已结束', sub: '3' },
];

class CampusActive extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state={
            dataSource: ds,
            activeIndex: 0,
            height: 0,
            //近期将举办
            list1:[], 
            //正在进行
            list2:[], 
            //已结束
            list3:[],
            page1: 1,
            page2: 1,
            page3: 1,
            rows: 10,
            isMore1: true, //是否加载
            isMore2: true, //是否加载
            isMore3: true, //是否加载
        }
    
    }
    componentDidMount() {
        this.getData()
        const sh = document.documentElement.clientHeight || plus.screen.resolutionHeight;
        this.setState({
            height: sh - this.refs.listV.offsetTop
        })
    }
    getData() {
        const { rows, isMore } = this.state
        if(this.state['isMore'+(this.props.currentActiveTab+1)]) {
            interfaces.GetParkActivitiesList({
                Types: 1,
                OrganizersCompany: 0,
                Status: this.props.currentActiveTab+1,
                pageIndex: this.state['page'+(this.props.currentActiveTab+1)],
                pageSize: this.state.rows
            }).then(res=>{
                this.setState({
                    ['page'+(this.props.currentActiveTab+1)]: this.state['page'+(this.props.currentActiveTab+1)]+1
                })
                if (res && res.length > 0) {
                    let list = []
                    const tabs2 = ['即将开始', '进行中', '已结束']
                    for (let i = 0; i < res.length; i++) {
                        list.push({
                            id: res[i].ID,
                            img: res[i].Pic,
                            title: res[i].Title,
                            state: tabs2[this.props.currentActiveTab],
                            time: '报名时间：' + res[i].RegistStartTimestr.split(' ')[0] + '——' + res[i].RegistEndTimestr.split(' ')[0] ,
                            titleWord: res[i].ActivityCosts,
                        })
                    }
                    this.setState({
                        ['list'+(this.props.currentActiveTab+1)]:[...this.state['list'+(this.props.currentActiveTab+1)], ...list],
                        ['isMore'+(this.props.currentActiveTab+1)]: list.length < rows ? false : true
                    })
                }
            })
        }
    }
    //点击单个标签
    clickList(id){
        hashHistory.push( { pathname:'/campusInfor', state: {id: id} } )
    }
    tabChange(tab, index) {
        if (this.state['list'+(index+1)].length === 0) {
            this.setState({
                activeIndex: index,
                ['page'+(index+1)]: 1
            }, ()=>{
                this.getData()
            })
        } else {
            this.setState({
                activeIndex: index
            })
        }
        this.props.changeActiveTabs(index)
    }
    renderRow(item) {
        return (
            <div style={{ marginTop:'10px' }}>
                <div className='campusActive_list' onClick={()=>{this.clickList(item.id)}}>
                    <div className='campusActive_list_img'>
                        <img src={item.img?item.img:require('%/noImg.jpg')} />
                    </div>
                    <div className='campusActive_list_p'>
                        <div className='campusActive_list_title fontBold'>
                            <p className="campusActive_list_title_title">{item.title}</p>
                            <p className="campusActive_list_title_price">{item.titleWord && item.titleWord > 0 ? '￥'+item.titleWord : '免费'}</p>
                        </div>
                        <p className='campusActive_list_time'>{item.time}</p>
                        <p  className='campusActive_list_state'>{item.state}</p>
                    </div>
                    
                </div>
            </div>
        )
    }
    onEndReached = () => {
        this.getData()
    }
    render(){
        const { dataSource, rows } = this.state
        return( 
            <div className='campusActive'>
                <Navigation  title="园区活动"/>
                <div ref="listV">
                    <WhiteSpace />
                        <Tabs
                            tabs={tabs2}
                            initialPage={this.props.currentActiveTab}
                            tabBarPosition="top"
                            renderTab={tab => <span>{tab.title}</span>}
                            onChange={(tab, index) => { this.tabChange(tab, index) }}
                        >
                                    <ListView
                                        dataSource={dataSource.cloneWithRows(this.state['list1'])}
                                        style={{
                                            height: this.state.height,
                                            overflow: "auto"
                                          }}
                                        pageSize={rows}
                                        renderRow={(item) => this.renderRow(item)}
                                        onEndReached={this.onEndReached}
                                    />
                                    <ListView
                                        dataSource={dataSource.cloneWithRows(this.state['list2'])}
                                        style={{
                                            height: this.state.height,
                                            overflow: "auto"
                                          }}
                                        pageSize={rows}
                                        renderRow={(item) => this.renderRow(item)}
                                        onEndReached={this.onEndReached}
                                    />
                                     <ListView
                                        dataSource={dataSource.cloneWithRows(this.state['list3'])}
                                        style={{
                                            height: this.state.height,
                                            overflow: "auto"
                                          }}
                                        pageSize={rows}
                                        renderRow={(item) => this.renderRow(item)}
                                        onEndReached={this.onEndReached}
                                    />
                        </Tabs>
                    <WhiteSpace />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state, ownProps) {
    return {
        currentActiveTab: state.home.currentActiveTab
    }
  }
function dispatchToProps(dispatch) {
    return {
        changeActiveTabs(payload, params) {
        dispatch({
          type: 'home/changeActiveTabs',
          payload
        })
      }
    }
}
  
export default connect(mapStateToProps, dispatchToProps)(CampusActive);
