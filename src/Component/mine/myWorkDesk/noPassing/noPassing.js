//个人中心-物业工作台---物品放行--拒绝放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button,TextareaItem, Toast} from 'antd-mobile';
import  Navigation from '@/util/navigation'
import '../myWorkDesk.less'
import interfaces from "@/api"; 
import ImagesView from '@/util/imagesView.jsx';

class NoPassing extends Component{
    constructor(props){
        super(props)
        this.state={
            Textarea:'',
            ID: this.props.location.state.id,
            uploadFiles: [],
            files:[],
        }
    }
    changtextarea(e){
        this.setState({
            Textarea:e
        })
    }
    onChangeImg(files, type, index){
        if(type=='add'){
         files.forEach(element => {
         let fileext = '.jpg';
         if (element.file) {
             fileext = '.' + element.file.name.replace(/.+\./,"");
         }
          interfaces.UploadBase64Img({fileext, Base64Photo:element.url}).then(res=>{
              const data = res.map(item => ({
                 Name: item.Name,
                 Url: item.URL,
                 ThumbUrl: item.smallPhotoURL,
                 Ext: '.' + item.Type
              }))
              this.setState({
                uploadFiles:[...this.state.uploadFiles,...data]
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
    ClickSure(){
        if (this.state.files.length < 1) {
            Toast.info('请上传图片!', 1.5);
            return;
        }
        if (!this.state.Textarea) {
            Toast.info('请填写拒绝原因!', 1.5);
            return;
        }
        interfaces.ExArticlesRelease({
            ID: this.state.ID,
            ApplyRole: 3,
            States: 2,
            ReleaseTime: '',
            FileManagelist: this.state.uploadFiles,
            Remake: this.state.Textarea
        }).then(res => {
            const data={
                title:'拒绝放行',
                btn:'返回',   //按钮的字
                img:1,  //1为成功，0为失败
                url:'/passingThing',    //按钮跳转的链接\
                text:'拒绝放行成功'
            }
            hashHistory.push( { pathname:'/registerOk', state:{data} } )
        })
        
    }
    render(){
        const { files } = this.state;
        return(
            <div className='getPassing_bad'>
                <Navigation  title="拒绝放行"/>
                <div className='getPassing_list_no'>
                    拒绝原因 <span className='getPassing_list_red'>*</span>
                </div>
                <div className='getPassing_list_padding'>
                    <TextareaItem
                        value={this.state.Textarea}
                        rows={9}   onChange={this.changtextarea.bind(this)}
                        placeholder="请填写拒绝原因..."/>
                </div>
                <div className='getPassing_img'>
                    <div className='getPassing_title'>图片上传：</div>
                    <ImagesView
                        files={files}
                        onChange={this.onChangeImg.bind(this)}
                        onImageClick={(index, fs) => console.log(index, fs)}
                        accept="image/gif,image/jpeg,image/jpg,image/png" />
                </div>
                    
                <div className='getPassing_foot'>
                    <Button className='getPassing_btn' onClick={this.ClickSure.bind(this)}>拒绝放行</Button>  

                </div>

            </div>
        )
    }

     
   

}

export default  NoPassing;