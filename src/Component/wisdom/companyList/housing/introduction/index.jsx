import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation.jsx'
import { WhiteSpace, Carousel } from 'antd-mobile';
import './style.less';
import openImages from '@/util/maxImages.js';
import api from "@/api"

class Introduction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      content:[],
    }

  }
  componentWillMount(){
    // 开启分享服务
    api.GetPublicRentalInforDetails().then(res => {
      this.setState({
        data: res[0].Detail,
        content:res[0].Imagelist
      })
    })
  }
  render() {
    const {data} = this.state;
    //console.log(data)
    return (
      <div className="appBox" style={{overflow: 'hidden scroll'}} >
        <Navigation title="公租房介绍" />
        {this.state.content.length>0? <Carousel
           autoplay
           infinite
           dots
           autoplayInterval="5000"
           dotStyle={{marginBottom: 10}}
           dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
           >
               {this.state.content.map(val => (
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
        <WhiteSpace />
        <div className="technological_process">
          <div className="technological_process_title fontBold">
            申请流程
          </div>
          <div className="technological_process_text" dangerouslySetInnerHTML={{__html:data.Process}}>
        
          </div>
        </div>
        <WhiteSpace />
        <div className="technological_process">
          <div className="technological_process_title fontBold">
            规章制度
          </div>
          <div className="technological_process_text" dangerouslySetInnerHTML={{__html:data.Rules}}>
  
          </div>
        </div>
        <WhiteSpace />
        <div className="technological_process">
          <div className="technological_process_title fontBold">
            现场图片
          </div>
          <div className="img_box">
            {
              this.state.content && this.state.content.length > 0 ? this.state.content.map(item => (<img src={item.FullUrl} onClick={() => openImages(item.FullUrl)} alt=""/>)) : null
            }
          </div>
        </div>
        <WhiteSpace />
        <div className="technological_process">
          <div className="technological_process_title fontBold">
            联系方式
          </div>
          <div className="technological_process_text" dangerouslySetInnerHTML={{__html:data.ContactMode}}>
         
          </div>
        </div>

      </div>
    )
  }

}
export default Introduction;