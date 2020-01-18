//省市区政策--在线申请
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button, InputItem, TextareaItem, Modal,Toast } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'

import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import { createForm } from 'rc-form';
import interfaces from '@/api/index'
class app extends Component {
  constructor(props) {
    super(props)
    const data=this.props.location.state.data;
    this.state = {
      companyList: [{ label: '云盟', value: '1' }, { label: '黑豆', value: '2' }, { label: '智慧', value: '3' }, { label: '园区', value: '4' }],
      data:data,

      getFieldProps:{
        company: '',
        name: '',
        phone: '',
        telPhone:'',
        Textarea: '',
        context:'',
      },
    }
  }
  validateName=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入联系人姓名！"));
    }
  };
  validatephone=(rule, value, callback) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入手机号！"));
    }
  }
  validatetelPhone=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入固定电话！"));
    }
  };
  validatetelcompany=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入公司名称！"));
    }
  };
  validatetelTextarea=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入申报理由！"));
    }
  };
  validatetelcontext=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入申报内容！"));
    }
  };
  

  // 申请认证
  submit() {
    this.props.form.validateFields({ force: true }, (error, values) => {
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (!error && loginType) {
        // console.log(this.state, values)
        var post={
          ProvinceCityPolicyID:this.state.data.ID,
          UserID:localStorage.getItem('userId'),
          Title:this.state.data.Title,
          CompanyName:values.company,
          Content:values.context,
          Contact:values.name,
          Telphone:values.telPhone,
          Mobile:values.phone,
          Reason:values.Textarea,
        }
        interfaces.AddProvinceCityPolicyApply(post).then(res=>{
          //跳转公共页面的相关参数
          const data = {
            title: '申请成功',
            btn: '返回详情页',   //按钮的字
            img: 1,  //1为成功，0为失败
            url: '/',    //按钮跳转的链接
            text: '提交成功；请耐心等待园区相关工作人员联系'
          }
          hashHistory.push({ pathname: '/registerOk', state: { data } })
  
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
    const { getFieldProps ,getFieldError} = this.props.form;
    return (
      <div className='advertisement_apply'>
        <Navigation title="线上申请" />
        <div className="moveThing_body">
          <InputItem
            {...getFieldProps('name', {
              initialValue: this.state.getFieldProps.name,
              rules: [{ validator: this.validateName }]
            })}
            error={!!getFieldError("name")}
            onErrorClick={() => {
              Toast(getFieldError("name"));
            }}
            placeholder="请输入联系人姓名"
          >联系人:</InputItem>
          <InputItem
            placeholder="请输入联系方式"
            {...getFieldProps('phone', {
              initialValue: this.state.getFieldProps.phone,
              rules: [{ validator: this.validatephone }]
            })}
            type="number"
            error={!!getFieldError("phone")}
            onErrorClick={() => {
              Toast.info(getFieldError("phone"));
            }}
          >联系方式:</InputItem>
          <InputItem
            type='text'
            placeholder="请输入固定电话"
            {...getFieldProps('telPhone', {
              initialValue: this.state.getFieldProps.telPhone,
              rules: [{ validator: this.validatetelPhone }]
            })}
            error={!!getFieldError("telPhone")}
            onErrorClick={() => {
              Toast.info(getFieldError("telPhone"));
            }}
          >固定电话:</InputItem>
          <InputItem
            type='text'
            placeholder="请输入单位名称"
            {...getFieldProps('company', {
              initialValue: this.state.getFieldProps.company,
              rules: [{ validator: this.validatetelcompany }]
            })}
            error={!!getFieldError("company")}
            onErrorClick={() => {
              Toast.info(getFieldError("company"));
            }}
          >单位名称:</InputItem>
          <TextareaItem
            title="申报理由:"
            rows="3"
            {...getFieldProps('Textarea', {
              initialValue: this.state.getFieldProps.Textarea,
              rules: [{ validator: this.validatetelTextarea }]
            })}
            error={!!getFieldError("Textarea")}
            onErrorClick={() => {
              Toast.info(getFieldError("Textarea"));
            }}
            placeholder="请输入申报理由..."
          />
           <TextareaItem
            title="申报内容："
            rows="3"
            {...getFieldProps('context', {
              initialValue: this.state.getFieldProps.context,
              rules: [{ validator: this.validatetelcontext }]
            })}
            error={!!getFieldError("context")}
            onErrorClick={() => {
              Toast.info(getFieldError("context"));
            }}
            placeholder="请输入申报内容..."
          />
        </div>
        <Button style={{width: '80%', margin: '2rem auto'}} type="primary" className="submit" onClick={this.submit.bind(this)}>申请认证</Button>
      </div>
    )
  }
}

app.defaultProps = {
  token: '',
};
app.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(app));