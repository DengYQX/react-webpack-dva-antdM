//投诉建议
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, List, InputItem, Button, TextareaItem,Picker,Modal } from 'antd-mobile';
import './myReport.less' //样式文件
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';
import { createForm } from 'rc-form';
import interfaces from "@/api/index";
import ImagesView from '@/util/imagesView.jsx';

class MyReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getFieldProps: {
        userName: '',
        phone: '',
        describe: ''
      },
      reportList:[],   //投诉分类
      reportType:'',
      company:'',
      companyName:'',
      companyList:[],  //公司名字列表
      files: [],
      uploadFiles:[],
      multiple:true,

    }
  }
  componentDidMount(){
    interfaces.GetComplaintType().then(res=>{
      var list=[]
      res.forEach(item=>{
        var text={label:'',value:''};
        text.label=item.text;
        text.value=item.id;
        list.push(text)
      })
      this.setState({
        reportList:list
      })
    })
    interfaces.GetAllEnterpriseList().then(res=>{
      var list=[]
      res.forEach(item=>{
        var text={label:'',value:''};
        text.label=item.EnterpriseName;
        text.value=item.ID;
        list.push(text)
      })
      this.setState({
        companyList:list
      })
    })
  }
  // 提交
  submit() {
    console.log(this.props)
    this.props.form.validateFields({ force: true }, (error, values) => {
      const{token= ''}=this.props; /** token来源于modol-login中的token */
      const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
      if (!err && loginType) {
        var company=this.state.company.length==0?'':this.state.company[0];
        var reportType=this.state.reportType.length==0?'':this.state.reportType[0];
        var ImgList=[];
        if(this.state.uploadFiles.length>0){
          this.state.uploadFiles.forEach(item=>{
            var text={
              Name:item.Name,
              Url:item.URL,
              ThumbUrl:item.smallPhotoURL,
              Ext:item.Type,
            }
            ImgList.push(text)
          })
        }
        var post={
          UserId:localStorage.getItem('userId'),
          EnterpriseID:company,
          ContactName:values.userName,
          ContactNumber:values.phone,
          Describe:values.describe,
          TypeId:reportType,
          FileManagelist:ImgList,
          EnterpriseName:this.state.companyName
        }
        
        interfaces.AddComplaintSuggestion(post).then(res=>{
          const data={
            title:'提交',
            btn:'确定',   //按钮的字
            img:1,  //1为成功，0为失败
            url:'/',    //按钮跳转的链接
            text:'提交成功'
          }
          hashHistory.push( { pathname:'/registerOk', state:{data:data} } )

        })
      }else if ( !loginType ){
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
      }
    })
    
  }

  // 图片上传
  onChange = (files, type, index) => {
    if(type=='add'){
      files.forEach(element => {
        interfaces.UploadBase64Img({fileext:'.jpg',Base64Photo:element.url}).then(res=>{
            this.setState({
              uploadFiles:[...this.state.uploadFiles,...res]
            },()=>{
              console.log(this.state.uploadFiles)
            })
        })
      })
    }else{
      //删除图片的时候
      const arrs= this.state.uploadFiles;
      arrs.splice(index,1)
      this.setState({
        uploadFiles:arrs
      })
    }
    this.setState({
      files:files,
    });
  }

  validateuserName=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入联系人姓名！"));
    }
  };
  validatephone=(rule, value, callback) => {
    const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("请输入手机号！"));
    }
  }
  validatedescribe=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入投诉描述！"));
    }
  };
  setName(e){
    this.setState({
      company:e
    })
    this.state.companyList.forEach(item=>{
      if(item.value==e){
        this.setState({
          companyName:item.label
        })
      }
    })



  }
  
  render() {
    const { getFieldProps ,getFieldError} = this.props.form;
    const { files } = this.state;
    return (
      <div className='my_report'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="my_report_title"
        >投诉建议</NavBar>
        <List className="my_report_list">

          <Picker
            data={this.state.companyList}
            cols={1} 
            value={this.state.company}
            onChange={this.setName.bind(this)}
            onOk={this.setName.bind(this)}
            >
            <List.Item arrow="horizontal">公司名称：</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('userName', {
              initialValue: this.state.getFieldProps.userName,
              rules: [{ validator: this.validateuserName }]
            })}
            error={!!getFieldError("userName")}
            onErrorClick={() => {
              Modal.alert(getFieldError("userName"));
            }}
            placeholder="请输入联系人姓名"
          >联系人：</InputItem>
          <InputItem
            {...getFieldProps('phone', {
              initialValue: this.state.getFieldProps.phone,
              rules: [{ validator: this.validatephone }]
            })}
            type="number"
            error={!!getFieldError("phone")}
            onErrorClick={() => {
              Modal.alert(getFieldError("phone"));
            }}
            placeholder="请输入联系电话"
          >联系电话：</InputItem>

          <Picker
            data={this.state.reportList}
            cols={1} 
            value={this.state.reportType}
            onChange={v => this.setState({ reportType: v })}
            onOk={v => this.setState({ reportType: v })}
            >
            <List.Item arrow="horizontal">投诉分类：</List.Item>
          </Picker>
          <TextareaItem
            title="投诉描述："
            rows={5}
            {...getFieldProps('describe', {
              initialValue: this.state.getFieldProps.describe,
              rules: [{ validator: this.validatedescribe }]
            })}
            error={!!getFieldError("describe")}
            onErrorClick={() => {
              Modal.alert(getFieldError("describe"));
            }}
            placeholder="请输入投诉描述....200字以内"
            count={200}
          />
        </List>
        <div className="upload_pictures">
          <p>图片上传：</p>
          <ImagesView
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 3}
            multiple={this.state.multiple}
          />
          <Button type="primary" className="submit" onClick={this.submit.bind(this)}>提交</Button>
        </div>
      </div>
    )
  }

}
MyReport.defaultProps = {
  token: '',
};
MyReport.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(MyReport));