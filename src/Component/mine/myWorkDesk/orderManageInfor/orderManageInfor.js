//个人中心-物业工作台---物品放行--只有物业人员有权限进入
import React, { Component } from "react";
import { hashHistory } from "react-router";
import { Icon, WhiteSpace, Button, NavBar } from "antd-mobile";
import interfaces from "@/api/index";
import "./orderManageInfor.less";

class OrderManageInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      name: "",
      build: "",
      floor: "",
      category: "",
      orderNo: "",
      people: "",
      phone: "",
      time: "",
      detail: "",
      imgList: [],
      imgListFeedback: [],
      repairModel: "",
      isFee: null,
      repairRange: null,
      completeTime: "",
      feedback: "",
      results: ""
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    interfaces
      .GetWorkOrderManageDetails({
        ID: this.props.location.state.id,
        Category: this.props.location.state.category
      })
      .then(res => {
        let imgList = [];
        let imgListFeedback = [];
        let _params = {};
        if (res[0].Detail.Category == 2) {
          if (res[0].PicList && res[0].PicList.length > 0) {
            for (let i = 0; i < res[0].PicList.length; i++) {
              imgList.push(res[0].PicList[i].FullUrl);
            }
          }
        }
        if (res[0].Detail.Status == 2) {
          if (res[0].FeedbackPicList && res[0].FeedbackPicList.length > 0) {
            for (let j = 0; j < res[0].FeedbackPicList.length; j++) {
              imgListFeedback.push(res[0].FeedbackPicList[j].FullUrl);
            }
          }
          if (res[0].Detail.Feedback) {
            if (res[0].Detail.Category == 1) {
              _params.results = res[0].Detail.Resultsstr;
              _params.completeTime = res[0].Detail.EndTime;
              _params.feedback = res[0].Detail.Feedback;
            } else if (res[0].Detail.Category == 2) {
              _params.repairModel = res[0].Detail.RepairModelstr;
              _params.isFee =
                res[0].Detail.RepairModel === 2 ? res[0].Detail.IsFeestr : null;
              _params.repairRange =
                res[0].Detail.RepairModel === 2 && !res[0].Detail.IsFee
                  ? res[0].Detail.RepairRangestr
                  : null;
              (_params.completeTime = res[0].Detail.CompleteTime),
                (_params.feedback = res[0].Detail.Feedback);
            }
          }
        }
        this.setState({
          ..._params,
          status: res[0].Detail.Status,
          name: res[0].Detail.CompanyName,
          build: res[0].Detail.BuildNo,
          floor: res[0].Detail.Floor,
          category: res[0].Detail.Category,
          categoryName: res[0].Detail.Category == 1 ? "装修工单" : "报修工单",
          orderNo: res[0].Detail.OrderNo,
          people: res[0].Detail.Name,
          phone: res[0].Detail.Telephone,
          time: res[0].Detail.OrderTime,
          detail: res[0].Detail.OrderDetails,
          imgList: imgList,
          imgListFeedback: imgListFeedback
        });
      });
  }
  // 反馈
  submit() {
    let item = this.props.location.state;
    hashHistory.push({
      pathname: "/feedback",
      state: { id: item.id, category: item.category }
    });
  }

  render() {
    const {
      status,
      name,
      build,
      floor,
      category,
      categoryName,
      orderNo,
      people,
      phone,
      time,
      detail,
      imgList,
      imgListFeedback,
      repairModel,
      isFee,
      repairRange,
      completeTime,
      feedback,
      results
    } = this.state;
    return (
      <div className="order_infor">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => hashHistory.goBack()}
          className="goods_title"
        >
          工单管理
        </NavBar>
        <div className="order_infor_main">
          <WhiteSpace />
          <div className="info_title">
            <div className="title_state">
              <span>{name}</span>
              {status == "1" ? (
                <span className="state_text1">待处理</span>
              ) : (
                <span className="state_text2">已处理</span>
              )}
            </div>
          </div>
          <div className="repairInfor_padding">
            <div className="repairInfor_list">
              所在楼宇： <span>{build}</span>
            </div>
            <div className="repairInfor_list">
              所在房间号： <span>{floor}</span>
            </div>
            <div className="repairInfor_list">
              工单类型： <span>{categoryName}</span>
            </div>
            <div className="repairInfor_list">
              工单单号： <span>{orderNo}</span>
            </div>
            <div className="repairInfor_list">
              联系人：<span>{people}</span>
            </div>
            <div className="repairInfor_list">
              联系电话：<span>{phone}</span>
            </div>
            <div className="repairInfor_list">
              派单时间：<span>{time}</span>
            </div>
          </div>
          <WhiteSpace />
          <div className="repairInfor_div">
            <p className="div_title">工单详情：</p>
            <p className="div_text">{detail}</p>
          </div>
          <WhiteSpace />
          {imgList.length > 0 ? (
            <div className="repairInfor_div">
              <p className="div_title">图片</p>
              <p className="div_text div_img">
                {imgList.map((item, index) => (
                  <img src={item} key={index} />
                ))}
                {imgList.length <= 4
                  ? (() => {
                      let array = [];
                      for (let i = 0; i < 4 - imgList.length; i++) {
                        array.push(<div className="img img_before4"></div>);
                      }
                      return array.map((item, index) => item);
                    })()
                  : (() => {
                      let array = [];
                      for (let i = 0; i < 4 - (imgList.length % 4); i++) {
                        array.push(<div className="img"></div>);
                      }
                      return array.map((item, index) => item);
                    })()}
              </p>
            </div>
          ) : null}
          {status == "2" ? (
            <div className="repairInfor_feedback">
              <div className="repairInfor_feedback_title">反馈信息</div>
              {category == 2 ? (
                <div className="repairInfor_padding">
                  <div className="repairInfor_list">
                    维修方式： <span>{repairModel}</span>
                  </div>
                  {isFee ? (
                    <div className="repairInfor_list">
                      是否收费： <span>{isFee}</span>
                    </div>
                  ) : null}
                  {repairRange ? (
                    <div className="repairInfor_list">
                      区域范围： <span>{repairRange}</span>
                    </div>
                  ) : null}
                  <div className="repairInfor_list">
                    完成时间： <span>{completeTime}</span>
                  </div>
                </div>
              ) : null}
              {category == 1 ? (
                <div className="repairInfor_padding">
                  <div className="repairInfor_list">
                    验收结果： <span>{results}</span>
                  </div>
                  <div className="repairInfor_list">
                    完成时间： <span>{completeTime}</span>
                  </div>
                </div>
              ) : null}
              <WhiteSpace />
              <div className="repairInfor_div">
                <p className="div_title">反馈内容：</p>
                <p className="div_text">{feedback}</p>
              </div>
              <WhiteSpace />
              {imgListFeedback.length > 0 ? (
                <div className="repairInfor_div">
                  <p className="div_title">反馈图片</p>
                  <p className="div_text div_img">
                    {imgListFeedback.map((item, index) => (
                      <img src={item} key={index} />
                    ))}
                    {imgListFeedback.length <= 4
                      ? (() => {
                          let array = [];
                          for (let i = 0; i < 4 - imgListFeedback.length; i++) {
                            array.push(<div className="img img_before4"></div>);
                          }
                          return array.map((item, index) => item);
                        })()
                      : (() => {
                          let array = [];
                          for (
                            let i = 0;
                            i < 4 - (imgListFeedback.length % 4);
                            i++
                          ) {
                            array.push(<div className="img"></div>);
                          }
                          return array.map((item, index) => item);
                        })()}
                  </p>
                </div>
              ) : null}
            </div>
          ) : null}
          {status == "1" ? (
            <Button
              type="primary"
              className="submit"
              onClick={this.submit.bind(this)}
            >
              去反馈
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default OrderManageInfor;
