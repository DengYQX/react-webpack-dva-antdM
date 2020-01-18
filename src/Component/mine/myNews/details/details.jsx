import React, { Component, PropTypes } from "react";
import "./details.less";
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";

class Details extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (!this.props.location.state.item.isRead) {
      this.editMessageNotice();
    }
  }
  editMessageNotice() {
    interfaces
      .EditMessageNotice({
        ID: this.props.location.state.item.id
      })
      .then(res => {});
  }
  render() {
    const item = this.props.location.state.item;
    return (
      <div className="news_deteils">
        <Navigation title="消息详情" />
        <div className="news_box">
          <div className="item_top">
            <div className="item_top_left">
              <div className="dot"></div>
              <div>{item.title}</div>
            </div>
            <div className="item_top_right">{item.time}</div>
          </div>
          <div className="item_buttom">{item.text}</div>
        </div>
      </div>
    );
  }
}
export default Details;
