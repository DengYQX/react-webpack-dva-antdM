//入园流程--入园申请
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';
import  Navigation from '@/util/navigation'
import { Button,List,TextareaItem,Picker,InputItem ,DatePicker, Modal} from 'antd-mobile';

import './comingPark.less'
import api from '@/api'

import { createForm } from 'rc-form';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


class Coming extends Component{
    constructor(props){
        super(props)
        this.state={
            proList:[],
            pro:'',
            companyList:[],
            company:'',
            typeList:[],
            type:'',
            date:now,
            moneyList:[{label:'500万以下',value:'500万以下'},{label:'500万以上',value:'500万以上'}] ,
            money:'',
            all:{
                companyName:'',  //公司名字
                inter:'',  //网站
                address:'',  //地址
                area:'',  //面积
                number:'',   //人数
                name:'',   //法人代表名字
                relationName:'',  //联系人
                relationPhone:'',   //联系方式
                companyNumber:'',  //传真
                companyLine:'', //公司其他联系方式
                textare:'',
            }
        }

    }
    /** 组件挂载之后 */
    componentDidMount() {
        api.GetRegisterTypeList().then(res => {
            const data = res.map(item => {
                return {label: item.cName, value: item.cValue}
            })
            this.setState({
                proList: data
            })
        })

        api.GetFieldList().then(res => {
            const data = res.map(item => {
                return {label: item.cName, value: item.cValue}
            })
            this.setState({
                typeList: data
            })
        })

        api.GetBusinessNatureList().then(res => {
            const data = res.map(item => {
                return {label: item.cName, value: item.cValue}
            })
            this.setState({
                companyList: data
            })
        })
    }
    changtextarea(e){
        const obj=this.state.all;
        obj.textare=e;
        this.setState({
            all:obj
        })
    }
    jumpComing =() =>{
       // console.log(api.AddJoinParkApply)
       // hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
       this.props.form.validateFields((err, val) => {
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
        const UserID = localStorage.getItem('userId');
        if (!err && loginType) {
            api.AddJoinParkApply({
                UserID,
                CompanyName: val.companyName,
                RegisterType: this.state.pro[0],  //注册性质
                Address: val.address,
                LegalRepresentative: val.name,
                LegalRepresentativeTel: val.phone,
                CompanyContacter: val.relationName,
                CompanyContacterTel: val.relationPhone,
                WebSite: val.inter, //公司网址
                OtherContact: val.companyLine,
                Fax: val.companyNumber,
                CompanyIntroduce:val.companyIntroduce, /** 公司简介 */
                BusinessNature: this.state.company[0],  //企业性质
                Industry: this.state.type[0], // 所属领域
                MainBusinessIntro: this.state.all.textare,
                RegistrTime: `${this.state.date.getFullYear()}-${this.state.date.getMonth() + 1 > 9 ? this.state.date.getMonth() + 1 : '0' + (this.state.date.getMonth() + 1)}-${this.state.date.getDate() > 9 ? this.state.date.getDate() : '0' + this.state.date.getDate()} 00:00:00`,
                RegistrCapital: this.state.money[0],
                Area: val.area,
                NumOfEmployees: val.number
            }).then(res => {
               // if (res) {

                    const tels = {
                        title:'提交成功！',
                        btn:'确定',   //按钮的字
                        img:1,  //1为成功，0为失败
                        url:'/',    //按钮跳转的链接
                        text:' '
                    }
                    hashHistory.push( { pathname:'/registerOk', state:{data: tels} } )
               // }
               // console.log(res)
            })
        }else if ( !loginType ){
            Modal.alert('您尚未登陆', '您是否需要登陆', [
                { text: '否', },
                { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
            ]);
        }
       })
    }
    render(){
        const {form:{getFieldProps, getFieldError}} = this.props;
        return(
            <div className='coming '>
                <div className="topNavigation" > <Navigation title='入园申请' /></div>
                <InputItem
                 
                > </InputItem>
                <form>
                 <InputItem
                    {...getFieldProps('companyName', {
                    initialValue: this.state.all.companyName,
                    rules: [
                    { validator: (rule, value, callback) => {
                        if (value) {
                          callback();
                        } else {
                            callback(new Error('请输入公司全称'));
                          }
                    }}],
                    })}
                    error={!!getFieldError('companyName')}
                    placeholder="请输入公司全称"
                >公司全称：</InputItem>
                <Picker
                    data={this.state.proList}
                    cols={1}
                    value={this.state.pro}
                  
                    onOk={v => {
                        this.setState({ pro: v })
                    }} 
                  >
                    <List.Item arrow="horizontal">注册性质:</List.Item>
                </Picker>
                <Picker
                    data={this.state.companyList}
                    cols={1}
                    value={this.state.company}
                    onOk={v => this.setState({ company: v })} >
                    <List.Item arrow="horizontal">企业性质:</List.Item>
                </Picker>
                <Picker
                    data={this.state.typeList}
                    cols={1}
                    value={this.state.type}
                    onOk={v => this.setState({ type: v })} >
                    <List.Item arrow="horizontal">所属领域:</List.Item>
                </Picker>
                <DatePicker
                    mode="date"
                    title="注册时间"
                    extra="Optional"
                    format={"YYYY-MM-DD"}
                    value={this.state.date}
                    onOk={date => {
                      this.setState({ date })
                    }
                    
                    
                     }>
                    <List.Item arrow="horizontal">注册时间</List.Item>
                </DatePicker>
                <InputItem
                    {...getFieldProps('money', {
                    initialValue: this.state.all.money,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入注册资金'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('money')}
                    placeholder="请输入注册资本"
                    extra="万元"
                    type='number'
                >注册资金:</InputItem>
                <InputItem
                    {...getFieldProps('inter', {
                    initialValue: this.state.all.inter,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入公司网址'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('inter')}
                    placeholder="请输入公司网站"
                >公司网址：</InputItem>
                <InputItem
                    {...getFieldProps('address', {
                    initialValue: this.state.all.address,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入公司地址'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('address')}
                    placeholder="请输入公司地址"
                >公司地址：</InputItem>
                <InputItem
                    {...getFieldProps('area', {
                    initialValue: this.state.all.area,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入公司面积'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('area')}
                    placeholder="请输入公司面积"
                    extra="m²"
                >公司面积：</InputItem>
                <InputItem
                    {...getFieldProps('number', {
                    initialValue: this.state.all.number,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入公司从业人员数'));
                              }
                       }}],

                    })}
                    error={!!getFieldError('number')}
                    placeholder="请输入公司从业人员数"
                    extra="人"
                >从业人员数：</InputItem>
                <InputItem
                    {...getFieldProps('name', {
                    initialValue: this.state.all.name,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入法人代表名字'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('name')}
                    placeholder="请输入法人代表名字"
                >法人代表：</InputItem>
                <InputItem
                    {...getFieldProps('phone', {
                    initialValue: this.state.all.phone,
                    rules: [
                        { validator: (rule, value, callback) => {
                            const reg=/^[1]([3-9])[0-9]{9}$/
                            if (reg.test(value)) {
                              callback();
                            } else {
                                callback(new Error('请输入联系方式'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('phone')}
                    placeholder="请输入联系方式"
                > 法人联系电话：</InputItem>
                <InputItem
                    {...getFieldProps('relationName', {
                    initialValue: this.state.all.relationName,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入公司联系人'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('relationName')}
                    placeholder="请输入公司联系人"
                >公司联系人：</InputItem>
                <InputItem
                    {...getFieldProps('relationPhone', {
                    initialValue: this.state.all.relationPhone,
                    rules: [
                        { validator: (rule, value, callback) => {
                            const reg=/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
                            if (reg.test(value)) {
                              callback();
                            } else {
                                callback(new Error('请输入公司联系人方式'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('relationPhone')}
                    placeholder="请输入公司联系人方式"
                >公司联系电话：</InputItem>
                <InputItem
                    {...getFieldProps('companyNumber', {
                    initialValue: this.state.all.companyNumber,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入公司传真号码'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('companyNumber')}
                    placeholder="请输入公司传真号码"
                >公司传真：</InputItem>
                <InputItem
                    {...getFieldProps('companyLine', {
                    initialValue: this.state.all.companyLine,
                    })}
                    placeholder="请输入QQ或者微信公众号"
                >其他联系方式：</InputItem>
                <InputItem
                    {...getFieldProps('companyIntroduce', {
                    initialValue: this.state.all.companyIntroduce,
                    })}
                    placeholder="请输入公司简介"
                >公司简介：</InputItem>
                <List renderHeader={() => '主营业务简介:'}>
                    <TextareaItem
                        value={this.state.all.textare}
                        rows={5}   onChange={this.changtextarea.bind(this)}
                        placeholder="请输入主营业务简介..." />
                </List>
                </form>
                <div className='comingPark_foot'>
                    <Button className='comingPark_btn' onClick={this.jumpComing}>提交</Button>
                </div>


            </div>
        )
    }
}

Coming.defaultProps = {
    token: '',
};
Coming.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(Coming));
