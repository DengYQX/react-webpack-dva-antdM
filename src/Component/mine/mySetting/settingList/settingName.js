// 修改姓名
import React, { Component } from "react";
import { InputItem, Button, Toast, Modal } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import interfaces from "@/api/index";
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import "../mySetting.less";

class SettingName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  getName(e) {
    this.setState({
      name: e
    });
  }
  setName() {
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (this.state.name === "") {
      Toast.info("请输入姓名");
      return;
    }
    if (this.state.name === JSON.parse(localStorage.getItem("user")).name) {
      hashHistory.goBack();
    } else {
      if(loginType){
        interfaces
          .ModifyName({
            UserID: localStorage.getItem("userId"),
            Name: this.state.name
          })
          .then(res => {
            Toast.info("修改成功");
            this.setUserNameToLocalStorage(this.state.name, ()=>{
              hashHistory.goBack();
            })
          });
      }else{
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
      }
    }
  }
  setUserNameToLocalStorage(name, cb) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.name = name;
    localStorage.setItem("user", JSON.stringify(user));
    cb()
  }
  render() {
    return (
      <div className="settingList">
        <Navigation title="修改姓名" />
        <div>
          <InputItem
            type="text"
            placeholder="请输入姓名"
            onChange={this.getName.bind(this)}
            value={this.state.name}
          >
            姓名
          </InputItem>
        </div>
        <div className="settingList_foot">
          <Button
            className="settingList_btn"
            onClick={() => {
              this.setName();
            }}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}
SettingName.defaultProps = {
  token: '',
};
SettingName.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(SettingName);
