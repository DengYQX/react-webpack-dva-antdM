//园区活动--报名
import React, { Component } from "react";
import { Button, Picker, List, Modal, Toast } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import "./decorationApplication.less";
import { connect } from "dva";
import { unLogin } from "@/util/common.js";
import PropTypes from "prop-types";

class DecorationApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeList: [
        { label: "300平以上", value: "1" },
        { label: "300平以下", value: "2" }
      ],
      typeId: "",
      isTop: [
        { label: "是", value: "1" },
        { label: "否", value: "0" }
      ],
      topId: ""
    };
  }

  // 提交
  submit() {
    const { token = "" } = this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if (loginType) {
      if (this.state.typeId === "") {
        Toast.info("请选择装修面积");
        return;
      }
      if (this.state.typeId[0] === "1" && this.state.topId === "") {
        Toast.info("请选择是否已上报流程");
        return;
      }
      if (
        (this.state.typeId[0] == "1" && this.state.topId[0] == "1") ||
        this.state.typeId[0] == "2"
      ) {
        hashHistory.push({
          pathname: "/decorationApply",
          state: {
            area: this.state.typeId[0] == "1" ? 2 : 1,
            isApply: this.state.typeId[0] == "1" ? this.state.topId[0] : "0"
          }
        });
      } else {
        hashHistory.push("/processingFlow");
      }
    } else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }
  }

  render() {
    return (
      <div className="decoration_application">
        <Navigation title="装修申请" />
        <Picker
          data={this.state.typeList}
          cols={1}
          value={this.state.typeId}
          onChange={v => this.setState({ typeId: v })}
          onOk={v => this.setState({ typeId: v })}
        >
          <List.Item arrow="horizontal">装修面积:</List.Item>
        </Picker>
        {this.state.typeId == "1" ? (
          <Picker
            data={this.state.isTop}
            cols={1}
            value={this.state.topId}
            onChange={v => this.setState({ topId: v })}
            onOk={v => this.setState({ topId: v })}
          >
            <List.Item arrow="horizontal">是否已上报流程:</List.Item>
          </Picker>
        ) : null}
        <Button
          type="primary"
          className="submit"
          onClick={this.submit.bind(this)}
        >
          下一步
        </Button>
      </div>
    );
  }
}

DecorationApplication.defaultProps = {
  token: ""
};
DecorationApplication.propTypes = {
  token: PropTypes.any
};

export default connect(({ login }) => ({ token: login.token }))(
  DecorationApplication
);
