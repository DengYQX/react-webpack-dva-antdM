import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, WhiteSpace, Carousel } from 'antd-mobile';
import './industryDynamicsDetails.less' //样式文件
import Navigation from '@/util/navigation.jsx'
import parkInformation from '%/parkInformation.png';

import interfaces from '@/api/index'

class IndustryDynamicsDetails extends Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    this.state = {
      data,
      dynamicsDetails: {},
      imgList: [],
      imgHeight: 150,
    }
  }

  componentDidMount() {
    interfaces.GetIndustryNewsDetails({ID: this.state.data.ID}).then(res=>{
      console.log(res)
      this.setState({
        dynamicsDetails: res[0].Detail,
        imgList: [...this.state.imgList,...res[0].Imagelist]
      })
    })
  }

  render() {
    return (
      <div className='industry_dynamics_details'>
        <Navigation title="行业动态详情" />
        {this.state.imgList.length>0? <Carousel
          autoplay
          infinite
        >
          {this.state.imgList.map((val,index) => (
            <a
              key={index}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.FullUrl}
                alt=""
                style={{ width: '100%', verticalAlign: 'top', height: '150' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
        :''}
       
        <div className="active_title">{this.state.dynamicsDetails.Title}</div>
        <WhiteSpace />
        <div className="active_box">
          <div className="active_title">活动内容</div>
          <div className="active_content">
            <p>{this.state.dynamicsDetails.Content}</p>
            <p>所属行业：{this.state.dynamicsDetails.Company}</p>
            <p>发布单位：{this.state.dynamicsDetails.Company}</p>
            <p>发布时间：{this.state.dynamicsDetails.PublishTime}</p>
          </div>
        </div>
      </div>
    )
  }

}

export default IndustryDynamicsDetails;