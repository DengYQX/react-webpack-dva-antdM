//省市区政策
import React, { Component } from "react";
import { hashHistory } from "react-router";
import { Link } from "dva/router";
import Navigation from "@/util/navigation";
import { Button, Tabs, WhiteSpace, ListView, List } from "antd-mobile";
import UnData from "@/Component/unData";
import { isEmpty } from "@/util/common";
import "./province.less";

import interfaces from "@/api/index";
const Item = List.Item;

class Province extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      list7: [],
      list8: [],
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      page5: 1,
      page6: 1,
      page7: 1,
      page8: 1,
      isMore1: true,
      isMore2: true,
      isMore3: true,
      isMore4: true,
      isMore5: true,
      isMore6: true,
      isMore7: true,
      isMore8: true,
      tab: 1,
      valType: 0 /**是否获取到值  0初始化  1获取到  2未获取 */,
      pageSize: 10
    };
  }
  componentDidMount() {
    this.getList();
  }
  /**
   * GetProvinceCityPolicyList 企业服务-政策服务-省市区政策
   * @author xiaoDai
   * @param {int} UserID [用户ID]
   * @param {string} Status [状态(0：全部，1：招聘中，2：停止招聘)]
   * @param {int} pageIndex [页码]
   * @param {int} pageSize [查询条数]
   * @return [省市区政策]
   */
  getList() {
    if (this.state["isMore" + this.state.tab]) {
      interfaces
        .GetProvinceCityPolicyList({
          Type: this.state.tab,
          pageIndex: this.state["page" + this.state.tab],
          pageSize: this.state.pageSize
        })
        .then(res => {
          if (res && res.length > 0) {
            this.setState({
              valType: 1,
              ["list" + this.state.tab]: [
                ...this.state["list" + this.state.tab],
                ...res
              ],
              ["page" + this.state.tab]:
                this.state["page" + this.state.tab] + 1,
              ["isMore" + this.state.tab]:
                res.length < this.state.pageSize ? false : true
            });
          } else {
            this.setState({ valType: 2 });
          }
        })
        .catch(() => {
          this.setState({ valType: 2 });
        });
    }
  }
  clickSingle = e => {
    hashHistory.push({ pathname: "/provinceInfor", state: { data: e } });
  };
  //切换Tab时候，更换type
  changeTab(tab, index) {
    this.setState(
      {
        tab: index + 1
      },
      () => {
        this.getList();
      }
    );
  }
  renderRow(item) {
    return (
      <List className="itemBox">
        <div arrow="horizontal" onClick={this.clickSingle.bind(this, item)}>
          <div className="card">
            <div className="poverty_alleviation_img">
              <img src={item.Pic} />
            </div>
            <div className="card_text">
              <div className="card_title">
                <div>{item.Title}</div>
                {item.Statusstr == "已公示" ? (
                  <span>{item.Statusstr}</span>
                ) : null}
              </div>
              <div className="card_content">{item.PolicyClause}</div>
            </div>
          </div>
        </div>
      </List>
    );
  }
  onEndReached = () => {
    this.getList();
  };

  /** 组件挂载 */
  render() {
    const tabs2 = [
      { title: "商务", sub: 1 },
      { title: "人社", sub: 2 },
      { title: "工信局", sub: 3 },
      { title: "科技", sub: 4 },
      { title: "文旅", sub: 5 },
      { title: "发展", sub: 6 },
      { title: "人才", sub: 7 },
      { title: "金融", sub: 8 }
    ];
    const { valType } = this.state;
    return (
      <div className="province">
        <Navigation title="省市区政策" />
        <WhiteSpace />
        <Tabs
          tabs={tabs2}
          initialPage={0}
          tabBarPosition="top"
          renderTab={tab => <span>{tab.title}</span>}
          onChange={(tab, index) => {
            this.changeTab(tab, index);
          }}
        >
          {valType == 1 || !this.state["isMore" + this.state.tab] ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map(() => {
              return (
                <div style={{ marginTop: "10px", minHeight: "50vh" }}>
                  <ListView
                    dataSource={this.state.dataSource.cloneWithRows(
                      this.state["list" + this.state.tab]
                    )}
                    style={{
                      height: "calc(100vh - 1.92rem)",
                      overflow: "auto"
                    }}
                    pageSize={this.state.pageSize}
                    renderRow={item => this.renderRow(item)}
                    onEndReached={this.onEndReached}
                  />
                </div>
              );
            })
          ) : (
            <UnData />
          )}
        </Tabs>
        <WhiteSpace />
      </div>
    );
  }
}

export default Province;
