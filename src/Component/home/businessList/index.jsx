import React, { Component, PropTypes } from "react";
import { Carousel, WingBlank, ListView, Toast } from "antd-mobile";
import { Link } from "dva/router";
import SelectList from "@/util/selectList.jsx";
import Navigation from "@/util/navigation.jsx";
import { connect } from "dva";
import "./style.less";
import ImgElement from "@/util/imgElement";
import api from "@/api";

import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

class demo extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.state = {
      data: [],
      list: [],
      offset: "",
      visible: false,
      selectVal: "",
      pageIndex: 1,
      pageSize: 8,
      height: 0,
      imgHeight: 0,
      isLoading: true,
      selectTime: 2,  //1 升  2 降
      selecScale: 2,
      isMore: false,
      hyName: "所属行业",
      BannerList: [],
      OrderBy: "入驻时间",
      dataSource,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
    };
  }
  componentDidMount() {
    api.GetHomeBannerList({ Type: 2 }).then(res => {
      this.setState({
        BannerList: res
      });
    });
    api.GetIndustryList({}).then(res => {
      if (res && res.length > 0) {
        res.unshift({
          cValue: 0,
          cName: '全部',
          cText: '所属行业'
        })
      }
      api
        .GetEnterpriseList({
          EnterpriseName: "",
          Industry: res[0].cValue,
          OrderBy: this.state.OrderBy,
          pageIndex: this.state.pageIndex,
          pageSize: this.state.pageSize
        })
        .then(data => {
          //  console.log(data)
          if(!isEmpty(data)){
          const sh =
            document.documentElement.clientHeight ||
            plus.screen.resolutionHeight;
          const list = data || [];
          this.setState({
            data: res,
            dataSource: this.state.dataSource.cloneWithRows(list),
            height: sh - this.refs.listV.offsetTop,
            list,
            selectVal: res[0].cValue,
            isLoading: false,
            valType:1,
            isMore: list.length < this.state.pageSize ? false : true
          })}else if (this.state.valType == 0){
            this.setState({ valType: 2 });
          }
        });
    });
  }
  openSelect = e => {
    const offsetTop = e.target.offsetTop;
    console.log(offsetTop);
    if (!this.state.visible) {
      this.setState({
        offset: offsetTop,
        visible: true
      });
    } else {
      this.setState({
        visible: false
      });
    }
  };
  changeSelect = val => {
    console.log(1123, val);
    if (val) {
      api
        .GetEnterpriseList({
          EnterpriseName: "",
          Industry: val.cValue,
          OrderBy: this.state.OrderBy,
          pageIndex: 1,
          pageSize: this.state.pageSize
        })
        .then(data => {
          //  console.log(data)
          const list = data || [];
          this.setState({
            list,
            dataSource: this.state.dataSource.cloneWithRows(list),
            pageIndex: 1,
            selectVal: val.cValue,
            visible: false,
            hyName: val.cText,
            isLoading: false,
            isMore: list.length < this.state.pageSize ? false : true
          });
        });
    } else {
      this.setState({
        visible: false
      });
    }
  };
  handelrChange(type) {
    let selectType = '入驻时间';
    if (type === 'selectTime') {
      this.setState({
        selectTime: this.state.selectTime === 1 ? 2 : 1
      })
    }else {
      selectType = '企业规模';
      this.setState({
        selecScale: this.state.selecScale === 1 ? 2 : 1
      })
    }

    api.GetEnterpriseList({
      EnterpriseName: "",
      Industry: this.state.selectVal,
      OrderBy: selectType,
      OrderByMode: type === 'selectTime' ? (this.state.selectTime === 1 ? 2 : 1) : (this.state.selecScale === 1 ? 2 : 1),
      pageIndex: 1,
      pageSize: this.state.pageSize
    }).then(data => {
      //  console.log(data)
      const list = data || [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list),
        pageIndex: 1,
        OrderBy: selectType,
        list,
        visible: false,
        isLoading: false,
        OrderByMode: this.state.selectTime,
        isMore: list.length < this.state.pageSize ? false : true
      });
    });
  }
  loadError(e) {
    e.target.src = "http://47.112.21.206:8090/resources/banner.png";
  }
  onEndReached = event => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.isMore) {
      return;
    }
    console.log(this.state.pageIndex);

    api
      .GetEnterpriseList({
        EnterpriseName: "",
        Industry: this.state.selectVal,
        OrderBy: this.state.OrderBy,
        pageIndex: this.state.pageIndex + 1,
        pageSize: this.state.pageSize
      })
      .then(data => {
        //  console.log(data)
        const list = data || [];
        this.setState({
          list: [...this.state.list, ...list],
          dataSource: this.state.dataSource.cloneWithRows([
            ...this.state.list,
            ...list
          ]),
          pageIndex: this.state.pageIndex + 1,
          visible: false,
          isLoading: false,
          isMore: list.length < this.state.pageSize ? false : true
        });
      });
  };
  render() {
    const row = (rowData, rowKey) => {
      return (
        <Link
          to={{ pathname: "businessList/details", state: { ID: rowData.ID } }}
          className="itemBox"
        >
          <div className="item">
            <ImgElement url={rowData.Pic} width="3.15rem" height="3.15rem" />
            <div className="infos">
              <div className="titles">{rowData.EnterpriseName}</div>
              <div className="desc">{rowData.Introduction}</div>
            </div>
          </div>
          <div className="types">所属行业: {rowData.Industrystr}</div>
        </Link>
      );
    };
    const {valType} = this.state;
    return (
      <div className="appBox" style={{ height: "100%" }}>
        <Navigation title="企业名录" />
        <div style={{height: 'calc(100vh - 1.92rem)', overflow: 'hidden'}}>
          <WingBlank>
            <Carousel
              autoplay
              infinite
              dots
              autoplayInterval="5000"
              dotStyle={{ marginBottom: 10 }}
              dotActiveStyle={{ marginBottom: 10, backgroundColor: "#FFF" }}
            >
              {this.state.BannerList.map(val => (
                <div
                  key={val}
                  style={{
                    display: "inline-block",
                    width: "100%",
                    height: this.state.imgHeight
                  }}
                >
                  <img
                    src={val.FullPhoto}
                    alt=""
                    style={{ width: "100%", height: '150px', verticalAlign: "top" }}
                    onError={this.loadError}
                    onLoad={() => {
                      this.setState({ imgHeight: "150px" });
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </WingBlank>
          <div className="toolOptions">
            <div
              className="selectItem"
              onClick={this.openSelect}
            >
              {this.state.hyName}{" "}
              <div className="onTrangle" style={{marginTop: "0.1rem", marginLeft: "0.46rem" }}></div>
            </div>

            <div className="selectItem">
              <span>入驻时间</span>
              <div className="doubleTrangle" onClick={this.handelrChange.bind(this, 'selectTime')}>
                <div className={this.state.selectTime === 1 ? "onDownTrangle" : 'offDownTrangle'}></div>
                <div className={this.state.selectTime === 2 ? "onTrangle" : 'offTrangle'}></div>
              </div>
            </div>

            <div className="selectItem" style={{borderRight: 0}}>
              <span>企业规模</span>
              <div className="doubleTrangle" onClick={this.handelrChange.bind(this, 'selecScale')}>
                <div className={this.state.selecScale === 1 ? "onDownTrangle" : 'offDownTrangle'}></div>
                <div className={this.state.selecScale === 2 ? "onTrangle" : 'offTrangle'}></div>
              </div>
            </div>

          </div>

          <div className="content" style={{padding: '0 0.52rem'}} ref="listV">
            <SelectList
              names="cName"
              list={this.state.data}
              triggerOffset={this.state.offset + 5}
              onOpenChanged={this.changeSelect}
              isOpen={this.state.visible}
            />
              {
                valType == 1 ?
                (
                  <ListView
                    dataSource={this.state.dataSource}
                    renderRow={row}
                    style={{
                      height: this.state.height,
                      overflow: "auto"
                    }}
                    pageSize={4}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                  />
                ):(
                 <UnData/>
                )
              }
              <div className="itemBox"></div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    data: state.demo.data,
    loading: !!state.loading.models.demo
  };
}

function dispatchToProps(dispatch) {
  return {
    requerData(payload = {}) {
      dispatch({
        type: "demo/queryList",
        payload
      });
    }
  };
}
export default connect(mapStateToProps, dispatchToProps)(demo);
