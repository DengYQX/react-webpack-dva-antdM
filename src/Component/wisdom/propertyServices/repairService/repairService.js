//线上招聘平台
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import Navigation from '@/util/navigation'
import { createForm } from 'rc-form';
import { Button, Picker, List, InputItem, TextareaItem, Toast } from 'antd-mobile';
import ImagesView from '@/util/imagesView.jsx';
import './repairService.less'
import api from '@/api'

class RepairService extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeList: [
        {label: '办公室', value: '办公室'},
        {label: '洗手间', value: '洗手间'},
        {label: '空调', value: '空调'},
      ], //报修分类
      RepairType: '',  //报修id
      peopleNumber: [
        {label: 'A1栋', value: 'A1栋'},
        {label: 'A2栋', value: 'A2栋'},
        {label: 'A3栋', value: 'A3栋'},
      ],  //楼宇
      CompanyName: '',
      BuildID: '',  //楼宇id
      RoomNo: '',
      Name: '', // 姓名,
      Telephone: '', // 手机号
      Content: '', // 报修事宜
      ProblemDetails: '', // 问题详细描述
      hasError: false,
      files: [],
      uploadFiles: [],
      multiple: false,
    }
  }

  onErrorClick = () => {
    if (this.state.hasError) {
      Toast.info('请输入正确的手机号!');
    }
  }

  changeTel = (value) => {
    if (value.replace(/\s/g, '').length < 11) {
      this.setState({
        hasError: true,
      });
    } else {
      this.setState({
        hasError: false,
      });
    }
    this.setState({
      Telephone: value,
    });
  }

  // 图片上传
  onChange = (files, type, index) => {
    console.log(files, type, index);
    if(type=='add'){
      api.UploadBase64Img({fileext:'.jpg',Base64Photo:files[0].url}).then(res=>{
        console.log(res)
          this.setState({
            uploadFiles:[...this.state.uploadFiles,...res]
          },()=>{
            console.log(this.state.uploadFiles)
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
      files,
    })
  }

  // 提交
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error, values) => {
      if (!error) {
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
        let BuildNo;
        this.state.peopleNumber.forEach(index => {
          if(index.value == values.BuildID[0]){
             return BuildNo = index.label;
          }
        });
        let post = {
          UserID: localStorage.getItem("userId"),
          RepairType: values.RepairType[0],
          BuildID: values.BuildID[0],
          BuildNo,
          RoomNo: values.RoomNo,
          CompanyName: values.CompanyName,
          Name: values.Name,
          Telephone: values.Telephone,
          Content: values.Content,
          ProblemDetails: values.ProblemDetails,
          ProblemPicList: ImgList,
          FeedbackPicList:[],
        }
        api.AddRepairManage(post).then(res => {
          //跳转公共页面的相关参数-
          const data = {
            title: '提交',
            btn: '返回',   //按钮的字
            img: 1,  //1为成功，0为失败
            url: '/1/app/',    //点击按钮跳转的链接
            text: '您已提交成功，工作人员会尽快与您联系'
          }

          hashHistory.push({ pathname: '/registerOk', state: { data: data } })
        })
      }
    });
  }

  componentWillMount() {
    Promise.all([
      api.GetRepairTypeList(),
      api.GetBuildList()
    ]).then(allRes => {
      let typeList = [];
      let buildList = [];
      allRes[0].map(item => {
        typeList.push({
          label: item.cName,
          value: item.cValue,
          id: item.ID
        });
      });
      allRes[1].map(item => {
        buildList.push({
          label: item.BuildNo,
          value: item.ID
        });
      });
      this.setState({
        typeList: typeList,
        peopleNumber: buildList
      });
    });
  }

  validatePhone= (rule, value, callback) => {
    const reg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error('请输正确手机号！'));
    }
  }

  render() {
    const { files } = this.state;
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className='repairService'>
        <Navigation title='报修服务' />
        <div>
          <Picker data={this.state.typeList}
            cols={1}
            // value={this.state.RepairType}
            {
              ...getFieldProps('RepairType', {
                // rules: [
                //   { validator: {required: true} }
                // ],
                validate: [{
                  trigger: 'onBlur',
                  rules: [{required: true}],
                }]
              })
            }
            // onChange={v => this.setState({ RepairType: v })}
            // onOk={v => {console.log(v), this.setState({ RepairType: v })}}
          >
            <List.Item arrow="horizontal">报修分类：</List.Item>
          </Picker>
          <Picker data={this.state.peopleNumber}
            cols={1}
            {
              ...getFieldProps('BuildID', {
                // rules: [
                //   { validator: {required: true} }
                // ],
                validate: [{
                  trigger: 'onBlur',
                  rules: [{required: true}],
                }]
              })
            }
            // value={this.state.BuildID}
            // onChange={v => this.setState({ BuildID: v.join('') })}
            // onOk={v => this.setState({ BuildID: v.join('') })}
          >
            <List.Item arrow="horizontal">所在楼宇：</List.Item>
          </Picker>
          <InputItem
            // type="number"
            {
              ...getFieldProps('RoomNo')
            }
            placeholder="请输入房间号"
          >房间号：</InputItem>
          <InputItem
            {
              ...getFieldProps('CompanyName', {
                // rules: [
                //   { validator: {required: true} }
                // ],
                // validate: [{
                //   trigger: 'onBlur',
                //   rules: [{required: true}],
                // }]
              })
            }
            // onErrorClick={() => {
            //   alert(getFieldError('CompanyName'));
            // }}
            // onChange={v => this.setState({ CompanyName: v })}
            placeholder="请输入公司名称"
          >公司名称：</InputItem>
          <InputItem
            {
              ...getFieldProps('Name', {
                // rules: [
                //   { validator: {required: true} }
                // ],
                validate: [{
                  trigger: 'onBlur',
                  rules: [{required: true}],
                }]
              })
            }
            error={!!getFieldError('Name')}
            // onChange={v => this.setState({ Name: v })}
            placeholder="请输入姓名"
          >姓名：</InputItem>
          <InputItem
            type="number"
            {
              ...getFieldProps('Telephone', {
                rules: [
                  { validator: this.validatePhone }
                ],
                validate: [{
                  trigger: 'onBlur',
                  rules: [{required: true}],
                }]
              })
            }
            error={!!getFieldError('Telephone')}
            placeholder="请输入手机号码"
          >手机号码：</InputItem>
          <InputItem
            {
              ...getFieldProps('Content', {
                validate: [{
                  trigger: 'onBlur',
                  rules: [{required: true}],
                }]
              })
            }
            error={!!getFieldError('Content')}
            placeholder="请输入报修事宜"
          >报修事宜：</InputItem>
          <List renderHeader={() => '详细描述问题:'}>
            <TextareaItem
              {
                ...getFieldProps('ProblemDetails', {
                  validate: [{
                    trigger: 'onBlur',
                    rules: [{required: true}],
                  }]
                })
              }
              error={!!getFieldError('ProblemDetails')}
              rows={4}
              placeholder="请输入问题描述..."
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
          </div>
        </div>
        <div className='getMeet_foot'>
          <Button className='getMeet_btn' onClick={this.onSubmit}>提交</Button>
        </div>
      </div>
    )
  }
}

export default createForm()(RepairService);