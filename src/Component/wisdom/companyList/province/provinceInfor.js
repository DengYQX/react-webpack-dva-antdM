//省市区政策--详情
import React, { Component } from "react";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import { Button, List, WhiteSpace } from "antd-mobile";
import DownloadFlle from "@/util/download.js";
import "./province.less";
import interfaces from "@/api/index";
import zhuanfa0 from "%/wisdom/zhuanfa0.png";
const Item = List.Item;
class provinceInfor extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    this.state = {
      data: data /** 组件传过来的值 */,
      list: [] /** 调接口返回的list */,
      files: [],
      img: "" /** 接口返回的图片url */
    };
  }
  /**
   * GetProvinceCityPolicyDetails 获得省市区政策申请详情
   * @author xiaoDai
   * @param {int} ID [政策ID]
   * @return [政策申请详情]
   */
  componentDidMount() {
    interfaces
      .GetProvinceCityPolicyDetails({ ID: this.state.data.ID })
      .then(res => {
        console.log(res, res.length);
        if (res && res.length > 0) {
          this.setState({
            list: res[0].Detail,
            files: res[0].Filelist
          });
          if (res[0].Imagelist[0].FullUrl) {
            this.setState({
              img: res[0].Imagelist[0].FullUrl
            });
          }
        }
      });
  }
  /** 跳转 */
  clickOnline = () => {
    hashHistory.push({
      pathname: "/provinceOnline",
      state: { data: this.state.data }
    });
  };
  /** 官网入口跳转 */
  jumpWebsite = website => {
    window.location.href = "http://" + website;
  };
  /** 组件挂载 */
  render() {
    const { list, img, files } = this.state;
    return (
      <div className="provinceInfor">
        <Navigation title="详情" />
        <div className="poverty_alleviation_img">
          <img src={img} />
        </div>
        <div className="provinceInfor_list">政策条款</div>
        <div className="provinceInfor_div">{list.PolicyClause}</div>
        <div className="provinceInfor_list">申报条件</div>
        <div className="provinceInfor_div">{list.DeclarationConditions}</div>
        <div className="provinceInfor_list">申诉流程</div>
        <div className="provinceInfor_div">{list.AppealProcess}</div>
        <div className="provinceInfor_list">申报时间</div>
        <div className="provinceInfor_div">
          {list.ApplyStartTime + "至" + list.ApplyEndTime}
        </div>
        <div className="provinceInfor_list">联系方式</div>
        <div className="provinceInfor_div">{list.ContactInfor}</div>
        <div className="provinceInfor_list">政策相关附件</div>
        <div className="provinceInfor_div" style={{ padding: 0 }}>
          <List>
            <Item
              extra={
                <span style={{ color: "#00A1E9", fontSize: "0.56rem" }}>
                  {files.length > 0
                    ? files.map(item => {
                        if (item.iCreator === 1) {
                          return (
                            <DownloadFlle
                              url={item.FullUrl}
                              name={item.Name}
                              key={item.ID}
                            />
                          );
                        }
                      })
                    : ""}
                  <img style={{ width: 20, height: 20 }} src={zhuanfa0} />
                </span>
              }
            >
              <span style={{ fontSize: "0.56rem" }}>相关附件</span>
            </Item>
          </List>
        </div>
        <div className="provinceInfor_list">官网入口</div>
        <div className="provinceInfor_div">{list.WebSite}</div>
        {list.Status ? (
          <div>
            <div className="provinceInfor_list">公示内容</div>
            <div className="provinceInfor_div" dangerouslySetInnerHTML={{ __html: list.ShowContent }}></div>
            <div className="provinceInfor_list">公示相关附件</div>
            <div className="provinceInfor_div" style={{ padding: 0 }}>
              <List>
                <Item
                  extra={
                    <span style={{ color: "#00A1E9", fontSize: "0.56rem" }}>
                      {files.length > 0
                        ? files.map(item => {
                            if (item.iCreator === 2) {
                              return (
                                <DownloadFlle
                                  url={item.FullUrl}
                                  name={item.Name}
                                  key={item.ID}
                                />
                              );
                            }
                          })
                        : ""}
                      <img style={{ width: 20, height: 20 }} src={zhuanfa0} />
                    </span>
                  }
                >
                  <span style={{ fontSize: "0.56rem" }}>相关附件</span>
                </Item>
              </List>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default provinceInfor;
