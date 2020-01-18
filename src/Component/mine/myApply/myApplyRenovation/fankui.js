import React, { Component } from 'react';
import {InputItem,TextareaItem } from 'antd-mobile';
import openImages from '@/util/maxImages.js';

class app extends Component {
  constructor(props) {
    super(props);
    const data = this.props.data;
    this.state = {
      data,
      FireApplyPiclist: [{}, {}]
    }
  }
  openMaxImag(url) {
    openImages(url)
  }
  render() {
      console.log(this.state.data)
      return(
        <div className="promotion_details"> 
             <p style={{padding: '0.32rem 0.64rem', fontSize: '0.64rem'}}>反馈信息</p>
             <div className="room_details">
              <InputItem editable={false} value={this.state.data.Results ? '已通过' : '不通过'}>验收结果:</InputItem>
              <InputItem>反馈结果</InputItem>
              <TextareaItem editable={false} rows={4} value={this.state.data.Feedback} />
            </div>
            {
              this.state.data.FireApplyPiclist && this.state.data.FireApplyPiclist.length > 0 ? 
              <div className="room_details" style={{ marginTop: 8 }}>
                  <InputItem>验收对比图</InputItem>
                  <div className="details_content">
                    {
                      this.state.data.FireApplyPiclist.map((item,index) => {
                        return (
                          <img onClick={this.openMaxImag.bind(this, item.url)} key={index} src={item.url?item.url:require('%/noImg.jpg')} alt=""/>
                        )
                      })
                    }
                  </div>
              </div> : null
            }
        </div>
    )
  }

}
export default app;