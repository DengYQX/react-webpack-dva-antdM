//工商注册
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import  Navigation from '@/util/navigation'
import { Button } from 'antd-mobile';

import './shoppingRegin.less'

import newShop from '%/newShop.png';
import removeImg from '%/removeImg.png';

class ShoppingRegin extends Component{
    constructor(props){
        super(props)
        this.state={
            shopping:[{
                text:'新注册板块',
                url:newShop,
                link:'/nowShopping'
            },{
                text:'迁移变更版',
                url:removeImg,
                link:'/replaceChangsha'
            }],
        }
    }
    clickIndex=(link)=>{
        // hashHistory.push({pathname:''})
        hashHistory.push(link); 

    }
    render(){
        return(
            <div className='shoppingRegin'>
                <Navigation  title='工商注册' />
                <div className='myWorkDesk_div'>

                        {this.state.shopping.map((item,index)=>{
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

export default ShoppingRegin;
