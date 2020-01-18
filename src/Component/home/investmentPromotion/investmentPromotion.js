import React, { Component, PropTypes } from 'react';
import { Popover, ListView } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import './investmentPromotion.less';
import { hashHistory } from 'dva/router';
import interfaces from '@/api/index'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

class InvestmentPromotion extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      area: false,
      areaData: [],
      areaSelectItem: null,
      floor: false,
      floorData: [],
      floorSelectItem: null,
      renovation: false,
      renovationData: [],
      renovationSelectItem: null,
      list: [],
      page: 1,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      rows: 10
    };
  }
  componentDidMount() {
    this.getData()
    this.getDropDownData()
  }
  getData() {
    let params = {
      pageIndex: this.state.page,
      pageSize: this.state.rows,
      Area: this.state.areaSelectItem ? this.state.areaSelectItem.value : 0,
      BuildID: this.state.floorSelectItem ? this.state.floorSelectItem.value : 0,
      Decoration: this.state.renovationSelectItem ? this.state.renovationSelectItem.value : 0,
      Status: 0
    }
    interfaces.GetShopManageList(params).then(res=>{
      this.setState({
        page: this.state.page+1
      })
      if (res && res.length > 0) {
        let list = []
        for (let i=0; i<res.length; i++) {
          list.push({
            id: res[i].ID,
            url: res[i].Pic
          })
        }
        this.setState({
            valType:1,
            list:[...this.state.list, ...list]
        })
      }else if (this.state.valType == 0){
        this.setState({ valType: 2 });
      }
    })
  }
  getDropDownData() {
    let areaData = []
    let floorData = []
    let renovationData = []
    interfaces.GetShopAreaList({}).then(res=>{
      areaData.push({
        label: '全部面积',
        value: 0
      })
      if (res && res.length > 0) {
        for (let i=0; i<res.length; i++) {
          areaData.push({
            label: res[i].cName,
            value: parseFloat(res[i].cValue)
          })
        }
      }
      this.setState({
        areaData
      })
    })
    interfaces.GetBuildList({}).then(res=>{
      floorData.push({
        label: '全部楼栋',
        value: 0
      })
      if (res && res.length > 0) {
        for (let i=0; i<res.length; i++) {
          floorData.push({
            label: res[i].BuildNo,
            value: res[i].ID
          })
        }
      }
      this.setState({
        floorData
      })
    })
    interfaces.GetShopDecorationList({}).then(res=>{
      renovationData.push({
        label: '全部装修',
        value: 0
      })
      if (res && res.length > 0) {
        for (let i=0; i<res.length; i++) {
          renovationData.push({
            label: res[i].cName,
            value: parseFloat(res[i].cValue)
          })
        }
      }
      this.setState({
        renovationData
      })
    })
  }
  onSelectArea = (opt) => {
    this.setState({
      areaSelectItem: opt.props.value,
      area: false,
      list: [],
      page: 1
    }, ()=>{
      this.getData()
    });
  };
  onSelectFloor = (opt) => {
    this.setState({
      floorSelectItem: opt.props.value,
      floor: false,
      list: [],
      page: 1
    }, ()=>{
      this.getData()
    });
  };
  onSelectRenovation = (opt) => {
    this.setState({
      renovationSelectItem: opt.props.value,
      renovation: false,
      list: [],
      page: 1
    }, ()=>{
      this.getData()
    });
  };
  promotionDetails(id) {
    hashHistory.push({ pathname: '/promotionDetails', state: {id: id} })
  }
  renderRow(item) {
    return (
      <div className="img_box" onClick={this.promotionDetails.bind(this,item.id)}>
        <img src={item.url?item.url:require('%/noImg.jpg')} alt=""/>
        <div className="look">点击查看</div>
      </div>
    )
  }
  onEndReached = () => {
    this.getData()
  }
  render() {
    let { areaData, areaSelectItem, floorData, floorSelectItem, renovationData, renovationSelectItem,valType } = this.state
    return (
      <div className="investment_promotion">
        <Navigation title="招商入驻" />
        <div className="select_list">
          <Popover
            mask
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.area}
            overlay={[
              areaData.map((item, index)=>{
                return (
                  <Popover.Item key={index} value={item}>{item.label}</Popover.Item>
                )
              })
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [10, 10],
            }}
            onSelect={this.onSelectArea}
            placement='bottomLeft'
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              {areaSelectItem ? areaSelectItem.label : '全部面积'}
              <div className="investment_promotion_arrowDown"></div>
            </div>
          </Popover>
          <Popover
            mask
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.floor}
            overlay={[
              floorData.map((item, index)=>{
                return (
                  <Popover.Item key={index} value={item}>{item.label}</Popover.Item>
                )
              })
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [10, 10],
            }}
            onSelect={this.onSelectFloor}
            placement='bottomLeft'
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              {floorSelectItem ? floorSelectItem.label : '全部楼栋'}
              <div className="investment_promotion_arrowDown"></div>
            </div>
          </Popover>
          <Popover
            mask
            overlayStyle={{ color: 'currentColor' }}
            visible={this.state.renovation}
            overlay={[
              renovationData.map((item, index)=>{
                return (
                  <Popover.Item key={index} value={item}>{item.label}</Popover.Item>
                )
              })
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 10],
            }}
            onSelect={this.onSelectRenovation}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              display: 'flex',
              alignItems: 'center',
            }}
            >
              {renovationSelectItem ? renovationSelectItem.label : '全部装修'}
              <div className="investment_promotion_arrowDown"></div>
            </div>
          </Popover>
        </div>
        <div className="content_box">
          {
            valType == 1 ?
            (
          <ListView
              dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
              style={{ height: 'calc(100vh - 3.797333rem)', overflow: 'auto' }}
              pageSize={this.state.rows}
              renderRow={(item) => this.renderRow(item)}
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

export default InvestmentPromotion;