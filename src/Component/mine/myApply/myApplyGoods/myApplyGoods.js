import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, WhiteSpace, Popover, ListView } from 'antd-mobile';
import './myApplyGoods.less' //样式文件
import screen from '%/screen.png';
import accounting from '%/accounting.png';
import UnData from "@/Component/unData";
import interfaces from '@/api/index'

class MyApplyGoods extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      list: [],
      visible: false,
      states: 0,
      pageIndex: 1,
      pageSize: 10,
      isMore: true, // 是否加载
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    const { states, pageIndex, pageSize, isMore } = this.state
    if(isMore) {
      interfaces.GetMyArticlesReleaseList({userid: localStorage.getItem('userId'), states, pageIndex, pageSize}).then(res => {
        if(res && res.length > 0){
          this.setState({
            pageIndex: pageIndex+1,
            list:[...this.state.list, ...res],
            isMore: res.length < pageSize ? false : true
          })
        }
      })
    }
  }

  // 发布详情
  goodsDetails(item) {
    hashHistory.push({ pathname: '/goodsDetails', state: { data : item }})
  }

  onSelect(opt) {
    //console.log(opt.props.value);
    this.setState({
      visible: false,
      isMore: true,
      pageIndex: 1,
      states: opt.props.value,
      list: [],
    }, () => {
      console.log('数据')
      this.getData()
    });
  };

  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  };

  onEndReached = () => {
    this.getData()
  }

  renderRow(item) {
    return (
      <div>
        <div className="card" onClick={this.goodsDetails.bind(this,item)}>
          <img style={{width: '3.627rem' ,height: '3.627rem'}} src={item.ImgUrl?item.ImgUrl:require('%/noImg.jpg')} alt=""/>
          <div className="card_text">
            <div className="card_title">
              <span>申请人:{item.UName}
                {item.States == 1 ? <i className="recruit bgcolor1">企业审核中</i> : 
                item.States == 2 ? <i className="recruit bgcolor1">物业审核中</i> : 
                item.States == 3 ? <i className="recruit bgcolor3">待放行</i> : 
                item.States == 4 ? <i className="recruit bgcolor4">已放行</i> : 
                item.States == 5 ? <i className="recruit bgcolor5">已过期</i> : 
                item.States == 6 ? <i className="recruit bgcolor6">已拒绝</i> : ''}
              </span>
            </div>
            <div className="card_content">{item.ApplyContent}</div>
            <div className="card_time">
              <span>迁出时间:{item.ApplyTime}</span>
            </div>
          </div>
        </div>
        <WhiteSpace />
      </div>
    )
  }

  render() {
    const { dataSource, pageSize } = this.state
    return (
      <div className='my_apply_goods'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          rightContent={
            <Popover mask
              overlayClassName="fortest"
              overlayStyle={{ color: 'currentColor' }}
              visible={this.state.visible}
              overlay={[
                (<Popover.Item key="0" value="0" data-seed="logId">全部状态</Popover.Item>),
                (<Popover.Item key="1" value="1" data-seed="logId">企业审核中</Popover.Item>),
                (<Popover.Item key="2" value="2" style={{ whiteSpace: 'nowrap' }}>物业审核中</Popover.Item>),
                (<Popover.Item key="3" value="3"><span style={{ marginRight: 5 }}>待放行</span></Popover.Item>),
                (<Popover.Item key="4" value="4"><span style={{ marginRight: 5 }}>已放行</span></Popover.Item>),
                (<Popover.Item key="5" value="5"><span style={{ marginRight: 5 }}>已过期</span></Popover.Item>),
                (<Popover.Item key="6" value="6"><span style={{ marginRight: 5 }}>已拒绝</span></Popover.Item>),
              ]}
              align={{
                overflow: { adjustY: 0, adjustX: 0 },
                offset: [-10, 0],
              }}
              onVisibleChange={this.handleVisibleChange.bind(this)}
              onSelect={this.onSelect.bind(this)}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <img src={screen} alt=""/>
              </div>
            </Popover>
          }
          className="goods_title"
        >物品放行申请记录</NavBar>
        <WhiteSpace size="xs" />
        {this.state.list.length < 1 && this.state.pageIndex === 1 ?  <UnData /> :  <ListView
          dataSource={dataSource.cloneWithRows(this.state.list)}
          style={{ height: '100%', overflow: 'auto' }}
          pageSize={pageSize}
          renderRow={(item) => this.renderRow(item)}
          onEndReached={this.onEndReached}
        /> }
       
      </div>
    )
  }

}

export default MyApplyGoods;