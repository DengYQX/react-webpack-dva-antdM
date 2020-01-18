//物业工作台--访客登记
import React, { Component } from "react";
import { Button, Modal, InputItem, List, TextareaItem, DatePicker, Toast } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'

import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import '../myWorkDesk.less'
import interfaces from '@/api/index'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

function formatDate(date) {
    /* eslint no-confusing-arrow: 0 */
    const pad = n => n < 10 ? `0${n}` : n;
    const year = date.getFullYear();
    const dateStr = `${year}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
    return `${dateStr} ${timeStr}:00`;
}

class ComingPeople extends Component {
    constructor(props) {
        super(props);
        this.state = {
            VName: '',  // 来访者姓名
            VIDCard: '',  // 来访者证件号
            VCarId: '',  // 来访者车牌号
            RName: '',  // 被访者姓名
            Cause: '',  // 来访事由
            EntryTime: now,  // 进入时间
            DepartureTime: now,  // 离开时间
        }
    }
    
    //点击提交的时候
    clickSubmit() {
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
        const { VName, VIDCard, VCarId, RName, Cause, EntryTime, DepartureTime } = this.state;
        if (VName == '') {
            return Toast.info('请输入来访者姓名!', 1);
        }
        if (VIDCard == '') {
            return Toast.info('请输入来访者证件号!', 1);
        }
        if (VCarId == '') {
            return Toast.info('请输入来访者车牌号!', 1);
        }
        if (RName == '') {
            return Toast.info('请输入被访者姓名!', 1);
        }
        if (Cause == '') {
            return Toast.info('请输入来访事由!', 1);
        }
        if(loginType){
            interfaces.AddVisitorReg({UserId: localStorage.getItem('userId'), VName, VIDCard, VCarId, RName, Cause, EntryTime : formatDate(EntryTime), DepartureTime: formatDate(DepartureTime)}).then(res => {
                //跳转公共页面的相关参数
                const data = {
                    title: '提交',
                    btn: '确定',   //按钮的字
                    img: 1,  //1为成功，0为失败
                    url: '/',    //按钮跳转的链接
                    text: '提交成功'
                }
                hashHistory.push({ pathname: '/registerOk', state: { data: data } })
            })
        }else{
            Modal.alert('您尚未登陆', '您是否需要登陆', [
                { text: '否', },
                { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
            ]);
        }
    }

    render() {
        return (
            <div className='comingPeople'>
                <Navigation title="访客登记" />
                <div className='comingPeople_body'>
                    <InputItem
                        type="text"
                        placeholder="请输入姓名"
                        onChange={v => this.setState({VName: v})}
                    >来访者姓名:</InputItem>
                    <InputItem
                        type="text"
                        placeholder="请输入证件号"
                        onChange={v => this.setState({VIDCard: v})}
                    >来访者证件号:</InputItem>
                    <InputItem
                        type="text"
                        placeholder="请输入车牌号"
                        onChange={v => this.setState({VCarId: v})} 
                    >来访者车牌号:</InputItem>
                    <InputItem
                        type="text"
                        placeholder="请输入被访者姓名"
                        onChange={v => this.setState({RName: v})} 
                    >被访者姓名:</InputItem>
                    <List renderHeader={() => '来访事由:'}>
                        <TextareaItem
                            rows={5} 
                            onChange={v => this.setState({Cause: v})} 
                            placeholder="请输入来访事由..."
                        />
                    </List>
                    <DatePicker
                        value={this.state.EntryTime}
                        onChange={v => this.setState({ EntryTime: v })}
                    >
                        <List.Item arrow="horizontal">进入时间：</List.Item>
                    </DatePicker>
                    <DatePicker
                        value={this.state.DepartureTime}
                        onChange={v => this.setState({ DepartureTime: v })}
                    >
                        <List.Item arrow="horizontal">离开时间：</List.Item>
                    </DatePicker>
                </div>
                <div className='comingPeople_foot'>
                    <Button style={{width: '85%'}} className='comingPeople_btn' onClick={this.clickSubmit.bind(this)}>提交</Button>
                </div>
            </div>
        )
    }
}

ComingPeople.defaultProps = {
    token: '',
};
ComingPeople.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(ComingPeople);

