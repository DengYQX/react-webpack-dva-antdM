//园区活动详情  ---正在进行中/将要进行的  按钮（报名/转发）   已经结束的（反馈）
import React, { Component, Fragment } from "react";
import { NavBar, Icon, Button, Carousel } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import share from "@/util/share.js";
import "./campusInfor.less";
import interfaces from "@/api/index";

class CampusInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusName: "",
      title: "",
      registTime: "",
      activityTime: "",
      activityPlace: "",
      activityPeople: "",
      activityPrice: "",
      activityInfo: "",
      organizer: "",
      co_organizer: "",
      imgList: [],
      imgHeight: "6.52rem",
      phoneList: [],
      btn_type: 0 /**按钮是否能点击 0蓝色  可以 1 灰色 不可以 */
    };
  }
  //开场调用的时候
  componentWillMount() {
    this.getData();
  }
  //开场调用的时候
  componentDidMount() {
    console.log(this.props.location);
    if (localStorage.getItem("userId")) {
      interfaces
        .IsHasApply({
          UserID: localStorage.getItem("userId"),
          ParkActivitieID:
            this.props.location.state && this.props.location.state.id
              ? this.props.location.state.id
              : this.props.location.query.id
        })
        .then(status => {
          //先判断是否报名
          this.setState({
            btn_type: status ? 0 : 1,
            isAuth: true
          });
        });
    }
  }
  getData() {
    interfaces
      .GetParkActivitiesDetails({
        ID:
          this.props.location.state && this.props.location.state.id
            ? this.props.location.state.id
            : this.props.location.query.id
      })
      .then(res => {
        let imgList = [];
        let phoneList = [];
        for (let i = 0; i < res.ImageList.length; i++) {
          imgList.push(res.ImageList[i].FullUrl);
        }
        for (let i = 0; i < res.ApplyUserList.length; i++) {
          phoneList.push({
            name: res.ApplyUserList[i].Name,
            img: res.ApplyUserList[i].PhotoPath
          });
        }
        this.setState({
          statusName: res.ParkActivitiesStatus,
          title: res.Detail.Title,
          registTime:
            res.Detail.RegistStartTime + "至" + res.Detail.RegistEndTime,
          activityTime: res.Detail.StartTime + "至" + res.Detail.EndTime,
          activityPlace: res.Detail.ActivitiesPlace,
          activityPeople: res.Detail.ActivitiesPeoples,
          activityPrice: res.Detail.ActivityCosts,
          activityInfo: res.Detail.Content,
          organizer: res.Detail.Organizer,
          co_organizer: res.Detail.Co_organizer,
          imgList: imgList,
          phoneList: phoneList
        });
      });
  }
  //点击反馈的时候
  jumpReturn() {
    hashHistory.push({
      pathname: "/campusReturn",
      state: {
        id:
          this.props.location.state && this.props.location.state.id
            ? this.props.location.state.id
            : this.props.location.query.id,
        url: "/campusInfor"
      }
    });
  }
  //点击分享的时候
  showOther() {
    //跳转公共页面的相关参数---失败
    let id =
      this.props.location.state && this.props.location.state.id
        ? this.props.location.state.id
        : this.props.location.query.id;
    const info = {
      link: "baseUrl://campusInfor?id=" + id, //链接跳转路径
      title: this.state.title, //活动标题名称
      name: "", //标题名称
      img: this.state.imgList[0], //自定义图片
      conetnt: this.state.activityInfo //内容
    };
    //data为ok的时候，注册成功
    // console.log(data)
    // hashHistory.push( { pathname:'/registerOk', state:{data:data} } )

    //
    share.shareAction({
      //  type: 1,  朋友圈 默认为 微信
      info,
      func: res => {
        const data = {
          title: "分享",
          btn: "返回", //按钮的字
          img: 1, //1为成功，0为失败
          url: "back", //点击按钮跳转的链接
          text: res
        };
        hashHistory.push({ pathname: "/registerOk", state: { data } });
      }
    });
  }
  getStatusName(status) {
    let name = null;
    switch (status) {
      case 1:
        name = "即将开始";
        break;
      case 2:
        name = "进行中";
        break;
      case 3:
        name = "已结束";
        break;
      default:
        break;
    }
    return name;
  }
  //点击报名--判断是否已经报名
  jumpName() {
    interfaces
      .IsHasApply({
        UserID: localStorage.getItem("userId"),
        ParkActivitieID:
          this.props.location.state && this.props.location.state.id
            ? this.props.location.state.id
            : this.props.location.query.id
      })
      .then(res => {
        const data = {
          begin: "compusInfor", //跳转到报名的欠一个页面
          id:
            this.props.location.state && this.props.location.state.id
              ? this.props.location.state.id
              : this.props.location.query.id
        };
        hashHistory.push({ pathname: "/campusName", state: { data: data } });
      });
  }
  render() {
    const {
      title,
      statusName,
      registTime,
      activityTime,
      StartTime,
      EndTime,
      activityPlace,
      activityPeople,
      activityPrice,
      organizer,
      co_organizer,
      activityInfo,
      imgList,
      phoneList
    } = this.state;
    console.log(this.state);
    return (
      <div className="campusInfor">
        <Navigation title="活动详情" />
        <div className="campusInfor-box">
          <div className="campusInfor_body">
            <div className="campusInfor_body_img">
              {imgList.length > 0 ? (
                <Carousel dots={false}>
                  {imgList.map(val => (
                    <div
                      key={val}
                      style={{
                        display: "inline-block",
                        width: "100%",
                        height: this.state.imgHeight
                      }}
                    >
                      <img src={val} />
                    </div>
                  ))}
                </Carousel>
              ) : null}
            </div>
            <div
              className="campusInfor_body_title"
              style={{ "border-bottom": "0.347rem solid #F6F8FA" }}
            >
              <p>
                {title}
                <span>{statusName}</span>
              </p>
            </div>
            <div className="campusInfor_body_title">
              <p>活动详情</p>
            </div>
            <div className="campusInfor_body_text">
              <p>
                报名时间：
                {registTime ? registTime.replace(/00:00:00/gi, "") : ""}
              </p>
              <p>
                活动时间：
                {activityTime ? activityTime.replace(/00:00:00/gi, "") : ""}
              </p>
              <p>活动地点：{activityPlace}</p>
              <p>
                活动人数：
                {activityPeople && activityPeople > 0
                  ? activityPeople + "人"
                  : "不限"}
              </p>
              <p>
                活动费用：
                {activityPrice && activityPrice > 0
                  ? activityPrice + "元"
                  : "免费"}
              </p>
              <p>主办方：{organizer}</p>
              <p>协办方：{co_organizer}</p>
            </div>
            <div className="campusInfor_body_title">
              <p>活动信息</p>
            </div>
            <div className="campusInfor_body_text">
              <p>{activityInfo}</p>
            </div>
            {phoneList.length > 0 ? (
              <div>
                <div className="campusInfor_body_title">
                  <p>报名用户</p>
                </div>
                <div className="campusInfor_body_text">
                  {phoneList.map((item, index) => {
                    return (
                      <div className="campusInfor_body_box" key={index}>
                        <img
                          src={item.img ? item.img : require("%/noImg.jpg")}
                        />
                        <p>{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          {/* 为已结束的时候是反馈 */}
          <div className="campusInfor_foot">
            {this.state.statusName.indexOf("结束") !== -1 ? (
              <Button
                className="campusInfor_btn"
                onClick={this.jumpReturn.bind(this)}
              >
                反馈
              </Button>
            ) : this.state.statusName.indexOf("报名未开始") !== -1 ? (
              <div className="campusInfor_btn_box">
                <Button
                  className="campusInfor_btn_helf"
                  style={{ background: "#b5b6b6" }}
                >
                  报名
                </Button>
                <Button
                  className="campusInfor_btn_helf"
                  style={{ background: "#b5b6b6" }}
                  onClick={this.showOther.bind(this)}
                >
                  转发
                </Button>
              </div>
            ) : this.state.btn_type === 0 ? (
              <div className="campusInfor_btn_box">
                <Button
                  className="campusInfor_btn_helf"
                  onClick={this.jumpName.bind(this)}
                >
                  报名
                </Button>
                <Button
                  className="campusInfor_btn_helf"
                  style={{ background: "#b5b6b6" }}
                  onClick={this.showOther.bind(this)}
                >
                  转发
                </Button>
              </div>
            ) : (
              <div className="campusInfor_btn_box">
                <Button
                  className="campusInfor_btn_helf"
                  style={{ background: "#b5b6b6" }}
                >
                  报名
                </Button>
                <Button
                  className="campusInfor_btn_helf"
                  style={{ background: "#b5b6b6" }}
                  onClick={this.showOther.bind(this)}
                >
                  转发
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CampusInfor;
