//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { List, InputItem, Picker, TextareaItem, Button, Modal } from 'antd-mobile';
import './addResource.less'
import Navigation from '@/util/navigation.jsx'
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import { createForm } from 'rc-form';
import interfaces from '@/api/index'

class AddResource extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getFieldProps: {
        CompanyName: '',
        Contacter: '',
        Telphone: '',
        ResourceIntroduction: '',
      },
      ResourceType: '',
      typeList: [
        { label: '我要资源', value: '1' },
        { label: '我有资源', value: '2' }
      ],
      hasError: false,
    }
  }

  // 提交
  submit() {
    this.props.form.validateFields((err, val) => {
      const{token= ''}=this.props; /** token来源于modol-login中的token */
      const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
      if (!err && loginType) {
        val.UserType = 1
        val.UserId = localStorage.getItem('userId')
        val.ResourceType = this.state.ResourceType
        interfaces.AddResourceDocking(val).then(() => {
          const data = {
            title: '新增',
            btn: '确定',   //按钮的字
            img: 1,  //1为成功，0为失败
            url: '/',    //按钮跳转的链接
            text: `新增成功`
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
      <div className='add_resource'>
        <Navigation title="新增" />
        <List>
          <Picker
            data={this.state.typeList}
            cols={1}
            value={this.state.ResourceType}
            onChange={v => this.setState({ ResourceType: v })}
            onOk={v => this.setState({ ResourceType: v[0] })}
          >
            <List.Item arrow="horizontal">类型:</List.Item>
          </Picker>
          <InputItem
            type='text'
            placeholder="请输入企业名称"
            clear
            {...getFieldProps('CompanyName', {
              initialValue: this.state.getFieldProps.CompanyName,
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
            error={!!getFieldError('CompanyName')}
          >企业名称：</InputItem>
          <InputItem
            type='text'
            placeholder="请输入对接人"
            clear
            {...getFieldProps('Contacter', {
              initialValue: this.state.getFieldProps.Contacter,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入对接人'));
                    }
                  }
                }],
            })}
            error={!!getFieldError('Contacter')}
          >对接人：</InputItem>
          <InputItem
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
          {
            this.state.ResourceType == '1' ?
              <TextareaItem
                title="需求介绍："
                autoHeight
                {...getFieldProps('ResourceIntroduction', {
                  initialValue: this.state.getFieldProps.ResourceIntroduction,
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        if (value) {
                          callback();
                        } else {
                          callback(new Error('请输入需求介绍'));
                        }
                      }
                    }],
                })}
                error={!!getFieldError('ResourceIntroduction')}
                placeholder="请输入需求介绍"
              /> :
              <TextareaItem
                title="资源介绍："
                autoHeight
                {...getFieldProps('ResourceIntroduction', {
                  initialValue: this.state.getFieldProps.ResourceIntroduction,
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        if (value) {
                          callback();
                        } else {
                          callback(new Error('请输入资源介绍'));
                        }
                      }
                    }],
                })}
                error={!!getFieldError('ResourceIntroduction')}
                placeholder="请输入资源介绍"
              />
          }
        </List>
        <Button type="primary" className="submit" onClick={this.submit.bind(this)}>提交</Button>
      </div>
    )
  }
}

AddResource.defaultProps = {
  token: '',
};
AddResource.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(AddResource));
