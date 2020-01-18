// 物业服务----物业放行
import React, { Component , PropTypes} from 'react';
import {  Modal,InputItem ,Button,List,Picker,DatePicker,TextareaItem} from 'antd-mobile';
import { hashHistory } from 'react-router';
import  Navigation from '@/util/navigation';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import { createForm } from 'rc-form';
import ImagesView from '@/util/imagesView.jsx';
import api from '@/api'
import './moveThing.less'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);


class MoveThing extends Component {
    constructor(props){
        super(props)
        this.state={
            companyList:[],
            company:'',
            name:'',
            building:'',
            dpValue: now,
            hasError:false,
            phone:'',
            time:now,
            Textarea:'',
            file:[],
            buildId: [],
            EnterpriseID: '',
            buildList: [],
            PicList: []
        }
    }
    componentDidMount() {
        api.GetBuildToCbx({}).then(res=>{
          this.setState({
            buildList: [...this.state.buildList, ...res]
          })
        })
        api.GetCompanyList({}).then(res=>{
            if (res && res.length > 0) {
                this.setState({
                    companyList: res.map(item => ({
                        label: item.text,
                        value: item.id
                    }))
                })
            }
        })
    }
    validation(rule, val, callback){
        if (val) {
            callback();
        } else {
            callback(new Error('请输入内容'));
        }
    }
    onChangeImg =(files, type, index) =>{
        for (let i =0; i<files.length; i++) {
            let item = files[i];
            let fileext = '.jpg';
            if (item.file) {
                 fileext = '.' + item.file.name.replace(/.+\./,"");
            }   
            if (type === 'add') {
                api.UploadBase64Img({fileext: fileext, Base64Photo: item.url}).then(res => {
                    const data = res.map(item => ({
                        Name: item.Name,
                        Url: item.URL,
                        ThumbUrl: item.smallPhotoURL,
                        Ext: '.'+ item.Type
                    })) 
                    this.setState({
                         PicList: [...this.state.PicList, ...data],
                    })
                })
            }else {
                const arrs= this.state.PicList;
                arrs.splice(index,1);
                this.setState({
                    PicList: [...arrs],
                })
            }
        }
        if (files.length < 1) {
            this.setState({
                PicList: [],
            })
        }
        this.setState({
            files,
        });
    }
    //点击提交的时候
    clickJump(){
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */

        if(loginType){
            //跳转公共页面的相关参数
            this.props.form.validateFields({ force: true }, (error, values) => {

                if (!error) {
                  //  const times = values.ApplyTime.formatTime('YYYY-MM-DD hh:mm:ss');
                    const times = window.formatTime(values.ApplyTime)
                    const params = {
                        ...values,
                        UserId: localStorage.getItem('userId'),
                        BuildId: this.state.buildId[0],
                        EnterpriseID: this.state.EnterpriseID[0],
                        ApplyTime: times,
                        FileManagelist: this.state.PicList
                    }
                    api.AddArticlesRelease(params).then(() => {
                        const data={
                            title:'提交',
                            btn:'确定',   //按钮的字
                            img:1,  //1为成功，0为失败
                            url:'/',    //按钮跳转的链接
                            text:'提交成功'
                        }
                        console.log(1234)
                        hashHistory.push( { pathname:'/registerOk', state:{data} } )
                    })
                   
                }
            })
            
        }else{
            Modal.alert('您尚未登陆', '您是否需要登陆', [
                { text: '否', },
                { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
            ]);
        }
    }

    render(){
        const { getFieldProps , getFieldError} = this.props.form;
        const { files } = this.state;
        return(
            <div className="moveThing">
                <Navigation  title="物品放行"/>
                <div className="moveThing_body">
                    <Picker 
                        value={this.state.buildId}
                        onChange={v => this.setState({ buildId: v })}
                        data={this.state.buildList} 
                        cols={1} 
                        className="forss"
                    >
                        <List.Item arrow="horizontal"> <span style={{ fontSize: '0.597rem' }}>所在楼宇：</span></List.Item>
                    </Picker>
                    <Picker 
                        value={this.state.EnterpriseID}
                        onChange={v => this.setState({ EnterpriseID: v })}
                        data={this.state.companyList} 
                        cols={1} 
                        className="forss"
                    >
                        <List.Item arrow="horizontal"> <span style={{ fontSize: '0.597rem' }}>公司名称：</span></List.Item>
                    </Picker>
                
                    <InputItem
                        type='text'
                        placeholder="请输入姓名"
                        {...getFieldProps('UName', {
                            rules: [{ validator: this.validation }],
                        })}
                        error={!!getFieldError('UName')}
                    >姓名:</InputItem>
                    <InputItem
                        type='UTel'
                        placeholder="请输入联系电话"
                        {...getFieldProps('UTel', {
                            rules: [{ validator: (rule, value, callback) => {
                                const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
                                if (reg.test(value)) {
                                  callback();
                                } else {
                                  callback(new Error('请输入联系人'));
                                }
                            } }],
                        })}
                        error={!!getFieldError('UTel')}
                    >联系电话:</InputItem>
                    <DatePicker
                        mode="date"
                        {...getFieldProps('ApplyTime', {
                            initialValue: this.state.dpValue,
                            rules: [
                            { required: true },
                            { validator: this.validation },
                            ],
                            
                        })}
                    >
                    <List.Item arrow="horizontal">迁出时间:</List.Item>
                    </DatePicker>
                    <List renderHeader={() => '迁出内容:'}>
                        <TextareaItem
                            rows={5}   
                            placeholder="请输入迁出内容..."
                            {...getFieldProps('ApplyContent', {
                                rules: [{ validator: this.validation }],
                            })}
                            error={!!getFieldError('ApplyContent')}
                        />
                    </List>

                </div>
                <div className='moveThing_img'>
                    <div>图片上传：</div>
                    <ImagesView
                        files={files}
                        onChange={this.onChangeImg}
                        accept="image/gif,image/jpeg,image/jpg,image/png" />
                </div>
                <div className='moveThing_foot'>
                    <Button style={{width: '85%'}} className='moveThing_btn' onClick={this.clickJump.bind(this)}>提交</Button>
                </div>
                
            </div>
        )
    }
}

MoveThing.defaultProps = {
    token: '',
};
MoveThing.PropTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(MoveThing));
