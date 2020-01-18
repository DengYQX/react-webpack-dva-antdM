//个人中心-物业工作台---物品放行--同意放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button, Toast,DatePicker,List,TextareaItem} from 'antd-mobile';
import  Navigation from '@/util/navigation'
import '../myWorkDesk.less'
import interfaces from "@/api"; 
import ImagesView from '@/util/imagesView.jsx';
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


class GetPassing extends Component{
    constructor(props){
        super(props)
        this.state={
            time:now,
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
    onChangeImg = (files, type, index) => {
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
            Toast.info('请上传放行图片!', 1.5);
            return;
        }
        if (!this.state.Textarea) {
            Toast.info('请填写迁出内容!', 1.5);
            return;
        }
        let time = window.formatTime(this.state.time);
        interfaces.ExArticlesRelease({
            ID: this.state.ID,
            ApplyRole: 3,
            States: 1,
            ReleaseTime: time,
            FileManagelist: this.state.uploadFiles,
            Remake: this.state.Textarea
        }).then(res => {
            const data={
                title:'同意放行',
                btn:'返回',   //按钮的字
                img:1,  //1为成功，0为失败
                url:'/passingThing',   
                text:'同意放行成功'
            }
            hashHistory.push( { pathname:'/registerOk', state:{data} } )
        })
    }
    render(){
        const { files } = this.state;
        return(
            <div className='getPassing'>
                <Navigation  title="同意放行"/>
                <div className='getPassing_body'>
                    <DatePicker
                        value={this.state.time}
                        onChange={time => this.setState({ time })} >
                        <List.Item arrow="horizontal">放行时间:</List.Item>
                    </DatePicker>
                    <div className='getPassing_list'>
                        迁出内容核实情况： 
                    </div>
                    <TextareaItem
                        value={this.state.Textarea}
                        rows={7}   onChange={this.changtextarea.bind(this)}
                        placeholder="请填写迁出内容核实情况..." />
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
                    <Button className='getPassing_btn' onClick={this.ClickSure.bind(this)}>确定放行</Button>  

                </div>
            </div>
        )
    }

}

export default GetPassing;