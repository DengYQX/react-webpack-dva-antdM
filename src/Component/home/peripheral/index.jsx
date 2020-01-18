// 注册成功 registerOk
import React, { Component } from "react";
import { Link, hashHistory } from "dva/router";
import { Toast } from "antd-mobile";
import InputSearch from "@/util/inputSearch.jsx";
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";
import chuxing from "%/home/chuxing.png";
import jiudian from "%/home/jiudian.png";
import meishi from "%/home/meishi.png";
import xiuxian from "%/home/xiuxian.png";
import "./style.less";

class app extends Component {
  constructor(props) {
    super(props);
    Toast.loading("加载中...", 30);
    this.state = {
      data: "",
      width: false,
      img: ""
    };
  }
  componentDidMount() {
    this.getPic();
  }
  getPic() {
    interfaces.GetPeripheralMatchingFile({}).then(res => {
      if (res && res.length > 0) {
        this.setState({
          img: res[0].FullUrl
        });
      }
    });
  }
  changeVal = val => {
    console.log(val);
  };
  toSearch() {
    hashHistory.push('/peripheral/search')
  }
  render() {
    return (
      <div className="peripheral">
        <Navigation title="周边配套" />

        <div className="imgBox">
          <img
            src={this.state.img}
            onLoad={(e) => {
              console.log(e.target.width)
              this.setState({
                width: e.target.width / 2
              }, () => {
                Toast.hide();
              })
            
            }}
            style={{width: this.state.width, height: "auto" }}
          />
        </div>
        <div className="optionsBox">
          <div className="searchBox" onClick={()=>{this.toSearch()}}>
            <InputSearch
              changeVal={this.changeVal}
              width="100%"
              height="1.4rem"
              placeholder="查找美食、酒店、超市"
            />
            <div className="searchBoxButton">
              搜索
            </div>
          </div>
          <div className="menu">
            <Link to="/peripheral/chuxing" className="item">
              <img src={chuxing} alt="" />
              出行
            </Link>
            <Link
              to={{
                pathname: `/serviceTep`,
                state: { title: "酒店", type: 3 }
              }}
              className="item"
            >
              <img src={jiudian} alt="" />
              酒店
            </Link>
            <Link
              to={{
                pathname: `/serviceTep`,
                state: { title: "美食", type: 1 }
              }}
              className="item"
            >
              <img src={meishi} alt="" />
              美食
            </Link>
            <Link
              to={{
                pathname: `/serviceTep`,
                state: { title: "休闲", type: 2 }
              }}
              className="item"
            >
              <img src={xiuxian} alt="" />
              休闲
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default app;
