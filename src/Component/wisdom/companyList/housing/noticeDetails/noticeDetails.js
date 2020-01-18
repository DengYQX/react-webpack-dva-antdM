import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation.jsx'
import { WhiteSpace, Carousel } from 'antd-mobile';
import './noticeDetails.less';
import { Link } from 'dva/router';
import campusInforImg from '%/campusInforImg.png';
import api from '@/api'

class NoticeDetails extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state;
    console.log(data);
    this.state = {
      data,
      imgHeight: 'auto',
      content: {
        Imglist: [],
        ParkNoticeModel: {}
      }
    }
  }
  componentWillMount (){
    api.GetParkNoticeInfo({
      NoticeID: this.state.data.ID
    }).then(res => {
       if (res && res.length > 0) {
         this.setState({
          content: res[0]
         })
       }
    })
  }
  render() {
    return (
      <div className="notice_details" >
        <Navigation title="公租房详情" />
        {this.state.content.Imglist.length>0? <Carousel
           autoplay
           infinite
           dots
           autoplayInterval="5000"
           dotStyle={{marginBottom: 10}}
           dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
           >
               {this.state.content.Imglist.map(val => (
                   <div
                   key={val}
                   style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                   >
                   <img
                       src={val.FullThumbUrl}
                       alt=""
                       style={{ width: '100%', verticalAlign: 'top', height: '150' }}
                       onLoad={() => {
                         this.setState({ imgHeight: 'auto' });
                       }}
                   />
                   </div>
               ))}
        </Carousel>  :''}
        
        <div className="details_title" style={{ fontSize:'14px' }}>{this.state.data.title}</div>
        <WhiteSpace />
        <div className="details_content">
          <div className="content_title" style={{ fontSize:'13px' }}>通知内容</div>
          <div className="content_text">
            {this.state.content.ParkNoticeModel.Content}
          </div>
          <div className="time">
            发布时间:   {this.state.content.ParkNoticeModel.PublishTime} <br/>
            发布单位: {this.state.content.ParkNoticeModel.PublishUnit}
          </div>
        </div>
      </div>
    )
  }

}
export default NoticeDetails;