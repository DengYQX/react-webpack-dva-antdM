import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation.jsx'
import { Carousel, WingBlank } from 'antd-mobile';
import './style.less';
import { Link } from 'dva/router';
import gzjs from '%/gzjs.png';
import gzgg from '%/gzgg.png';
import zzsq from '%/zzsq.png';
import gzsq from '%/gzsq.png';

class Housing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mineList: [{
        text: '公租房介绍',
        url: gzjs,
        link: '/introduction'
      }, {
        text: '公租房公告',
        url: gzgg,
        link: '/notice'
      }, {
        text: '在线申请',
        url: zzsq,
        link: '/onlineApply'
      }, {
        text: '公租房申请表',
        url: gzsq,
        link: '/applyWord'
      }]
    }
  }

  clickIndex(link) {
    hashHistory.push(link);
  }

  render() {
    return (
      <div className="appBox" >
        <Navigation title="人才住房" />
        <div className="myWorkDesk">
          <div className='myWorkDesk_div'>
            {this.state.mineList.map((item, index) => {
              return (
                <div className='myWorkDesk_list' key={index} onClick={this.clickIndex.bind(this, item.link)}>
                  <div className='myWorkDesk_img' style={{
                    backgroundImage: `url(${item.url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}></div>
                  <div className='myWorkDesk_text'>
                    {item.text}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

}
export default Housing;