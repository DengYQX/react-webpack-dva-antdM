import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Picker, Button, InputItem, TextareaItem,Modal,Toast } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import interfaces from '@/api/index'
import { createForm } from 'rc-form';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

class app extends Component {
  constructor(props) {
    super(props)
    const  data=this.props.location.state.data;
    console.log(data)
    this.state = {
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

  // 申请认证
  submit() {
    this.props.form.validateFields({ force: true }, (error, values) => {
      const{token= ''}=this.props; /** token来源于modol-login中的token */
      const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
      if(!error && loginType){
        var post={
          ParkPolicyID:this.state.data.ID,
          UserID:localStorage.getItem('userId'),
          Title:this.state.data.Title,
          CompanyName:values.company,
          Content:values.context,
          Contact:values.name,
          Telphone:values.telPhone,
          Mobile:values.phone,
          Reason:values.Textarea,
        }
        interfaces.AddParkPolicyApply(post).then(res=>{
          if(res){
            //跳转公共页面的相关参数
            const data = {
              title: '申请',
              btn: '返回',   //按钮的字
              img: 1,  //1为成功，0为失败
              url: '/',    //按钮跳转的链接
              text: '提交成功；请耐心等待园区相关工作人员联系'
            }
            hashHistory.push({ pathname: '/registerOk', state: { data: data } })
          }
        })

      }else if ( !loginType ){
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
      }
      
    })
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
              Toast.info(getFieldError("name"));
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