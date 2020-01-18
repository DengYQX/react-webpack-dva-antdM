//我的申请- 代办服务申请
import React, { Component } from 'react'
import {  WhiteSpace, ListView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import './index.less'
import Navigation from '@/util/navigation.jsx'
import UnData from "@/Component/unData";
import interfaces from "@/api/index";

class PaidServicesq extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            list:[],
            page: 1,
            pageSize: 10,
            valType:0,
        }

    }
    componentDidMount() {
        this.getList();
    }
    getList() {
        var post = {
            UserID: localStorage.getItem('userId'),
            pageIndex: this.state.page,
            pageSize: this.state.pageSize
        }
        interfaces.GetMyPaidSerivcesApplyList(post).then(res => {
            if (res && res.length > 0) {
                this.setState({
                    list: [...this.state.list, ...res],
                    page:   this.state.page+=1,
                    valType:1,
                })
            }else if(this.state.valType == 0){
                this.setState({valType:2})
            }
            console.log(this.state.valType)
        })
    }
    //点击单个标签 GetRepairManageList
    clickList(item) {
        hashHistory.push({ pathname: '/paidServicesqDetail', state: { data: item } })
    }

    renderRow(item) {
      return (
        <div>
          <WhiteSpace />
          <div className='passingThing_list' onClick={()=>{this.clickList(item)}}>
            <div className='passingThing_list_img'>
              <img src={item.Pic?item.Pic :require('%/noImg.jpg')} />
            </div>
            <div className='passingThing_list_text'>
              <p className='passingThing_list_company'><span>{item.ServicesName}</span> </p>
              <p className='passingThing_list_time'>人工费:<span className="free_admission"> {item.LaborFee}元/{item.Unit}</span></p>
              <p className='passingThing_list_number'>{item.dCreateTime}</p>
            </div>
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
                <Navigation title="有偿服务申请" />
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
export default PaidServicesq;
