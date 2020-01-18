//入园流程--入园申请
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import Navigation from '@/util/navigation'
import { Button, List, TextareaItem, Picker, InputItem, DatePicker } from 'antd-mobile';
import api from "@/api"
import './onlineApply.less'

import { createForm } from 'rc-form';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class OnlineApply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      proList: [{ label: '男', value: '1' }, { label: '女', value: '2' }],
      pro: '',
      companyList: [{ label: '团员', value: '团员' }, { label: '党员', value: '党员' }, { label: '无', value: '无' }],
      company: '',
      typeList: [{ label: '小学', value: '1' }, { label: '中专', value: '3' }, { label: '高中', value: '2' }, { label: '大专', value: '4' }, { label: '本科', value: '5' }, { label: '硕士', value: '6' }, { label: '博士', value: '7' }, { label: '博士后', value: '8' }],
      type: '',
      date: now,
      sex: "",
      moneyList: [{ label: '500万以下', value: '500万以下' }, { label: '500万以上', value: '500万以上' }],
      money: '',
      all: {
        companyName: '',  //公司名字
        inter: '',  //网站
        address: '',  //地址
        area: '',  //面积
        number: '',   //人数
        name: '',   
        relationName: '',  //联系人
        relationPhone: '',   //联系方式
        companyNumber: '',  //传真
        companyLine: '', //公司其他联系方式
        textare: '',
      }
    }
  }

  changtextarea(e) {
    const obj = this.state.all;
    obj.textare = e;
    this.setState({
      all: obj
    })
  }

  // 申请
  jumpComing =() => {
    console.log(this.state.all)

    this.props.form.validateFields((err, val) => {
      const UserID = localStorage.getItem('userId');
      if (!err) {
        api.AddPublicRentalApply({
          UserID,/** 用户ID */
          Name: val.name, //申请人姓名
          CompanyName: val.companyName, //单位名称
          Sex: this.state.sex[0],
          IdentityNo: val.IdentityNo, //身份证号
          Telphone: val.Telphone, //联系电话
          PoliticalStatus: this.state.company[0], //政治面貌
          EducationalLevel: this.state.type[0], //文化程度
          Employer: val.companyName, //工作单位
          WorkDuty: val.WorkDuty, //工作职务
          JoinRange: `${this.state.date.getFullYear()}-${this.state.date.getMonth() + 1 > 9 ? this.state.date.getMonth() + 1 : '0' + (this.state.date.getMonth() + 1)}-${this.state.date.getDate() > 9 ? this.state.date.getDate() : '0' + this.state.date.getDate()} 00:00:00`, 
          //劳动合同签订日期
        }).then(res => {
          console.log(res)
          const data = {
            title: '申请',
            btn: '确定',   //按钮的字
            img: 1,  //1为成功，0为失败
            url: '/',    //按钮跳转的链接
            text: '申请完成'
          }
          // hashHistory.push({ pathname: '/registerOk', state: { data: data } })
          hashHistory.push({ pathname: '/registerOk', state: { data: data } })
        }) 
      
      }
    })
    
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form
    return (
      <div className='online_apply'>
        <Navigation title='在线申请' />
        <List>
          <from>
          <InputItem
            {...getFieldProps('companyName', {
              initialValue: this.state.all.companyName,
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入公司名称！'));
                    }
                }}],
            })}
            error={!!getFieldError('companyName')}
            placeholder="请输入公司名称"
          >公司名称：</InputItem>
          <InputItem
            {...getFieldProps('name', {
              initialValue: this.state.all.name,
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入姓名！'));
                    }
                }}],
            })}
            error={!!getFieldError('name')}
            placeholder="请输入姓名"
          >姓名：</InputItem>
          <Picker
            data={this.state.proList}
            cols={1}
            value={this.state.sex}
            onOk={v => this.setState({ sex: v })} >
            <List.Item arrow="horizontal">性别:</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('Telphone', {
              rules: [
                { validator: (rule, value, callback) => {
                    const reg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (reg.test(value)) {
                      callback();
                    } else {
                      callback(new Error('请输入联系方式'));
                    }
                }}],
            })}
            error={!!getFieldError('Telphone')}
            placeholder="请输入联系方式"
          >联系方式：</InputItem>
          <InputItem
            {...getFieldProps('IdentityNo', {
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入身份证号码'));
                    }
                }}],
            })}
            error={!!getFieldError('IdentityNo')}
            placeholder="请输入身份证号码"
          >身份证号码：</InputItem>
          <Picker
            data={this.state.companyList}
            cols={1}
            value={this.state.company}
            onOk={v => this.setState({ company: v })} >
            <List.Item arrow="horizontal">政治面貌:</List.Item>
          </Picker>
          <Picker
            data={this.state.typeList}
            cols={1}
            value={this.state.type}
            onOk={v => this.setState({ type: v })} >
            <List.Item arrow="horizontal">文化程度:</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('WorkDuty', {
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入工作职务'));
                    }
                }}],
            })}
            error={!!getFieldError('WorkDuty')}
            placeholder="请输入工作职务"
          >工作职务：</InputItem>
          <DatePicker
            mode="date"
            title="劳动合同签订日期"
            extra="Optional"
            value={this.state.date}
            onChange={date => {
              this.setState({ date })
            }}>
            <List.Item arrow="horizontal">劳动合同签订日期：</List.Item>
          </DatePicker>
          </from>
        </List>
        <div className='comingPark_foot'>
          <Button className='comingPark_btn' onClick={this.jumpComing}>申请</Button>
        </div>
      </div>
    )
  }
}

export default createForm()(OnlineApply); 