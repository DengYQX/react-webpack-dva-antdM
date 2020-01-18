//待办服务--营销服务/办公采购/装修服务/家政服务/IT服务---公共
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { Button,List,TextareaItem,InputItem,NavBar,Icon,Modal } from 'antd-mobile';
import './sellThing.less'

import { createForm } from 'rc-form';
import interfaces from "@/api/index";

class SellThing extends Component{
    constructor(props){
        super(props)
        const title=this.props.location.state.data.text
        // 类型（1.办公、2.装修服务、3.营销服务、4.家政服务、5.IT服务）
        this.state={
            getFieldProps:{
                company:'',
                name:'',
                phone:'',
                describe:'',
            },
            title:title,
        }
    }
    changtextarea(e){
        this.setState({
            describe:e
        })
    }
    clickUpLoad(){
        this.props.form.validateFields({ force: true }, (error, values) => {
            if (!error) {
                if(this.state.title=='办公采购'){
                    var type=1
                }else if(this.state.title=='营销服务'){
                    var type=3
                }else if(this.state.title=='家政服务'){
                    var type=4
                }else if(this.state.title=='装修服务'){
                    var type=2
                }else{
                    var type=5
                } 
                var post={
                    Type:type,
                    UserId:localStorage.getItem('userId'),
                    CompanyName:values.company,
                    Contacts:values.name,
                    Telphone:values.phone,
                    Details:values.describe
                }
                interfaces.AddInsteadServicesApply(post).then(res=>{
                    console.log(res)
                    hashHistory.push({pathname:'/companyList',state:{type:type}})
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
    validatephone=(rule, value, callback) => {
        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入手机号！"));
        }
    }
    validatedescribe=(rule, value, callback) => {
        if (value && value !== "") {
          callback();
        } else {
          callback(new Error("请输入姓名！"));
        }
    };
    render(){
        const {getFieldProps,getFieldError}=this.props.form;
        return(
            <div className='sellThing'>
                <NavBar  
                    mode="light"
                    icon={<Icon type="left" color="#000" />}
                    onLeftClick={()=>hashHistory.goBack()}
                    >{this.state.title}</NavBar>
                <InputItem
                        {...getFieldProps('company', {
                                initialValue: this.state.getFieldProps.company,
                                rules: [{ validator: this.validatecompany }]
                            })}
                            error={!!getFieldError("company")}
                            onErrorClick={() => {
                                Modal.alert(getFieldError("company"));
                            }}
                          placeholder="请输入公司名称"
                    >公司名称：</InputItem>
                <InputItem
                        {...getFieldProps('name', {
                                initialValue: this.state.getFieldProps.name,
                                rules: [{ validator: this.validatename }]
                            })}
                            error={!!getFieldError("name")}
                            onErrorClick={() => {
                                Modal.alert(getFieldError("name"));
                            }}
                            placeholder="请输入姓名"
                    >姓名：</InputItem>
                <InputItem
                        {...getFieldProps('phone', {
                                initialValue: this.state.getFieldProps.phone,
                                rules: [{ validator: this.validatephone }]
                            })}
                            error={!!getFieldError("phone")}
                            onErrorClick={() => {
                                Modal.alert(getFieldError("phone"));
                            }}
                            type="number"
                          placeholder="请输入联系方式"
                    >联系方式：</InputItem>
                 <List renderHeader={() => '需求描述:'}>
                        <TextareaItem
                            rows={4}   
                            {...getFieldProps('describe', {
                                initialValue: this.state.getFieldProps.describe,
                                rules: [{ validator: this.validatedescribe }]
                            })}
                            error={!!getFieldError("describe")}
                            onErrorClick={() => {
                                Modal.alert(getFieldError("describe"));
                            }}
                            placeholder="请输入需求描述..."/>
                    </List>
                <div className='sellThing_foot'>
                    <Button className='sellThing_btn' onClick={this.clickUpLoad.bind(this)}>申请</Button>
                </div>
            </div>
        )
    }
}

export default  createForm()(SellThing); 
