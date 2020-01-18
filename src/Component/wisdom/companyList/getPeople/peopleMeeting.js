//招聘会-列表
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import Navigation from '@/util/navigation'
import { Button, ListView, Badge, Toast} from 'antd-mobile';
import './getPeople.less'

import interfaces from '@/api/index'

class PeopleMeeting extends Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            meetingList: [],
            pageIndex: 1,
            pageSize: 10,
            isMore: true,
        }
    }

    /** 组件挂载之后 */
    componentDidMount() {
        this.getList()
    }

    getList() {
        const { pageIndex, pageSize ,isMore} = this.state
        if(isMore){
            interfaces.GetRecruitmentList({Status:0, pageIndex, pageSize}).then(res=>{
                if(res && res.length > 0) {
                    this.setState({
                        pageIndex: pageIndex+1,
                        meetingList: [...this.state.meetingList, ...res],
                        isMore: res.length < this.state.pageSize ? false : true
                    })
                }
            })
        }
    }
    onEndReached = () => {
        this.getList()
    }
    //点击报名 
    clickMeet(item, e) {
        e.stopPropagation()
        if (localStorage.getItem('userId')) {
            interfaces.GetIsSubmitCertifi({
              UserID: localStorage.getItem('userId')
            }).then(res => {
              // console.log(res, 12)
              interfaces.GetMyCertiyByUserID({
                UserID: localStorage.getItem('userId')
              }).then(data => {
                // console.log(res, 111) // 1:未认证，2:已通过，3:已拒绝
                if (res && data.Status === 2) {
                    hashHistory.push({ pathname: '/getMeet', state: { id: item.ID } })
                }else {
                    Toast.info('您还没有完成企业认证！', 1)
                }
              })
            })
        }
    }
    //点击详情
    clickInfor(e) {
        hashHistory.push({ pathname: '/meetingInfor', state: {data: e} })
    }
    renderRow(item) {
        return (
            <div className='peopleMeeting_list' onClick={this.clickInfor.bind(this, item.ID)}>
                <div className='peopleMeeting_text'>
                    <p className='peopleMeeting_tit'>{item.Title}  <Badge text={item.Typestr} style={{ marginLeft: 12,color: 'white',backgroundColor:'#00A1E9' }} /></p>
                    <p className='peopleMeeting_context'>{item.Content}</p>
                    <p className='peopleMeeting_time'>报名时间：{item.RegistStartTime}</p>
                </div>
                <div className='peopleMeeting_div'>
                    <Button className='peopleMeeting_btn' onClick={this.clickMeet.bind(this, item)}>报名申请</Button>
                </div>
            </div>
        )
    }
    /** 组件挂载 */
    render() {
        return (
            <div className='peopleMeeting'>
                <Navigation title='招聘会申请' />
                <div >
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.meetingList)}
                        style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                        pageSize={this.state.pageSize}
                        renderRow={(item) => this.renderRow(item)}
                        onEndReached={this.onEndReached}
                    />
                </div>
            </div>
        )
    }
}

export default PeopleMeeting;