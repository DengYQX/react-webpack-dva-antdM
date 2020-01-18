import React, { Component, PropTypes } from 'react';
import { Carousel, WingBlank, NavBar, Icon } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import { connect } from 'dva'
import './index.less';

class demo extends Component {
  constructor(props) {
    super(props);
    const firstPage = this.props.location.state;   //上个页面带过来的值
    console.log(firstPage)   // 输出：{title:'当前页面NavBar',id:'后台查询的接口所需的ID',url:'后台查询的接口'} 
    this.state = {
        data: ['1', '2', '3'],
        height: 0,
        imgHeight: 140,
        Imglist: [],
        ParkNoticeModel: {},
        firstPage
    }
  }
  componentDidMount() {
    const self = this;
    if (this.state.firstPage.type !==0 ) {
      this.props.GetParkNoticeInfo({
        params: {NoticeID: this.state.firstPage.id},
        func(data) {
          self.setState({
            Imglist: data[0].Imglist,
            ParkNoticeModel:  data[0].ParkNoticeModel
          })
        }
      })
    } else {
      this.props.GetStyleShowInfo({
        params: {StyleShowID: this.state.firstPage.id},
        func(data) {
          self.setState({
            Imglist: data[0].Imglist,
            ParkNoticeModel:  data[0].StyleShowModel
          })
        }
      })
    }
  
  }
  loadError(e) {
    e.target.src = "http://47.112.21.206:8090/resources/banner.png";
  }
  render() {
    const page =this.props.location.state;
    return (
        <div className="appBox" style={{overflow: 'hidden scroll'}}>
            <Navigation title={this.state.firstPage.title || '楼宇公告详情'} />
            <WingBlank>
            <Carousel
              autoplay
              infinite
              dots
              autoplayInterval="5000"
              dotStyle={{marginBottom: 10}}
              dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
            >
              {
                this.state.Imglist.map((item, val) => (
                  <div
                    key={val}
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                  >
                    <img
                      src={item.FullThumbUrl}
                      alt=""
                      style={{ width: '100%', verticalAlign: 'top' ,height:'150px'}}
                      onError={this.loadError}
                      onLoad={(err) => {
                        // fire window resize event to change height
                        this.setState({ imgHeight: 'auto' });
                      }}
                    />
                  </div>
                ))
              }
            </Carousel>
          </WingBlank>
         
      
        
          <div className="infoBox" >
            <div className="tops">
              { this.state.ParkNoticeModel.Title} 
            </div>

            <div className="content">
              {this.state.ParkNoticeModel.Content}
            </div>
          
            <div className="times">{this.state.ParkNoticeModel.PublishTime}</div>
          </div>
        
          
          

        </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    data: state.demo.data,
    loading: !!state.loading.models.demo
  }
}

function dispatchToProps(dispatch) {
  return {
    GetStyleShowInfo(payload = {}) {
      dispatch({
        type: 'home/GetStyleShowInfo',
        payload
      })
    },
    GetParkNoticeInfo(payload = {}) {
      dispatch({
        type: 'home/GetParkNoticeInfo',
        payload
      })
    }
  }
}
export default connect(mapStateToProps, dispatchToProps)(demo);