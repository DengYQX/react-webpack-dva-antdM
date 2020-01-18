//园区活动详情  ---正在进行中/将要进行的  按钮（报名/转发）   已经结束的（反馈）
import React, { Component } from "react";
import { Modal, Button, Carousel } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";

import "./activeInfo.less";

import interfaces from "@/api/index";

class ActiveInfo extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    console.log(data);
    this.state = {
      data: data,
      phoneList: [],
      image: [],
      detail: {},
      imgHeight: 150,
      isAuth: false,
      btn_type:0,/**按钮是否能点击 0蓝色  可以 1 灰色 不可以 */
    };
  }

  //开场调用的时候
  componentDidMount() {
    this.getInformation();
    if (localStorage.getItem("userId")) {
      interfaces.IsHasApply({
        UserID: localStorage.getItem("userId"),
        ParkActivitieID: this.state.data.ID
      }).then(status => {
        //先判断是否报名
        this.setState({
          btn_type: status ? 0 : 1,
          isAuth: true
        })
      })
    }
  }
  getInformation() {
    interfaces
      .GetParkActivitiesDetails({ ID: this.state.data.ID })
      .then(res => {
        this.setState({
          phoneList: res.ApplyUserList,
          image: res.ImageList,
          detail: res.Detail
        });
      });
  }

  // 报名  AddParkActivitiesApply
  signUp() {

    const parses =  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
      if (this.state.isAuth) {
        const data={
          begin:'povertyAlleviation',   //跳转到报名的欠一个页面
          id:  this.state.data.ID
      }
      hashHistory.push( { pathname:'/campusName', state:{data} } )
    }else {
      Modal.alert(" ", "您还没有登陆是否去登陆?", [
        { text: "取消", onPress: () => {} },
        {
          text: "确定",
          onPress: () => {
            hashHistory.push("/login");
          }
        }
      ]);
    }
    
  }

  render() {
    const {btn_type} = this.state;
    return (
      <div className="activeInfo">
        <Navigation title="活动详情" />
        <div className="activeInfo_body">
          {this.state.image.length > 0 ? (
            <div className="activeInfo_body_img">
              <Carousel
                autoplay
                beforeChange={(from, to) =>
                  console.log(`slide from ${from} to ${to}`)
                }
                afterChange={index => console.log("slide to", index)}
              >
                {this.state.image.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      display: "inline-block",
                      width: "100%",
                      height: this.state.imgHeight
                    }}
                  >
                    <img
                      src={item.FullThumbUrl}
                      alt=""
                      style={{
                        width: "100%",
                        verticalAlign: "top",
                        height: "150px"
                      }}
                      onLoad={() => {
                        window.dispatchEvent(new Event("resize"));
                        this.setState({ imgHeight: "auto" });
                      }}
                    />
                  </span>
                ))}
              </Carousel>
            </div>
          ) : (
            ""
          )}
          <div className="activeInfo_body_title">
            <p>
              {this.state.detail.Title}
              <span>可在线预约</span>
            </p>
          </div>
          {/* <div className='activeInfo_body_text'>
            <p>扶贫的六个精准是：扶贫对象精准、项目安排精准、资金使用精准、</p>
          </div> */}
          <div className="activeInfo_body_title activeInfo_body_border">
            <p>活动详情</p>
          </div>
          <div className="activeInfo_body_text">
            <p>
              报名时间：{this.state.detail.RegistStartTimestr ? this.state.detail.RegistStartTimestr.split(' ')[0] : ''}——
              {this.state.detail.RegistEndTimestr ? this.state.detail.RegistEndTimestr.split(' ')[0] : ''}
            </p>
            <p>
              活动时间：{this.state.detail.StartTime ? this.state.detail.StartTime.split(' ')[0] : ''}——
              {this.state.detail.EndTime ? this.state.detail.EndTime.split(' ')[0] : ''}
            </p>
            <p>活动地点：{this.state.detail.ActivitiesPlace}</p>
            <p>活动人数：{this.state.detail.ActivitiesPeoples}人</p>
            <p>活动费用：{this.state.detail.ActivityCosts}元</p>
            <p>主办方：{this.state.detail.Organizer}</p>
            <p>协办方：{this.state.detail.Co_organizer}</p>
          </div>
          <div className="activeInfo_body_title">
            <p>活动信息</p>
          </div>
          <div className="activeInfo_body_text">
            <p>{this.state.detail.Content}</p>
          </div>
          <div className="activeInfo_body_title">
            <p>报名用户</p>
          </div>
          <div className="activeInfo_body_text">
            {this.state.phoneList.map((item, index) => {
              return (
                <div className="activeInfo_body_box" key={index}>
                  <img
                    src={
                      item.PhotoPath ? item.PhotoPath : require("%/noImg.jpg")
                    }
                  />
                  <p
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {item.cName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        {/* // {this.state.detail.Tel}  "tel:13764567708*/}
        <div className="activeInfo_foot">
          {
            btn_type === 0?
            (<Button
              className="activeInfo_btn_helf"
              onClick={this.signUp.bind(this)}
            >
              报名
            </Button>):(
              <Button
                className="activeInfo_btn_helf"
                style={{ background:'#B5B6B6' }}
              >
                报名
              </Button>
            )
          }
          <a
            className="activeInfo_btn_helf btn_color"
            href={"tel:" + this.state.detail.Tel}
          >
            一键拨号
          </a>
        </div>
      </div>
    );
  }
}

export default ActiveInfo;
