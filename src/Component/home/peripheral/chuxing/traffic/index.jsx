import daohang from "%/home/daohang.png";
import "./style.less";
import { ListView,Modal,Toast } from "antd-mobile";
import interfaces from "@/api/index";
import Fly from "flyio";
const request = Fly;
class app extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      list: [],
      page: 1,
      rows: 10,
      isMore: true, // 是否加载
      platform: navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app"
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    if(this.state.isMore) {
      interfaces
        .GetPeripheryTripList({
          pageIndex: this.state.page,
          pageSize: this.state.rows
        })
        .then(res => {
  
          if (res && res.length > 0) {
            let list = [];
            for (let i = 0; i < res.length; i++) {
              list.push({
                name: res[i].StationName,
                type: res[i].Type == 1 ? "地铁站" : "公交站",
                distance: res[i].Distance+'km',
                line: res[i].Line,
                longitude: res[i].Longitude,
                latitude: res[i].Latitude
              });
            }
            this.setState({
              page: this.state.page + 1,
              list: [...this.state.list, ...list],
              isMore: list.length < this.state.rows ? false : true
            });
          }
  
        });
    }
  }
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
      plus.geolocation.getCurrentPosition(function (p) {
        const latitude = p.coords.latitude; //维度
        const longitude = p.coords.longitude; //经度
        // 设置目标位置坐标点和其实位置坐标点
        const dst = new plus.maps.Point(lng, lat); // 天安门
        const src = new plus.maps.Point(longitude, latitude); // 大钟寺
        // 调用系统地图显示
        plus.maps.openSysMap(dst, dsc, src);
      }, function (e) {
        Modal.alert('Geolocation error: ' + e.message);
      })
    }
  };
  onEndReached = () => {
    this.getData();
  };
  renderRow(item) {
    return (
      <div className="itemSB">
        <div className="leftBox">
          <p className="info">
            <span className="name">{item.name}</span>
            <div className="bts">{item.type}</div>
          </p>
          <p className="add">
            {item.distance}
            <span className="part"> | </span>
            {item.line}
          </p>
        </div>
        <img src={daohang} className="rightImg" alt="" onClick={() => { this.daohang(item.longitude, item.latitude, item.name) }} />
      </div>
    );
  }
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
        style={{ height: "100%", overflow: "auto" }}
        pageSize={this.state.rows}
        renderRow={item => this.renderRow(item)}
        onEndReached={this.onEndReached}
      />
    );
  }
}

export default app;
