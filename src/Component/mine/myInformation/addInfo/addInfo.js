import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon, List, InputItem, Button, TextareaItem, Toast,Picker ,Modal} from 'antd-mobile';
import './addInfo.less' //样式文件
import { createForm } from 'rc-form';
import interfaces from '@/api/index';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';
import ImagesView from '@/util/imagesView.jsx';

class AddInfo extends Component {
  constructor(props) {
    super(props);

    const data = this.props.location.state ?  this.props.location.state.data : {};

    const files = this.props.location.state ? this.props.location.state.files.map(item => {
      const data = {...item, url: item.FullUrl}
      return data;
    }) : [];
    if(this.props.location.query.name === '编辑'){
      this.setState({
        ExperiRequi:data.ExperiRequi.toString().split(''), //经验要求id
        Education:data.Education.toString().split(''), //经验要求id
        SalaryRange:data.SalaryRange.toString().split(''), //经验要求id
      })
    }
    
    this.state = {
      getFieldProps: {
        EnterpriseID: '',
        Position: '',
        PositionDetails: '',
        PicList: [...files],
        EnterpriseName: '',
        Status: null,
        IsTopping: null,
        ...data
      },
      data:data,

      yearList: [], //经验要求
      ExperiRequi: this.props.location.state ? data.ExperiRequi.toString().split(''): '',   
      studyList: [], // 学历要求
      Education: this.props.location.state ? data.Education.toString().split(''): '',  // 学历id
      moneyList: [], // 薪资
      SalaryRange: this.props.location.state ? data.SalaryRange.toString().split(''): '', // 薪资id
      files,
      multiple: true,
    }
    
  }
  
  componentDidMount() {
    this.experiRequiList()
    this.educationList()
    this.salaryRangeList()
    if(this.props.location.query.name === '编辑'){
      const list=this.state.getFieldProps;
      list.Position=this.state.data.JobName;
      list.PositionDetails=this.state.data.JobDescription;
      this.setState({
        getFieldProps:list
      },()=>{
        console.log(this.state.ExperiRequi)
      })
      
    }
   
  }
  componentWillUnmount () {
    this.setState({
      getFieldProps:  {
        EnterpriseID: '',
        Position: '',
        PositionDetails: '',
        PicList: [],
        EnterpriseName: '',
        Status: null,
        IsTopping: null,
        ID: ''
      }
    })
  }
   // 经验要求
  experiRequiList() {
    interfaces.GetExperiRequiList({}).then(res => {
        console.log(res)
        let list = []
        for (let i = 0; i < res.length; i++) {
            list.push({
                label: res[i].cName,
                value: res[i].cValue
            })
        }
        this.setState({
            yearList: [...this.state.yearList, ...list]
        })
      })
  }

  // 学历要求
  educationList() {
      interfaces.GetEducationList({}).then(res => {
          console.log(res)
          let list = []
          for (let i = 0; i < res.length; i++) {
              list.push({
                  label: res[i].cName,
                  value: res[i].cValue
              })
          }
          this.setState({
              studyList: [...this.state.studyList, ...list]
          })
      })
  }

  // 学历要求
  salaryRangeList() {
      interfaces.GetSalaryRangeList({}).then(res => {
          console.log(res)
          let list = []
          for (let i = 0; i < res.length; i++) {
              list.push({
                  label: res[i].cName,
                  value: res[i].cValue
              })
          }
          this.setState({
              moneyList: [...this.state.moneyList, ...list]
          })
      })
  }
  // 提交
  submit = () =>{
    this.props.form.validateFields((err, val) => {
      const{token= ''}=this.props; /** token来源于modol-login中的token */
      const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
      if (!err && loginType) {
          const imgList = [];
          this.state.getFieldProps.PicList.forEach(item => {
            const URL = item.url || item.URL;
            if (URL.indexOf('base64') < 0) {  
              if (!item.Ext) {
                item.Ext = item.Type
              }
              if (!item.ThumbUrl) {
                item.ThumbUrl = item.smallPhotoURL
              }
              imgList.push(item)
            }
          })
          
         if (this.props.location.query.name === '编辑') {
          const data = {
            ID:this.state.data.ID,
            UserID:localStorage.getItem('userId'),
            JobName:val.Position,
            ExperiRequi:this.state.ExperiRequi[0],
            Education:this.state.Education[0],
            SalaryRange:this.state.SalaryRange[0],
            JobDescription:val.PositionDetails,
            PicList: imgList,
            bDelFlag:0,
          }
           interfaces.ModifyOnlinePublishJob(data).then(res=>{
             const data={
               title:this.props.location.query.name,
               btn:'确定',   //按钮的字
               img:1,  //1为成功，0为失败
               url: '/',    //按钮跳转的链接
               text:`${this.props.location.query.name}成功`
             }
             hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
           })
         }else {
          const data = {
            UserID:localStorage.getItem('userId'),
            JobName:val.Position,
            ExperiRequi:this.state.ExperiRequi,
            Education:this.state.Education,
            SalaryRange:this.state.SalaryRange,
            JobDescription:val.PositionDetails,
            PicList: imgList
          }
           interfaces.AddOnlinetPublishJob(data).then(res=>{
             const data={
               title:this.props.location.query.name,
               btn:'确定',   //按钮的字
               img:1,  //1为成功，0为失败
               url: '/',    //按钮跳转的链接
               text:`${this.props.location.query.name}成功`
             }
             hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
           })
         }
      
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
    console.log(files, type, index, 23)
    for (let i =0; i<files.length; i++) {
      let item = files[i];
      let fileext = '.jpg';
      if (item.file) {
         fileext = '.' + item.file.name.replace(/.+\./,"");
      }
      
      if (type === 'add') {
        if (item.url.indexOf('base64') > 0) {
          interfaces.UploadBase64Img({fileext: fileext, Base64Photo: item.url}).then(res => {
              this.setState({
                getFieldProps:  {
                  ...this.state.getFieldProps,
                  PicList: [...this.state.getFieldProps.PicList, ...res],
                }
              })
          })
        }else {
          this.setState({
             getFieldProps:  {
               ...this.state.getFieldProps,
               PicList: [...files],
             }
          })
        }
      }else {
        const arrs= this.state.getFieldProps.PicList;
        arrs.splice(index,1);
        console.log(arrs)
        this.setState({
            getFieldProps: {
             ...this.state.getFieldProps,
            PicList: [...arrs],
          }
        })
      }
    }
    if (files.length < 1) {
      this.setState({
          getFieldProps: {
           ...this.state.getFieldProps,
          PicList: [],
        }
      })
    }
    this.setState({
      files,
    },()=>{
      console.log(this.state.files)
    });
  }
  
  render() {
    const { getFieldProps, getFieldError} = this.props.form;
    const { files } = this.state;
    return (
      <div className='add_info'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="my_report_title"
        >{this.props.location.query.name}</NavBar>
        <List className="my_report_list">
          <InputItem
            {...getFieldProps('Position', {
              initialValue: this.state.getFieldProps.Position,
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                        callback(new Error('请输入招聘职位'));
                      }
                }}],
            })}
            error={!!getFieldError('Position')}
            placeholder="请输入招聘职位"
          >招聘职位：</InputItem>
          {/* <InputItem
            {...getFieldProps('ExperienceRequirement', {
              initialValue: this.state.getFieldProps.ExperienceRequirement,
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else { 
                        callback(new Error('请输入经验年限'));
                      }
                }}],
            })}
            error={!!getFieldError('ExperienceRequirement')}
            placeholder="请输入经验年限"
          >经验要求：</InputItem>
          <InputItem
            {...getFieldProps('MinimumEducation', {
              initialValue: this.state.getFieldProps.MinimumEducation,
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                        callback(new Error('请输入学历'));
                      }
                }}],
            })}
            error={!!getFieldError('MinimumEducation')}
            placeholder="请输入学历"
          >最低学历：</InputItem>
          <InputItem
            {...getFieldProps('SalaryRange', {
              initialValue: this.state.getFieldProps.SalaryRange,
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                        callback(new Error('请输入薪资范围'));
                      }
                }}],
            })}
            error={!!getFieldError('SalaryRange')}
            placeholder="请输入薪资范围"
          >薪资范围：</InputItem>*/}
          <Picker data={this.state.yearList}
            cols={1}
            value={this.state.ExperiRequi}
            onChange={v => this.setState({ ExperiRequi: v.join('') })}
            onOk={v => this.setState({ ExperiRequi: v.join('') })}
            placeholder='请选择经验年限' >
            <List.Item arrow="horizontal">经验要求：</List.Item>
          </Picker>
          <Picker data={this.state.studyList}
              cols={1}
              value={this.state.Education}
              onChange={v => this.setState({ Education: v.join('') })}
              onOk={v => this.setState({ Education: v.join('') })}
              placeholder='请选择学历' >
              <List.Item arrow="horizontal">最低学历要求：</List.Item>
          </Picker>
          <Picker data={this.state.moneyList}
              cols={1}
              value={this.state.SalaryRange}
              onChange={v => this.setState({ SalaryRange: v.join('') })}
              onOk={v => this.setState({ SalaryRange: v.join('') })}
              placeholder='请选择薪资范围' >
              <List.Item arrow="horizontal">薪资范围：</List.Item>
          </Picker>
          <TextareaItem
            title="职位描述："
            rows="4"
            {...getFieldProps('PositionDetails', {
              initialValue: this.state.getFieldProps.PositionDetails,
              rules: [
                { validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                        callback(new Error('请输入职位描述......'));
                      }
                }}],
            })}
            error={!!getFieldError('PositionDetails')}
            placeholder="请输入职位描述......."
          />
        </List>
        
        <div className="upload_pictures">
          <p>图片上传：</p>
          <ImagesView
            files={files}
            onChange={this.onChange}
            selectable={files.length < 3}
            multiple={this.state.multiple}
          />
          <Button type="primary" className="submit" onClick={this.submit.bind(this)}>完成</Button>
        </div>
      </div>
    )
  }

}

AddInfo.defaultProps = {
  token: '',
};
AddInfo.propTypes = {
  token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(AddInfo));
