//在线申请 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, List, InputItem, Button, Modal, TextareaItem, DatePicker, Toast  } from 'antd-mobile';
import './onlineApplication.less' //样式文件
import { createForm } from 'rc-form';

import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import interfaces from "@/api/index";
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);



class OnlineApplication extends Component {
  originbodyScrollY = document.getElementsByTagName('body')[0].style.overflowY;

  constructor(props) {
    super(props);
    const befor = this.props.location.state.data;
    console.log(befor)
    this.state = {
      befor:befor,
      getFieldProps: {
        contectName: '',   
        phone:'',
        company:'',
        
      },
      text:'',
      date: now,
    }
  }
  changeText(e){
    this.setState({
      text:e
    })
  }

  // 提交
  submit() {
    this.props.form.validateFields({ force: true }, (error, values) => {
      const{token= ''}=this.props; /** token来源于modol-login中的token */
      const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
      if (!err && loginType) {
        let time = window.formatTime(this.state.state);
        var post={
          UserId:localStorage.getItem('userId'),
          SharingID:this.state.befor.ID,
          EnterpriseName:values.company,
          ContactsName:values.contectName,
          ContactsTel:values.phone,
          UseInfo:this.state.text,
          UseTime:time,
        }
        interfaces.AddSharingApplication(post).then(res => {
        const data={
          title:'申请提交',
          btn:'返回',   //按钮的字
          img:1,  //1为成功，0为失败
          url:'/',    //按钮跳转的链接
          text:`申请提交成功`
        }
        hashHistory.push( { pathname:'/registerOk', state:{data:data} } )

        })
      }else if ( !loginType ){
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
      }
    })

  }


  validatePhone = (rule, value, callback) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入手机号！"));
    }
  };
  validateContectName = (rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入联系人姓名！"));
    }
  };
  validateCompany = (rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入企业名称！"));
    }
  };
  


  render() {
    const { getFieldProps,getFieldError  } = this.props.form;
    return (
      <div className='online_application'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="my_report_title"
        >在线申请</NavBar>
        <List className="my_report_list">

          <InputItem
            {...getFieldProps('company', {
              initialValue: this.state.getFieldProps.company,
              rules: [{ validator: this.validateCompany }],
            })}
            placeholder="请输入企业名称"
            error={!!getFieldError("company")}
            onErrorClick={() => {
              Toast.info(getFieldError("company"));
            }}
          >企业名称:</InputItem>
          <InputItem
            {...getFieldProps('contectName', {
              initialValue: this.state.getFieldProps.contectName,
              rules: [{ validator: this.validateContectName }],
            })}
            placeholder="请输入联系人姓名"
            error={!!getFieldError("contectName")}
            onErrorClick={() => {
              Toast.info(getFieldError("contectName"));
            }}
          >联系人：</InputItem>
          <InputItem
            {...getFieldProps('phone', {
              initialValue: this.state.getFieldProps.phone,
              rules: [{ validator: this.validatePhone }],
            })}
            type="number"
            placeholder="请输入联系电话"
            error={!!getFieldError("phone")}
            onErrorClick={() => {
              Toast.info(getFieldError("phone"));
            }}
          >联系电话：</InputItem>

          <DatePicker
            mode="date"
            title="请选择时间"
            extra="请选择时间"
            format='YYYY-MM-DD'
            value={this.state.time}
            onChange={time => this.setState({ time })}>
            <List.Item arrow="horizontal">预计使用时间:</List.Item>
          </DatePicker>

         
          <List renderHeader={() => '使用用途:'}>
              <TextareaItem
                value={this.state.text}
                rows={5}     onChange={this.changeText.bind(this)}
                placeholder="请输入主使用用途..." />
          </List>

        
        </List>
        <div className="upload_pictures">
          <Button type="primary" className="submit" onClick={this.submit.bind(this)}>提交</Button>
        </div>
      </div>
    )
  }

}

OnlineApplication.defaultProps = {
  token: '',
};
OnlineApplication.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(OnlineApplication));
