//工商注册--新注册板块
import React, { Component } from "react";
import { hashHistory } from "react-router";
import { Link } from "dva/router";
import Navigation from "@/util/navigation";
import DownloadFlle from "@/util/download.js";
import { Button } from "antd-mobile";

import "./shoppingRegin.less";
import downImg from "%/jiantou.png";

import interfaces from "@/api/index";

class NowShopping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      contentList: [],
      fileList: [],
      people: "",
      phone: "",
      address: ""
    };
  }

  componentDidMount() {
    interfaces.GetPCBusinessRegisterInfo({ Type: 1 }).then(res => {
      if (res && res.length > 0) {
        this.setState({
          title: res[0].Title,
          contentList: res[0].Contentlist,
          fileList: [...this.state.fileList, ...res[0].Filelist],
          people: res[0].Contacts,
          phone: res[0].Telphone,
          address: res[0].Address
        });
      }
    });
  }

  render() {
    const { title, contentList, fileList, people, phone, address } = this.state;
    return (
      <div className="newShopping">
        <Navigation title="新注册板块" />
        <div className="newShopping_div">
          <div className="comingPark_box">
            <div className="comingPark_title">
              <p>{title}</p>
            </div>
          </div>
          {contentList.map(item => {
            return (
              <div>
                <div className="comingPark_img">
                  <img src={downImg} />
                </div>
                <div className="comingPark_box">
                  <div className="comingPark_text">
                    {item.ContentInfo.map(items => {
                      return (
                        <p>
                          <p className="comingPark_color">{items.Number}</p>
                          <p>{items.Content}</p>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="newShopping_list">
          <p className="newShopping_context">相关附件</p>
        </div>
        <div className="newShopping_list">
          {fileList.map((item, index) => {
            return (
              <p key={index} className="newShopping_litter">
                相关附件
                <img src={require("%/sendOther.png")} />
                <DownloadFlle
                  url={item.FullUrl}
                  name={item.Name}
                  key={item.ID}
                />
              </p>
            );
          })}
        </div>
        <div className="newShopping_list" style={{ marginTop: "20px" }}>
          <p className="newShopping_context">联系方式</p>
        </div>
        <div className="newShopping_text">
          <p>联系人：{people}</p>
          <p>联系方电话：{phone}</p>
          <p>地址：{address}</p>
        </div>
      </div>
    );
  }
}

export default NowShopping;
