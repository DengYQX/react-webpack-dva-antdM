import React, { Component } from "react";
import Navigation from "@/util/navigation.jsx";
import InputSearch from "@/util/inputSearch.jsx";
import { ListView,Modal,Toast } from "antd-mobile";
import interfaces from "@/api/index";
import "./style.less";
import daohang from "%/home/daohang.png";

class search extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      searchText: "",
      searchData: [],
      platform: navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app"
    };
  }
  search() {
    interfaces
      .GetPeripheryList({
        keyword: this.state.searchText
      })
      .then(res => {
        let searchData = [];
        if (res && res.length > 0) {
          for (let i = 0; i < res.length; i++) {
            let name = res[i].Name;
            if (name.indexOf(this.state.searchText) !== -1) {
              let reg = new RegExp(this.state.searchText, "g");
              name = name.replace(
                reg,
                "<span>" + this.state.searchText + "</span>"
              );
            }
            searchData.push({
              name: name,
              type: res[i].TypeName,
              addr: res[i].Address,
              longitude: res[i].Longitude,
              latitude: res[i].Latitude
            });
          }
        }
        this.setState({
          searchData: searchData
        });
      });
  }
  changeVal = val => {
    this.setState({
      searchText: val
    });
  };
  daohang = (lng, lat, dsc) => {
    //调用SDK获取经纬度
    if (this.state.platform === 'h5') {
      let geolocation = new qq.maps.Geolocation();
      geolocation.getLocation((position)=> {
        location.href = `https://apis.map.qq.com/uri/v1/routeplan?type=bus&from=我的位置&fromcoord=${position.lat+','+position.lng}&to=${dsc}&tocoord=${lat+','+lng}&policy=1&referer=zhihuiyuanqu`
      }, () =>{
        Toast.fail('定位失败')
      })
    } else {
      plus.geolocation.getCurrentPosition(
        function(p) {
          const latitude = p.coords.latitude; //维度
          const longitude = p.coords.longitude; //经度
          // 设置目标位置坐标点和其实位置坐标点
          const dst = new plus.maps.Point(lng, lat); // 天安门
          const src = new plus.maps.Point(longitude, latitude); // 大钟寺
          // 调用系统地图显示
          plus.maps.openSysMap(dst, dsc, src);
        },
        function(e) {
          Modal.alert("Geolocation error: " + e.message);
        }
      );
    }
  };
  renderRow(item) {
    return (
      <div className="mainBox_item">
        <div>
          <p
            className="title"
            dangerouslySetInnerHTML={{ __html: item.name }}
          ></p>
          <p className="text">{item.type + " • " + item.addr}</p>
        </div>
        <img
          src={daohang}
          onClick={() => {
            this.daohang(item.longitude, item.latitude, item.name);
          }}
          alt=""
        />
      </div>
    );
  }
  render() {
    const { dataSource, searchData } = this.state;
    return (
      <div className="peripheralSearch">
        <Navigation title="搜索" />
        <div className="searchBox">
          <InputSearch
            changeVal={this.changeVal}
            width="100%"
            height="1.4rem"
            placeholder="查找美食、酒店、超市"
          />
          <div
            className="searchBoxButton"
            onClick={() => {
              this.search();
            }}
          >
            搜索
          </div>
        </div>
        <div className="mainBox">
          <ListView
            dataSource={dataSource.cloneWithRows(searchData)}
            style={{ height: "100%", overflow: "auto" }}
            pageSize={10}
            renderRow={item => this.renderRow(item)}
          />
        </div>
      </div>
    );
  }
}

export default search;
