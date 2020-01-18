//广告位申请  AddAdvertisingServicesApply
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Picker, Button, InputItem, TextareaItem, DatePicker, List, Modal } from 'antd-mobile';
import './advertisementApply.less'
import Navigation from '@/util/navigation.jsx'
import ImagesView from '@/util/imagesView.jsx';
import { createForm } from 'rc-form';
import { connect } from 'dva';
import interfaces from '@/api/index'
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class AdvertisementApply extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data;
    console.log(data)
    this.state = {
      data:data,
      levelList: [],
      level: '',
      begintime: now,
      endtime: now,
      multiple:true,
      files:[],
      uploadFiles:[],
      getFieldProps:{
        name: '',
        company: '',
        phone: '',
        Textarea: '',
      }
    }
  }
  componentDidMount(){
    interfaces.GetBuildToCbx().then(res=>{
      this.setState({
        levelList:res
      })
    })
  }


  onChangeImg=(files, type, index)=> {
    console.log(files, type, index);
    //files[0].file.name  img.jpg  12313.png
    if(type=='add'){
      files.forEach(element => {
        interfaces.UploadBase64Img({fileext:'.jpg',Base64Photo:element.url}).then(res=>{
            this.setState({
              uploadFiles:[...this.state.uploadFiles,...res]
            })
        })
      });
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
    },()=>{
      console.log(this.state.files)
    });
    
  }

  // 申请认证 -- AddAdvertisingServicesApply
  submit() {
    this.props.form.validateFields({ force: true }, (error, values) => {
      if (!error) {
        let timeS = window.formatTime(this.state.begintime); 
        let timeE = window.formatTime(this.state.endtime);
        let BuildNo;
        this.state.levelList.forEach(index => {
          if(index.value == this.state.level){
             return BuildNo = index.label;
          }
        });
        // this.state.uploadFiles[0].Type
        if(this.state.uploadFiles){
          const Ext = this.state.uploadFiles[0].Type;
          this.state.uploadFiles[0]['Ext']=Ext;
        }
        const BuildID = this.state.level[0];
        var post={
          UserID:localStorage.getItem('userId'),
          AdvertisingServicesID:this.state.data.ID,
          CompanyName:values.company,
          Contacter:values.name,
          Telphone:values.phone,
          BuildID,
          BuildNo,
          StartTime: timeS,
          EndTime: timeE,
          OtherDescription:values.Textarea,
          PicList:this.state.uploadFiles
        }
        interfaces.AddAdvertisingServicesApply(post).then(res=>{  
          //跳转公共页面的相关参数
          const data = {
            title: '申请认证',
            btn: '返回广告服务',   //按钮的字
            img: 1,  //1为成功，0为失败
            url: '/advertisingService',    //按钮跳转的链接
            text: '广告位申请认证成功'
          }

          hashHistory.push({ pathname: '/registerOk', state: { data: data } })
        })
      }
    })
  }

  validatecompany=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入公司名称！"));
    }
  };
  validatename=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入姓名！"));
    }
  };
  validateTextarea=(rule, value, callback) => {
    if (value && value !== "") {
      callback();
    } else {
      callback(new Error("请输入姓名！"));
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

  render() {
    const { getFieldProps,getFieldError } = this.props.form;
    return (
      <div className='advertisement_apply'>
        <Navigation title="广告位申请" />
        <div className="moveThing_body">
          <InputItem
            {...getFieldProps('company', {
              initialValue: this.state.getFieldProps.company,
              rules: [{ validator: this.validatecompany }]
            })}
            placeholder="请输入公司名称"
            error={!!getFieldError("company")}
            onErrorClick={() => {
              Modal.alert(getFieldError("company"));
            }}
          >公司名称：</InputItem>

         
          <Picker
            data={this.state.levelList}
            cols={1}
            value={this.state.level}
            onChange={v => {this.setState({ level: v })}  }
            onOk={v => this.setState({ level: v })}
          >
            <List.Item arrow="horizontal">投放楼宇:</List.Item>
          </Picker>
          <InputItem
            {...getFieldProps('name', {
              initialValue: this.state.getFieldProps.name,
              rules: [{ validator: this.validatename }]
            })}
            placeholder="请输入姓名"
            error={!!getFieldError("name")}
            onErrorClick={() => {
              Modal.alert(getFieldError("name"));
            }}
          >姓名:</InputItem>
          <InputItem
            {...getFieldProps('phone', {
              initialValue: this.state.getFieldProps.phone,
              rules: [{ validator: this.validatephone }]
            })}
            type="number"
            placeholder="请输入手机号码"
            error={!!getFieldError("phone")}
            onErrorClick={() => {
              Modal.alert(getFieldError("phone"));
            }}
          >手机号码:</InputItem>

         
          <DatePicker
            mode="date"
            title="请选择时间"
            extra="Optional"
            value={this.state.begintime}
            onChange={begintime => this.setState({ begintime })}>
            <List.Item arrow="horizontal">开始时间:</List.Item>
          </DatePicker>
          <DatePicker
            mode="date"
            title="请选择时间"
            extra="Optional"
            value={this.state.endtime}
            onChange={endtime => this.setState({ endtime })}>
            <List.Item arrow="horizontal">结束时间:</List.Item>
          </DatePicker>
          <TextareaItem
            title="其他说明:"
            {...getFieldProps('Textarea', {
              initialValue: this.state.getFieldProps.Textarea,
              rules: [{ validator: this.validateTextarea }]
            })}
            rows={4}
            error={!!getFieldError("Textarea")}
            onErrorClick={() => {
              Modal.alert(getFieldError("Textarea"));
            }}
            placeholder="请输入文字..."
          />
        </div>
        <div className="img_upload">
          <p>图片上传：</p>
          <ImagesView
            files={this.state.files}
            onChange={this.onChangeImg}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={this.state.files.length < 3}
            multiple={this.state.multiple}
            accept="image/gif,image/jpeg,image/jpg,image/png" />
        </div>
        <Button type="primary" className="submit" onClick={this.submit.bind(this)}>申请</Button>
      </div>
    )
  }
}

export default connect(null, dispatch => {
  return {
    SavecurrentAdv(payload = {}) {
      dispatch({
        type: 'service/SavecurrentAdv',
        payload
      })
    }
  }
})(createForm()(AdvertisementApply));