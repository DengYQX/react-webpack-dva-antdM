//在线发布--新增
import React, { Component } from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import Navigation from '@/util/navigation'
import { Button, List, TextareaItem, Picker, InputItem, Toast } from 'antd-mobile';
import './getPeople.less'
import ImagesView from '@/util/imagesView.jsx';
import { createForm } from 'rc-form';
import interfaces from '@/api/index'

class AddOnline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            getFieldProps: {
                JobName: '', // 职位
                JobDescription: '',  // 职位描述
            },
            yearList: [], //经验要求
            ExperiRequi: '', //经验要求id
            studyList: [], // 学历要求
            Education: '', // 学历id
            moneyList: [], // 薪资
            SalaryRange: '', // 薪资id
            PicList:[],
            files:[],
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

    // 新增
    submit = () => {
        this.props.form.validateFields((err, val) => {
            console.log(val)
            if (!err) {
                const { ExperiRequi, Education, SalaryRange } = this.state
                if(ExperiRequi == '') {
                    return Toast.info('请选择经验要求!');
                }
                if(Education == '') {
                    return Toast.info('请选择学历要求 !');
                }
                if(SalaryRange == '') {
                    return Toast.info('请选择薪资要求!');
                }
                var ImgList=[];
                if(this.state.PicList.length>0){
                    this.state.PicList.forEach(item=>{
                        var text={
                            Name:item.Name,
                            Url:item.URL,
                            ThumbUrl:item.smallPhotoURL,
                            Ext:item.Type,
                        }
                        ImgList.push(text)
                    })
                }
                var data={
                    PicList:ImgList,
                    ExperiRequi:ExperiRequi,
                    Education:Education,
                    SalaryRange:SalaryRange,
                    UserID:localStorage.getItem('userId'),
                    Status:0,
                    JobName:val.JobName,
                    JobDescription:val.JobDescription,
                }

                interfaces.AddOnlinetPublishJob(data).then(res => {
                    console.log(res)
                    const data = {
                        title: '新增',
                        btn: '返回',   //按钮的字
                        img: 1,  //1为成功，0为失败
                        url: '/',    //点击按钮跳转的链接
                        text: '新增成功'
                    }
                    hashHistory.push({ pathname: '/registerOk', state: { data: data } })
                })
            }
        })
    }
    // 图片上传
    onChange = (files, type, index) => {
        console.log(files, type, index);
        if(type == 'add') {
            files.forEach(element => {
                interfaces.UploadBase64Img({fileext: '.jpg', Base64Photo: element.url}).then(res => {
                console.log(res)
                this.setState({
                    PicList: [...this.state.PicList, ...res]
                })
                })
                
            });
        
        }else {
        this.state.PicList.splice(index, 1)
            this.setState({
                PicList: [...this.state.PicList, ...res]
            })
        }
        this.setState({
            files,
        })
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const { files } = this.state;
        return (
            <div className='addOnline'>
                <Navigation title='新增' />
                <InputItem
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
                <List renderHeader={() => '职位描述:'}>
                    <TextareaItem
                        rows={4}
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

export default createForm()(AddOnline);