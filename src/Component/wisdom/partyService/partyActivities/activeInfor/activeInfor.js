//园区活动详情  ---正在进行中/将要进行的  按钮（报名/转发）   已经结束的（反馈）
import React, { Component } from "react";
import { NavBar, Carousel, Button, WhiteSpace, Modal } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import share from "@/util/share.js";
import "./activeInfor.less";
import { connect } from "dva";
import { unLogin } from "@/util/common.js";
import PropTypes from "prop-types";

import interfaces from "@/api/index";

class ActiveInfor extends Component {
  constructor(props) {
    super(props);
    const id =
      this.props.location.state && this.props.location.state.id
        ? this.props.location.state.id
        : this.props.location.query.id;
    this.state = {
      id,
      activeInfo: {},
      imgList: [],
      IsFeedback: false
    };
  }

  componentDidMount() {
    interfaces
      .GetPartyActivitiesInfo({
        UserID: localStorage.getItem("userId") || 0,
        PartyActivitiesID: this.state.id
      })
      .then(res => {
        if (res) {
          this.setState({
            activeInfo: res[0].ModelInfo,
            imgList: [...this.state.imgList, ...res[0].Imglist],
            IsFeedback: res[0].IsFeedback
          });
        }
      });
  }

  //点击反馈的时候
  jumpReturn(item) {
    hashHistory.push({
      pathname: "/campusReturn",
      state: { id: item.ID, url: "/activeInfor" }
    });
  }

  // 转发
  showOther(item) {
    const info = {
      link: "baseUrl://activeInfor?id=" + this.state.id, //链接跳转路径
      title: item.Title, //活动标题名称
      name: "", //标题名称
      img: item.Pic, //自定义图片
      conetnt: item.Content //内容
    };

    share.shareAction({
      //  type: 1,  朋友圈 默认为 微信
      info,
      func: res => {
        const data = {
          title: "转发",
          btn: "返回", //按钮的字
          img: 1, //1为成功，0为失败
          url: "/", //点击按钮跳转的链接
          text: res
        };
        hashHistory.push({ pathname: "/registerOk", state: { data: data } });
      }
    });
  }

  // 报名
  jumpName() {
    const { token = "" } = this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (loginType) {
      hashHistory.push({
        pathname: "/activeCampusName",
        state: { data: this.state.id }
      });
    } else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }
  }

  render() {
    const { activeInfo, imgList, IsFeedback } = this.state;
    return (
      <div className="active_infor">
        <Navigation title="活动详情" />
        <div className="campusInfor_body">
          <Carousel
            autoplay
            infinite
            beforeChange={(from, to) =>
              console.log(`slide from ${from} to ${to}`)
            }
            afterChange={index => console.log("slide to", index)}
          >
            {imgList.map(val => (
              <a
                key={val}
                style={{
                  display: "inline-block",
                  width: "100%",
                  height: this.state.imgHeight
                }}
              >
                <img
                  src={val.FullUrl}
                  alt=""
                  style={{ width: "100%", verticalAlign: "top", height: "150" }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event("resize"));
                    this.setState({ imgHeight: "auto" });
                  }}
                />
              </a>
            ))}
          </Carousel>
          <div className="campusInfor_body_title">
            <div className="title">{activeInfo.Title} </div>
            <span>
              {activeInfo.Status == 1
                ? "报名未开始"
                : activeInfo.Status == 2
                ? "可在线报名"
                : activeInfo.Status == 3
                ? "报名已结束"
                : "活动已结束"}
            </span>
          </div>
          <WhiteSpace />
          <div className="campusInfor_body_title">
            <p>活动详情</p>
          </div>
          <div className="campusInfor_body_text">
            <p>
              报名时间：{activeInfo.EnrollStartTimeStr}-
              {activeInfo.EnrollEndTimeStr}
            </p>
            <p>
              活动时间：{activeInfo.StartTimeStr}-{activeInfo.EndTimeStr}
            </p>
            <p>活动地点：{activeInfo.Address}</p>
            <p>参与对象：{activeInfo.Participants}</p>
          </div>
          <WhiteSpace />
          <div className="campusInfor_body_title">
            <p>活动信息</p>
          </div>
          <div className="campusInfor_body_text">
            <p>{activeInfo.Content}</p>
          </div>
        </div>
        {/* 为已结束的时候是反馈，否则是报名/分享 */}
        <div className="campusInfor_foot">
          {activeInfo.Status == 4 && IsFeedback ? (
            <Button
              className="campusInfor_btn"
              onClick={this.jumpReturn.bind(this, activeInfo)}
            >
              反馈
            </Button>
          ) : activeInfo.Status == 2 ? (
            <div>
              <Button
                className="campusInfor_btn_helf"
                onClick={this.jumpName.bind(this)}
              >
                报名
              </Button>
              <Button
                className="campusInfor_btn_fa"
                onClick={this.showOther.bind(this, activeInfo)}
              >
                转发
              </Button>
            </div>
          ) : activeInfo.Status == 1 || activeInfo.Status == 3 ? (
            <Button
              className="campusInfor_btn"
              onClick={this.showOther.bind(this, activeInfo)}
            >
              转发
            </Button>
          ) : null}
        </div>
      </div>
    );
  }
}

ActiveInfor.defaultProps = {
  token: ""
};
ActiveInfor.propTypes = {
  token: PropTypes.any
};

export default connect(({ login }) => ({ token: login.token }))(ActiveInfor);
