//长沙风险补充基金--立即申请
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import  Navigation from '@/util/navigation'
import { Button,List,TextareaItem,Picker,InputItem ,DatePicker,Modal } from 'antd-mobile';

import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';

import './changsha.less'
import { createForm } from 'rc-form';
import interfaces from '@/api/index'

class InstallChangsha extends Component{
    constructor(props){
        super(props);
        const data = this.props.location.state && this.props.location.state.length > 0 ? this.props.location.state[0] : {};
       // console.log(data)
        this.state={
            all:{
                companyName: data.CompanyName || '', 
                name: data.Contacter || '',
                phone: data.Telphone|| '',
                money: data.Amount || '',
                textare: data.Details || '',
            },
            typeList:[],
            type: [parseInt(data.FinancingType, 10)]
        }
    }
    componentDidMount(){
        //获取融资类型
        interfaces.GetFinancingType().then(res=>{
            if(res){
                var array=[];
                res.forEach(item=>{
                    var text={value:'',label:''}
                    text.value=item.cName,
                    text.label=item.cName,
                    array.push(text)
                })
                this.setState({
                    typeList:array
                })
            }
        })
    }
    jumpComing=()=>{
        this.props.form.validateFields({ force: true }, (error, values) => {
            const{token}=this.props; /** token来源于modol-login中的token */
            const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
            if (!error && loginType) {
                var post={
                    UserId:localStorage.getItem('userId'),
                    CompanyName:values.companyName,
                    Contacter:values.name,
                    Telphone:values.phone,
                    Amount:values.money,
                    Details:values.textare,
                    FinancingType:this.state.type[0],
                }
                interfaces.AddFinancialServiceRisk(post).then(res=>{
                    const data={
                        title:'申请提交',
                        btn:'确定',   //按钮的字
                        img:1,  //1为成功，0为失败
                        url:'/',    //按钮跳转的链接
                        text:'申请提交通过，请等待通知！'
                    }
                    hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
                })
            }else if ( !loginType ){
                Modal.alert('您尚未登陆', '您是否需要登陆', [
                    { text: '否', },
                    { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
                ]);
            }
            
        })
    }
    validatecompanyName=(rule, value, callback) => {
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
          callback(new Error("请输入姓名!"));
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
    validatemoney=(rule, value, callback) => {
        if (value && value !== "") {
          callback();
        } else {
          callback(new Error("请输入融资金额!"));
        }
    };
    validatetextare=(rule, value, callback) => {
        if (value && value !== "") {
          callback();
        } else {
          callback(new Error("请输入资金用途!"));
        }
    };
    render(){
        const {getFieldProps,getFieldError }=this.props.form;
        return(
            <div className='installChangesha'>
                <Navigation title='立即申请'  />
                <InputItem
                    {...getFieldProps('companyName', {
                        initialValue: this.state.all.companyName,
                        rules: [{ validator: this.validatecompanyName }]
                    })}
                    error={!!getFieldError("companyName")}
                    onErrorClick={() => {
                        Modal.alert(getFieldError("companyName"));
                    }}
                    placeholder="请输入公司名称"
                >公司名称：</InputItem>
                <InputItem
                    {...getFieldProps('name', {
                        initialValue: this.state.all.name,
                        rules: [{ validator: this.validatename}]
                    })}
                    error={!!getFieldError("name")}
                    onErrorClick={() => {
                        Modal.alert(getFieldError("name"));
                    }}
                    placeholder="请输入姓名"
                >姓名：</InputItem>
                <InputItem
                    {...getFieldProps('phone', {
                        initialValue: this.state.all.phone,
                        rules: [{ validator: this.validatephone }]
                    })}
                    type="number"
                    error={!!getFieldError("phone")}
                    onErrorClick={() => {
                        Modal.alert(getFieldError("phone"));
                    }}
                    placeholder="请输入联系方式"
                >联系方式：</InputItem>
                <InputItem
                    {...getFieldProps('money', {
                        initialValue: this.state.all.money,
                        rules: [{ validator: this.validatemoney }]
                    })}
                    error={!!getFieldError("money")}
                    onErrorClick={() => {
                        Modal.alert(getFieldError("money"));
                    }}
                    placeholder="请输入融资金额"
                >融资金额(万元)：</InputItem>
                <Picker
                    data={this.state.typeList}
                    cols={1}
                    value={this.state.type}
                    onChange={v => this.setState({ type: v })}
                    onOk={v => this.setState({ type: v })} >
                    <List.Item arrow="horizontal">融资类型:</List.Item>
                </Picker>
                <List renderHeader={() => '资金用途:'}>
                    <TextareaItem
                        rows={5}  
                        {...getFieldProps('textare', {
                            initialValue: this.state.all.textare,
                            rules: [{ validator: this.validatetextare }]
                        })}
                        error={!!getFieldError("textare")}
                        onErrorClick={() => {
                            Modal.alert(getFieldError("textare"));
                        }}
                        placeholder="请输入资金用途..." />
                </List>
                <div className='comingPark_foot'>
                    {
                        this.props.location.state && this.props.location.state.length > 0 ? <Button className='comingPark_btn' style={{background: '#B5B5B5'}} >已提交</Button> :  <Button className='comingPark_btn' onClick={this.jumpComing}>提交</Button>
                    }
                </div>
            </div>
        )
    }


}
 
InstallChangsha.defaultProps = {
    token: '',
};
InstallChangsha.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(createForm()(InstallChangsha));
