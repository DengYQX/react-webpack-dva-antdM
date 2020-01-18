//我的申请- 代办服务申请
import React, { Component } from 'react'

import { Tabs, WhiteSpace, ListView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import './index.less'
import Navigation from '@/util/navigation.jsx'
import UnData from "@/Component/unData";
import interfaces from "@/api/index";

class Agent extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            list:[],
            page: 1,
            pageSize: 10,
            title:'',
            valType:0,
        }

    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        var post = {
            UserID: localStorage.getItem('userId'),
            Type: 0,
            IsReturn: 0,
            pageIndex: this.state.page,
            pageSize: this.state.pageSize
        }
        interfaces.GetInsteadServicesApplyList(post).then(res => {
            if (res && res.length > 0) {
                this.setState({
                    list: [...this.state.list, ...res],
                    page:   this.state.page+=1,
                    valType:1,
                })
            }else if(this.state.valType == 0){
                this.setState({valType:2})
            }
        })
    }
    //点击单个标签 GetRepairManageList
    clickList(item) {
        const {title} = this.state;
        hashHistory.push({ pathname: '/agentDetail', state: { data: item,title } })
    }
    renderRow(item) {
        const {title} = this.state;
        const {Type} = item;
        if(Type == 1){
            this.setState({title:'办公采购'})
        }else if(Type == 2){
            this.setState({ title:'装修服务' })
        }else if(Type == 3){
            this.setState({ title:'营销服务' })
        }else if(Type == 4){
            this.setState({ title:'家政服务' })
        }else if(Type == 5){
            this.setState({title:'IT服务'})
        }
        return (
            <div className='Agent_list' onClick={this.clickList.bind(this, item)}>
                <div className='Agent_list_p'>
                    <p className='Agent_list_title'>{title}</p>
                    <p className='Agent_list_time'> {item.Details}</p>
                    <p className='Agent_list_state'>申请时间：{item.ApplyTime}</p>
                </div>
            </div>
        )
    }
    onEndReached = () => {
        this.getList()
    }

    render() {
        const {valType} = this.state;
        return (
            <div className='Agent'>
                <Navigation title="代办服务申请" />
                <div className="repair_box">
                    <WhiteSpace />
                        {
                            valType == 1 ?(
                            <ListView
                                dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
                                style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                                pageSize={this.state.pageSize}
                                renderRow={(item) => this.renderRow(item)}
                                onEndReached={this.onEndReached}
                            />):(
                                <UnData/>
                            )
                        }
                    <WhiteSpace />
                </div>
            </div>)
    }

}
export default Agent;
