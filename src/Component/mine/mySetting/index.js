import React, { Component } from "react";
import { Icon, Toast } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import UploadImg from "@/util/uploadImg";
import interfaces from "@/api/index";
import "./mySetting.less";
import { connect } from "dva";

class Mysetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem("user"))
    };
  }
  componentDidMount() {
    if (!this.state.user) {
      Toast.info("请先登录");
      hashHistory.goBack();
    }
  }
  jumpName() {
    hashHistory.push({ pathname: "/settingName" });
  }
  jumpPhone() {
    hashHistory.push({ pathname: "/settingPhone" });
  }
  jumpNamePassWord() {
    hashHistory.push({ pathname: "/SetPwd" });
  }
  uploadSure(res, id) {
    interfaces
      .SetUserPhoto({
        UserPhotoPath: res.smallPhotoURL,
        ID: id
      })
      .then(() => {
        Toast.info("修改成功");
        let img = res.TokenUrL + res.smallPhotoURL;
        let user = JSON.parse(localStorage.getItem("user"));
        user.img = img;
        localStorage.setItem("user", JSON.stringify(user));
        this.setState({
          user
        });
      });
  }
  clearStorage() {
    //有锤子缓存，来一波骚操作
    this.props.clearData(() => {
      Toast.info("清除完成");
    })
  }
  signOut() {
    localStorage.clear();
    this.props.signOutClear()
    hashHistory.replace("/login");
  }
  render() {
    let { user } = this.state;
    return user ? (
      <div className="mySetting">
        <Navigation title="我的设置" />
        <div>
          <UploadImg
            success={res => {
              this.uploadSure(res, user.id);
            }}
          >
            <div className="mySetting_img">
              头像
              <Icon type="right" color="#8B8B8B" />
              <img
                src={
                  user.img && user.img !== ""
                    ? user.img
                    : require("%/mine_img.png")
                }
              />
            </div>
          </UploadImg>
          <div className="mySetting_list" onClick={this.jumpName.bind(this)}>
            名字
            <Icon type="right" color="#8B8B8B" />
            <span>{user.name}</span>
          </div>
          <div className="mySetting_list" onClick={this.jumpPhone.bind(this)}>
            手机号
            <Icon type="right" color="#8B8B8B" />
            <span>{user.phone}</span>
          </div>
          <div
            className="mySetting_list mySetting_top"
            onClick={this.jumpNamePassWord.bind(this)}
          >
            修改密码
            <Icon type="right" color="#8B8B8B" />
          </div>
          <div
            className="mySetting_list"
            onClick={() => {
              this.clearStorage();
            }}
          >
            清理缓存
            <Icon type="right" color="#8B8B8B" />
          </div>
        </div>
        <div
          className="signOut"
          onClick={() => {
            this.signOut();
          }}
        >
          退出登录
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    
  };
}
function dispatchToProps(dispatch) {
  return {
    signOutClear(payload, params) {
      dispatch({
        type: "login/signOut",
        payload
      });
    },
    clearData(payload, params) {
      dispatch({
        type: "home/clearData",
        payload
      });
    }
  };
}

export default connect(mapStateToProps, dispatchToProps)(Mysetting);
