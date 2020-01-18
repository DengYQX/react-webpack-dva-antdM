//园区活动详情  ---正在进行中/将要进行的  按钮（报名/转发）   已经结束的（反馈）
import React, { Component } from "react";
import { Toast, Carousel, Button } from "antd-mobile";
import Navigation from "@/util/navigation.jsx";
import api from "@/api";
import "./style.less";

class CampusInfor extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.ID);
    this.state = {
      platform: navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app",
      imgHeight: 140,
      Imagelist: [],
      data: {
        EnterpriseName: "",
        Introduction: "",
        ServiceIntroduction: ""
      }
    };
  }
  //开场调用的时候
  componentWillMount() {
    // console.log(api.GetEnterpriseListDetails)
    api
      .GetEnterpriseListDetails({
        ID: this.props.location.state.ID
      })
      .then(res => {
        if (res && res.length > 0) {
          this.setState({
            data: res[0].Detail
              ? res[0].Detail
              : {
                  EnterpriseName: "",
                  Introduction: "",
                  ServiceIntroduction: ""
                },
            Imagelist: res[0].Imagelist
          });
        }
      });
  }
  //拨号
  showOther(Telphone) {
    if (this.state.platform === "h5") {
      location.href = "tel://" + Telphone;
    } else {
      plus.device.dial(Telphone, false);
    }
  }
  loadError(e) {
    e.target.src = "http://47.112.21.206:8090/resources/banner.png";
  }
  //导航
  jumpName({ lat, lng }) {
    //调用SDK获取经纬度
    if (this.state.platform === 'h5') {
      let geolocation = new qq.maps.Geolocation();
      geolocation.getLocation((position)=> {
        location.href = `https://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的位置&fromcoord=${position.lat+','+position.lng}&to=${this.state.data.Address}&tocoord=${lat+','+lng}&policy=1&referer=zhihuiyuanqu`
      }, () =>{
        Toast.fail('定位失败')
      })
    } else {
      plus.geolocation.getCurrentPosition(
        function(p) {
          const latitude = p.coords.latitude; //维度
          const longitude = p.coords.longitude; //经度
          // 设置目标位置坐标点和其实位置坐标点
          const dst = new plus.maps.Point(lng, lat); // 目的地
          const src = new plus.maps.Point(longitude, latitude); // 原地址
          // 调用系统地图显示
          plus.maps.openSysMap(dst, this.state.data.Address, src);
        },
        function(e) {
          Toast.info("Geolocation error: " + e.message);
        }
      );
    }
  }
  render() {
    return (
      <div className="detail">
        <Navigation title="企业详情" />
        <div className="campusInfor_body">
          <div className="campusInfor_body_img">
            <Carousel
              autoplay
              infinite
              dots
              autoplayInterval="5000"
              dotStyle={{ marginBottom: 10 }}
              dotActiveStyle={{ marginBottom: 10, backgroundColor: "#FFF" }}
            >
              {this.state.Imagelist.map(val => (
                <div
                  key={val}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: this.state.imgHeight
                  }}
                >
                  <img
                    src={val.FullThumbUrl}
                    alt=""
                    style={{ width: "100%", height: 150, verticalAlign: "top" }}
                    onError={this.loadError}
                    onLoad={() => {
                      this.setState({ imgHeight: "150px" });
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className="campusInfor_body_title">
            {this.state.data.EnterpriseName}
          </div>
          <div className="campusInfor_body_text">
            <p>{this.state.data.Introduction}</p>
          </div>
          <div className="campusInfor_body_title">服务介绍</div>
          <div className="campusInfor_body_text">
            <p>{this.state.data.ServiceIntroduction}</p>
          </div>
        </div>
        {/* 为已结束的时候是反馈，否则是报名/分享 */}
        <div className="campusInfor_foot">
          <Button
            className="campusInfor_btn_helf"
            onClick={this.jumpName.bind(this)}
          >
            开始导航
          </Button>
          <Button
            className="campusInfor_btn_helf"
            style={{
              background: "none",
              backgroundColor: "#B5B6B6",
              color: "#FFF"
            }}
            onClick={this.showOther.bind(this, this.state.data.Telphone)}
          >
            一键拨号
          </Button>
        </div>
      </div>
    );
  }
}

export default CampusInfor;
