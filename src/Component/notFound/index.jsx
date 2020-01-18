import React from 'react';
import {Button} from 'antd-mobile';
import 'antd-mobile/lib/button/style/';
import './notFound.less';
import { hashHistory } from 'react-router'
import  Navigation from '@/util/navigation'

import  disLook from  '%/404.png'
import hosts from '@/server';


const notFound = () => {
  // const gotoHome = () => {
  //   hashHistory.push('/');
  // }
  return (
    <div className="normal">
        <Navigation title='404'/>
        <div className="normal_padding">
          <img  src={hosts.imgAddress + 'sorrery.gif'} className='imgLeft' />
          <img  src={disLook} className='imgRight'  />
          
        </div>
        <p>Sorry！您访问的页面弄丢了</p>
       

    </div>
  );
};

export default notFound;
