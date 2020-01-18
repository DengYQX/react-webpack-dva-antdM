//报名申请
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import Navigation from '@/util/navigation'
import { Button, Picker, List, InputItem, TextareaItem, Toast, Modal } from 'antd-mobile';
import './getPeople.less'

import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import ChangePage from '@/Component/disWork/changePage'
import interfaces from '@/api/index'

class GetMeet extends Component {
    constructor(props) {
        super(props)
        const id = this.props.location.state.id
        console.log(id)
        this.state = {
            id,
            Type: '',  //招聘类型id
            typeList: [], //招聘类型列表
            CompnayName: '',    //企业名称
            CompanyID: '',   //企业ID
            CEO: '',  //企业负责人
            Telphone: '',   //企业负责人电话
            Contacter: '',   //招聘负责人
            ContacterTel: '',   //招聘负责人电话
            Remark: '',  //公司简介
            positionList: [], //职位列表
            JobName: '',  //岗位名称
            Amount: '',  //人数
            Salary: '',   //待遇
            JobDescription: '', //岗位描述
        }
    }

    componentDidMount() {
        this.getCompanyInfo()
        this.recruitmentTypeList()
    }

    // 获得当前登录的用户企业名称和ID
    getCompanyInfo() {
        interfaces.GetMyEnterpriseInfo({UserID: localStorage.getItem('userId')}).then(res => {
            console.log(res)
            this.setState({
                CompnayName: res[0].EnterpriseName,
                CompanyID: res[0].ID
            })
        })
    }

    // 招聘会类型
    recruitmentTypeList() {
        interfaces.RecruitmentTypeList({}).then(res => {
            let list = []
            for(let i = 0; i < res.length; i++) {
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

    //点击--添加职位的时候
    addSingle = (e) => {
        const { JobName, Amount, Salary, JobDescription } = this.state
        if(JobName == '') {
            return Toast.info('请输入岗位名称!');
        }
        if(Amount == '') {
            return Toast.info('请输入岗位人数!');
        }
        if(Salary == '') {
            return Toast.info('请输入薪资!');
        }
        if(JobDescription == '') {
            return Toast.info('请输入岗位描述!');
        }
        let positionListItem = {RecruitmentApplyID: this.state.id, CompanyID: this.state.CompanyID, JobName, Amount, Salary, JobDescription, Condition: JobDescription}
        this.setState({
            positionList: [...this.state.positionList, positionListItem]
        })
    }

    //点击删除的时候
    delClick(index) {
        let positionList = this.state.positionList
        positionList.splice(index, 1)
        this.setState({
            positionList: positionList
        })
    }

    // 报名
    onSubmit = () => {
        const { Type, CompnayName, CEO, Telphone, Contacter, ContacterTel, Remark, positionList, id } = this.state
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
        if(Type == '') {
            return Toast.info('请选择招聘类型!');
        }
        if(CEO == '') {
            return Toast.info('请输入企业负责人!');
        }
        if(Telphone == '') {
            return Toast.info('请输入企业负责人电话!');
        }else if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(Telphone)) {
            return Toast.info("请输入正确的手机号!");;
        }
        if(Contacter == '') {
            return Toast.info('请输入招聘负责人!');
        }
        if(ContacterTel == '') {
            return Toast.info('请输入招聘负责人电话!');
        }else if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(ContacterTel)) {
            return Toast.info("请输入正确的手机号!");;
        }
        if(Remark == '') {
            return Toast.info('请输入公司简介!');
        }
        if(positionList.length === 0) {
            return Toast.info('请添加职位!');
        }
        if(loginType){
            interfaces.AddRecruitmentApply({UserID: localStorage.getItem('userId'), RecruitmentID: id, Type, CompnayName, CEO, Telphone, Contacter, ContacterTel, Remark, JobList:positionList}).then(res => {
                console.log(res)
                //跳转公共页面的相关参数---失
                const data = {
                    title: '报名',
                    btn: '返回',   //按钮的字
                    img: 1,  //1为成功，0为失败
                    url: '/',    //点击按钮跳转的链接
                    text: '报名成功'
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
            <div className='getMeet'>
                <Navigation title='报名申请' />
                {
                    this.state.CompnayName !== '' ? 
                    <div className="get_meet">
                        <div >
                            <Picker data={this.state.typeList}
                                cols={1}
                                value={this.state.Type}
                                onChange={v => this.setState({ Type: v.join('') })}
                                onOk={v => this.setState({ Type: v.join('') })}
                            >
                                <List.Item arrow="horizontal">招聘类型：</List.Item>
                            </Picker>
                            <InputItem
                                value={this.state.CompnayName}
                                disabled
                                placeholder="请输入公司名称"
                            >企业名称：</InputItem>
                            <InputItem
                                onChange={v => this.setState({CEO: v})}
                                placeholder="请输入企业负责人"
                            >企业负责人：</InputItem>
                            <InputItem
                                type="number"
                                placeholder="请输入企业负责人电话"
                                onChange={v => this.setState({Telphone: v})}
                            > 企业负责人电话：</InputItem>
                            <InputItem
                                onChange={v => this.setState({Contacter: v})}
                                placeholder="请输入招聘负责人"
                            >招聘负责人：</InputItem>
                            <InputItem
                                onChange={v => this.setState({ContacterTel: v})}
                                type="number"
                                placeholder="请输入招聘负责人电话"
                            >招聘负责人电话：</InputItem>
                            <List renderHeader={() => '公司简介:'}>
                                <TextareaItem
                                    rows={4} onChange={v => this.setState({Remark: v})}
                                    placeholder="请输入公司简介..." 
                                />
                            </List>
                        </div>
                        <div className='getMeet_list'>新增职位</div>
                        <div>
                            <InputItem
                                onChange={v => this.setState({JobName: v})}
                                placeholder="请输入岗位名称"
                            >岗位名称:</InputItem>
                            <InputItem
                                onChange={v => this.setState({Amount: v})}
                                placeholder="请输入岗位人数"
                            >岗位人数:</InputItem>
                            <InputItem
                                onChange={v => this.setState({Salary: v})}
                                placeholder="请输入薪资及福利待遇"
                            >薪资及福利待遇:</InputItem>
                            <List renderHeader={() => '岗位描述及要求:'}>
                                <TextareaItem
                                    rows={4} 
                                    onChange={v => this.setState({JobDescription: v})}
                                    placeholder="请输入岗位描述及要求..." 
                                />
                            </List>
                        </div>
                        <div className='getMeet_right'>
                            <Button className='getMeet_right_btn' onClick={this.addSingle} >确认新增</Button>
                        </div>
                        <div className='getMeet_list'>已添加职位</div>
                        <div className='getMeet_array'>
                            {this.state.positionList.map((item, index) => {
                                return (
                                    <div className='getMeet_single' key={index} >
                                        <div>
                                            <span className='getMeet_img' onClick={this.delClick.bind(this, index)}>
                                                <img src={require('%/registerNo.png')} />
                                            </span>
                                        </div>
                                        <div>
                                            <p>岗位名称：{item.JobName}</p>
                                            <p>岗位人数：{item.Amount}</p>
                                            <p>薪资待遇：{item.Salary}</p>
                                            <p className='getMeet_p'>岗位描述及要求：{item.JobDescription}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className='getMeet_foot'>
                            <Button className='getMeet_btn' onClick={this.onSubmit}> 报名</Button>
                        </div>
                    </div> : 
                    <ChangePage url='/companyReset' />
                }
            </div>
        )
    }
}

GetMeet.defaultProps = {
    token: '',
};
GetMeet.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(GetMeet);
