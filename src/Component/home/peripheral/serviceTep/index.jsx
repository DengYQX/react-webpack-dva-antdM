// 注册成功 registerOk
import React, { Component } from "react";
import "./style.less";
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";
import { ListView,Modal,Toast } from "antd-mobile";
import call from "%/home/call.png";
import daohang from "%/home/daohang.png";
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
class linkPage extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    const data = this.props.location.state;
    this.state = {
      dataSource: ds,
      data,
      list: [],
      page: 1,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      rows: 10,
      isMore: true,  //是否加载
      platform: navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app"
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    if(this.state.isMore) {
      interfaces
        .GetPeripheryShopList({
          Type: this.props.location.state.type,
          pageIndex: this.state.page,
          pageSize: this.state.rows
        })
        .then(res => {
          if (res && res.length > 0) {
            let list = [];
            for (let i = 0; i < res.length; i++) {
              list.push({
                img: res[i].ImgUrl,
                name: res[i].ShopName,
                price: res[i].Price,
                distance: res[i].Distance+'km',
                keyWord: res[i].Keyword,
                phone: res[i].Telephone,
                longitude: res[i].Longitude,
                latitude: res[i].Latitude,
              });
            }
            this.setState({
              valType:1,
              page: this.state.page + 1,
              list: [...this.state.list, ...list],
              isMore: list.length < this.state.rows ? false : true
            });
          }else if (this.state.valType == 0){
            this.setState({ valType: 2 });
          }
        });
    }
  }
  callPhone = (phone) => {
    if (this.state.platform === 'h5') {
      location.href = 'tel://'+phone
    } else {
      plus.device.dial(phone, false);
    }
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
  onEndReached = () => {
    this.getData();
  };
  renderRow(item) {
    return (
      <div className="itemBlock">
        <div className="listImg">
          <img src={item.img?item.img :require('%/noImg.jpg')} />
          <div className="infos">
            <p className="name">{item.name}</p>
            <p className="amount">{item.price+'元起'}</p>
            <p className="address">{'距离查询位置'+item.distance+' '+item.keyWord}</p>
          </div>
        </div>
        <div className="options">
          <img src={call} onClick={()=>{this.callPhone(item.phone)}} alt="" />
          <img src={daohang} onClick={()=>{this.daohang(item.longitude, item.latitude, item.name)}} alt="" />
        </div>
      </div>
    );
  }
  render() {
    const {valType} = this.state;
    return (
      <div className="serviceTep">
        <Navigation title={this.state.data.title} />
        <div className="block">
        {
          valType == 1 ?
          (
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
            style={{ height: "calc(100vh - 1.92rem)", overflow: "auto" }}
            pageSize={this.state.rows}
            renderRow={item => this.renderRow(item)}
            onEndReached={this.onEndReached}
          />
          ):(
           <UnData/>
          )
        }
        </div>
      </div>
    );
  }
}

export default linkPage;
