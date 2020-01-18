//个人中心-物业工作台---物品放行--只有物业人员有权限进入
import React, { Component } from "react";
import { hashHistory } from "react-router";
import { Icon, Popover, Tabs, NavBar, ListView } from "antd-mobile";
import interfaces from "@/api/index";
import "../myWorkDesk.less";
import "./orderManage.less";
import screen from "%/screen.png";

class OrderManage extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource1: ds,
      dataSource2: ds,
      tabs: [
        { title: "待处理", sub: "1" },
        { title: "已处理", sub: "2" }
      ],
      changeTab: { title: "待处理", sub: "1" }, //当前切换tab获取的值
      selectData: [
        { value: "0", label: "全部类别" },
        { value: "1", label: "装修工单" },
        { value: "2", label: "报修工单" }
      ],
      selected: "0",
      //待处理
      beginPass: [],
      //已处理
      overPass: [],
      page1: 1,
      rows1: 10,
      page2: 1,
      rows2: 10
    };
  }
  componentDidMount() {
    this.getData(1);
  }
  getData(type) {
    interfaces
      .GetWorkOrderManageList({
        Category: this.state.selected,
        status: type,
        pageIndex: type == 1 ? this.state.page1 : this.state.page2,
        pageSize: type == 1 ? this.state.rows1 : this.state.rows2
      })
      .then(res => {
        if (res && res.length > 0) {
          let data = [];
          for (let i = 0; i < res.length; i++) {
            data.push({
              id: res[i].ID,
              img: res[i].Pic,
              company: res[i].CompanyName,
              number: res[i].Category == 1 ? "装修工单" : "报修工单",
              time: "派单时间:" + res[i].OrderTime,
              state: this.state.tabs[type - 1].sub,
              category: res[i].Category
            });
          }
          let params = {};
          if (type == 1) {
            params.page1 = this.state.page1 + 1;
            params.beginPass = [...this.state.beginPass, ...data];
          } else {
            params.page2 = this.state.page1 + 1;
            params.overPass = [...this.state.overPass, ...data];
          }
          this.setState(params);
        }
      });
  }
  changTab(index) {
    this.setState({
      changeTab: index
    });
    if (index.sub == 1) {
      if (this.state.beginPass.length == 0) {
        this.getData(1);
      }
    } else {
      if (this.state.overPass.length == 0) {
        this.getData(2);
      }
    }
  }

  //点击单个查看详情
  clickSingle(item) {
    hashHistory.push({
      pathname: "/orderManageInfor",
      state: { id: item.id, category: item.category }
    });
  }

  onSelect(opt) {
    this.setState(
      {
        visible: false,
        selected: opt.props.value,
        beginPass: [],
        overPass: [],
        page1: 1,
        page2: 1
      },
      () => {
        this.getData(this.state.changeTab.sub);
      }
    );
  }

  handleVisibleChange(visible) {
    this.setState({
      visible
    });
  }

  // 去反馈
  goFeedback(item, e) {
    e.stopPropagation();
    hashHistory.push({
      pathname: "/feedback",
      state: { id: item.id, category: item.category }
    });
  }
  renderRow1(item) {
    return (
      <div
        className="passingThing_list"
        onClick={this.clickSingle.bind(this, item)}
      >
        <div className="passingThing_list_img">
          <img src={item.img ? item.img : require("%/noImg.jpg")} />
        </div>
        <div className="passingThing_list_text">
          <p className="passingThing_list_company">{item.company}</p>
          <p className="passingThing_list_number">
            工单类型:{item.number}{" "}
            <span
              className="passingThing_list_span"
              onClick={this.goFeedback.bind(this, item)}
            >
              去反馈
            </span>{" "}
          </p>
          <p className="passingThing_list_time">{item.time}</p>
        </div>
      </div>
    );
  }
  renderRow2(item) {
    return (
      <div
        className="passingThing_list"
        onClick={this.clickSingle.bind(this, item)}
      >
        <div className="passingThing_list_img">
          <img src={item.img ? item.img : require("%/noImg.jpg")} />
        </div>
        <div className="passingThing_list_text">
          <p className="passingThing_list_company">{item.company}</p>
          <p className="passingThing_list_number">工单类型:{item.number} </p>
          <p className="passingThing_list_time">{item.time}</p>
        </div>
      </div>
    );
  }
  onEndReached1() {
    this.getData(1);
  }
  onEndReached2() {
    this.getData(2);
  }
  render() {
    const {
      tabs,
      selectData,
      visible,
      dataSource1,
      dataSource2,
      beginPass,
      overPass,
      rows1,
      rows2
    } = this.state;
    return (
      <div className="passingThing order_manage">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => hashHistory.goBack()}
          rightContent={
            <Popover
              mask
              overlayClassName="fortest"
              overlayStyle={{ color: "currentColor" }}
              visible={visible}
              overlay={[
                <Popover.Item
                  key={selectData[0].value}
                  value={selectData[0].value}
                >
                  {selectData[0].label}
                </Popover.Item>,
                <Popover.Item
                  key={selectData[1].value}
                  value={selectData[1].value}
                >
                  {selectData[1].label}
                </Popover.Item>,
                <Popover.Item
                  key={selectData[2].value}
                  value={selectData[2].value}
                >
                  {selectData[2].label}
                </Popover.Item>
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0]
              }}
              onVisibleChange={this.handleVisibleChange.bind(this)}
              onSelect={this.onSelect.bind(this)}
            >
              <div
                style={{
                  height: "100%",
                  padding: "0 15px",
                  marginRight: "-15px",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <img src={screen} alt="" />
              </div>
            </Popover>
          }
          className="goods_title"
        >
          工单管理
        </NavBar>
        <div style={{ height: "calc(100vh - 1.92rem)" }}>
          <Tabs
            tabs={tabs}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
            onChange={this.changTab.bind(this)}
          >
            <ListView
              dataSource={dataSource1.cloneWithRows(beginPass)}
              style={{ height: "100%", overflow: "auto" }}
              pageSize={rows1}
              renderRow={item => this.renderRow1(item)}
              onEndReached={() => {
                this.onEndReached1();
              }}
            />
            <ListView
              dataSource={dataSource2.cloneWithRows(overPass)}
              style={{ height: "100%", overflow: "auto" }}
              pageSize={rows2}
              renderRow={item => this.renderRow2(item)}
              onEndReached={() => {
                this.onEndReached2();
              }}
            />
          </Tabs>
        </div>
      </div>
    );
  }
}

export default OrderManage;
