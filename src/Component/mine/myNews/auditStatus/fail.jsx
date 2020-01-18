//个人中心-物业工作台---物品放行--拒绝放行--只有物业人员有权限进入
import React, { Component } from "react";
import { hashHistory } from "react-router";
import { Button, TextareaItem, Toast } from "antd-mobile";
import Navigation from "@/util/navigation";
import interfaces from "@/api/index";
import "./fail.less";

class Fail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: ""
    };
  }
  changtextarea(e) {
    this.setState({
      textarea: e
    });
  }
  ClickSure() {
    if (this.state.textarea === "") {
      Toast.info("请填写拒绝原因");
      return;
    }
    interfaces
      .ExMessageApply({
        ID: this.props.location.state.id,
        Type: this.props.location.state.type,
        Remake: this.state.textarea,
        States: 2
      })
      .then(res => {
        const data = {
          title: "拒绝放行",
          btn: "返回", //按钮的字
          img: 1, //1为成功，0为失败
          url: "back", //按钮跳转的链接
          text: "拒绝放行成功"
        };
        hashHistory.replace({ pathname: "/registerOk", state: { data: data } });
      });
  }
  render() {
    const { files } = this.state;
    return (
      <div className="getPassing_bad">
        <Navigation title="拒绝放行" />
        <div className="getPassing_list_no">
          拒绝原因 <span className="getPassing_list_red">*</span>
        </div>
        <div className="getPassing_list_padding">
          <TextareaItem
            value={this.state.textarea}
            rows={9}
            onChange={this.changtextarea.bind(this)}
            placeholder="请填写拒绝原因..."
          />
        </div>
        <div className="getPassing_foot">
          <Button
            className="getPassing_btn"
            onClick={this.ClickSure.bind(this)}
          >
            拒绝放行
          </Button>
        </div>
      </div>
    );
  }
}

export default Fail;
