// 修改手机
import React, { Component } from "react";
import { Button, InputItem, Toast, Modal } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import interfaces from "@/api/index";
import "../mySetting.less";

import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';


class SettingPhone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      hasError: false,
      time: 0, //60s验证码
      setTimer: null,
      mesg: ""
    };
  }
  onErrorClick() {
    if (this.state.hasError) {
      Modal.alert("请输入正确的手机号码");
    }
  }
  getPhone(e) {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (e !== "") {
      if (reg.test(e)) {
        this.setState({
          hasError: false
        });
      } else {
        this.setState({
          hasError: true
        });
      }
    } else {
      this.setState({
        hasError: false
      });
    }
    this.setState({
      phone: e
    });
  }
  //点击获取验证码
  clickMsg() {
    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.state.phone)) {
      Toast.info("请输入正确的手机号");
      return;
    }
    this.setState({
      time: 60
    });
    this.state.setTimer = setInterval(() => {
      this.tick();
    }, 1000);
    this.sendYZM();
  }
  tick() {
    if (this.state.time > 0) {
      this.setState({
        time: --this.state.time
      });
    } else {
      //等于0的时候关闭定时器
      clearInterval(this.state.setTimer);
    }
    console.log(this.state.time);
  }
  //卸载时候销毁定时器
  componentWillUnmount() {
    clearInterval(this.state.setTimer);
  }
  getMsg(e) {
    this.setState({
      mesg: e
    });
  }
  sendYZM() {
    interfaces
      .sendSMS({
        UserId: localStorage.getItem("userId"),
        Phone: this.state.phone,
        Type: 5
      })
      .then(res => {});
  }
  send() {
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.state.phone)) {
      Toast.info("请输入正确的手机号");
      return;
    }
    if (this.state.mesg === "") {
      Toast.info("请输入验证码");
      return;
    }
    if(loginType){
      interfaces
        .UpdateMobile({
          UserId: localStorage.getItem("userId"),
          Mobile: this.state.phone,
          ValidateCode: this.state.mesg
        })
        .then(res => {
          Toast.info("修改成功");
          this.setUserPhoneToLocalStorage(this.state.phone, () => {
            hashHistory.goBack();
          });
        });
    }else{
      Modal.alert('您尚未登陆', '您是否需要登陆', [
          { text: '否', },
          { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
      ]);
    }
  }
  setUserPhoneToLocalStorage(phone, cb) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.phone = phone;
    localStorage.setItem("user", JSON.stringify(user));
    cb();
  }
  render() {
    return (
      <div className="settingList">
        <Navigation title="修改手机号" />
        <div className="settingList_list">
          <div className="settingList_input">
            <InputItem
              type="number"
              placeholder="请输入手机号"
              onChange={this.getPhone.bind(this)}
              error={this.state.hasError}
              onErrorClick={this.onErrorClick.bind(this)}
              value={this.state.phone}
            >
              {" "}
              手机号
            </InputItem>
          </div>
          <div className="settingList_msg">
            {this.state.time > 0 ? (
              <Button className="settingList_btn_small">
                {this.state.time + "s"}
              </Button>
            ) : (
              <Button
                className="settingList_btn_small"
                onClick={this.clickMsg.bind(this)}
              >
                发送验证码
              </Button>
            )}
          </div>
        </div>
        <div className="settingList_list_border">
          <InputItem
            type="number"
            placeholder="输入验证码"
            value={this.state.mesg}
            onChange={this.getMsg.bind(this)}
          >
            验证码
          </InputItem>
        </div>

        <div className="settingList_foot">
          <Button
            className="settingList_btn"
            onClick={() => {
              this.send();
            }}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}

SettingPhone.defaultProps = {
    token: '',
};
SettingPhone.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(SettingPhone);
