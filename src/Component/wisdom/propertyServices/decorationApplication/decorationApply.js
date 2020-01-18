//园区活动--报名
import React, { Component } from "react";
import {
  DatePicker,
  Button,
  InputItem,
  Picker,
  List,
  TextareaItem,
  Toast
} from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import "./decorationApplication.less";
import interfaces from "@/api/index";

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class DecorationApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildList: [],
      buildId: "",
      floorList: [],
      floorId: "",
      companyName: "",
      name: "",
      phone: "",
      startTime: now,
      endTime: now,
      content: ""
    };
  }
  componentDidMount() {
    this.getBuild();
  }

  getBuild() {
    interfaces.GetBuildToCbx({}).then(res => {
      let buildList = [];
      for (let i = 0; i < res.length; i++) {
        buildList.push({
          value: res[i].value,
          label: res[i].label
        });
      }
      this.setState({
        buildList: buildList
      });
    });
  }

  getFloor(id) {
    this.setState(
      {
        floorList: [],
        floorId: ""
      },
      () => {
        interfaces
          .GetFllorByBuildIDList({
            BuildID: id
          })
          .then(res => {
            let floorList = [];
            for (let i = 0; i < res.length; i++) {
              floorList.push({
                value: res[i].ID,
                label: res[i].FloorName
              });
            }
            this.setState({
              floorList: floorList
            });
          });
      }
    );
  }

  // 申请
  jumpComing() {
    if (this.state.buildId === "") {
      Toast.info("请选择所在楼宇");
      return;
    }
    if (this.state.floorId === "") {
      Toast.info("请选择所在房间号");
      return;
    }
    if (this.state.companyName === "") {
      Toast.info("请输入公司名称");
      return;
    }
    if (this.state.name === "") {
      Toast.info("请输入姓名");
      return;
    }
    if (this.state.phone === "") {
      Toast.info("请输入联系电话");
      return;
    }
    if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.state.phone)) {
      Toast.info("请输入正确的联系电话");
      return;
    }
    if (this.state.content === "") {
      Toast.info("请输入申请内容");
      return;
    }
    let buildName = null;
    let floorName = null;
    for (let i = 0; i < this.state.buildList.length; i++) {
      if (this.state.buildList[i].value == this.state.buildId) {
        buildName = this.state.buildList[i].label;
        break;
      }
    }
    for (let i = 0; i < this.state.floorList.length; i++) {
      if (this.state.floorList[i].value == this.state.floorId) {
        floorName = this.state.floorList[i].label;
        break;
      }
    }
    let timeS = window.formatTime(this.state.startTime); 
    let timeE = window.formatTime(this.state.endTime);
    interfaces
      .AddDecorationManage({
        UserID: localStorage.getItem("userId"),
        BuildID: parseInt(this.state.buildId[0]),
        BuildNo: buildName,
        // FloorID: parseInt(this.state.floorId[0]),
        RoomNo: this.state.floorId,
        Floor: this.state.floorId,
        Area: parseInt(this.props.location.state.area),
        IsApply: parseInt(this.props.location.state.isApply),
        CompanyName: this.state.companyName,
        Name: this.state.name,
        Telphone: this.state.phone,
        StartTime: timeS,
        EndTime: timeE,
        ApplyContent: this.state.content
      })
      .then(() => {
        const data = {
          title: "提交",
          btn: "确定", //按钮的字
          img: 1, //1为成功，0为失败
          url: "back", //按钮跳转的链接
          text: "提交成功"
        };
        hashHistory.push({ pathname: "/registerOk", state: { data } });
      });
  }

  render() {
    const {
      buildList,
      buildId,
      floorList,
      floorId,
      companyName,
      name,
      phone,
      startTime,
      endTime,
      content
    } = this.state;
    return (
      <div className="decoration_apply">
        <Navigation title="申请" />
        <List>
          <div className="decoration_apply_picker">
            <Picker
              data={buildList}
              cols={1}
              value={buildId}
              extra={<div style={{ color: "#ccc" }}>请选择所在楼宇</div>}
              onOk={v => {
                this.setState({ buildId: v }), this.getFloor(v[0]);
              }}
            >
              <List.Item arrow="horizontal">所在楼宇：</List.Item>
            </Picker>
            <InputItem
              data={floorList}
              cols={1}
              type="number"
              value={floorId}
              onChange={val => {
                this.setState({ floorId: val });
              }}
              placeholder="请选择所在楼层"
              onOk={v => this.setState({ floorId: v })}
            >
              所在房间号：
            </InputItem>
          </div>
          <InputItem
            value={companyName}
            onChange={val => {
              this.setState({ companyName: val });
            }}
            placeholder="请输入公司名称"
          >
            公司名：
          </InputItem>
          <InputItem
            value={name}
            onChange={val => {
              this.setState({ name: val });
            }}
            placeholder="请输入姓名"
          >
            姓名：
          </InputItem>
          <InputItem
            value={phone}
            onChange={val => {
              this.setState({ phone: val });
            }}
            placeholder="请输入联系电话"
          >
            联系电话：
          </InputItem>
          <div className="decoration_apply_picker">
            <DatePicker
              mode="date"
              value={startTime}
              onChange={date => this.setState({ startTime: date })}
            >
              <List.Item arrow="horizontal">装修开始时间：</List.Item>
            </DatePicker>
            <DatePicker
              mode="date"
              value={endTime}
              onChange={date => this.setState({ endTime: date })}
            >
              <List.Item arrow="horizontal">装修结束时间：</List.Item>
            </DatePicker>
          </div>
        </List>
        <div className="apply_text">
          <p>申请内容:</p>
          <TextareaItem
            value={content}
            onChange={val => {
              this.setState({ content: val });
            }}
            placeholder="请输入申请内容..."
            rows={8}
          />
        </div>
        <div className="comingPark_foot">
          <Button
            className="comingPark_btn"
            onClick={() => {
              this.jumpComing();
            }}
          >
            申请
          </Button>
        </div>
      </div>
    );
  }
}

export default DecorationApply;
