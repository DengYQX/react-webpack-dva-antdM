import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, Carousel , WhiteSpace } from 'antd-mobile';
import './policyDetails.less' //样式文件   
import povertyAlleviationBanner from '%/povertyAlleviationBanner.png';
import enclosure_forward from '%/enclosure_forward.png';
import interfaces from '@/api/index'
class PolicyDetails extends React.Component {
  constructor(props) {
    super(props);
    const data = this.props.location.state.data;
    const num = this.props.location.state.num;
    console.log(data,num)
    this.state = {
      data:data,
      num:num,
      infor:{},
      Imagelist:[],
      imgHeight: '6.4rem',
    }
  }
  componentDidMount(){
    if(this.state.num==1){
      //园区政策
      interfaces.GetParkPolicyApplyDetails({ID:this.state.data.ID}).then(res=>{
        console.log(res)
        this.setState({
          infor:res[0].Detail,
          Imagelist:res[0].Imagelist,
        })
      })

    }else{
      //省市区政策
      interfaces.GetProvinceCityPolicyApplyDetails({ID:this.state.data.ID}).then(res=>{
        console.log(res)
        this.setState({
          infor:res[0].Detail,
          Imagelist:res[0].Imagelist,
        })
      })
    }

  }

  render() {
    const{Contact,Mobile,Telphone,CompanyName,SubmitTime,Reason,Content} = this.state.infor;
    return (
      <div className="policy_details">
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="goods_title"
        >详情</NavBar>
        {this.state.Imagelist.length>0? <Carousel
          autoplay
          infinite
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => console.log('slide to', index)}
        >
          {this.state.Imagelist.map(val => (
            <a
              key={val}
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={val.FullThumbUrl}
                alt=""
                style={{ width: '100%', verticalAlign: 'top',height:'150px' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>:''}
        
        <div className="details_title">
          <p className="people">{this.state.infor.Title}
          {this.state.infor.Status == 1 ? <span className="state1">预约中</span> :
          this.state.infor.Status == 2 ? <span className="state1">初审中</span> : 
          this.state.infor.Status == 3 ? <span className="state3">初审通过</span> : 
          this.state.infor.Status == 4 ? <span className="state4">初审拒绝</span> : 
          this.state.infor.Status == 5 ? <span className="state5">已公示</span> : ''}
          </p>
          </div>
        <WhiteSpace />
        <div className="declare_content">
          <div className="declare_title">联系人:{Contact}</div>
        </div>
        <div className="declare_content">
              <div className="declare_title">联系电话:{Mobile}</div>
        </div>
        <div className="declare_content">
              <div className="declare_title">固定电话:{Telphone}</div>
        </div>
        <div className="declare_content">
          <div className="declare_title">申报单位:{CompanyName}</div>
        </div>
        <div className="declare_content">
          <div className="declare_title">申报时间:{SubmitTime}</div>
        </div>
        <div className="declare_content">
          <div className="declare_title">申报理由:{Reason}</div>
        </div>
        <div className="declare_content">
          <div className="declare_title">申报内容:{Content}</div>
        </div>
      </div>
    );
  }
}

export default PolicyDetails;