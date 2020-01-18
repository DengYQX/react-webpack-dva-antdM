//线上招聘平台
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import Navigation from '@/util/navigation'
import { Button, Picker, List, InputItem, TextareaItem, Toast } from 'antd-mobile';
import './getPeople.less'

import { createForm } from 'rc-form';
import interfaces from '@/api/index'

class MeetCompany extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getFieldProps: {
                CompnayName: '', // 公司名称
                CompanyID: '',  //公司id
                CompanyNature: '',  //公司性质
                CompanySize: '',  //公司规模
                MainIndustry: '',   //行业
                Contacter: '',  //招聘联系人
                Telphone: '',   //联系人电话
                Introduction: '',  //公司简介
                Address: '',   //公司地址
            },
            typeList: [], //公司性质列表
            peopleNumber: [],  //公司规模列表
            hasError: false,
        }
    }

    componentDidMount() {
        this.businessNatureList()
        this.getCompanyInfo()
        this.scaleList()
    }

    // 获得当前登录的用户企业名称和ID
    getCompanyInfo() {
        interfaces.GetMyEnterpriseInfo({ UserID: localStorage.getItem('userId') }).then(res => {
            console.log(res)
            this.setState({
                CompnayName: res[0].EnterpriseName,
                CompanyID: res[0].ID
            })
        })
    }

    // 企业性质
    businessNatureList() {
        interfaces.GetBusinessNatureList({}).then(res => {
            console.log(res)
            let list = []
            for (let i = 0; i < res.length; i++) {
                list.push({
                    label: res[i].cName,
                    value: res[i].cValue
                })
            }
            this.setState({
                typeList: [...this.state.typeList, ...list]
            })
        })
    }

    // 公司规模
    scaleList() {
        interfaces.GetBusinessScaleList({}).then(res => {
            console.log(res)
            let list = []
            for (let i = 0; i < res.length; i++) {
                list.push({
                    label: res[i].cName,
                    value: res[i].cValue
                })
            }
            this.setState({
                peopleNumber: [...this.state.peopleNumber, ...list]
            })
        })
    }

    onSubmit = () => {
        this.props.form.validateFields((err, val) => {
            if (!err) {
                const { CompanyNature, CompanySize } = this.state
                if (CompanyNature == '') {
                    return Toast.info('请选择公司性质!');
                }
                if (CompanySize == '') {
                    return Toast.info('请选择公司规模!');
                }
                val.UserID = localStorage.getItem('userId')
                val.CompanyNature = CompanyNature
                val.CompanySize = CompanySize
                console.log(val)
                interfaces.AddOnlineRecruitment(val).then(res => {
                    console.log(res)
                    //跳转公共页面的相关参数---失
                    const data = {
                        title: '申请',
                        btn: '返回',   //按钮的字
                        img: 1,  //1为成功，0为失败
                        url: '/',    //点击按钮跳转的链接
                        text: '申请成功'
                    }
                    hashHistory.push({ pathname: '/registerOk', state: { data: data } })
                })
            }
        })
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className='getMeet'>
                <Navigation title='线上招聘平台' />
                <div className="get_meet">
                    <div>
                        <InputItem
                            {...getFieldProps('CompnayName', {
                                initialValue: this.state.getFieldProps.CompnayName,
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value) {
                                                callback();
                                            } else {
                                                callback(new Error('请输入企业名称'));
                                            }
                                        }
                                    }],
                            })}
                            error={!!getFieldError('CompnayName')}
                            placeholder="请输入企业名称"
                        >企业名称：</InputItem>
                        <InputItem
                            {...getFieldProps('MainIndustry', {
                                initialValue: this.state.getFieldProps.MainIndustry,
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value) {
                                                callback();
                                            } else {
                                                callback(new Error('请输入行业'));
                                            }
                                        }
                                    }],
                            })}
                            error={!!getFieldError('MainIndustry')}
                            placeholder="请输入行业"
                        >公司主行业：</InputItem>
                        <Picker data={this.state.typeList}
                            cols={1}
                            value={this.state.CompanyNature}
                            onChange={v => this.setState({ CompanyNature: v.join('') })}
                            onOk={v => this.setState({ CompanyNature: v.join('') })}
                        >
                            <List.Item arrow="horizontal">公司性质：</List.Item>
                        </Picker>
                        <Picker data={this.state.peopleNumber}
                            cols={1}
                            value={this.state.CompanySize}
                            onChange={v => this.setState({ CompanySize: v.join('') })}
                            onOk={v => this.setState({ CompanySize: v.join('') })}
                        >
                            <List.Item arrow="horizontal">公司规模：</List.Item>
                        </Picker>
                        <InputItem
                            {...getFieldProps('Contacter', {
                                initialValue: this.state.getFieldProps.Contacter,
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            if (value) {
                                                callback();
                                            } else {
                                                callback(new Error('请输入招聘联系人'));
                                            }
                                        }
                                    }],
                            })}
                            error={!!getFieldError('Contacter')}
                            placeholder="请输入招聘联系人"
                        >招聘联系人：</InputItem>
                        <InputItem
                            type="number"
                            {...getFieldProps('Telphone', {
                                initialValue: this.state.getFieldProps.Telphone,
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                                            if (reg.test(value)) {
                                                callback();
                                            } else {
                                                callback(new Error('请输入联系方式'));
                                            }
                                        }
                                    }],
                            })}
                            error={!!getFieldError('Telphone')}
                            placeholder="请输入联系方式"
                        >联系方式：</InputItem>
                        <List renderHeader={() => '公司介绍:'} style={{ borderBottom: '.043rem solid #EAEAEB'}}>
                            <TextareaItem
                                rows={4}
                                {...getFieldProps('Introduction', {
                                    initialValue: this.state.getFieldProps.Introduction,
                                    rules: [
                                        {
                                            validator: (rule, value, callback) => {
                                                if (value) {
                                                    callback();
                                                } else {
                                                    callback(new Error('请输入公司介绍'));
                                                }
                                            }
                                        }],
                                })}
                                error={!!getFieldError('Introduction')}
                                placeholder="请输入公司介绍..."
                            />
                        </List>
                        <List renderHeader={() => '公司地址:'}>
                            <TextareaItem
                                rows={4}
                                {...getFieldProps('Address', {
                                    initialValue: this.state.getFieldProps.Address,
                                    rules: [
                                        {
                                            validator: (rule, value, callback) => {
                                                if (value) {
                                                    callback();
                                                } else {
                                                    callback(new Error('请输入公司地址'));
                                                }
                                            }
                                        }],
                                })}
                                error={!!getFieldError('Address')}
                                placeholder="请输入公司地址..."
                            />
                        </List>
                    </div>
                    <div className='getMeet_foot'>
                        <Button className='getMeet_btn' onClick={this.onSubmit}>申请</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default createForm()(MeetCompany);