//入园流程
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';
import  Navigation from '@/util/navigation'
import { Button,Modal } from 'antd-mobile';
import api from '@/api'
import './comingPark.less'
import  downImg from   '%/jiantou.png';

class ComingPark extends Component{
    constructor(props){
        super(props)
        this.state={
            status: 0,
            statusName: '',
            ReasonRefusal: '',
            type: '',
            data: []
        }
    }
    componentDidMount() {
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        if (localStorage.getItem('userId')) {
           api.GetMyJoinParkApplyDetails({
            UserId: localStorage.getItem('userId')
           }).then(res => {
               if (res && res.length > 0) {
                this.setState({
                    status: res[0].Status,
                    statusName: res[0].Statusstr,
                    type: res[0].RegisterType,
                    ReasonRefusal: res[0].ReasonRefusal
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
    showStatus =()=> {
        // 状态（1：初审中，2：审核中，3：已通过，4：初审拒绝，5：审核拒绝） 

        let tels = {
            title: this.state.statusName,
            btn:'立即前往',   //按钮的字
            img:1,  //1为成功，0为失败
            url: this.state.type === 1 ? '/nowShopping' : '/replaceChangsha',    //按钮跳转的链接
            text: this.state.type === 1 ? '恭喜您，可进行免费的工商注册' : "是否立即办理工商迁移变更"
        }
        if (this.state.status === 3) {
            hashHistory.push( { pathname:'/registerOk', state:{data: tels} } )
        }else if (this.state.status === 4 || this.state.status === 5 ) {
            tels.img = 1;
            tels.title = '审核未通过';
            tels.btn = '再次申请';
            tels.url = '/coming';
            tels.desc = this.state.ReasonRefusal;
            hashHistory.push( { pathname:'/registerOk', state:{data: tels, plus: true} } )
        }
       
    }
    jumpComing=()=>{
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
        if(loginType){
            hashHistory.push({pathname:'/coming'})
        }else{
            Modal.alert('您尚未登陆', '您是否需要登陆', [
                { text: '否', },
                { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
            ]);
        }
    }
    render(){
        return(
            <div className='comingPark'>
                <Navigation title='入园申请' />
                <div className='comingPark_div'>
                    <div className='comingPark_box'>
                        <div className='comingPark_title'>拟入园企业</div>
                        <div  className='comingPark_text'>
                            <p>企业从园区官网下载入园资料，填写完成后递交</p>
                            <p>至园区企业服务中心</p>
                        </div>
                    </div>
                    <div className='comingPark_img'>
                        <img  src={downImg} />
                    </div>
                    <div className='comingPark_box'>
                        <div className='comingPark_title'>入园初审（3个工作日内）</div>
                        <div  className='comingPark_text'>
                            <p>企业服务中心对拟入园企业进行资料和资质</p>
                            <p>初审，了解企业基本情况，形成初审意见。</p>
                            <p>入园企业建档需提供的资料：</p>
                            <p>新办企业:</p>
                            <p>1.入园审核表 </p><p>2.项目可行性研究报告（商业计划书）</p>
                            <p>迁入企业:</p>
                            <p>1.入园审核表 </p>
                            <p>2.营业执照</p>
                            <p>3.法人代表身份证复印件 </p>
                            <p>4.租赁合同 </p>
                            <p>5.上一年度财务报表</p>
                        </div>
                    </div>
                    <div className='comingPark_img'>
                        <img  src={downImg} />
                    </div>
                    <div className='comingPark_box'>
                        <div className='comingPark_title'>园区管委会招商合作局审批（3个工作日内）</div>
                        <div  className='comingPark_text'>
                            <p>初审合格后，由园区招商合作局进行复核，出具</p>
                            <p>入园评审意见。</p>
                        </div>
                    </div>
                    <div className='comingPark_img'>
                        <img  src={downImg} />
                    </div>
                    <div className='comingPark_box'>
                        <div className='comingPark_title'>
                            <p>园区管委会招商部出具</p>
                            <p>《关于入园企业代办服务工作的通知》</p>
                        </div>
                        <div  className='comingPark_text'>
                            <p>对通过审核的企业，代办平台免费办理登记设立</p>
                            <p>手续（5-7个工作日）</p>
                        </div>
                    </div>
                    <div className='comingPark_img'>
                        <img  src={downImg} />
                    </div>
                    <div className='comingPark_box'>
                        <div className='comingPark_title'>
                            <p>企业与园区管委会签订正式入驻协议书</p>
                        </div>
                        <div  className='comingPark_text'>
                            <p>企业正式入驻办公后，由招商合作局牵头对企业进行上门走访，并与通过评审的企业签订企业入驻协议，
                                并由园区企业服务中心负责建立企业档案。(新办企业待工商登记完成后需补充提交如下资料交企业服务中心建档：</p>
                            <p>1.营业执照 </p>
                            <p>2.法人代表身份证复印件</p>
                            <p>3.租赁合同 )</p>
                        </div>
                    </div>



                </div>
                <div className='comingPark_foot'>
                    {
    this.state.status === 0 ? <Button className='comingPark_btn' onClick={this.jumpComing}>在线申请入园</Button> : <Button style={{background: '#B5B5B5'}} className='comingPark_btn' onClick={this.showStatus}>{this.state.statusName}</Button>
                    }
                </div>
            </div>
        )
    }
}

ComingPark.defaultProps = {
    token: '',
};
ComingPark.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(ComingPark);

