import React, { Component } from "react";
import { InputItem, Button, Modal } from "antd-mobile";
import { hashHistory } from "react-router";
import "Component/register/register.less";
import interfaces from "@/api/index";
import { createForm } from "rc-form";

import logoImg from "%/appIndexLogo.png";
import logoPhone from "%/appPhone.png";
import getMessage from "%/getMessage.png";
import getPassword from "%/getPassword.png";

// import logoPassWord from '%/apppassWord.png';

class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      time: 0, //60s验证码
      setTimer: null,
      showLogin: true
    };
  }
  //点击获取验证码
  clickMsg(phone) {
    this.setState(
      {
        hidden: true
      },
      () => {
        this.props.form.validateFields({ force: true }, (error, values) => {
          if (!error) {
            this.setState({
              time: 60
            });
            this.state.setTimer = setInterval(() => {
              this.tick();
            }, 1000);
            this.sendSMS(phone);
          }
          this.setState({
            hidden: false
          });
        });
      }
    );
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
  sendSMS(phone) {
    interfaces
      .sendSMS({
        Phone: phone,
        Type: 2
      })
      .then(res => {});
  }
  //卸载时候销毁定时器
  componentWillUnmount() {
    clearInterval(this.state.setTimer);
  }
  //点击返回登陆页面
  jumpLogin() {
    hashHistory.push(`/login`);
  }
  //点击注册
  onSubmit() {
    this.props.form.validateFields({ force: true }, (error, values) => {
      if (!error) {
        interfaces
          .register({
            Mobile: values.phone,
            Password: values.pwd,
            SurePassword: values.pwdAgain,
            ValidateCode: values.yzm
          })
          .then(res => {
            //跳转公共页面的相关参数
            const data = {
              title: "注册",
              btn: "去登录", //按钮的字
              img: 1, //1为成功，0为失败
              url: "/login", //按钮跳转的链接
              text: "注册成功"
            };
            //data为ok的时候，注册成功
            console.log(data);
            hashHistory.push({
              pathname: "/registerOk",
              state: { data: data }
            });
          });
      }
    });
  }
  validatePhone = (rule, value, callback) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入手机号！"));
    }
  };
  validateYZM = (rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入验证码！"));
    }
  };
  validatePWD = (rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入密码！"));
    }
  };
  validatePWDAgain = (rule, value, callback, pValue) => {
    if (value && value !== "" && value === pValue) {
      callback();
    } else {
      callback(new Error("两次密码不一致！"));
    }
  };
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    let phone = null;
    let pwdValue = null;
    return (
      <div className="register">
        <div className="register_head">
          <img src={logoImg} />
        </div>
        <div className="register_body">
          <form>
            <div className="logon_marginTop">
              <InputItem
                {...getFieldProps("phone", {
                  rules: [{ validator: this.validatePhone }],
                  getValueProps: value => {
                    phone = value;
                  }
                })}
                type="number"
                placeholder="输入手机号码"
                error={!!getFieldError("phone")}
                onErrorClick={() => {
                  Modal.alert(getFieldError("phone"));
                }}
                onFocus={() => {
                  this.setState({ showLogin: false });
                }}
                onBlur={() => {
                  this.setState({ showLogin: true });
                }}
              >
                <img src={logoPhone} alt="" />
              </InputItem>
            </div>
            <div className="logon_marginTop logon_marginBorder">
              <div className="logon_mesg">
                <InputItem
                  {...getFieldProps("yzm", {
                    rules: [{ validator: this.validateYZM }],
                    hidden: this.state.hidden
                  })}
                  placeholder="输入验证码"
                  error={!!getFieldError("yzm")}
                  onErrorClick={() => {
                    Modal.alert(getFieldError("yzm"));
                  }}
                  onFocus={() => {
                    this.setState({ showLogin: false });
                  }}
                  onBlur={() => {
                    this.setState({ showLogin: true });
                  }}
                >
                  <img src={getMessage} alt="" />
                </InputItem>
              </div>
              <div className="logon_mesBtn">
                {this.state.time > 0 ? (
                  <Button className="register_btn">
                    {this.state.time + "s"}
                  </Button>
                ) : (
                  <Button
                    className="register_btn"
                    onClick={() => {
                      this.clickMsg(phone);
                    }}
                  >
                    获取验证码
                  </Button>
                )}
              </div>
            </div>
            <div className="logon_marginTop">
              <InputItem
                {...getFieldProps("pwd", {
                  rules: [{ validator: this.validatePWD }],
                  getValueProps: value => {
                    pwdValue = value;
                  },
                  hidden: this.state.hidden
                })}
                type="password"
                placeholder="输入密码"
                error={!!getFieldError("pwd")}
                onErrorClick={() => {
                  Modal.alert(getFieldError("pwd"));
                }}
                onFocus={() => {
                  this.setState({ showLogin: false });
                }}
                onBlur={() => {
                  this.setState({ showLogin: true });
                }}
              >
                <img src={getPassword} alt="" />
              </InputItem>
            </div>
            <div className="logon_marginTop">
              <InputItem
                {...getFieldProps("pwdAgain", {
                  rules: [
                    {
                      validator: (rule, value, callback) => {
                        this.validatePWDAgain(rule, value, callback, pwdValue);
                      }
                    }
                  ],
                  hidden: this.state.hidden
                })}
                type="password"
                placeholder="再次输入密码"
                error={!!getFieldError("pwdAgain")}
                onErrorClick={() => {
                  Modal.alert(getFieldError("pwdAgain"));
                }}
                onFocus={() => {
                  this.setState({ showLogin: false });
                }}
                onBlur={() => {
                  this.setState({ showLogin: true });
                }}
              >
                <img src={getPassword} alt="" />
              </InputItem>
            </div>
            <div className="logon_padding">
              <Button
                className="register_btn register_btn_big"
                onClick={this.onSubmit.bind(this)}
              >
                立即注册
              </Button>
            </div>
            <div className="logon_padding_text logon_center">
              {this.state.showLogin ? (
                <span onClick={this.jumpLogin.bind(this)}>
                  <a>已有账号，立即登陆</a>
                </span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default createForm()(register);
