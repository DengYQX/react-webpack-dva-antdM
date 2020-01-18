import { List, Carousel, WingBlank, TextareaItem } from "antd-mobile";
const Item = List.Item;
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";
import "./style.less";
class app extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      name: "",
      maxNum: "",
      price: "",
      unit: "",
      intro: "",
      imgHeight: "6.52rem"
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    interfaces
      .GetCommodityDetails({
        ID: this.props.location.state.id
      })
      .then(res => {
        if (res && res.length > 0) {
          let imgList = [];
          for (let i = 0; i < res[0].Imagelist.length; i++) {
            imgList.push(res[0].Imagelist[i].FullUrl);
          }
          this.setState({
            name: res[0].Detail.Name,
            maxNum: res[0].Detail.Amount,
            price: res[0].Detail.Price,
            unit: res[0].Detail.Unit,
            intro: res[0].Detail.DetailedIntroduction,
            imgList: imgList
          });
        }
      });
  }
  onChange = val => {
    console.log(val);
  };
  render() {
    const { imgList, imgHeight, name, maxNum, price, unit, intro } = this.state;
    return (
      <div className="appBox propertyDetail">
        <Navigation title="详情" />
        <WingBlank>
          {imgList.length > 0 ? (
            <Carousel dots={false}>
              {imgList.map(val => (
                <div
                  key={val}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: 150
                  }}
                >
                  <img style={{ width: "100%", height: 150 }} src={val} onLoad={() => {
                      this.setState({ imgHeight: "150px" });
                    }} />
                </div>
              ))}
            </Carousel>
          ) : null}
        </WingBlank>

        <div className="infoBox">
          <List>
            <Item>
              商品名称：
              <span style={{ color: "#949494", fontSize: "0.58rem" }}>
                {name}
              </span>
            </Item>
          </List>
          <List>
            <Item>
              剩余数量：
              <span style={{ color: "#949494", fontSize: "0.58rem" }}>
                {maxNum + (unit && unit.indexOf('/') !== -1 ? unit.split("/")[1] : "")}
              </span>
            </Item>
          </List>
          <List>
            <Item>
              价格：
              <span style={{ color: "#949494", fontSize: "0.58rem" }}>
                {price + unit}
              </span>
            </Item>
          </List>
          <List className="intro">
            <Item>
              详细介绍：
              <div
                style={{
                  whiteSpace: "initial",
                  color: "#898989",
                  padding: "0.4rem 0 1rem"
                }}
              >
                {intro}
              </div>
            </Item>
          </List>
        </div>
      </div>
    );
  }
}

export default app;
