// 修改密码
import React, { Component } from "react";
import { InputItem, Button, Toast, Modal } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import interfaces from "@/api/index";
import "./index.less";
import { connect } from "dva";
import PropTypes from 'prop-types';

class SetPwd extends Component {
  constructor(props) {
    super(props);
    this.state = {
        telephone:'',
        time: 0, //60s验证码
        verification:'',
        yanzhen: 1,
        setTimer: null,
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
    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.state.telephone)) {
      Toast.info("请输入正确的手机号");
      return;
    }
    this.setState({
      time: 60
    });
    this.state.setTimer = setInterval(() => {
      this.tick();
    }, 1000);
    this.clickMeet();
  }
  /** 定时器 */
  tick() {
    if (this.state.time > 0) {
      this.setState({
        time: --this.state.time
      });
    } else {
      //等于0的时候关闭定时器
      clearInterval(this.state.setTimer);
    }
  }
  //卸载时候销毁定时器
  componentWillUnmount() {
    clearInterval(this.state.setTimer);
  }
  
  /** 发送验证码 */
  clickMeet=()=>{
    if(this.state.telephone){
        interfaces.sendSMS({
            UserId:localStorage.getItem('userId'),
            Phone:this.state.telephone,
            Type:1
        })
        .then(()=>{
            this.setState({ yanzhen: 2 })
        })
    }
  }

  /** 验证验证码 */
  send=()=>{
      interfaces.checkMessageCode({
        mobile:this.state.telephone,
        validateCode:this.state.verification
      })
      .then(()=>{
        hashHistory.push({ pathname: "/settingPassWord" });
      })
  }

  render() {
    return (
      <div className="settingList">
        <Navigation title="验证" />
        <div className="settingList_list">
          <div className="settingList_input">
            <InputItem
              type="number"
              placeholder="请输入手机号"
              onChange={(e)=>{this.setState({ telephone:e })}}
              error={this.state.hasError}
              onErrorClick={this.onErrorClick.bind(this)}
              value={this.state.telephone}
            >
              {"手机号"}
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
            value={this.state.verification}
            onChange={(e)=>{this.setState({verification:e})}}
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
            下一步
          </Button>
        </div>
      </div>
    );
  }
}

SetPwd.defaultProps = {
  token: '',
};
SetPwd.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(SetPwd);
