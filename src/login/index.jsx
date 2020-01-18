import React, { Component } from "react";
import "./login.less";
import { Button, InputItem, List,Toast } from "antd-mobile";
import { createForm } from "rc-form";
const Item = List.Item;
import { hashHistory, Link } from "react-router";
import { connect } from "dva";
import logoImg from "%/appIndexLogo.png";
import logoPhone from "%/appPhone.png";
import logoPassWord from "%/apppassWord.png";
import { Icon } from 'antd-mobile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: 1,
      userMsg: {},
      chooseTable: false,
      showRegister: true
    };
  }
  componentDidMount() {
    if (localStorage.getItem("login")) {
      this.setState({
        chooseTable: true
      });
    }
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields({ force: true }, (error, values) => {
      if (!error) {
        if (this.state.chooseTable) {
          localStorage.setItem(
            "login",
            JSON.stringify({ phone: values.phone, password: values.password })
          );
        } else {
          localStorage.removeItem("login");
        }
        const params = {
          Mobile: values.phone,
          LoginPwd: values.password,
          func: id => {
            this.props.getMenuList({
              uID: id
            })
            if (!localStorage.getItem('router_location')) {
              hashHistory.goBack()
            }else {
              let route = eval(`[${localStorage.getItem('router_location')}]`);
              let localtion = 0;
              for (let i=0; i<route.length; i++) {
                if (route[i].pathname === '/register') {
                  localtion = i;
                  break;
                }
              }
              localStorage.removeItem("router_location");
              if (route.length > 3) {
                hashHistory.push({
                  ...route[localtion - 2]
                })
              }else {
                hashHistory.push('/')
              }
            }
          }
        };
        this.props.Login(params);
      }
    });
  };
  onReset = () => {
    this.props.form.resetFields();
  };
  validatePhone = (rule, value, callback) => {
    const reg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输手机号！"));
    }
  };
  validatePassword = (rule, value, callback) => {
    if (value && value.length && value.length > 5) {
      callback();
    } else {
      callback(new Error("请输入密码！"));
    }
  };
  //点击跳转注册页面
  jumpLigon = e => {
    hashHistory.push(`/register`);
  };
  //点击‘记住密码’复选框
  chooseAll(e) {
    this.setState({
      chooseTable: !this.state.chooseTable
    });
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    let phone = localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login")).phone
      : "";
    let password = localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login")).password
      : "";
    return (
      <div className="loginBox">
        <div style={{padding: '0.56rem'}} onClick={() => {
           hashHistory.goBack()
        }}>
          <Icon style={{color: '#1F1F1F'}} type="left" />
        </div>
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
                initialValue: phone
              })}
              clear
              error={!!getFieldError("phone")}
              onErrorClick={() => {
                Toast.info(getFieldError("phone"));
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
              {...getFieldProps("password", {
                rules: [{ validator: this.validatePassword }],
                initialValue: password
              })}
              clear
              error={!!getFieldError("password")}
              onErrorClick={() => {
                Toast.info(getFieldError("password"));
              }}
              onFocus={() => {
                this.setState({ showRegister: false });
              }}
              onBlur={() => {
                this.setState({ showRegister: true });
              }}
              placeholder="请输入密码"
              type="password"
            >
              <img src={logoPassWord} alt="" />
            </InputItem>
            <div style={{ marginLeft: "20px" }}>
              <input
                id="checkbox"
                type="checkbox"
                checked={this.state.chooseTable}
                onClick={this.chooseAll.bind(this)}
                style={{ marginRight: "10px" }}
              />
              <label htmlFor="checkbox" style={{ color: "#8E9091" }}>
                记住密码
              </label>
            </div>
          </div>
          <Button className="SignIn" onClick={this.onSubmit}>
            立即登录
          </Button>
          <div className="linkBox">
            <Link className="link" to="/loginByCode">
              验证码登录
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
  return {
    userMsg: state.login.userMsg
  };
}
function dispatchToProps(dispatch) {
  return {
    Login(payload, params) {
      dispatch({
        type: "login/Login",
        payload
      });
    },
    getMenuList(payload, params) {
      dispatch({
        type: "login/getMenuList",
        payload
      });
    }
  };
}
export default connect(mapStateToProps, dispatchToProps)(createForm()(App));
