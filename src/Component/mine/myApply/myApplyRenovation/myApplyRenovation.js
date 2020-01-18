import React, { Component, PropTypes } from "react";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation.jsx";
import { Button, InputItem, TextareaItem } from "antd-mobile";
import interfaces from "@/api/index";
import UnData from "@/Component/unData";
import Fankui from "./fankui";

class MyApplyRecruit extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    this.state = {
      hasData: false,
      data: data,
      status: 3, //1：未受理、2，已受理 ，3:同意，4：拒绝，5：已完成
      statusType: true /** 立即通知按钮 */,
      DecoraManageModel: [] /** 接口返回的值 */,
      WorkOrderList: [] /** 接口返回的值 */
    };
  }
  componentDidMount() {
    interfaces
      .GetMyDecoration({ UserID: localStorage.getItem("userId") })
      .then(res => {
        if (res) {
          this.setState({
            hasData: true,
            DecoraManageModel: res.DecoraManageModel,
            WorkOrderList: res.WorkOrderList ? res.WorkOrderList[0] : {},
            status: res.DecoraManageModel.Status,
            statusName: (function() {
              const status = res.DecoraManageModel.Status;
              let name = "未受理";
              if (status === 2) {
                name = "已受理";
              }
              if (status === 3) {
                name = "已同意";
              }
              if (status === 4) {
                name = "已拒绝";
              }
              if (status === 5) {
                name = "已完成";
              }
              return name;
            })()
          });
        }
      });
  }
  // 前往通知
  goNotice() {
    hashHistory.push("/goNotice");
  }

  render() {
    const {
      status,
      statusType,
      DecoraManageModel: {
        Reason,
        BuildNo,
        RoomNo,
        StartTime,
        dCreateTime,
        FireAcceptanceTime,
        EndTime,
        ApplyTime
      },
      WorkOrderList,
      hasData
    } = this.state;
    return (
      <div className="coming">
        <Navigation title="详情" />
        {hasData ? (
          <div style={{ marginTop: "10px" }}>
            <InputItem
              value={BuildNo}
              editable={false}
              extra={
                <p
                  style={{
                    color: this.state.status === 4 ? "#E8323C" : "#00A1E9"
                  }}
                >
                  {this.state.statusName}
                </p>
              }
            >
              所在楼宇:
            </InputItem>
            <InputItem value={RoomNo} editable={false}>
              所在房间号:
            </InputItem>
            <InputItem editable={false} value={StartTime}>
              装修开始时间：
            </InputItem>
            <InputItem editable={false} value={EndTime}>
              装修结束时间：
            </InputItem>
            <InputItem editable={false} value={ApplyTime || dCreateTime}>
              申请时间：
            </InputItem>

            {//1：未受理、3:同意，4：拒绝，5：已完成
            status == 1 ? (
              ""
            ) : status == 4 ? (
              <div>
                <div style={{ marginTop: "10px" }}>
                  <InputItem>拒绝原因：</InputItem>
                  <TextareaItem rows={4} value={Reason} />
                </div>
                <Button
                  type="primary"
                  style={{
                    width: "14.213rem",
                    height: "2.005rem",
                    background:
                      "linear-gradient(0deg,rgba(0,110,188,1),rgba(0,161,233,1))",
                    borderRadius: "0.939rem",
                    margin: "4rem auto 0"
                  }}
                  onClick={() => {
                    hashHistory.push("/decorationApply");
                  }}
                >
                  重新申请
                </Button>
              </div>
            ) : status == 5 ? (
              <Fankui data={WorkOrderList} />
            ) : status == 3 ? (
              WorkOrderList && WorkOrderList.Results ? (
                <div style={{ marginTop: "10px" }}>
                  <Fankui data={WorkOrderList} />
                  <Button
                    onClick={this.goNotice}
                    type="primary"
                    style={{
                      width: "14.213rem",
                      height: "2.005rem",
                      background:
                        "linear-gradient(0deg,rgba(0,110,188,1),rgba(0,161,233,1))",
                      borderRadius: "0.939rem",
                      margin: "1.5rem auto 0"
                    }}
                  >
                    再次通知
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    type="primary"
                    onClick={this.goNotice}
                    style={{
                      width: "14.213rem",
                      height: "2.005rem",
                      background:
                        "linear-gradient(0deg,rgba(0,110,188,1),rgba(0,161,233,1))",
                      borderRadius: "0.939rem",
                      margin: "9.853rem auto 0"
                    }}
                  >
                    立即通知
                  </Button>
                  <div style={{ textAlign: "center" }}>
                    小谷提醒您: 装修完成可点击上方通知物业验收哦!
                  </div>
                </div>
              )
            ) : (
              ""
            )}
          </div>
        ) : (
          <UnData />
        )}
      </div>
    );
  }
}
export default MyApplyRecruit;
