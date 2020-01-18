import React, { Component, PropTypes } from 'react';
import { WhiteSpace, Carousel, Button } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import './promotionDetails.less';
import { hashHistory } from 'dva/router';
import interfaces from '@/api/index';
import openImages from '@/util/maxImages.js';

class PromotionDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
      imgHeight: '6.4rem',
      area: '',
      build: '',
      currentImg: '',
      renovation: '',
      floor: '',
      propertyCosts: '',
      isApplyed: true,
      list: [],
      intro: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('userId')) {
      interfaces.IsApplyed({
        UserID: localStorage.getItem('userId'),
        TypeID: 1,
        TypeDetailID: this.props.location.state.id
      }).then(res => {
        this.setState({
          isApplyed: res
        })
      })
    }
    
    this.getData()
  }

  getData() {
    interfaces.GetShopManageDetails({
      ID: this.props.location.state.id
    }).then(res=>{
      console.log(res)
      let imgList = []
      let list = []
      if (res && res[0].Imagelist && res[0].Imagelist.length > 0) {
        for (let i=0; i<res[0].Imagelist.length; i++) {
          imgList.push(res[0].Imagelist[i].FullUrl)
          list.push({
            url: res[0].Imagelist[i].FullThumbUrl
          })
        }
      }
      this.setState({
        area: res[0].Detail.Area+'m²',
        build: res[0].Detail.BuildNo,
        renovation: res[0].Detail.Decorationstr,
        floor: res[0].Detail.Floor,
        propertyCosts: res[0].Detail.PropertyCosts,
        intro: res[0].Detail.Listing,
        imgList: imgList,
        list: list
      })
    })
  }

  submit() {
    hashHistory.push({ pathname: "/bookingRoom", state: { id: this.props.location.state.id } })
  }

  openMaxImag(url) {
    openImages(url)
  }

  render() {
    let { area, build, renovation, floor, propertyCosts, intro } = this.state
    return (
      <div className="promotion_details">
        <Navigation title="招商入驻详情" />
        <div className="promotion_details_box">
          <div className="promotion_details_imgBox">
            {
              this.state.imgList.length > 0
                ? <Carousel dots={false}>
                  {this.state.imgList.map(val => (
                    <div
                      key={val}
                      style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                    <img
                      src={val}
                    />
                    </div>
                  ))}
                </Carousel>
                : null
            }
          </div>
          <div className="room_details">
            <div className="details_title fontBold">房屋详情</div>
            <ul className="details_content">
              <li>建筑面积：{area}</li>
              <li>楼栋：{build}</li>
              <li>装修：{renovation}</li>
              <li>房间号：{floor}</li>
              <li>物业费：{propertyCosts} 元/m²</li>
            </ul>
          </div>
          <WhiteSpace />
          <div className="room_details">
            <div className="details_title fontBold">房源介绍</div>
            <div className="introduce_content">{intro}</div>
          </div>
          <WhiteSpace />
          <div className="room_details">
            <div className="details_title fontBold">房屋图片</div>
            <div className="details_content">
              {
                this.state.list.map((item,index) => {
                  return (
                    <img onClick={this.openMaxImag.bind(this, item.url)} key={index} src={item.url?item.url:require('%/noImg.jpg')} alt=""/>
                  )
                })
              }
            </div>
          </div>
          <div className="submitBox">
            {
              this.state.isApplyed ? <Button type="primary" className="submit" onClick={this.submit.bind(this)}>预约看房</Button> :  
              <Button type="primary" style={{background: '#B5B5B5', border: 'none'}} className="submit" >您已预约</Button>
            }
          </div>
        </div>

      </div>
    );
  }
}

export default PromotionDetails;