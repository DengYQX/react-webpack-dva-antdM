//园区活动--报名
import React, { Component } from "react";
import { WhiteSpace } from "antd-mobile";
import Navigation from "@/util/navigation";
import "./propertyBrief.less";
import interfaces from "@/api/index";

class PropertyBrief extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    interfaces.GetPropertyBrief({}).then(res => {
      if (res && res.ID) {
        this.refs.intro.innerHTML = res.Contents;
        this.refs.honor.innerHTML = res.Honor;
      }
    });
  }

  render() {
    return (
      <div className="property_brief">
        <Navigation title="物业简介" />
        <WhiteSpace />
        <div className="brief_title">天鸿物业简介</div>
        <div className="brief_content" ref="intro"></div>
        <WhiteSpace />
        <div className="brief_title">获得荣誉</div>
        <div className="brief_content" ref="honor"></div>
      </div>
    );
  }
}

export default PropertyBrief;
