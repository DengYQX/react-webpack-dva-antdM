//招聘会-详情页
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import Navigation from '@/util/navigation'
import { Button } from 'antd-mobile';
import './getPeople.less'

import interfaces from '@/api/index'

class MeetingInfor extends Component {
    constructor(props) {
        super(props)
        const id = this.props.location.state.data
        this.state = {
            id,
            info: {}
        }
    }

    componentDidMount() {
        interfaces.GetRecruitmentDetails({ID: this.state.id}).then(res => {
            console.log(res)
            this.setState({
                info: res[0].Detail
            })
        })
    }

    // 报名
    jumpClick() {
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
                    hashHistory.push({ pathname: '/getMeet', state: {id: this.state.id} })
                }else {
                    Toast.info('您还没有完成企业认证！', 1)
                }
              })
            })
        }
    }

    render() {
        const { info } = this.state
        return (
            <div className='MeetingInfor'>
                <Navigation title='详情' />
                <div>
                    <div className='MeetingInfor_title'>{info.Title}</div>
                    <div className='MeetingInfor_content'>{info.Content}</div>
                    <div className='MeetingInfor_title'>详情</div>
                    <div className='MeetingInfor_list'>
                        <p>招聘类型：{info.Typestr}</p>
                        <p>发布时间：{info.PublishTime}</p>
                        <p>报名时间：{info.RegistStartTime}至{info.RegistEndTime}</p>
                        <p>活动时间：{info.StartTime}至{info.EndTime}</p>
                        <p>活动地点：{info.ActivitiesPlace}</p>
                        <p>主办方：{info.Organizer}</p>
                        <p>协办方：{info.Co_organizer}</p>

                    </div>
                    <div className='MeetingInfor_foot'>
                        <Button className='MeetingInfor_btn' onClick={this.jumpClick.bind(this)}>报名申请</Button>
                    </div>
                </div>


            </div>
        )
    }

}

export default MeetingInfor;