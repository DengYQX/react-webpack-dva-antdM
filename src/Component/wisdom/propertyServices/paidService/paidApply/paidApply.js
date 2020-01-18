import React, { Component } from "react";
import { hashHistory } from "react-router";
import interfaces from "@/api/index";
import {
  NavBar,
  Icon,
  List,
  InputItem,
  Button,
  Picker,
  TextareaItem,
  Modal,
  Toast
} from "antd-mobile";
import "./paidApply.less"; //样式文件
import { connect } from "dva";
import { unLogin } from "@/util/common.js";
import PropTypes from "prop-types";

class PaidApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identityList: [],
      buildId: "",
      name: "",
      phone: "",
      company: "",
      remarks: ""
    };
  }
  componentDidMount() {
    this.getBuild();
  }

  getBuild() {
    interfaces.GetBuildToCbx({}).then(res => {
      let identityList = [];
      for (let i = 0; i < res.length; i++) {
        identityList.push({
          value: res[i].value,
          label: res[i].label
        });
      }
      this.setState({
        identityList: identityList
      });
    });
  }

  // 提交
  submit() {
    const { token = "" } = this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (loginType) {
      if (this.state.buildId === "") {
        Toast.info("请选择楼宇");
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
      if (this.state.company === "") {
        Toast.info("请输入公司名");
        return;
      }
      interfaces
        .AddPaidSerivcesApply({
          PaidSerivcesID: this.props.location.state.id,
          BuildId: this.state.buildId[0],
          EnterpriseName: this.state.company,
          Name: this.state.name,
          iCreator: localStorage.getItem('userId'),
          Contact: this.state.phone,
          Remakes: this.state.remarks
        })
        .then(res => {
          const data = {
            title: "提交",
            btn: "确定", //按钮的字
            img: 1, //1为成功，0为失败
            url: "back", //按钮跳转的链接
            delta: 3,
            text: "提交成功"
          };
          hashHistory.push({ pathname: "/registerOk", state: { data: data } });
        });
    } else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }
  }

  render() {
    const { name, phone, company, remarks } = this.state;
    return (
      <div className="paid_apply">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => hashHistory.goBack()}
          className="my_report_title"
        >
          有偿服务申请
        </NavBar>
        <List className="my_report_list">
          <div className="my_report_list_picker">
            <Picker
              data={this.state.identityList}
              cols={1}
              value={this.state.buildId}
              extra={<div style={{ color: "#ccc" }}>请选择所在楼宇</div>}
              onOk={v => this.setState({ buildId: v })}
            >
              <List.Item arrow="horizontal">所在楼宇：</List.Item>
            </Picker>
          </div>
          <InputItem
            value={name}
            onChange={e => {
              this.setState({ name: e });
            }}
            placeholder="请输入姓名"
          >
            姓名：
          </InputItem>
          <InputItem
            value={phone}
            type="number"
            onChange={e => {
              this.setState({ phone: e });
            }}
            placeholder="请输入联系电话"
          >
            联系电话：
          </InputItem>
          <InputItem
            value={company}
            onChange={e => {
              this.setState({ company: e });
            }}
            placeholder="请输入公司名称"
          >
            公司名称：
          </InputItem>
          <TextareaItem
            title="备注："
            autoHeight
            count={100}
            placeholder="请输入内容，100字以内"
            value={remarks}
            onChange={e => {
              this.setState({ remarks: e });
            }}
          />
        </List>
        <Button
          type="primary"
          className="submit"
          onClick={this.submit.bind(this)}
        >
          提交
        </Button>
      </div>
    );
  }
}

export default connect(({ login }) => ({ token: login.token }))(PaidApply);
