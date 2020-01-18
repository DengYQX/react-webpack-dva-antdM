//精准扶贫
import React, { Component, PropTypes } from "react";
import { hashHistory } from "react-router";
import { NavBar, Icon, Carousel, WhiteSpace, ListView } from "antd-mobile";
import "./povertyAlleviation.less"; //样式文件
import povertyAlleviationBanner from "%/povertyAlleviationBanner.png";
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
import interfaces from "@/api/index";

class PovertyAlleviation extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      dataSource: ds,
      list: [],
      data: [],
      imgHeight: 140,
      page: 1,
      isMore: true, // 是否加载
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      pageSize: 10
    };
  }

  componentDidMount() {
    this.getData();
    this.getBanner()
  }

  getData() {
    if (this.state.isMore) {
      //OrganizersCompany--举办单位（1：园内举办、2：外围举办）查所有传0
      //Status--活动状态(1:近斯将举办，2:进行中，3:已结束)查看所有传0
      //Types	活动类别(1：园区活动、2：精准扶贫、3：行业活动、4：人才培训)查所有传0
      interfaces
        .GetParkActivitiesList({
          Types: "2",
          OrganizersCompany: 0,
          Status: 0,
          pageIndex: this.state.page,
          pageSize: this.state.pageSize
        })
        .then(res => {
          if (res && res.length > 0) {
            res.forEach(element => {
              element.RegistEndTime = element.RegistEndTime.split(" ")[0];
              element.RegistStartTime = element.RegistStartTime.split(" ")[0];
            });
            this.setState({
              list: [...this.state.list, ...res],
              valType:1,
              page: this.state.page + 1,
              isMore: res.length < this.state.pageSize ? false : true
            });
          }else if (this.state.valType == 0){
            this.setState({ valType: 2 });
          }
        });
    }
  }
  getBanner() {
    interfaces.GetHomeBannerList({
      Type: 3
    }).then(res=>{
      let data = []
      if (res && res.length > 0) {
        for (let i=0; i<res.length; i++) {
          data.push(res[i].FullPhoto)
        }
      }
      this.setState({
        data: data
      })
    })
  }
  onEndReached = () => {
    this.getData();
  };

  // 详情
  activeInfo(e) {
    hashHistory.push({ pathname: "/activeInfo", state: { data: e } });
  }
  renderRow(item) {
    return (
      <div>
        <WhiteSpace style={{ background: "#F6F8FA" }} />
        <div className="card" onClick={this.activeInfo.bind(this, item)}>
          <div className="poverty_alleviation_img">
            <img src={item.Pic ? item.Pic : require("%/noImg.jpg")} alt="" />
          </div>

          <div className="card_text">
            <div className="card_title">{item.Title}</div>
            <div className="card_content">{item.Content}</div>
            <div className="card_time">
              报名时间:{item.RegistStartTime}-{item.RegistEndTime}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const {valType} = this.state;
    return (
      <div className="poverty_alleviation">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={() => hashHistory.goBack()}
        >
          精准扶贫
        </NavBar>
        {
          valType == 1 ?
          (
            <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
              renderHeader={() => {
                return this.state.data.length > 0 ? (
                  <Carousel autoplay infinite>
                    {this.state.data.map(val => (
                      <a
                        key={val}
                        style={{
                          display: "inline-block",
                          width: "100%",
                          height: this.state.imgHeight
                        }}
                      >
                        <img
                          src={val}
                          alt=""
                          style={{
                            width: "100%",
                            verticalAlign: "top",
                            height: "150px"
                          }}
                          onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event("resize"));
                            this.setState({ imgHeight: "150px" });
                          }}
                        />
                      </a>
                    ))}
                  </Carousel>
                ) : null;
              }}
              style={{ height: "calc(100vh - 1.92rem)", overflow: "auto" }}
              pageSize={this.state.pageSize}
              renderRow={item => this.renderRow(item)}
              onEndReached={this.onEndReached}
            />
            ): valType === 2 ? (<UnData/>): null
          }
      </div>
    );
  }
}

export default PovertyAlleviation;
