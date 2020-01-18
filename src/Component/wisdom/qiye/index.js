
// 企业服务--Tab切换页
import React, { Component }  from 'react'
import { Link } from 'dva/router';
import { Tabs, WhiteSpace} from 'antd-mobile';
import './qiye.less'
import { connect } from 'dva'
import parkServe from '%/company/parkServe.png'; 
import proImg from '%/company/proImg.png';  
import buchong from '%/company/buchong.png';  
import bank from '%/company/bank.png';  
import makeMoney from '%/company/makeMoney.png';  
import changsha from '%/company/changsha.png';  

import coming from '%/company/coming.png';  
import makePeople from '%/company/makePeople.png';  
import livingPeople from '%/company/livingPeople.png'; 

import IT from '%/company/IT.png';  
import remake from '%/company/remake.png';  
import begin from '%/company/begin.png';  
import moneyUp from '%/company/moneyUp.png';  
import buyWork from '%/company/buyWork.png';  
import sellServe from '%/company/sellServe.png';  
import homeServe from '%/company/homeServe.png';  
import center from '%/company/center.png';  
import serveShop from '%/company/serveShop.png';  
import myself from '%/company/myself.png';  

import litter from '%/company/litter.png'; 
import duijie from '%/company/duijie.png'; 
import change from '%/company/change.png'; 
import jump from '%/company/jump.png'; 
import meeting from '%/company/meeting.png';   
import rulePro from '%/company/rulePro.png';   
import ruleRoom from '%/company/ruleRoom.png';   

import beginRule from '%/company/beginRule.png';  
import ruleServe from '%/company/ruleServe.png';   
import rule from '%/company/rule.png';   
import serveTalk from '%/company/serveTalk.png';   
import servePark from '%/company/servePark.png';   
import centerAll from '%/company/centerAll.png';   


class  Qiye extends  Component{
    constructor(props){
        super(props)
    }
    handlerScroll(e) {
       // console.log(e, 123)
        this.props.changeWisdomScroll(e.target.scrollTop)
    }
    componentDidMount() {
        this.refs.wisdomBox.scrollTop = this.props.currentWisdomScroll;
    }
    render(){
     //   console.log(this.props.currentWisdomScroll, 23)
        const list = [{url: parkServe, link: '/wisdom/qiye/policy', text: '园区政策'},{url: proImg, link: '/province', text: '省市区政策'}];
        //长沙风险补充基金  长沙市文化产业引导基金    template allServe
        const moneyList = [{url: buchong, link: '/changsha', text: '长沙风险...'},{url: bank, link: '/disWork', text: '银企对接会'},
                {url: makeMoney, link: '/disWork', text: '投融资路演'},{url: changsha, link: '/disWork', text: '长沙市文...'}];
        const people = [{url: coming, link: '/getPeople', text: '人才招聘'},{url: makePeople, link: '/talentTraining', text: '人才培训'},{url: livingPeople, link: '/housing', text: '人才住房'}];
       
        const livingServe = [{url: begin, link: '/shoppingRegin', text: '工商注册'},{url: moneyUp, link: '/moneyreplace', text: '财税代理'},
                {url: buyWork, link: '/sellThing', text: '办公采购'},
                {url: sellServe, link: '/sellThing', text: '营销服务'},{url: homeServe, link: '/sellThing', text: '家政服务'},
                {url: remake, link: '/sellThing', text: '装修服务'}, {url: IT, link: '/sellThing', text: 'IT服务'}];
        const template = [{url: center, link: '/wisdom/qiye/trademark', text: '商标中心'},{url: serveShop, link: '/copyrightService', text: '版权服务'},{url: myself, link: '/disWork', text: '专利服务'}];
        const context = [{url: duijie, link: '/resourceDocking', text: '资源对接'},{url: change, link: '/industryDynamics', text: '行业动态'},{url: jump, link: '/industryActivities', text: '行业活动'},
                {url: meeting, link: '/zhanhui', text: '展览展会'}];
        const serveTop = [{url: litter, link: '/legalTrivia', text: '法律小知识'},{url: rulePro, link: '/disWork', text: '法律咨询服务'},{url: beginRule, link: '/pretrialMediation', text: '庭前调解室'},
                {url: ruleServe, link: '/legalService', text: '法律服务站'},{url: rule, link: '/disputeMediation', text: '纠纷调解中心'},{url: ruleRoom, link: '/procuratorialLiaison', text: '检察联络室'}];
        const allServe = [{url: serveTalk, link: '/advertisingService', text: '广告服务'},{url: servePark, link: '/changdi', text: '场地服务'},{url: centerAll, link: '/sharingCenter', text: '共享中心'}];
        return(
            <div className='qiyePage' ref="wisdomBox" onScroll={this.handlerScroll.bind(this)} style={{overflowX: 'hidden', overflowY: 'scroll'}}>
                <div className='qiyePage_title fontBold' >
                    政策服务
                </div>
                <div className="contentBox clear contentBox_border">
                    {list.map(item => (
                    <Link to={{pathname:item.link,state:{data:item} }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    金融服务
                </div>
                <div className="contentBox clear contentBox_border">
                    {moneyList.map(item => (
                    <Link to={{pathname:item.link,state:{data:item } }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    人才服务
                </div>
                <div className="contentBox clear contentBox_border">
                    {people.map(item => (
                    <Link to={{pathname:item.link,state:{data:item } }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    代办服务
                </div>
                <div className="contentBox clear contentBox_border">
                    {livingServe.map(item => (
                    <Link to={{pathname:item.link,state:{data:item } }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    知识产权中心
                </div>
                <div className="contentBox clear contentBox_border">
                    {template.map(item => (
                    <Link to={{pathname:item.link,state:{data:item } }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    市场对接
                </div>
                <div className="contentBox clear contentBox_border">
                    {context.map(item => (
                    <Link to={{pathname:item.link,state:{data:item } }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    法律服务
                </div>
                <div className="contentBox clear contentBox_border">
                    {serveTop.map(item => (
                    <Link to={{pathname:item.link,state:{data:item } }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    公共服务
                </div>
                <div className="contentBox clear contentBox_border">
                    {allServe.map(item => (
                    <Link to={{pathname:item.link,state:{data:item } }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
            </div>
        )
            
        
    }

}

export default connect(({home}) => ({currentWisdomScroll: home.currentWisdomScroll}), dispatch => ({
    changeWisdomScroll(payload, params) {
        dispatch({
          type: 'home/changeWisdomScroll',
          payload
        })
    }
}))(Qiye);


