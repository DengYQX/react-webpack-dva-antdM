// 物业服务----物业放行
import React, { Component } from "react";
import { WhiteSpace, ListView } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation";
import "./paidService.less";
import interfaces from "@/api/index";
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

class MoveThing extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      list: [],
      page: 1,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      rows: 10
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    interfaces
      .GetPaidSerivcesList({
        keyword: "",
        pageIndex: this.state.page,
        pageSize: this.state.rows
      })
      .then(res => {
        if (res && res.length > 0) {
          let list = [];
          for (let i = 0; i < res.length; i++) {
            list.push({
              id: res[i].ID,
              img: res[i].Pic,
              title: res[i].ServicesName,
              laborFee: res[i].LaborFee,
              laborFeeUnit: res[i].Unit
            });
          }
          this.setState({
            valType:1,
            page: this.state.page + 1,
            list: [...this.state.list, ...list]
          });
        }else if (this.state.valType == 0){
          this.setState({ valType: 2 });
        }
      });
  }
  goDetails(id) {
    hashHistory.push({ pathname: "/paidDetails", state: { id: id } });
  }
  renderRow(item) {
    return (
      <div>
        <WhiteSpace />
        <div className="paid_card">
          <img src={item.img ? item.img : require("%/noImg.jpg")} alt="" />
          <div className="card_content">
            <p>{item.title}</p>
            <p className="price">{'人工费：'}<span style={{color: '#FF8400'}}>{item.laborFee + "元/" + item.laborFeeUnit}</span></p>
          </div>
          <div
            className="service_btn"
            onClick={() => {
              this.goDetails(item.id);
            }}
          >
            申请服务
          </div>
        </div>
      </div>
    );
  }
  onEndReached = () => {
    this.getData();
  };
  render() {
    const { dataSource, list, rows,valType } = this.state;
    return (
      <div className="paid_service">
        <Navigation title="有偿服务" />
        <div className="paid_service_main">
        {
          valType == 1 ?
          (
          <ListView
            dataSource={dataSource.cloneWithRows(list)}
            style={{ height: "calc(100vh - 1.92rem)", overflow: "auto" }}
            pageSize={rows}
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

export default MoveThing;
