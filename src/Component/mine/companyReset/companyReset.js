import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, List, InputItem, Button, Picker, Toast,Modal } from 'antd-mobile';
import './companyReset.less' //样式文件
import ImagesView from '@/util/imagesView.jsx';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import interfaces from '@/api/index'

class CompanyReset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      multiple: true,
      companyList:[],
      CompanyID: '',
      identityList: [],
      IsCompanyAdmin: '',
      Name: '',
      Position: '',
      PicList: []
    }
  }

  componentDidMount() {
    this.companyData()
    this.identityData()
  }

  // 公司列表
  companyData() {
    interfaces.GetAllEnterpriseList({}).then(res => {
      if(res){
        let list = []
        for(let i = 0; i < res.length; i++) {
          list.push({
            label: res[i].EnterpriseName,
            value: res[i].ID
          })
        }
        this.setState({
          companyList:[...this.state.companyList, ...list]
        })

      }
     
    })
  }

  // 身份列表
  identityData() {
    interfaces.GetIdentityList({}).then(res => {
      if(res){
        let list = []
        for(let i = 0; i < res.length; i++) {
          list.push({
            label: res[i].cName,
            value: res[i].cValue
          })
        }
        this.setState({
          identityList:[...this.state.identityList, ...list]
        })
      }
    })
  }

  // 提交
  submit() {
    const { CompanyID, IsCompanyAdmin, Name, Position, PicList } = this.state
    let Company = ''
    const{ token }=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */ 
    if(IsCompanyAdmin == '') {
      return Toast.info('请选择身份！',1);
    }
    if(CompanyID == '') {
      return Toast.info('请选择公司！',1);
    }
    if(Name == '') {
      return Toast.info('请输入姓名！',1);
    }
    if(Position == '') {
      return Toast.info('请输入职位！',1);
    }
    this.state.companyList.forEach(i => {
      if(i.value == CompanyID[0]) {
        Company = i.label
      }
    })
    var imgList=[]
    if(PicList.length>0){
      PicList.forEach(item=>{
        var text={
          Name:item.Name,
          Url:item.URL,
          ThumbUrl:item.smallPhotoURL,
          Ext:item.Type,
        }
        imgList.push(text)
      })
    }
    if(loginType){
      interfaces.AddMyCertification({UserID: localStorage.getItem('userId'), IsCompanyAdmin: IsCompanyAdmin[0], CompanyID: CompanyID[0], Company, Name, Position, PicList:imgList}).then(res => {
      //  console.log(res)
        const data={
          title:'我的认证',
          btn:'确定',   //按钮的字
          img:1,  //1为成功，0为失败
          url:'/',    //按钮跳转的链接
          text:'您的信息已提交成功！',
          desc: '请及时关注审核状态，我们将在7个工作日内 对您的信息进行审核。'
        }
        hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
      })
    }else{
      Modal.alert('您尚未登陆', '您是否需要登陆', [
          { text: '否', },
          { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
      ]);
    }
  }

  // 图片上传
  onChange = (files, type, index) => {
  //  console.log(files, type, 'aaaaaaa');
    if(type == 'add') {
      files.forEach(element => {
        let fileext = '.jpg';
        if (element.file) {
           fileext = '.' +element.file.name.replace(/.+\./,"");
        }
        interfaces.UploadBase64Img({fileext, Base64Photo: element.url}).then(res => {
          console.log(res)
          this.setState({
            PicList: [...this.state.PicList, ...res]
          })
        })
        
      });
      
    }else {
      console.log(files)
      this.state.PicList.splice(index, 1)
      this.setState({
        PicList: [...this.state.PicList]
      })
    }
    this.setState({
      files,
    }, () => {
      console.log(files.length + 'xxxxxx')
    })
  }
  
  render() {
    const { files } = this.state;
    return (
      <div className='company_reset'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="my_report_title"
        >我的认证</NavBar>
        <List className="my_report_list">
          <Picker
            data={this.state.identityList}
            cols={1} 
            value={this.state.IsCompanyAdmin}
            onChange={v => this.setState({ IsCompanyAdmin: v })}
            onOk={v => this.setState({ IsCompanyAdmin: v })}
            >
            <List.Item arrow="horizontal">身份选择：</List.Item>
          </Picker>
          <Picker
            data={this.state.companyList}
            cols={1} 
            value={this.state.CompanyID}
            onChange={v => this.setState({ CompanyID: v })}
            onOk={v => this.setState({ CompanyID: v })}
            >
            <List.Item arrow="horizontal">公司名称：</List.Item>
          </Picker>
          <InputItem
            onChange={v => this.setState({Name: v})}
            placeholder="请输入联系人姓名"
          >姓名：</InputItem>
          <InputItem
            onChange={v => this.setState({Position: v})}
            placeholder="请输入职位"
          >职位：</InputItem>
          <div className="upload_pictures">
            {
              this.state.IsCompanyAdmin == '1' ? 
              ( <p>上传营业执照：</p>) : ( <p>上传本人照片：</p>)
            }
            <ImagesView
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 3}
              multiple={this.state.multiple}
            />
          </div>
        
          <Button type="primary" className="submit" onClick={this.submit.bind(this)}>申请认证</Button>
        </List>
      </div>
    )
  }
}

CompanyReset.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(CompanyReset);

