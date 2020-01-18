import React, { Component, PropTypes } from "react";
import { hashHistory } from "react-router";
import { Carousel, Button } from "antd-mobile";
import "./paidDetails.less"; //样式文件
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";

class PaidDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      name: "",
      category: "",
      specification: "",
      price: "",
      unit: "",
      laborFee: "",
      laborFeeUnit: "",
      remark: "",
      imgHeight: "6.52rem"
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    interfaces
      .GetPaidSerivcesInfo({
        PaidSerivcesID: this.props.location.state.id
      })
      .then(res => {
        if (res && res.length > 0) {
          let imgList = [];
          for (let i = 0; i < res[0].Imglist.length; i++) {
            imgList.push(res[0].Imglist[i].FullUrl);
          }
          this.setState({
            imgList: imgList,
            name: res[0].ModelInfo.ServicesName,
            category: res[0].ModelInfo.Category,
            specification: res[0].ModelInfo.Specification,
            unit: res[0].ModelInfo.MaterialUnit,
            price: res[0].ModelInfo.MaterialCost,
            laborFee: res[0].ModelInfo.LaborFee,
            laborFeeUnit: res[0].ModelInfo.Unit,
            remark: res[0].ModelInfo.Remark
          });
        }
      });
  }
  // 确认申请
  submit() {
    hashHistory.push({
      pathname: "/paidApply",
      state: { id: this.props.location.state.id }
    });
  }

  render() {
    const {
      name,
      category,
      specification,
      price,
      unit,
      laborFee,
      laborFeeUnit,
      remark,
      imgList,
      imgHeight
    } = this.state;
    return (
      <div className="paid_details">
        <Navigation title="详情" />
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
                <img style={{ width: "100%", height: imgHeight }} src={val} />
              </div>
            ))}
          </Carousel>
        ) : null}
        <div className="info_content">
          <div className="title_text">
            服务名称：<span className="info_text">{name}</span>
          </div>
          <div className="title_text">
            类别：<span className="info_text">{category}</span>
          </div>
          <div className="title_text">
            规格：<span className="info_text">{specification}</span>
          </div>
          <div className="title_text">
            人工费：
            <span className="info_text">{laborFee + "元/" + laborFeeUnit}</span>
          </div>
          <div className="title_text">
            材料费：<span className="info_text">{price + "元/" + unit}</span>
          </div>
          <div className="title_text" style={{ borderBottom: "none" }}>
            备注：
            <div
              className="info_text"
              style={{
                lineHeight: "1.8",
                paddingBottom: ".5rem",
                borderBottom: "0.043rem solid #e5e5e5"
              }}
            >
              {remark}
            </div>
          </div>
          <div className="title_text" style={{ borderBottom: "none" }}>
            小谷提示您：
            <div
              className="info_text"
              style={{ lineHeight: "1.8", paddingBottom: ".5rem" }}
            >
              <p>1：以上材料价格仅供参考，实际价格以市场现价为准。</p>
              <p>2：需要维修高价值的、技术参数较高的设备或配件时，价格面议。</p>
            </div>
          </div>
        </div>
        <Button
          value={remark}
          type="primary"
          className="submit"
          onClick={this.submit.bind(this)}
        >
          确认申请
        </Button>
      </div>
    );
  }
}

export default PaidDetails;
