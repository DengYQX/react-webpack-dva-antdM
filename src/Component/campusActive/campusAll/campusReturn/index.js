//园区的反馈
import React, { Component } from "react";
import { Button, Toast, TextareaItem, Modal } from "antd-mobile";
import Navigation from "@/util/navigation";
import { hashHistory } from "react-router";
import interfaces from '@/api/index'

import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import "./campusReturn.less";

class CampusReturn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Textarea: ""
    };
  }
  changtextarea(e) {
    this.setState({
      Textarea: e
    });
  }
  //点击提交的时候
  onSubmit() {
    if (this.state.Textarea === "") {
      Toast.info("请输入反馈信息");
      return;
    }

    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if(loginType){
    interfaces
      .SendFeedback({
        UserID: localStorage.getItem('userId'),
        ParkActivitieID: this.props.location.state.id,
        Content: this.state.Textarea
      })
      .then(res => {
        //跳转公共页面的相关参数
        const data = {
          title: "反馈",
          id: this.props.location.state.id,
          btn: "返回", //按钮的字
          img: 1, //1为成功，0为失败
          backUrl: this.props.location.state.url, //返回时的链接
          url: this.props.location.state.url, //点击按钮跳转的链接 
          text: "反馈成功"
        };
        //data为ok的时候，注册成功
    //    hashHistory.push( { pathname:'/campusInfor', state: {id: id} } )
        hashHistory.push({ pathname: "/registerOk", state: { data } });
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
      <div className="campusReturn">
        <Navigation title="反馈" />
        <div className="campusReturn_body">
          <p>
            反馈信息 <span className="campusReturn_body_icon">*</span>{" "}
          </p>
          <TextareaItem
            value={this.state.Textarea}
            rows={7}
            onChange={this.changtextarea.bind(this)}
            placeholder="请填写反馈信息"
          />
        </div>
        <div className="campusReturn_foot">
          <Button
            className="campusReturn_btn"
            onClick={this.onSubmit.bind(this)}
          >
            确认提交
          </Button>
        </div>
      </div>
    );
  }
}

CampusReturn.defaultProps = {
  token: '',
};
CampusReturn.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(CampusReturn);
