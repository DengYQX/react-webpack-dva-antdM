import React, { Component, PropTypes } from "react";
import { Tabs, ListView } from "antd-mobile";
import { hashHistory } from "react-router";
import Navigation from "@/util/navigation.jsx";
import interfaces from "@/api/index";
import "./mynews.less";
import povertyAlleviationImg from "%/povertyAlleviationImg.png"; // 图片
import UnData from "@/Component/unData";

class MyNews extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      list1: [],
      page1: 1,
      rows1: 10,
      dataSource1: ds,
      isMore1: true, // 是否加载
      list2: [],
      page2: 1,
      rows2: 10,
      dataSource2: ds,
      isMore2: true, // 是否加载
      list3: [],
      page3: 1,
      rows3: 10,
      dataSource3: ds,
      isMore3: true, // 是否加载
    };
  }
  componentDidMount() {
    this.getMessageNoticeList();
  }
  getMessageNoticeList() {
    if(this.state.isMore1) {
      interfaces
        .GetMessageNoticeList({
          UserId: localStorage.getItem("userId"),
          pageIndex: this.state.page1,
          pageSize: this.state.rows1
        })
        .then(res => {
          if (res && res.length > 0) {
            let list1 = [];
            for (let i = 0; i < res.length; i++) {
              list1.push({
                id: res[i].ID,
                title: res[i].Title,
                time: res[i].dCreateTime,
                text: res[i].Contents,
                isRead: res[i].IsRead
              });
            }
            this.setState({
              page1: this.state.page1 + 1,
              list1: [...this.state.list1, ...list1],
              isMore1: list1.length < this.state.rows1 ? false : true
            });
          }
        });
    }
  }
  getMessageNeedList(type) {
    if(this.state["isMore" + (type + 1)]) {
      let opt = {
        1: {
          list: this.state.list2,
          page: this.state.page2,
          rows: this.state.rows2
        },
        2: {
          list: this.state.list3,
          page: this.state.page3,
          rows: this.state.rows3
        }
      };
      interfaces
        .GetMessageNeedList({
          UserId: localStorage.getItem("userId"),
          States: type,
          pageIndex: opt[type].page,
          pageSize: opt[type].rows
        })
        .then(res => {
          if (res && res.length > 0) {
            let list = [];
            for (let i = 0; i < res.length; i++) {
              list.push({
                id: res[i].MasterId,
                imgsrc: res[i].ImgUrl,
                name: res[i].Title,
                text: res[i].Contents,
                time: res[i].Times,
                type: res[i].Type,
                states: res[i].States
              });
            }
            let params = {
              ["page" + (type + 1)]: opt[type].page + 1,
              ["list" + (type + 1)]: [...opt[type].list, ...list],
              ["isMore" + (type + 1)]: list.length < opt[type].rows ? false : true
            };
            this.setState(params);
          }
        });
    }
  }
  // 消息详情
  goDateils(item) {
    hashHistory.push({
      pathname: "/myMessage/details",
      state: { item: item }
    });
  }
  //待办已办详情
  goStayDetalis(item) {
    hashHistory.push({
      pathname: "/myMessage/staydetalis",
      state: { id: item.id, type: item.type }
    });
  }
  handlerAction(item) {
    if (item.type === 1) {
      hashHistory.push({
        pathname: "/myMessage/staydetalis",
        state: { id: item.id, type: item.type }
      });
    }
    if (item.type === 2) {
      hashHistory.push({
        pathname: "/userAuthor",
        state: {...item}
      });
    }
    if (item.type === 3 || item.type === 4) {
      hashHistory.push({
        pathname: "/orderManageInfor",
        state: { id: item.id, category: item.type === 3 ? 1 : 2}
      });
    }
  }
  changeTab = (tab, index) => {
    if (index === 1 && this.state.list2.length === 0) {
      this.getMessageNeedList(1);
    } else if (index === 2 && this.state.list3.length === 0) {
      this.getMessageNeedList(2);
    }
  };
  renderRow1(item) {
    return (
      <div>
        <div
          className="news_box"
          onClick={() => {
            this.goDateils(item);
          }}
        >
          <div className="item_top">
            <div className="item_top_left">
              <div
                className="dot"
                style={item.isRead ? null : { backgroundColor: "#00A0E9" }}
              ></div>
              <div>{item.title}</div>
            </div>
            <div className="item_top_right">{item.time}</div>
          </div>
          <div className="item_buttom text_rule">{item.text}</div>
        </div>
      </div>
    );
  }
  renderRow2(item) {
    return (
      <div className="tab2" onClick={this.handlerAction.bind(this, item)}>
        <div className="tab2_left">
          <img src={item.imgsrc ?item.imgsrc:require('%/noImg.jpg')} />
        </div>
        <div className="tab2_right">
          <div className="name">{item.name}</div>
          <div className="text text_rule">{item.text}</div>
          <div className="time">{item.time}</div>
        </div>
      </div>
    );
  }
  renderRow3(item) {
    return (
      <div className="tab2" onClick={this.goStayDetalis.bind(this, item)}>
        <div className="tab2_left">
          <img src={item.imgsrc ?item.imgsrc:require('%/noImg.jpg')} />
        </div>
        <div className="tab2_right">
          <div className="name">{item.name}</div>
          <div className="text text_rule">{item.text}</div>
          <div className="time">{item.time}</div>
        </div>
      </div>
    );
  }
  onEndReached1 = () => {
    this.getMessageNoticeList();
  };
  onEndReached2 = () => {
    this.getMessageNeedList(1);
  };
  onEndReached3 = () => {
    this.getMessageNeedList(2);
  };
  render() {
    const {
      dataSource1,
      rows1,
      dataSource2,
      rows2,
      dataSource3,
      rows3
    } = this.state;
    const tabs = [{ title: "消息通知" }, { title: "待办" }, { title: "已办" }];
    return (
      <div className="mynews">
        <Navigation title="我的消息" />
        <Tabs tabs={tabs} initialPage={0} onChange={this.changeTab}>
          <div className="box_1">
            {
              this.state.list1.length < 1 && this.state.page1 === 1 ? <UnData /> : 
                <ListView
                dataSource={dataSource1.cloneWithRows(this.state.list1)}
                style={{ height: "100%", overflow: "auto" }}
                pageSize={rows1}
                renderRow={item => this.renderRow1(item)}
                onEndReached={this.onEndReached1}
              />
            }
          </div>
          <div className="box_2">
             {
              this.state.list2.length < 1 && this.state.page2 === 1 ? <UnData /> : 
              <ListView
                dataSource={dataSource2.cloneWithRows(this.state.list2)}
                style={{ height: "100%", overflow: "auto" }}
                pageSize={rows2}
                renderRow={item => this.renderRow2(item)}
                onEndReached={this.onEndReached2}
              />
            }
          </div>
          <div className="box_2">
            {
              this.state.list3.length < 1 && this.state.page3 === 1 ? <UnData /> : 
              <ListView
                dataSource={dataSource3.cloneWithRows(this.state.list3)}
                style={{ height: "100%", overflow: "auto" }}
                pageSize={rows3}
                renderRow={item => this.renderRow3(item)}
                onEndReached={this.onEndReached3}
              />
            }
          </div>
        </Tabs>
      </div>
    );
  }
}
export default MyNews;
