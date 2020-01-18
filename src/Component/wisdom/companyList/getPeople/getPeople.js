//人才招聘
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import  Navigation from '@/util/navigation'
import { connect } from 'dva';
import './getPeople.less'

import peopleMeeting from '%/company/peopleMeeting.png';  
import online from '%/company/online.png';  
import resetOn from '%/company/resetOn.png'; 
import gongzuo from '%/wisdom/gongzuo.png';

class GetPeople extends Component{
    render(){
        let list = []
        list = [{
            url: gongzuo, 
            link: '/gongzuo',
            text: '找工作'
        }]
        if (localStorage.getItem('userType') == 2) {
          list=[{url: peopleMeeting, link: '/peopleMeeting', text: '招聘会'},{url: online, link: '/meetCompany', text: '线上招聘平台'},{url: resetOn, link: '/online', text: '在线发布'}];
        }
        return(
            <div className='getPeople'>
                <Navigation title='人才招聘'/>
                <div className='qiyePage_title'>
                    人才招聘
                </div>
                <div className="contentBox clear contentBox_border">
                    {list.map(item => (
                    <Link to={item.link} className="itemLink">
                        <img src={item.url?item.url :require('%/noImg.jpg')} style={{width: '1rem', height: '0.91rem'}} />
                        {item.text}
                    </Link>
                    ))}
                </div>
{/*                         _oo0oo_
//                         088888880
//                         88" . "88
//                         (| -_- |)
//                         0\  =  /0
//                       ___/'---'\___
//                     .' \\|     |// '.
//                    / \\|||  :  |||// \
//                   / -||||| -:- |||||- \
//                  |   | \\\  -  /// |   |
//                  | \_|  ''\---/''  |_/ |
//                  \  .-\__  '-'  __/-.  /
//                ___'. .'  /--.--\  '. .'___
//             ."" '<  '.___\_<|>_/___.'  >' "".
//            | | :  '- \'.;'\ _ /';.'/ -'  : | |
//            \  \ '_.   \_ __\ /__ _/   ._' /  /
//        ====='-.____'.___ \_____/ ___.'____.-'=====
//                          '=---='
//
//        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//
//                 佛祖保佑        永无BUG
//
//        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
            </div>
        )
    }
}

export default connect(({login}) => ({Type: login.Type}))(GetPeople);  
