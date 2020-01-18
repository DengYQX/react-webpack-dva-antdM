import React, { Component }  from 'react'
import  Navigation from '@/util/navigation'

import './disWork.less'
import  disWork from  '%/disWork.gif'

class DisWork extends Component{
    render(){
        return(
            <div className='disWork'>
                <Navigation title='系统开发中'/>
                <img  src={disWork}  />
                <p>程序猿正在加班加点开发中..<br/>
                    敬请期待！</p>
            </div>
        )
    }

}

export default DisWork;
