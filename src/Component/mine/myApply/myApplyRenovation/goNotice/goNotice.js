import React, { Component } from 'react';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation.jsx'
import { Button, DatePicker, List, Modal, Toast } from 'antd-mobile';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';
import './goNotice.less' //样式文件
import interfaces from "@/api/index"; 
import ImagesView from '@/util/imagesView.jsx';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class GoNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: now,
      files: [],
      uploadFiles:[],
    }
  }

  // 提交
  submit() {
    if (this.state.uploadFiles.length === 0) {
      Toast.info('请上传消防验收备案图片')
      return
    }
    let time = window.formatTime(this.state.date);
    let FireAcceptPicList = this.state.uploadFiles
    FireAcceptPicList.map(item=>{
      item.ThumbUrl = item.smallPhotoURL
      item.Ext = item.Type
      item.Url = item.URL
    })
    var post={
      FireAcceptPicList:FireAcceptPicList,
      UserID:localStorage.getItem('userId'),
      FireAcceptanceTime: time
    }
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
    if(loginType){
      interfaces.SubmitAcceptApply(post).then(res=>{
        const data={
          title: '提交',
          btn: '返回',   //按钮的字
          img: 1,  //1为成功，0为失败
          url: '/',    //按钮跳转的链接
          text: `提交成功`
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

  onChange = (files, type, index) => {
    if(type=='add'){
      files.forEach(element => {
        interfaces.UploadBase64Img({fileext:'.jpg',Base64Photo:element.url}).then(res=>{
          console.log(res)
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
    },()=>{
      console.log(this.state.files)
    });
  };
  
  render() {
    const { files } = this.state;
    return (
      <div className="go_notice" >
        <Navigation title='提交'/>
        <DatePicker
          mode="date"
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <List.Item arrow="horizontal">预约验收时间：</List.Item>
        </DatePicker>
        <div className="upload_img">
          <p>上传消防验收备案图片</p>
          <ImagesView
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 3}
          />
        </div>
        <Button type="primary" className="submit" onClick={this.submit.bind(this)}>提交</Button>
      </div>
    )
  }

}

GoNotice.defaultProps = {
  token: '',
};
GoNotice.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(GoNotice);

