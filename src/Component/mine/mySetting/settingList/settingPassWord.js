// 修改密码
import React, { Component } from "react";
import { InputItem, Button, Toast, Modal } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import interfaces from "@/api/index";
import "../mySetting.less";
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

class SettingPassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassWord: "",
      newPassWordAgain: ""
    };
  }
  getNewPassWordOld(e) {
    this.setState({
      newPassWord: e
    });
  }
  getNewPassWordOldAgain(e) {
    this.setState({
      newPassWordAgain: e
    });
  }
  send() {
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (this.state.newPassWord === "") {
      Toast.info("请输入新密码");
      return;
    }
    if (this.state.newPassWordAgain !== this.state.newPassWord) {
      Toast.info("两次密码输入不一致");
      return;
    }
    if(loginType){
      interfaces
        .FindPwd({
          UserID: localStorage.getItem("userId"),
          newPwd: this.state.newPassWord,
          surePwd: this.state.newPassWordAgain
        })
        .then(() => {
          Toast.info("修改成功");
          localStorage.clear();
          hashHistory.push({ pathname: "/" });
        });
    }else{
      Modal.alert('您尚未登陆', '您是否需要登陆', [
          { text: '否', },
          { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
      ]);
    }
  }
  render() {
    return (
      <div className="settingList">
        <Navigation title="找回密码" />
        <div>
          <InputItem
            type="password"
            placeholder="请输入新密码"
            onChange={this.getNewPassWordOld.bind(this)}
            value={this.state.newPassWord}
          >
            新密码
          </InputItem>
          <InputItem
            type="password"
            placeholder="请再次输入密码"
            onChange={this.getNewPassWordOldAgain.bind(this)}
            value={this.state.newPassWordAgain}
          >
            确认密码
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

SettingPassWord.defaultProps = {
  token: '',
};
SettingPassWord.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(SettingPassWord);
