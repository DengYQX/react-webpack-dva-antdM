
// 企业服务--Tab切换页
import React, { PureComponent }  from 'react'
import { Link } from 'dva/router';
import { } from 'antd-mobile';
import './index.less'

import run from '%/circle/run.png'; 
import shop from '%/circle/shop.png';  
import eat from '%/circle/eat.png';  
import notFound from '%/circle/notFound.png'; 


class  parkCircle extends  PureComponent{
    constructor(props){
        super(props)
    }
    render(){
        const list = [
            {url: notFound, link: '/notFound', text: '失物招领'},
            {url: run, link: '/run', text: '单身邂逅'},
            {url: eat, link: '/eat', text: '吃货搜街'},
            {url: shop, link: '/shop', text: '跳蚤市场'},
        ];
        
        return(
            <div className='parkCircle'>
                <div className='parkCircle_title'>
                    园区圈子
                </div>
                <div className="contentBox clear contentBox_border">
                    {list.map(item => (
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

export default parkCircle

