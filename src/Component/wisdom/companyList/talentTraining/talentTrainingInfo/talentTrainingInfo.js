//个人中心-物业工作台---物品放行--只有物业人员有权限进入
import React, { Component } from "react";
import { hashHistory } from "react-router";
import { WhiteSpace, Button, Carousel, NavBar } from "antd-mobile";
import "./talentTrainingInfo.less";
import Navigation from "@/util/navigation.jsx";
import share from "@/util/share.js";
import campusInforImg from "%/campusInforImg.png";
import companyPeople from "%/companyPeople.png";

import interfaces from "@/api/index";

class TalentTrainingInfo extends Component {
  constructor(props) {
    super(props);
    const id =
      this.props.location.state && this.props.location.state.id
        ? this.props.location.state.id
        : this.props.location.query.id;
    this.state = {
      id,
      ApplyUserList: [],
      Detail: {},
      ImageList: [],
      ParkActivitiesStatus: "",
      imgHeight: "150px"
    };
  }

  componentDidMount() {
    interfaces.GetParkActivitiesDetails({ ID: this.state.id }).then(res => {
      console.log(res);
      this.setState({
        ApplyUserList: [...this.state.ApplyUserList, ...res.ApplyUserList],
        Detail: res.Detail,
        ImageList: [...this.state.ImageList, ...res.ImageList],
        ParkActivitiesStatus: res.ParkActivitiesStatus
      });
    });
  }

  // 报名
  ClickSure(id) {
    const data = {
      id: id
    };
    interfaces
      .IsHasApply({
        UserID: localStorage.getItem("userId"),
        ParkActivitieID: id
      })
      .then(res => {
        hashHistory.push({ pathname: "/campusName", state: { data: data } });
      });
  }

  // 转发
  ClickForward() {
    //跳转公共页面的相关参数---失败
    const info = {
      link: "baseUrl://talentTrainingInfo?id=" + this.state.id, //链接跳转路径
      title: this.state.Detail.Title, //活动标题名称
      name: "", //标题名称
      img: this.state.ImageList[0].FullThumbUrl, //自定义图片
      conetnt: this.state.Detail.Content //内容
    };
    //
    share.shareAction({
      //  type: 1,  朋友圈 默认为 微信
      info,
      func: res => {
        const data = {
          title: "转发",
          btn: "确认", //按钮的字
          img: 1, //1为成功，0为失败
          url: "/", //按钮跳转的链接\
          text: res
        };
        hashHistory.push({ pathname: "/registerOk", state: { data: data } });
      }
    });
  }

  // 反馈
  ClickFeedback() {
    hashHistory.push({
      pathname: "/campusReturn",
      state: { id: this.state.id, url: "/talentTrainingInfo" }
    });
  }

  render() {
    const {
      ApplyUserList,
      Detail,
      ImageList,
      ParkActivitiesStatus
    } = this.state;
    return (
      <div className="talent_training_info">
        <Navigation title="活动详情" />
        <Carousel autoplay infinite>
          {ImageList.map((val, index) => (
            <a
              key={index}
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
        <div className="active_details">
          <div className="details_title">
            <span className="fontBold">活动详情</span>
            <span
              className={
                ParkActivitiesStatus == "已结束" ? "font_color1" : "font_color2"
              }
            >
              {ParkActivitiesStatus}
            </span>
          </div>
          <div className="details_content">
            <p>
              报名时间:
              {Detail.RegistStartTimestr
                ? Detail.RegistStartTimestr.split(" ")[0]
                : ""}
              ——
              {Detail.RegistEndTimestr
                ? Detail.RegistEndTimestr.split(" ")[0]
                : ""}
            </p>
            <p>
              活动时间:
              {Detail.StartTimestr ? Detail.StartTimestr.split(" ")[0] : ""}——
              {Detail.EndTimestr ? Detail.EndTimestr.split(" ")[0] : ""}
            </p>
            <p>活动地点:{Detail.ActivitiesPlace}</p>
            <p>活动人数:{Detail.ActivitiesPeoples} 人</p>
            <p>活动费用:{Detail.ActivityCosts} 元</p>
            <p>主办方:{Detail.Organizer}</p>
            <p>协办方:{Detail.Co_organizer}</p>
          </div>
        </div>
        <WhiteSpace />
        <div className="active_info">
          <div className="info_title fontBold">活动信息</div>
          <div className="info_content">{Detail.Content}</div>
        </div>
        <WhiteSpace />
        <div className="user_info">
          <div className="user_title fontBold">报名用户</div>
          <div className="user_content">
            {ApplyUserList.map((item, index) => {
              return (
                <div className="user_box" key={index}>
                  <img
                    src={
                      item.PhotoPath ? item.PhotoPath : require("%/noImg.jpg")
                    }
                    alt=""
                  />
                  <div>{item.Name}</div>
                </div>
              );
            })}
          </div>
        </div>
        {ParkActivitiesStatus == "已结束" ? (
          <div className="btn_box">
            <Button
              className="feedback"
              onClick={this.ClickFeedback.bind(this)}
            >
              反馈
            </Button>
          </div>
        ) : ParkActivitiesStatus == "报名未开始" ? (
          <div className="btn_box">
            <Button
              className="getPassing_btn"
              style={{ background: "#B5B6B6" }}
            >
              报名
            </Button>
            <Button
              className="getPassing_btn forward"
              onClick={this.ClickForward.bind(this)}
            >
              转发
            </Button>
          </div>
        ) : (
          <div className="btn_box">
            <Button
              className="getPassing_btn"
              onClick={this.ClickSure.bind(this, this.state.id)}
            >
              报名
            </Button>
            <Button
              className="getPassing_btn forward"
              onClick={this.ClickForward.bind(this)}
            >
              转发
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default TalentTrainingInfo;
