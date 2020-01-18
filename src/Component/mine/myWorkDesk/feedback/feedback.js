// 物业工作台
import React, { Component } from "react";
import {
  TextareaItem,
  Picker,
  Button,
  List,
  Modal,
  Toast
} from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import "./feedback.less";
import { connect } from "dva";
import { unLogin } from "@/util/common.js";
import PropTypes from "prop-types";
import interfaces from "@/api/index";
import ImagesView from '@/util/imagesView.jsx';

class Feedback extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    this.state = {
      data,
      Textarea: "",
      files: [],
      filesUploadData: [],
      modeList: [
        { value: "1", label: "业主自理" },
        { value: "3", label: "售后报修" },
        { value: "2", label: "物业维修" }
      ],
      modeId: "",
      isAdopt: [
        { value: "1", label: "通过" },
        { value: "2", label: "不通过" }
      ],
      adoptId: "",
      chargeList: [
        { value: "1", label: "否" },
        { value: "2", label: "是" }
      ],
      chargeId: "",
      areaList: [
        { value: "1", label: "公区" },
        { value: "2", label: "室内" }
      ],
      areaId: ""
    };
  }

  changtextarea(e) {
    this.setState({
      Textarea: e
    });
  }

  async onChangeImg(files, type, index) {
    let filesUploadData = [];
    if (type === "add") {
      await interfaces
        .UploadBase64Img({
          fileext: "." + files[files.length - 1].file.name.split(".")[1],
          Base64Photo: files[files.length - 1].url
        })
        .then(res => {
          filesUploadData = [...this.state.filesUploadData, ...res];
        });
    } else {
      filesUploadData = this.state.filesUploadData;
      filesUploadData.splice(index, 1);
    }
    if (filesUploadData.length === files.length) {
      this.setState({
        files,
        filesUploadData
      });
    }
  }

  // 提交
  ClickSure() {
    const { token = "" } = this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (loginType) {
      if (this.props.location.state.category == "1") {
        //装修工单
        if (this.state.adoptId === "") {
          Toast.info("请选择验收结果");
          return;
        }
        if (this.state.Textarea === "") {
          Toast.info("请填写反馈信息");
          return;
        }
        let FeedbackPicList = [];
        if (this.state.filesUploadData.length > 0) {
          for (let i = 0; i < this.state.filesUploadData.length; i++) {
            FeedbackPicList.push({
              Name: this.state.filesUploadData[i].Name,
              Url: this.state.filesUploadData[i].URL,
              ThumbUrl: this.state.filesUploadData[i].smallPhotoURL,
              Ext: this.state.filesUploadData[i].Type
            });
          }
        }
        interfaces
          .DecorationManageFeedback({
            WorkOrderID: this.props.location.state.id,
            UserID: localStorage.getItem("userId"),
            Results: this.state.adoptId[0] === "1" ? true : false,
            Feedback: this.state.Textarea,
            FeedbackPicList: FeedbackPicList
          })
          .then(res => {
            this.sureCommon();
          });
      } else {
        //报修工单
        if (this.state.modeId === "") {
          Toast.info("请选择维修方式");
          return;
        }
        if (this.state.modeId[0] === "2" && this.state.chargeId === "") {
          Toast.info("请选择是否收费");
          return;
        }
        if (
          this.state.modeId[0] === "2" &&
          this.state.chargeId[0] === "1" &&
          this.state.areaId === ""
        ) {
          Toast.info("请选择区域范围");
          return;
        }
        if (this.state.Textarea === "") {
          Toast.info("请填写反馈信息");
          return;
        }
        let FeedbackPicList = [];
        if (this.state.filesUploadData.length > 0) {
          for (let i = 0; i < this.state.filesUploadData.length; i++) {
            FeedbackPicList.push({
              Name: this.state.filesUploadData[i].Name,
              Url: this.state.filesUploadData[i].URL,
              ThumbUrl: this.state.filesUploadData[i].smallPhotoURL,
              Ext: this.state.filesUploadData[i].Type
            });
          }
        }
        interfaces
          .RepairManageFeedback({
            WorkOrderID: this.props.location.state.id,
            UserID: localStorage.getItem("userId"),
            RepairManageMode: this.state.modeId[0],
            IsFee:
              this.state.modeId[0] === "2" && this.state.chargeId[0] === "2"
                ? true
                : false,
            RepairRange:
              this.state.modeId[0] === "2" && this.state.chargeId[1] === "2"
                ? this.state.areaId[0]
                : 0,
            Feedback: this.state.Textarea,
            FeedbackPicList: FeedbackPicList
          })
          .then(res => {
            this.sureCommon();
          });
      }
    } else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }
  }

  sureCommon() {
    const data = {
      title: "提交",
      btn: "确认", //按钮的字
      img: 1, //1为成功，0为失败
      url: "back", //按钮跳转的链接
      delta: 2,
      text: "提交成功"
    };
    hashHistory.push({ pathname: "/registerOk", state: { data: data } });
  }

  render() {
    const { category } = this.props.location.state;
    return (
      <div className="feedback">
        <Navigation title="反馈" />
        {category == "2" ? (
          <Picker
            data={this.state.modeList}
            cols={1}
            value={this.state.modeId}
            onChange={v =>
              this.setState({ modeId: v, chargeId: "", areaId: "" })
            }
            onOk={v => this.setState({ modeId: v })}
          >
            <List.Item arrow="horizontal">维修方式：</List.Item>
          </Picker>
        ) : (
          <Picker
            data={this.state.isAdopt}
            cols={1}
            value={this.state.adoptId}
            onChange={v => this.setState({ adoptId: v })}
            onOk={v => this.setState({ adoptId: v })}
          >
            <List.Item arrow="horizontal">验收结果：</List.Item>
          </Picker>
        )}
        {this.state.modeId == "2" ? (
          <Picker
            data={this.state.chargeList}
            cols={1}
            value={this.state.chargeId}
            onChange={v => this.setState({ chargeId: v })}
            onOk={v => this.setState({ chargeId: v })}
          >
            <List.Item arrow="horizontal">是否收费：</List.Item>
          </Picker>
        ) : null}
        {this.state.modeId == "2" && this.state.chargeId == "1" ? (
          <Picker
            data={this.state.areaList}
            cols={1}
            value={this.state.areaId}
            onChange={v => this.setState({ areaId: v })}
            onOk={v => this.setState({ areaId: v })}
          >
            <List.Item arrow="horizontal">区域范围：</List.Item>
          </Picker>
        ) : null}
        <div className="getPassing_list_no">
          反馈信息 <span className="getPassing_list_red">*</span>
        </div>
        <div className="getPassing_list_padding">
          <TextareaItem
            value={this.state.Textarea}
            rows={9}
            onChange={this.changtextarea.bind(this)}
            placeholder="请填写反馈信息..."
          />
        </div>
        <div className="getPassing_img">
          <div className="getPassing_title">上传对比图：</div>
          <ImagesView
            files={this.state.files}
            onChange={this.onChangeImg.bind(this)}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 3}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </div>
        <div className="getPassing_foot">
          <Button
            className="getPassing_btn"
            onClick={this.ClickSure.bind(this)}
          >
            确认提交
          </Button>
        </div>
      </div>
    );
  }
}

Feedback.defaultProps = {
  token: ""
};
Feedback.propTypes = {
  token: PropTypes.any
};

export default connect(({ login }) => ({ token: login.token }))(Feedback);
