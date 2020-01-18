import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, Carousel, WhiteSpace, Button, TextareaItem } from 'antd-mobile';
import './myCompany.less' //样式文件
import address from '%/address.png';
import phone from '%/phone.png';
import interfaces from '@/api/index'
import ChangePage from '@/Component/disWork/changePage'

class MyCompany extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataInfo: {},
      data: ['1', '2', '3'],
      isEdit: false
    }
  }

  // 轮播定时器   
  componentDidMount() {
    interfaces.GetMyEnterpriseInfo({UserID:localStorage.getItem('userId')}).then(res=>{
      if(res){
        this.setState({
          dataInfo:res[0]
        })
      }
    })
    
  }

  // 点击 true为保存 false为编辑
  editPreserve(val) {
    this.setState({
      isEdit: !val,
    })
    if(this.state.isEdit){
      var post={
        UserID:localStorage.getItem('userId'),
        Introduction:this.state.dataInfo.Introduction, 
        ServiceIntroduction:this.state.dataInfo.ServiceIntroduction, 
        Address:this.state.dataInfo.Address, 
        Telphone:this.state.dataInfo.Telphone, 
      }
      interfaces.ModifyMyEnterprise(post).then(res=>{
  
      })
    }
  }
  // change地址
  changeAddress(val) {
    console.log(val)
    this.state.dataInfo.Address = val
  }

  // change联系电话
  changePhone(val) {
    console.log(val)
    this.state.dataInfo.Telphone = val
  }

  // change企业简介  changePhone
  changeSynopsis(val) {
    console.log(val)
    this.state.dataInfo.Introduction = val
  }

  // change服务介绍
  changeService(val) {
    console.log(val)
    this.state.dataInfo.ServiceIntroduction = val
  }
  
  render() {
    return (
      <div className='my_company'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="my_company_title"
        >我的企业</NavBar>
        {
          this.state.dataInfo? <div>
                <img  style={{width:'100%',height:'150px'}} src={this.state.dataInfo.Pic} />
                <div className="address_phone">
                  <div className="address">
                    <img src={address} alt=""/>
                    <div>
                      地址:
                      {
                        this.state.isEdit ? 
                        <TextareaItem labelNumber   defaultValue={this.state.dataInfo.Address} onChange={this.changeAddress.bind(this)} /> : 
                        <span>{this.state.dataInfo.Address}</span>
                      }
                    </div>
                  </div>
                  <div className="phone">
                    <img src={phone} alt=""/>
                    <div>
                      联系电话:
                      {
                        this.state.isEdit ? 
                        <TextareaItem labelNumber defaultValue={this.state.dataInfo.Telphone} onChange={this.changePhone.bind(this)} /> : 
                        <span>{this.state.dataInfo.Telphone}</span>
                      }
                    </div>
                  </div>
                </div>
                <WhiteSpace />
                <div className="company_synopsis">
                  <div className="synopsis_title">企业简介</div>
                  {
                    this.state.isEdit ? 
                    <TextareaItem autoHeight labelNumber defaultValue={this.state.dataInfo.Introduction} onChange={this.changeSynopsis.bind(this)} /> : 
                    <div className="synopsis_centent">{this.state.dataInfo.Introduction}</div>
                  }
                </div>
                <WhiteSpace />
                <div className="company_synopsis">
                  <div className="synopsis_title">服务介绍</div>
                  {
                    this.state.isEdit ? 
                    <TextareaItem autoHeight labelNumber defaultValue={this.state.dataInfo.ServiceIntroduction} onChange={this.changeService.bind(this)} /> : 
                    <div className="synopsis_centent">{this.state.dataInfo.ServiceIntroduction}</div>
                  }
                </div>
                <div className="my_company_btn">
                  {
                    this.state.isEdit ? 
                    <Button type="primary" className="edit_preserve" onClick={this.editPreserve.bind(this,this.state.isEdit)}>保存</Button> : 
                    <Button type="primary" className="edit_preserve" onClick={this.editPreserve.bind(this,this.state.isEdit)}>编辑</Button>
                  }
                </div>
          </div>:<ChangePage   url='/companyReset'  />
        }
      </div>
    )
  }

}

export default MyCompany;