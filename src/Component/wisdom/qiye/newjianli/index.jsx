import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Picker,Button,InputItem,DatePicker,TextareaItem,List,Modal,Toast} from 'antd-mobile';
import  Navigation from '@/util/navigation'
import interfaces from '@/api/index'
import {isEmpty} from '@/util/common.js';
import ImagesView from '@/util/imagesView.jsx';
import look from '@/images/look.png';
import { createForm } from 'rc-form';

import './style.less';

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

const sex = [
  {
    label:
    (<div>
      <span/>
      <span>男</span>
    </div>),
    value:'男',
  },
  {
    label:
    (<div>
      <span/>
      <span>女</span>
    </div>),
    value: '女',
 
  },
  
];

class AdvertisementApply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Name: '', /** 姓名 */
      hasError: false, /** 手机号输入是否正确 */
      phone: '', /** 手机号 */
      mail: '', /** 邮箱 */
      Sex:'', /** 性别 */
      Birthday: '', /** 时间 */
      jobTime: '', /** 工作年限 */
      Textarea: '', /** 个人简介 */
      WorkExp: '', /** 工作经历 */
      files: [], /** 图片上传 */
      resumeType: 0, /** 简历状态 1:新建简历页面 0:创建简历页面 2查询简历 */
      ID:0,/** 简历ID */
    }
  }

  /** 组件挂载之前 */
  componentWillMount(){
    /** 查询用户是否有简历 */
    this.selectVal();
  }

  /** 上传的图片 */
  onChangeImg(files,type,index) {
    this.setState({ files });
  }

  /**
     * AddResume 新增简历
     * @author xiaoDai
     * @param {int} UserID [用户ID]
     * @param {string} Name [用户名]
     * @param {string} Sex [用户性别]
     * @param {date} Birthday 出生年月日 [查询条数]
     * @param {string} WorkYear [工作年限]
     * @param {string} Telphone [手机号码]
     * @param {string} PersonIntroduction [个人简介]
     * @param {string} Email [邮箱]
     * @param {string} WorkExperience [工作经历]
     * @param {string} PicList [图片格式 json化]
     * @return [新增是否成功]
     */
  submit=()=> {
    this.props.form.validateFields((err, val) => {
      console.log(err,val)
      if(!err){
        const {mail,jobTime,Name,phone,Textarea,WorkExp} = val;
        const {Sex,Birthday,files,resumeType,ID} = this.state;
        const  UserID  = localStorage.getItem("userId");
        let PicList;
        let Sexs;
        /** 当用户没有上传图片时的非空判断 */
        if(files.length == 0){
          PicList = '';
        }else{
          PicList = files[0].url;
        }
        if(Sex == '男'){
          Sexs = 1;
        }else{
          Sexs = 2;
        }
        /** 调api */
        if(resumeType == 1){
            interfaces.AddResume({ 
              UserID, /** 用户ID */
              Name, /** 用户名 */
              Sex:Sexs, /** 用户性别 */
              Birthday, /** 出生年月日 */
              WorkYear:jobTime, /** 工作年限 */
              Telphone:phone, /** 手机号码 */
              PersonIntroduction:Textarea, /**个人简介 */
              Email:mail, /** 邮箱 */
              WorkExperience:WorkExp, /** 工作经历 */
              PicList, /** 图片格式 json化 */
            }).then(() => {
                //跳转公共页面的相关参数
                const data = {
                  title: '上传简历',
                  btn: '返回找工作页面',   //按钮的字
                  img: 1,  //1为成功，0为失败
                  url: '/gongzuo',    //按钮跳转的链接
                  text: '上传简历成功'
                }
                /** 路由跳转  传参 */
                hashHistory.push({ pathname: '/registerOk', state: { data: data } })
            })
          }else if(resumeType == 2){
            this.ModifyResume(ID,Name,Sexs,Birthday,jobTime,phone,Textarea,mail,WorkExp);
          }
      }
    })
  }

  /**
   * GetResumeDetailsByUserID 查询简历信息
   * @author xiaoDai
   * @param {int} UserID [用户ID]
   */
  selectVal(){
    this.props.form.validateFields((err, val) => {
      const UserID = localStorage.getItem('userId');
      interfaces.GetResumeDetailsByUserID({ 
        UserID, /** 用户ID */
      })
      .then((res) => {
        if(res){
          const {Name, Sex,ID, Birthday, WorkYear, Telphone, PersonIntroduction, Email, WorkExperience} = res[0].Detail;
          let Sexs;
          if(Sex == 1){
            Sexs = '男';
          }else {
            Sexs = '女';
          }

        //  console.log(Name, Sexs, 45646)
          if(Name && Sexs){
            this.setState({
              resumeType:2,/** 查询到简历 */
              ID, /** 简历ID */
              Name, /** 用户名 */
              Sex:Sexs, /** 用户性别 */
              Birthday:new Date(Birthday), /** 出生年月日 需要转换成date类型 传过来的是个string类型的*/
              jobTime:WorkYear, /** 工作年限 */
              phone:Telphone, /** 手机号码 */
              Textarea:PersonIntroduction, /**个人简介 */
              mail:Email, /** 邮箱 */
              WorkExp:WorkExperience, /** 工作经历 */
            });
          }
        } 
      })
    })
  }

  /**
    * 修改简历 ModifyResume
    * @author xiaoDai
    * @param {int} ID [简历ID]
    * @param {string} Name [用户名]
    * @param {string} Sex [用户性别]
    * @param {date} Birthday 出生年月日 [查询条数]
    * @param {string} WorkYear [工作年限]
    * @param {string} Telphone [手机号码]
    * @param {string} PersonIntroduction [个人简介]
    * @param {string} Email [邮箱]
    * @param {string} WorkExperience [工作经历]
    * @return [修改是否成功]
   */
  ModifyResume(ID,Name,Sexs,Birthday,jobTime,phone,Textarea,mail,WorkExp){
    interfaces.ModifyResume({ 
      ID, /** 简历ID */
      Name, /** 用户名 */
      Sex:Sexs, /** 用户性别 */
      Birthday, /** 出生年月日 */
      WorkYear:jobTime, /** 工作年限 */
      Telphone:phone, /** 手机号码 */
      PersonIntroduction:Textarea, /**个人简介 */
      Email:mail, /** 邮箱 */
      WorkExperience:WorkExp, /** 工作经历 */
    }).then(() => {
        //跳转公共页面的相关参数
        const data = {
          title: '编辑简历',
          btn: '返回找工作页面',   //按钮的字
          img: 1,  //1为成功，0为失败
          url: '/gongzuo',    //按钮跳转的链接
          text: '编辑简历成功'
        }
        /** 路由跳转  传参 */
        hashHistory.push({ pathname: '/registerOk', state: { data: data } })
    })
  }

  /** 组件挂载 */
  render() {
    const {Birthday,jobTime,phone,mail,Textarea,WorkExp,resumeType,files,Sex,Name} = this.state;
    const {form:{getFieldProps, getFieldError}} = this.props;
    return (
      <div>
      {
        resumeType != 0 ?(
          <div className='advertisement_apply'>
            {
              resumeType == 1 ?(
                <Navigation title="新建简历" />
              ):(
                <Navigation title="简历" />
              )
            }
            <div className="moveThing_body">
            <form className="jianTextRight">
                 <InputItem
                    {...getFieldProps('Name', {
                    initialValue: Name,
                    rules: [
                    {
                      validator: (rule, value, callback) => {
                        if (value) {
                          callback();
                        } else {
                            callback(new Error('请输入公司全称'));
                        }
                      }
                    }],
                    })}
                    error={!!getFieldError('Name')}
                    placeholder="请输入姓名"
                >姓名：</InputItem>
                <Picker
                    data={sex}
                    cols={1}
                    value={Sex}
                    onOk={v => {
                        this.setState({ Sex: v })
                    }} 
                  >
                    <List.Item arrow="horizontal">性别:</List.Item>
                </Picker>
                <DatePicker
                    mode="date"
                    extra="请输入出生年月"
                    minDate= {new Date(1950,1,1,0,0,0)}
                    value={Birthday}
                    onOk={date => {
                      this.setState({ Birthday:date })
                    }
                    
                     }>
                    <List.Item arrow="horizontal">出生年月</List.Item>
                </DatePicker>
                <InputItem
                    {...getFieldProps('jobTime', {
                    initialValue: jobTime,
                    rules: [
                        { validator: (rule, value, callback) => {
                            if (value) {
                              callback();
                            } else {
                                callback(new Error('请输入年限'));
                              }
                       }}],
                    })}
                    error={!!getFieldError('jobTime')}
                    extra="年"
                    placeholder="请输入年限"
                >工作年限:</InputItem>
                <InputItem
                    {...getFieldProps('phone', {
                    initialValue: phone,
                    rules: [
                        { validator: (rule, value, callback) => {
                          const reg=/^[1]([3-9])[0-9]{9}$/
                          if (reg.test(value)) {
                            callback();
                          } else {
                              callback(new Error('请输入联系方式'));
                            }
                       }}],
                    })}
                    error={!!getFieldError('phone')}
                    placeholder="请输入手机号"
                >手机号码：</InputItem>
                <InputItem
                    {...getFieldProps('mail', {
                    initialValue: mail,
                    rules: [
                        { validator: (rule, value, callback) => {
                          const reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                          if (reg.test(value)) {
                            callback();
                          } else {
                              callback(new Error('请输入邮箱'));
                            }
                       }}],
                    })}
                    error={!!getFieldError('mail')}
                    placeholder="请输入邮箱"
                >邮箱地址:</InputItem>
                <TextareaItem
                  {...getFieldProps('Textarea', {
                    initialValue: Textarea,
                    rules: [
                        { validator: (rule, value, callback) => {
                          if (value) {
                            callback();
                          } else {
                              callback(new Error('请输入个人简介'));
                            }
                      }}],
                    })}
                  title="个人简介:"
                  rows="3"
                  error={!!getFieldError('Textarea')}
                  placeholder="请输入个人简介"
                />
                <TextareaItem
                {...getFieldProps('WorkExp', {
                  initialValue: WorkExp ,
                  rules: [
                      { validator: (rule, value, callback) => {
                          if (value) {
                            callback();
                          } else {
                              callback(new Error('请输入工作经历'));
                            }
                     }}],
                  })}
                title="工作经历:"
                rows="3"
                error={!!getFieldError('WorkExp')}
                placeholder="请输入工作经历"
              />
              </form>
              {
                resumeType == 1 ?(
                  <div>
                    <div className="img_upload" style={{margin: '0.8rem 0'}}>
                      <p style={{padding: '0 0.4rem'}}>图片上传：</p>
                      <ImagesView
                        files={this.state.files}
                        onChange={this.onChangeImg.bind(this)}
                        selectable={files.length < 3}
                        accept="image/gif,image/jpeg,image/jpg,image/png" />
                    </div>
                    <Button style={{width: '80%', margin: '1rem auto'}} type="primary" className="submit" onClick={this.submit}>提交</Button>
                  </div>
                ):(
                  <div>
                    <div style={{height:'20px',padding:'5px',borderTop: '1px solid rgb(221, 221, 221)',backgroundColor:'white'}}>
                        <p style={{padding: '0 0.4rem',display: 'inline'}}>附件简历1</p>
                        <img style={{ marginLeft: '11rem',display: 'inline',width:'0.8rem'  }} src={look} />
                    </div>
                    <Button style={{width: '80%', margin: '1rem auto'}} type="primary" className="submit" onClick={this.submit}>保存</Button>
                  </div>
                )
                }
              </div>
          </div>
        ):(
            <div className="newjianli_model">
              <div className="newjianli_model_body">
                  <Navigation title="创建简历" />
                  <div className="changsha_model_img">
                      <img  src={require('%/modelImg.png')}  />
                  </div>
                  <div className="newjianli_model_title">抱歉,您还未创建简历</div>
                  <Button className='comingPark_btn' onClick={()=>{this.setState({ resumeType : 1 })}}>新建简历</Button>
              </div>
          </div>
        )
      }
      </div>
    )
  }
}
export default createForm()(AdvertisementApply);