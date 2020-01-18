// 物业工作台
import React, { Component } from 'react';
import {  NavBar, Icon,InputItem ,Button } from 'antd-mobile';
import { hashHistory } from 'react-router'
import  Navigation from '@/util/navigation'
import './myWorkDesk.less'

import orderManage from '%/orderManage.png';
import propertypost from '%/propertypost.png';
import visitor from '%/visitor.png';
import release from '%/release.png';

class MyWorkDesk extends Component {
    constructor(props){
        super(props)
        this.state={
            mineList:[{
                text:'工单管理',
                url:orderManage,
                link:'/orderManage'
            },{
                text:'物业驿站',
                url:propertypost,
                link:'/propertyPost'
            },{
                text:'访客登记',
                url:visitor,
                link:'/comingPeople'
            },{
                text:'物品放行',
                url:release,
                link:'/passingThing'
            }]
        }
    }
    clickIndex(link){
        hashHistory.push(link); 
    }
    
    render(){
        return(
            <div className="myWorkDesk">
                <Navigation  title="物业工作台"/>
                <div className='myWorkDesk_div'>

                        {this.state.mineList.map((item,index)=>{
                            return (
                            <div className='myWorkDesk_list' key={index} onClick={this.clickIndex.bind(this,item.link)}>
                                <div className='myWorkDesk_img'  style={{backgroundImage:`url(${item.url})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center'}}></div>
                                <div className='myWorkDesk_text'>
                                    {item.text}
                                </div>
                            </div>)
                        })}
                    
                </div>
                
            </div>
        )
    }
}

export default MyWorkDesk;