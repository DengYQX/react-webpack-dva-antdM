import React, { Component, PropTypes } from "react";
import Navigation from "@/util/navigation.jsx";
import { Toast } from "antd-mobile";
import api from "@/api";

class app extends Component {
  constructor(props) {
    super(props);
    Toast.loading("加载中...", 30);
    this.state = {
        width: false,
        BannerList: {
            FullUrl: ''
        }
    };
  }
  componentDidMount() {
    api.GetParkMatchingFile().then(res => {
        this.setState({
            BannerList: res
        });
    });
  }

  render() {
   
    return (
      <div className="peripheral">
        <Navigation title="园区配套" />
        <div className="imgBox" style={{height: '100%'}}>
            <img
            src={this.state.BannerList.FullUrl}
            onLoad={(e) => {
              this.setState({
                width: e.target.width / 7
              }, () => {
                Toast.hide();
              })
            
            }}
            style={{width: this.state.width, height: "auto" }}
          />
        </div>
      </div>
    );
  }
}

export default app;
