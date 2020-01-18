import React, { Component, PropTypes } from "react";
import { hashHistory } from "react-router";
import "./staydetalis.less";
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";
import { Carousel } from "antd-mobile";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      name: "",
      text: "",
      time: "",
      titleName: "详情"
    };
  }
  componentWillMount() {
    this.getData();
  }
  getData() {
    interfaces
      .GetMessageNeedInfo({
        MasterId: this.props.location.state.id,
        Type: this.props.location.state.type
      })
      .then(res => {
        if (res && res.length > 0) {
          let imgList = [];
          for (let i = 0; i < res[0].Imglist.length; i++) {
            imgList.push(res[0].Imglist[i].FullUrl);
          }
          this.setState({
            id: res[0].ModelInfo.ID,
            titleName: res[0].ModelInfo.States === 1 ? "待办详情" : "已办详情",
            imgList: imgList,
            name: res[0].ModelInfo.UName,
            phone: res[0].ModelInfo.UTel,
            text: res[0].ModelInfo.ApplyContent,
            time: res[0].ModelInfo.ApplyTime,
            examineTime: res[0].ModelInfo.EnterpriseTime,
            states: res[0].ModelInfo.States,
            statesName: this.getstatesName(res[0].ModelInfo.States)
          });
        }
      });
  }
  getstatesName(status) {
    switch (status) {
      case 1:
        return "企业审核中";
        break;
      case 2:
        return "物业审核中";
        break;
      case 3:
        return "待放行";
        break;
      case 4:
        return "已放行";
        break;
      case 5:
        return "已过期";
        break;
      case 6:
        return "已拒绝";
        break;
      default:
        return "";
        break;
    }
  }
  exMessageApply() {
    interfaces
      .ExMessageApply({
        ID: this.state.id,
        Type: this.props.location.state.type,
        States: 1
      })
      .then(res => {
        this.goSuccess();
      });
  }
  goSuccess() {
    //跳转公共页面的相关参数
    const data = {
      title: "审核",
      btn: "确定", //按钮的字
      img: 1, //1为成功，0为失败
      url: "back", //按钮跳转的链接
      text: "审核成功"
    };
    hashHistory.push({ pathname: "/registerOk", state: { data: data } });
  }
  goFail(id, type) {
    hashHistory.push({
      pathname: "/myMessage/fail",
      state: { id: id, type: type }
    });
  }
  render() {
    const {
      id,
      titleName,
      imgList,
      name,
      text,
      time,
      examineTime,
      states,
      statesName
    } = this.state;
    const { type } = this.props.location.state;
    const imgHeight = "6.4rem";
    return (
      <div className="stay_deteils">
        <Navigation title={titleName} />
        <div className="stay_box">
          <div className="title_img">
            {imgList.length > 0 ? (
              <Carousel dots={false}>
                {imgList.map(val => (
                  <div
                    key={val}
                    style={{
                      display: "inline-block",
                      width: "100%",
                      height: imgHeight
                    }}
                  >
                    <img src={val} />
                  </div>
                ))}
              </Carousel>
            ) : null}
          </div>
          <div className="info">
            <div className="name">
              <div>姓名：{name}</div>
              <div
                className="agree"
                style={{ color: states === 1 ? "" : "#999" }}
              >
                {statesName}
              </div>
            </div>
            <div className="phone">联系电话：17685955</div>
          </div>
          <div className="title_text">迁出内容</div>
          <p>{text}</p>
          <div className="outtime">
            <div className="outtime_text">迁出时间</div>
            <div className="outtime_time">{time}</div>
          </div>
          {type == 1 && states == 2 ? (
            <div className="outtime" style={{ marginTop: "1px" }}>
              <div className="outtime_text">审核时间</div>
              <div className="outtime_time">{examineTime}</div>
            </div>
          ) : null}
          {type == 1 && states == 1 ? (
            <div className="button">
              <div
                className="agree_button"
                onClick={() => {
                  this.exMessageApply();
                }}
              >
                同意
              </div>
              <div
                className="refuse_button"
                onClick={() => {
                  this.goFail(id, this.props.location.state.type);
                }}
              >
                拒绝
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
export default Details;
