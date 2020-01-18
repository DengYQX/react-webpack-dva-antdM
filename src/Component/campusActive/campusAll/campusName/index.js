//园区活动--报名
import React, { Component } from "react";
import { Button, InputItem, Toast, Modal } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import interfaces from "@/api/index";
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import "./campusName.less"; 

class CampusInfor extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    this.state = {
      data: data,
      name: "",
      company: "",
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
  //输入手机号码
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
      Modal.alert("请输入正确的手机号码");
    }
  }
  //点击提交的时候
  clickSubmit = () => {
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (this.state.name === "") {
      Toast.info("请输入姓名");
      return;
    }
    if (this.state.company === "") {
      Toast.info("请输入公司名称");
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
    if(loginType){
      interfaces
        .AddParkActivitiesApply({
          UserID: localStorage.getItem("userId"),
          ParkActivitiesID: this.state.data.id,
          Name: this.state.name,
          CompanyName: this.state.company,
          Telphone: this.state.phone
        })
        .then(res => {
          let data = {
            title: "报名",
            delta: 2,
            btn: "返回", //按钮的字
            img: 1, //1为成功，0为失败
            url: "back", //按钮跳转的链接
            text: "报名成功"
          };
          hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
        });
      }else{
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
      }
  };

  render() {
    return (
      <div className="campusName">
        <Navigation title="报名" />
        <div className="campusName_body">
          <InputItem
            type="text"
            placeholder="请输入姓名"
            clear
            onChange={this.changeName.bind(this)}
          >
            姓名
          </InputItem>
          <InputItem
            type="text"
            placeholder="请输入公司名称"
            clear
            onChange={this.changeCompany.bind(this)}
          >
            公司名称
          </InputItem>
          <InputItem
            type="number"
            placeholder="请输入手机号码"
            clear
            error={this.state.hasError}
            onChange={this.changePhone.bind(this)}
            onErrorClick={this.onErrorClick.bind(this)}
          >
            手机号码
          </InputItem>
        </div>
        <div className="campusName_foot">
          <Button className="campusName_btn" onClick={this.clickSubmit}>
            提交
          </Button>
        </div>
      </div>
    );
  }
}

CampusInfor.defaultProps = {
    token: '',
};
CampusInfor.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(CampusInfor);

