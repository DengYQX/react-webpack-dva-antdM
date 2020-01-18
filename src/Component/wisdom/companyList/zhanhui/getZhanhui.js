//展览展会--报名
import React, { Component } from "react";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import { Button, InputItem, Toast, Modal } from "antd-mobile";
import interfaces from "@/api/index";
import "./zhanhui.less";
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

class Getzhanhui extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      name: "",
      phone: "",
      hasError: false
    };
  }
  changeName(e) {
    this.setState({
      name: e
    });
  }
  changeCompany(e) {
    this.setState({
      company: e
    });
  }
  changePhone(e) {
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
  onErrorClick() {
    if (this.state.hasError) {
      Toast.info("请输入正确的手机号码");
    }
  }
  clickUp() {
    if (this.state.company === "") {
      Toast.info("请输入公司名称");
      return;
    }
    if (this.state.name === "") {
      Toast.info("请输入姓名");
      return;
    }
    if (this.state.phone === "") {
      Toast.info("请输入手机号码");
      return;
    }
    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.state.phone)) {
      Toast.info("请输入正确的手机号码");
      return;
    }
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if(loginType){
      interfaces
        .AddExhibitionSign({
          UserId: localStorage.getItem("userId"),
          ExhibitionID: this.props.location.state.id,
          Name: this.state.name,
          Company: this.state.company,
          TelPhone: this.state.phone
        })
        .then(res => {
          const data = {
            title: "提交",
            btn: "确定", //按钮的字
            img: 1, //1为成功，0为失败
            url: "back", //按钮跳转的链接
            text: "提交成功"
          };
          hashHistory.push({ pathname: "/registerOk", state: { data: data } });
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
      <div className="getZhanghui">
        <Navigation title="报名申请" />
        <div>
          <InputItem
            onChange={this.changeCompany.bind(this)}
            placeholder="请输入公司名称"
          >
            公司名称：
          </InputItem>
          <InputItem
            onChange={this.changeName.bind(this)}
            placeholder="请输入姓名"
          >
            姓名：
          </InputItem>
          <InputItem
            type="number"
            placeholder="请输入手机号码"
            clear
            error={this.state.hasError}
            onChange={this.changePhone.bind(this)}
            onErrorClick={this.onErrorClick.bind(this)}
          >
            手机号码:
          </InputItem>
        </div>
        <div className="getZhanhui_foot">
          <Button
            className="getZhanhui_btn"
            onClick={() => {
              this.clickUp();
            }}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}

Getzhanhui.defaultProps = {
  token: '',
};
Getzhanhui.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(Getzhanhui);
