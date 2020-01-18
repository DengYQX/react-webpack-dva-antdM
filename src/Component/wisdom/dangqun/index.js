
// 党群服务--Tab切换页
import React, { Component }  from 'react'
import { Link } from 'dva/router';
import { Tabs, WhiteSpace} from 'antd-mobile';
import './dangqun.less'


import dangComing from '%/company/dangComing.png';    
import beginDang from '%/company/beginDang.png';     
import dangTeam from '%/company/dangTeam.png';     
import fiveTeam from '%/company/fiveTeam.png';     
import dangElement from '%/company/dangElement.png';     
import dangJump from '%/company/dangJump.png';     
import dangRule from '%/company/dangRule.png';     
import dangTele from '%/company/dangTele.png';     
import waterTele from '%/company/waterTele.png';   
import studyDang from '%/company/studyDang.png';   

class Dangqun extends Component{

    render(){
        const list=[{url: dangComing, link: '/joinParty', text: '申请入党'},{url: beginDang, link: '/establishApply', text: '成立党组...'},
            {url: dangTeam, link: '/relationalLink', text: '党员组织...'},{url: fiveTeam, link: '/fiveTransformations', text: '五化支部...'},
            {url: dangElement, link: '/dangQunMap', text: '党建电子...'}];
        const team=[{url: dangJump, link: '/partyActivities', text: '党内活动'}]
        const study=[{url: dangRule, link: '/partyDiscipline', text: '党纪党规'},{url: dangTele, link: '/partyAffairs', text: '党务知识'},
            {url: waterTele, link: '/disWork', text: '知识测试'},{url: studyDang, link: '/studyLink', text: '学习链接'}]
        return(
            <div className='dangqun'>
                <div className='qiyePage_title fontBold'>
                    办事服务
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
                    党群活动
                </div>
                <div className="contentBox clear contentBox_border">
                    {team.map(item => (
                    <Link to={{pathname:item.link,state:{data:item} }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
                <div className='qiyePage_title fontBold'>
                    学习园地
                </div>
                <div className="contentBox clear contentBox_border">
                    {study.map(item => (
                    <Link to={{pathname:item.link,state:{data:item} }} className="itemLink">
                        <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
            </div>
        )
    }
}

export default Dangqun;
