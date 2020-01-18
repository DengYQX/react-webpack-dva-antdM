import { Tabs } from "antd-mobile";
import Traffic from "./traffic/";
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";
import "./style.less";
const tabs = [
  { title: "时刻表", sub: "1" },
  { title: "周边交通", sub: "2" }
];
class wisdom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
  }
  componentDidMount() {
    this.getTimePic();
  }
  getTimePic() {
    interfaces.GetPeripheryTripFile({}).then(res => {
      if (res && res.length > 0) {
        this.setState({
          img: res[0].FullUrl
        });
      }
    });
  }
  render() {
    return (
      <div className="appBox">
        <Navigation title="出行" />
        <div className="appBox-box">
          <Tabs
            tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => {
              console.log("onChange", index, tab);
            }}
            onTabClick={(tab, index) => {
              console.log("onTabClick", index, tab);
            }}
          >
            <div
              className="appBox_itemBox"
              style={{
                margin: "0",
                height: "100%",
                overflow: "auto",
                backgroundColor: "transparent"
              }}
            >
              <img src={this.state.img} style={{ width: "100%", marginTop: '0.42667rem' }} />
            </div>
            <div
              className="appBox_itemBox"
              style={{
                margin: "0",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "transparent"
              }}
            >
              <Traffic />
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default wisdom;
