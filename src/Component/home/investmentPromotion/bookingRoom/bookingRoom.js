import React, { Component } from "react";
import {
  InputItem,
  TextareaItem,
  Button,
  DatePicker,
  List,
  Toast,
  Modal
} from "antd-mobile";
import Navigation from "@/util/navigation.jsx";
import "./bookingRoom.less";
import { hashHistory } from "dva/router";
import interfaces from '@/api/index'
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class PromotionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      name: "",
      hasError: false,
      phone: "",
      time: now,
      Textarea: ""
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
      Modal.alert("请输入正确的手机号码");
    }
  }
  changtextarea(e) {
    this.setState({
      Textarea: e
    });
  }

  // 提交
  submit() {
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (this.state.company === "") {
      Toast.info("请输入公司名称");
      return;
    }
    if (this.state.name === "") {
      Toast.info("请输入姓名");
      return;
    }
    if (this.state.phone === "") {
      Toast.info("请输入手机号");
      return;
    }
    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.state.phone)) {
      Toast.info("请输入正确的手机号");
      return;
    }
    if (this.state.Textarea === "") {
      Toast.info("请输入入驻描述");
      return;
    }
    let time =  window.formatTime(this.state.time);
    if(loginType){
      interfaces.AddEntering({
        ShopID: this.props.location.state.id,
        UserID: localStorage.getItem('userId'),
        CompanyName: this.state.company,
        EnterDetails: this.state.Textarea,
        Contacter: this.state.name,
        Telphone: this.state.phone,
        EnterTime: time
      }).then(res=>{
        //跳转公共页面的相关参数
        const data = {
          title: "预约",
          btn: "确定", //按钮的字
          img: 1, //1为成功，0为失败
          url: "back", //按钮跳转的链接
          text: "您已提交成功，工作人员会尽快与您联系。"
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
      <div className="booking_room">
        <Navigation title="预约看房" />
        <div className="moveThing_body">
          <InputItem
            type="text"
            placeholder="请输入公司名称"
            clear
            onChange={this.changeCompany.bind(this)}
          >
            公司名称:
          </InputItem>
          <InputItem
            type="text"
            placeholder="请输入姓名"
            clear
            onChange={this.changeName.bind(this)}
          >
            姓名:
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
          <DatePicker
            mode="date"
            title="请选择时间"
            minDate={new Date()}
            value={this.state.time}
            onChange={time => this.setState({ time })}
          >
            <List.Item arrow="horizontal">入驻时间:</List.Item>
          </DatePicker>
          <TextareaItem
            title="入驻描述:"
            value={this.state.Textarea}
            onChange={this.changtextarea.bind(this)}
            placeholder="请输入文字..."
          />
        </div>
        <Button
          type="primary"
          className="submit"
          onClick={this.submit.bind(this)}
        >
          提交
        </Button>
      </div>
    );
  }
}

PromotionDetails.defaultProps = {
  token: '',
};
PromotionDetails.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(PromotionDetails);
