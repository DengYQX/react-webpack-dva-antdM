import React, { Component, PropTypes } from 'react'
import Navigation from '@/util/navigation.jsx'
import { hashHistory } from 'react-router'
import { List, InputItem, DatePicker, Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import './index.less'
import api from '@/api'


class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getFieldProps: {
                companyName: '',/**公司名 */
                userName: '',/**联系人姓名 */
                phone: '',/**联系人手机号码 */
                activitie: '', /** 场地规模 */
            },
            date: '',/**开始时间 */
            endDate:'',/** 结束时间 */

        }
    }

    /**
     * AddJoinParkApply 申请活动场地
     * @author xiaoDai
     * @param {int} UserId [用户ID]
     * @param {int} SiteServiceID [场地ID]
     * @param {string} ContactsName [公司名称]
     * @param {int} ContactsTel [联系人手机号码]
     * @param {int} ActivitieNum [联系人姓名]
     * @param {date} UseTime [开始时间]
     * @param {date} UseEndTime [结束时间]
     * @return [Boolean]
     */
    submit() {
        const{date,endDate} = this.state;
        this.props.form.validateFields((err, val) => {
            if(!err && date && endDate){
                const UserId = localStorage.getItem('userId'); /** 获取用户ID */
                const SiteServiceID = this.props.location.state.ID; /** 获取场地ID */
                const ContactsTel = val.phone.replace(/\s*/g,"");/**去除手机号码中的空格 */
                api.AddSiteApplication({
                    UserId,
                    SiteServiceID,
                    EnterpriseName: val.companyName,
                    ContactsName: val.userName,
                    ContactsTel,
                    ActivitieNum: val.activitie,
                    UseTime: date,
                    UseEndTime: endDate,
                }).then(() => {
                    const data = {
                        title: '提交',
                        btn: '确定',   //按钮的字
                        img: 1,  //1为成功，0为失败
                        url: '/:id/app/',    //按钮跳转的链接
                        text: '您已经提交成功,工作人员会尽快与您联系'
                    }
                    hashHistory.push({ pathname: '/registerOk', state: { data: data } })
                })
            }else{
                Toast.info('您输入的信息有误请重试');
            }
        }) 
    }

    // 图片上传
    onChange = (files, type, index) => {
        console.log(files, type, index);
        this.setState({
            files,
        });
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='reservation'>
                <Navigation title="申请预定" />
                <List>
                    <InputItem
                        {...getFieldProps('companyName', {
                            initialValue: this.state.getFieldProps.companyName,
                            rules: [
                                { validator: (rule, value, callback) => {
                                    if (value) {
                                      callback();
                                    } else {
                                        callback(new Error('请输入公司名称'));
                                      }
                                }}
                            ],
                        })}
                        placeholder="请输入公司名称"
                    >公司名：</InputItem>
                    <InputItem
                        {...getFieldProps('userName', {
                            initialValue: this.state.getFieldProps.userName,
                            rules: [
                                { validator: (rule, value, callback) => {
                                    if (value) {
                                      callback();
                                    } else {
                                        callback(new Error('请输入姓名'));
                                      }
                                }}
                            ],
                        })}
                        placeholder="请输入姓名"
                    >姓名：</InputItem>
                    <InputItem
                        {...getFieldProps('phone', {
                            initialValue: this.state.getFieldProps.phone,
                            rules: [
                                { validator: (rule, value, callback) => {
                                    if (value.length == 13) {
                                      callback();
                                    } else {
                                        callback(new Error('请输入手机号码'));
                                      }
                                }}
                            ],
                        })}
                        type="phone"
                        placeholder="请输入手机号码"
                    >手机号码：</InputItem>
                    <InputItem
                        {...getFieldProps('activitie', {
                            initialValue: this.state.getFieldProps.phone,
                            rules: [
                                { validator: (rule, value, callback) => {
                                    if (value) {
                                      callback();
                                    } else {
                                        callback(new Error('请输入活动规模人数'));
                                      }
                                }}
                            ],
                        })}
                        type="number"
                        placeholder="请输入活动规模人数"
                    >活动规模：</InputItem>
                    <DatePicker
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                    >
                        <List.Item arrow="horizontal">使用时间：</List.Item>
                    </DatePicker>
                    <DatePicker
                        value={this.state.endDate}
                        onChange={endDate => this.setState({ endDate })}
                    >
                        <List.Item arrow="horizontal">结束时间：</List.Item>
                    </DatePicker>
                </List>
                <Button type="primary" className="submit" onClick={this.submit.bind(this)}>提交</Button>
            </div>
        )
    }

}

export default createForm()(Reservation);