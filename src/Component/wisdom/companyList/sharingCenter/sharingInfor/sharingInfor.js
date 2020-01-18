// 物业服务----物业放行
import React, { Component } from 'react';
import { WhiteSpace, InputItem, Button, TextareaItem, Carousel } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import './sharingInfor.less'
import campusInforImg from '%/campusInforImg.png';

import interfaces from '@/api/index'

class SharingInfor extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data;
    console.log(data,'详情')
    this.state = {
      data:data,
      ModelInfo:{},
      Imglist:[],
      imgHeight:'150px',
    }
  }
  componentDidMount(){
    interfaces.GetSharingCenterInfo({SharingID:this.state.data.ID}).then(res=>{
      this.setState({
        ModelInfo:res[0].ModelInfo,
        Imglist:res[0].Imglist,
      })
    })
  }

  // 在线申请
  onlineApply() {
    hashHistory.push({pathname:'/onlineApplication',state:{data:this.state.data}})
  }

  render() {
    return (
      <div className="sharing_infor">
        <Navigation title="详情" />
          <Carousel
          autoplay
          infinite
          dots
          autoplayInterval="5000"  >
          {
              this.state.Imglist.map((item, val) => (
              <div  key={val}
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }} >
                  <img
                  src={item.FullThumbUrl}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top',height:'150px'}}
                  onError={this.loadError}
                  onLoad={(err) => {
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                  }}
                  />
              </div>
              ))
          }
          </Carousel>
 
        <div className="details_info">
          {
            this.state.data.Type == '1' ? 
            <div>
              <p>场地名称：<span>{this.state.ModelInfo.Name}</span></p>
              <p>容纳人数：<span>{this.state.ModelInfo.ActivitieScale}</span></p>
              <p>场地面积：<span>{this.state.ModelInfo.Area}</span></p>
              <p>场地地点：<span>{this.state.ModelInfo.Address}</span></p>
              <p>场地价格：<span>{this.state.ModelInfo.Price}</span></p>
            </div> : 
            this.state.data.Type == '2' ? 
            <div>
              <p>设备名称：<span>{this.state.ModelInfo.Name}</span></p>
              <p>设备价格：<span>{this.state.ModelInfo.Price}</span></p>
              <p>设备所在地点：<span>{this.state.ModelInfo.Address}</span></p>
            </div> : 
            <div>
              <p>职位名称：<span>{this.state.ModelInfo.Name}</span></p>
              <p>工时费：<span>{this.state.ModelInfo.Price}</span></p>
            </div>
          }
          <p>联系人：<span>{this.state.ModelInfo.ContactsName}</span></p>
          <p>联系方式：<span>{this.state.ModelInfo.ContactsTel}</span></p>
          <p>发布企业：<span>{this.state.ModelInfo.EnterpriseName}</span></p>
          {
            this.state.data.Type == '3' && this.state.ModelInfo.Remakes ? 
            <TextareaItem
              title="个人简介："
              rows={7}
              disabled='true'
              placeholder="这是个人简介的文字..这是个人简介的文字.."
              value={this.state.ModelInfo.Remakes}
            /> : null
          }
        </div>
        <Button type="primary" className="submit" onClick={this.onlineApply.bind(this)}>在线申请</Button>
      </div>
    )
  }
}

export default SharingInfor;