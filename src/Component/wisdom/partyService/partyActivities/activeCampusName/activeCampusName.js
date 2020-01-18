//园区活动--报名
import React, { Component } from "react";
import { Modal, Toast, Button, InputItem,  } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import './activeCampusName.less'
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import { createForm } from 'rc-form';
import interfaces from '@/api/index'

class CampusInfor extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data
    this.state = {
      getFieldProps: {
        name: '',
        branchName: '',
        phone: '',
      },
      data,
      hasError: false,
    }
  }

  // 提交
  clickSubmit = () => {
    this.props.form.validateFields((err, val) => {
      const{token= ''}=this.props; /** token来源于modol-login中的token */
      const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
      if (!err && loginType) {
        val.UserID = localStorage.getItem('userId')
        interfaces.AddPartyActivitiesApply(val).then(res => {
          console.log(res)
          const data = {
            title: '报名',
            btn: '确定',   //按钮的字
            img: 1,  //1为成功，0为失败
            url: '/',    //点击按钮跳转的链接
            text: '报名成功，园区工作人员将于2-3个工作日联系您'
          }
          hashHistory.push({ pathname: '/registerOk', state: { data: data } })
        })
      }else if ( !loginType ){
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className='activeCampusName'>
        <Navigation title="报名" />
        <div className='campusName_body'>
          <InputItem
            type='text'
            placeholder="请输入姓名"
            clear
            {...getFieldProps('name', {
              initialValue: this.state.getFieldProps.name,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入招聘职位'));
                    }
                  }
                }],
            })}
            error={!!getFieldError('name')}
          >姓名：</InputItem>
          <InputItem
            type='text'
            placeholder="请输入支部名称"
            clear
            {...getFieldProps('branchName', {
              initialValue: this.state.getFieldProps.branchName,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入支部名称'));
                    }
                  }
                }],
            })}
            error={!!getFieldError('branchName')}
          >支部名称：</InputItem>
          <InputItem
            type='number'
            placeholder="请输入联系方式"
            clear
            {...getFieldProps('phone', {
              initialValue: this.state.getFieldProps.phone,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    const reg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                    if (reg.test(value)) {
                      callback();
                    } else {
                      callback(new Error('请输入联系方式'));
                    }
                  }
                }],
            })}
            error={!!getFieldError('phone')}
          >联系方式：</InputItem>
        </div>
        <div className='campusName_foot'>
          <Button className='campusName_btn' onClick={this.clickSubmit}>提交</Button>
        </div>
      </div>
    )
  }


}

CampusInfor.defaultProps = {
  token: '',
};
CampusInfor.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(CampusInfor));

