import { List, Checkbox, Stepper, ListView, Toast } from "antd-mobile";
const Item = List.Item;
const Brief = Item.Brief;
import { connect } from "dva";
import { Link, hashHistory } from "dva/router";
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";
import "./style.less";
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
class app extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      data: [],
      page: 1,
      rows: 10,
      isAllSelect: false, //全选开关
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      totalPrice: 0 //总价
    };
  }
  componentDidMount() {
    if (this.props.data) {
      this.setState(this.props.data)
      this.props.save(null)
    } else {
      this.getData();
    }
  }
  getData() {
    interfaces
      .GetCommodityList({
        pageIndex: this.state.page,
        pageSize: this.state.rows
      })
      .then(res => {
        if (res && res.length > 0) {
          let data = [];
          for (let i = 0; i < res.length; i++) {
            data.push({
              id: res[i].ID,
              img: res[i].Pic,
              title: res[i].Name,
              price: res[i].Price,
              unit: res[i].Unit,
              num: 0,
              maxNum: res[i].Amount,
              isSelect: this.state.isAllSelect
            });
          }
          this.setState({
            page: this.state.page + 1,
            data: [...this.state.data, ...data]
          });
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      });
  }
  numChange(val, item, index) {
    //修改当前项的数量，如当前项已选中，则一并修改总价
    let data = this.state.data;
    let isSelect = item.isSelect;
    let totalPrice = this.state.totalPrice;
    //判断当前项是否选中
    if (isSelect) {
      //判断数量是增加还是减少，总价进行相应的调整
      if (data[index].num - val > 0) {
        totalPrice = parseFloat(
          (totalPrice - (data[index].num - val) * item.price).toFixed(2)
        );
      } else {
        totalPrice = parseFloat(
          (totalPrice + (val - data[index].num) * item.price).toFixed(2)
        );
      }
    }
    data[index].num = val;
    this.setState({
      data: data,
      totalPrice: totalPrice
    });
  }
  selectChange(e, item, index) {
    //修改当前项的选中状态，并修改全选状态以及总价
    let isSelect = e.target.checked;
    let data = this.state.data;
    let totalPrice = this.state.totalPrice;
    let isAllSelect = false;
    //修改当前项的选中状态
    data[index].isSelect = isSelect;
    //根据当前状态修改全选状态以及总价
    if (isSelect) {
      totalPrice = parseFloat((totalPrice + item.num * item.price).toFixed(2));
      let _isAllSelect = true;
      data.map(item => {
        if (!item.isSelect) {
          _isAllSelect = false;
          return;
        }
      });
      isAllSelect = _isAllSelect;
    } else {
      totalPrice = parseFloat((totalPrice - item.num * item.price).toFixed(2));
    }
    this.setState({
      data: data,
      totalPrice: totalPrice,
      isAllSelect: isAllSelect
    });
  }
  selectAllChange() {
    //修改全选状态，并根据全选状态，改变每一项的选中状态，并再次计算总价
    let data = this.state.data;
    let isAllSelect = !this.state.isAllSelect; //修改全选状态
    for (let i = 0; i < data.length; i++) {
      //根据全选状态，改变每一项的选中状态
      data[i].isSelect = isAllSelect;
    }
    this.setState(
      {
        isAllSelect: isAllSelect,
        data: data
      },
      () => {
        //根据选中的项再次计算总价
        isAllSelect
          ? this.changeTotalPrice()
          : this.setState({
              totalPrice: 0
            });
      }
    );
  }
  changeTotalPrice() {
    //计算总价
    let data = this.state.data;
    let totalPrice = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].isSelect) {
        totalPrice = parseFloat(
          (totalPrice + data[i].num * data[i].price).toFixed(2)
        );
      }
    }
    this.setState({
      totalPrice: totalPrice
    });
  }
  buy() {
    let list = [];
    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].isSelect) {
        if (this.state.data[i].num === 0) {
          Toast.info(
            "已勾选【" + this.state.data[i].title + "】但并未选择数量"
          );
          return;
        }
        list.push({
          CommodityID: this.state.data[i].id,
          BuyNum: this.state.data[i].num
        });
      }
    }
    if (list.length === 0) {
      Toast.info("请先勾选商品");
      return;
    }
    interfaces
      .BuyCommodity({
        UserID: localStorage.getItem("userId"),
        Commoditylist: list
      })
      .then(res => {
        Toast.info("下单成功");
        hashHistory.goBack();
      });
  }
  goToDetail(id) {
    this.props.save(this.state)
    hashHistory.push({
      pathname: "/wisdom/wuye/propertyStation/propertyDetail",
      state: { id: id }
    });
  }
  renderRow(item, index) {
    return (
      <List>
        <Item
          thumb={
            <div className="leftblock">
              <Checkbox
                checked={item.isSelect}
                onChange={e => {
                  this.selectChange(e, item, index);
                }}
              />
              <img
                src={item.img ? item.img : require("%/noImg.jpg")}
                alt=""
                onClick={() => {
                  this.goToDetail(item.id);
                }}
              />
            </div>
          }
          extra={
            <Stepper
              style={{ width: "100%" }}
              value={item.num}
              showNumber
              max={item.maxNum}
              min={0}
              onChange={val => {
                this.numChange(val, item, index);
              }}
            />
          }
          multipleLine
        >
          <div
            onClick={() => {
              this.goToDetail(item.id);
            }}
          >
            <span className="name">{item.title}</span>{" "}
            <Brief>
              <span className="amount"> {item.price + item.unit}</span>
            </Brief>
          </div>
        </Item>
      </List>
    );
  }
  onEndReached = () => {
    this.getData();
  };
  render() {
    const {
      data,
      page,
      rows,
      totalPrice,
      isAllSelect,
      dataSource
    } = this.state;
    return (
      <div className="appBox" style={{ overflow: "auto", height: "100%" }}>
        <Navigation title="物业驿站" />
        <div className="propertyStation">
          <ListView
            dataSource={dataSource.cloneWithRows(data)}
            style={{ height: "calc(100vh - 4.26667rem)", overflow: "auto" }}
            pageSize={rows}
            renderRow={(item, sectionID, index) => this.renderRow(item, index)}
            onEndReached={this.onEndReached}
          />
        </div>
        <div className="foodBox">
          <div className="selectd" style={{ justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              onClick={() => {
                this.selectAllChange();
              }}
            >
              {" "}
              <Checkbox
                style={{ marginRight: "0.42667rem" }}
                checked={isAllSelect}
              />{" "}
              全选{" "}
            </div>
            <div style={{ marginRight: "0.3rem" }}>
              总价：<span style={{ color: "#FF8400" }}>{totalPrice}元</span>
            </div>
          </div>
          <div
            className="forward"
            onClick={() => {
              this.buy();
            }}
          >
            下单
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state.propertyStation.data
  };
}
function dispatchToProps(dispatch) {
  return {
    save(payload) {
      dispatch({
        type: 'propertyStation/toSave',
        payload
      })
    }
  };
}

export default connect(mapStateToProps, dispatchToProps)(app);
