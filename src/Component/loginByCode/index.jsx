import React, { Component, PropTypes } from "react";
import "./loginByCode.less";
import { Button, InputItem, List,Modal } from "antd-mobile";
import { createForm } from "rc-form";
const Item = List.Item;
import { hashHistory, Link } from "react-router";
import { connect } from "dva";
import interfaces from "@/api/index";
import logoImg from "%/appIndexLogo.png";
import logoPhone from "%/appPhone.png";
import logoPassWord from "%/getMessage.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: false,
      time: 0, //60s验证码
      setTimer: null,
      showRegister: true
    };
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (error, values) => {
      if (!error) {
        const params = {
          Mobile: values.phone,
          ValidateCode: values.code,
          func: (id, user) => {
            hashHistory.push(`/`);
          }
        };
        this.props.LoginByCode(params);
      }
    });
  };
  sendCode = phone => {
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
  };
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
        Type: 5
      })
      .then(res => {});
  }
  validatePhone = (rule, value, callback) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入手机号！"));
    }
  };
  validatePassword = (rule, value, callback) => {
    if (value && value.length > 0) {
      callback();
    } else {
      callback(new Error("请输入验证码！"));
    }
  };
  //点击跳转注册页面
  jumpLigon = e => {
    hashHistory.push(`/register`);
  };
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    let phone = null;
    return (
      <div className="loginBox">
        <div className="logo">
          <img src={logoImg} />
          {/* 创谷 · 智慧园APP <div className="bgImg"></div> */}
        </div>
        <form style={{ marginTop: 30 }}>
          <div className="content">
            <InputItem
              {...getFieldProps("phone", {
                // initialValue: 'little ant',
                rules: [{ validator: this.validatePhone }],
                getValueProps: value => {
                  phone = value;
                }
              })}
              clear
              type="number"
              error={!!getFieldError("phone")}
              onErrorClick={() => {
                Modal.alert(getFieldError("phone"));
              }}
              onFocus={() => {
                this.setState({ showRegister: false });
              }}
              onBlur={() => {
                this.setState({ showRegister: true });
              }}
              placeholder="请输入手机号"
            >
              <img src={logoPhone} alt="" />
            </InputItem>
            <InputItem
              {...getFieldProps("code", {
                rules: [{ validator: this.validatePassword }],
                hidden: this.state.hidden
              })}
              clear
              error={!!getFieldError("code")}
              onErrorClick={() => {
                Modal.alert(getFieldError("code"));
              }}
              onFocus={() => {
                this.setState({ showRegister: false });
              }}
              onBlur={() => {
                this.setState({ showRegister: true });
              }}
              placeholder="请输入验证码"
              extra={
                this.state.time > 0 ? (
                  <Button className="buttonCode">
                    {this.state.time + "s"}
                  </Button>
                ) : (
                  <Button
                    className="buttonCode"
                    onClick={() => {
                      this.sendCode(phone);
                    }}
                  >
                    获取验证码
                  </Button>
                )
              }
            >
              <img src={logoPassWord} alt="" />
            </InputItem>
          </div>
          <Button className="SignIn" onClick={this.onSubmit}>
            立即登录
          </Button>
          <div className="linkBox">
            <Link className="link" to="/login">
              密码登录
            </Link>
          </div>
        </form>

        <div className="login_bottom">
          {this.state.showRegister ? (
            <span onClick={this.jumpLigon}>
              <a>没有帐号,立即注册</a>
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {};
}
function dispatchToProps(dispatch) {
  return {
    LoginByCode(payload, params) {
      dispatch({
        type: "login/LoginByCode",
        payload
      });
    }
  };
}
export default connect(mapStateToProps, dispatchToProps)(createForm()(App));
