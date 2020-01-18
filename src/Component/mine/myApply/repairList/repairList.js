//我的申请- 报修记录
import React, { Component } from 'react'

import { Tabs, WhiteSpace, ListView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import '../myApply.less'
import Navigation from '@/util/navigation.jsx'
import UnData from "@/Component/unData";
import interfaces from "@/api/index";

class RepairList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            //近期将举办
            list1: [],
            //正在进行
            list2: [],
            //已结束
            list3: [],
            page1: 1,
            page2: 1,
            page3: 1,
            tab: '',
            isMore1: true,// 是否加载
            isMore2: true,// 是否加载
            isMore3: true,// 是否加载
            pageSize: 10,
        }

    }
    componentDidMount() {
        this.getList()
    }
    getList() {
        if (this.state['isMore' + (this.state.tab + 1)]) {
            var post = {
                UserID: localStorage.getItem('userId'),
                Status: this.state.tab + 1,
                RepairType: 0,
                pageIndex: this.state['page' + (this.state.tab + 1)],
                pageSize: this.state.pageSize
            }
            interfaces.GetRepairManageList(post).then(res => {
                if (res && res.length > 0) {
                    this.setState({
                        ['page' + (this.state.tab + 1)]: this.state['page' + (this.state.tab + 1)] + 1
                    })
                    if (res && res.length > 0) {
                        this.setState({
                            ['list' + (this.state.tab + 1)]: [...this.state['list' + (this.state.tab + 1)], ...res],
                            ['isMore' + (this.state.tab + 1)]: res.length < this.state.pageSize ? false : true
                        })
                    }
                }
            })
        }
    }
    //点击单个标签 GetRepairManageList
    clickList(item) {
        console.log(item)
        // const title=item.state=='1'?'未受理详情':(item.state=='2'?'已受理详情':'已结束详情')
        hashHistory.push({ pathname: '/repairInfor', state: { item: item } })
    }
    renderRow(item) {
        return (
            <div className='repairList_list' onClick={this.clickList.bind(this, item)}>
                <div className='repairList_list_p'>
                    <p className='repairList_list_title'>{item.CompanyName}</p>
                    <p className='repairList_list_time'> 报修分类：{item.Content}</p>
                    <p className='repairList_list_state'>报修时间：{item.ApplyTime}</p>
                </div>
                <div className='repairList_list_img'>
                    <img src={item.ProblemPic ? item.ProblemPic : require('%/noImg.jpg')} />
                </div>
            </div>
        )
    }
    onEndReached = () => {
        this.getList()
    }

    render() {
        const tabs2 = [
            { title: '未受理', sub: '1' },
            { title: '已受理', sub: '2' },
            { title: '已完成', sub: '3' },
        ];

        return (
            <div className='repairList'>
                <Navigation title="报修记录" />
                <div className="repair_box">
                    <WhiteSpace />
                    <Tabs tabs={tabs2}
                        initialPage={0}
                        tabBarPosition="top"
                        renderTab={tab => <span>{tab.title}</span>}
                        onChange={(tab, index) => { this.setState({ tab: index }, () => { this.getList() }); console.log('onChange', index, tab); }}>
                        <div style={{ marginTop: '10px' }}>
                            {/* {this.state.list1.map((item,index)=>{
                            return(
                                <div className='repairList_list' key={index} onClick={this.clickList.bind(this,item)}>
                                    <div className='repairList_list_p'>
                                        <p className='repairList_list_title'>{item.company}   </p>
                                        <p className='repairList_list_time'> 报修分类： {item.titleWord}</p>
                                        <p  className='repairList_list_state'>报修时间：{item.time}</p>
                                    </div>
                                    <div className='repairList_list_img'>
                                        <img src={require('%/myOrder.png')} />
                                    </div>
                                </div>
                            )
                        })} */}
                           {this.state.list1.length < 1 && this.state.page1 === 1 ?  <UnData /> : <ListView
                                dataSource={this.state.dataSource.cloneWithRows(this.state.list1)}
                                style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                                pageSize={this.state.pageSize}
                                renderRow={(item) => this.renderRow(item)}
                                onEndReached={this.onEndReached}
                            /> }
                            
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            {this.state.list2.length < 1 && this.state.page2 === 1 ?  <UnData /> : <ListView
                                dataSource={this.state.dataSource.cloneWithRows(this.state.list2)}
                                style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                                pageSize={this.state.pageSize}
                                renderRow={(item) => this.renderRow(item)}
                                onEndReached={this.onEndReached}
                            /> }
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            {this.state.list3.length < 1 && this.state.page3 === 1 ?  <UnData /> : <ListView
                                dataSource={this.state.dataSource.cloneWithRows(this.state.list3)}
                                style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                                pageSize={this.state.pageSize}
                                renderRow={(item) => this.renderRow(item)}
                                onEndReached={this.onEndReached}
                            /> }
                            
                        </div>
                    </Tabs>
                    <WhiteSpace />
                </div>
            </div>)
    }

}
export default RepairList;
