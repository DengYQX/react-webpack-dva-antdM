//在线发布--编辑
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import Navigation from '@/util/navigation'
import { Button, List, TextareaItem, Picker, InputItem  } from 'antd-mobile';
import './getPeople.less'
import ImagesView from '@/util/imagesView.jsx';
import { createForm } from 'rc-form';
import interfaces from '@/api/index'

class EditOnline extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data;
    const files=this.props.location.state.files.map(item => {
      const data = {...item}
      if (!data.url) {
        data.url = item.FullUrl
      }
      return data;
    }) ;
    this.state = {
      data,
      files,
      getFieldProps: {
        JobName: data.JobName, // 职位
        JobDescription: data.JobDescription,  // 职位描述
        PicList:[...files],
      },
      ID: data.ID,
      yearList: [], //经验要求
      ExperiRequi: data.ExperiRequi.toString().split(''), //经验要求id
      studyList: [], // 学历要求
      Education: data.Education.toString().split(''), // 学历id
      moneyList: [], // 薪资
      SalaryRange: data.SalaryRange.toString().split(''), // 薪资id
      multiple:true,
     
     
    }
  }

  componentDidMount() {
    this.experiRequiList()
    this.educationList()
    this.salaryRangeList()
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
  // 图片上传
  onChange = (files, type, index) => {
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
      //console.log(this.state.getFieldProps)
    });
  }

  // 编辑
  submit = () => {
    this.props.form.validateFields((err, val) => {
      if (!err) {
        const { ID, ExperiRequi, Education, SalaryRange } = this.state
        if (ExperiRequi == '') {
          return Toast.info('请选择经验要求!');
        }
        if (Education == '') {
          return Toast.info('请选择学历要求!');
        }
        if (SalaryRange == '') {
          return Toast.info('请选择薪资要求!');
        }
        val.ID = ID
        val.ExperiRequi = ExperiRequi[0]
        val.Education = Education[0]
        val.SalaryRange = SalaryRange[0]
        val.UserID = localStorage.getItem('userId')
        val.bDelFlag=0
       // console.log(this.state.getFieldProps.PicList)
        if(this.state.getFieldProps.PicList.length>0){
          var imgList=[]
          this.state.getFieldProps.PicList.forEach(item=>{
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

        }

        val.PicList=imgList

        interfaces.ModifyOnlinePublishJob(val).then(res => {
          console.log(res)
          const data = {
            title: '编辑',
            btn: '返回',   //按钮的字
            img: 1,  //1为成功，0为失败
            url: '/:id/app/',    //点击按钮跳转的链接
            text: '编辑成功'
          }
          hashHistory.push({ pathname: '/registerOk', state: { data: data } })
        })
      }
    })
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;
    const {files}=this.state;
    return (
      <div className='addOnline'>
        <Navigation title='编辑' />
        <InputItem
          value={this.state.getFieldProps.JobName}
          {...getFieldProps('JobName', {
            initialValue: this.state.getFieldProps.JobName,
            rules: [
              {
                validator: (rule, value, callback) => {
                  if (value) {
                    callback();
                  } else {
                    callback(new Error('请输入招聘职位'));
                  }
                }
              }],
          })}
          error={!!getFieldError('JobName')}
          placeholder="请输入招聘职位"
        >招聘:</InputItem>
        <Picker data={this.state.yearList}
          cols={1}
          value={this.state.ExperiRequi}
          onChange={v => this.setState({ ExperiRequi: v })}
          onOk={v => this.setState({ ExperiRequi: v })}
          placeholder='请选择经验年限' >
          <List.Item arrow="horizontal">经验要求：</List.Item>
        </Picker>
        <Picker data={this.state.studyList}
          cols={1}
          value={this.state.Education}
          onChange={v => this.setState({ Education: v })}
          onOk={v => this.setState({ Education: v })}
          placeholder='请选择学历' >
          <List.Item arrow="horizontal">最低学历要求：</List.Item>
        </Picker>
        <Picker data={this.state.moneyList}
          cols={1}
          value={this.state.SalaryRange}
          onChange={v => this.setState({ SalaryRange: v })}
          onOk={v => this.setState({ SalaryRange: v })}
          placeholder='请选择薪资范围' >
          <List.Item arrow="horizontal">薪资范围：</List.Item>
        </Picker>
        <List renderHeader={() => '职位描述:'}>
          <TextareaItem
            rows={4}
            value={this.state.getFieldProps.JobDescription}
            {...getFieldProps('JobDescription', {
              initialValue: this.state.getFieldProps.JobDescription,
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value) {
                      callback();
                    } else {
                      callback(new Error('请输入职位描述......'));
                    }
                  }
                }],
            })}
            error={!!getFieldError('JobDescription')}
            placeholder="请输入职位描述..."
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
        </div>
        <div className='addOnline_foot'>
          <Button className='addOnline_btn' onClick={this.submit}>完成</Button>
        </div>
      </div>
    )
  }
}

export default createForm()(EditOnline);