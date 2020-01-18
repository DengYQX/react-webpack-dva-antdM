//待办服务--财税代理  GetFiscalAgent
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import  Navigation from '@/util/navigation'
import { Button,List,TextareaItem,Picker,InputItem } from 'antd-mobile';
import './moneyreplace.less'

import interfaces from '@/api/index'

class Moneyreplace extends Component{
    constructor(props){
        super(props)
        this.state={
            list:{}
        }
    }
    componentDidMount(){
        interfaces.GetFiscalAgent().then(res=>{
            this.setState({
                list:res[0]
            })
        })
    }
    render(){
        const  html=this.state.list.Contents
        return(
            <div className='moneyreplace'>  
                <Navigation title='财税代理'/>
                <div className='moneyreplace_litter'>服务内容</div>
                <div  className='moneyreplace_div' dangerouslySetInnerHTML={{__html:html}}>

                </div>
                <div className='moneyreplace_litter'>代理记账收费</div>
                <div  className='moneyreplace_div'>
                    <p>{this.state.list.Charge}</p>
                </div>
                <div className='moneyreplace_litter'>流程</div>
                <div  className='moneyreplace_div'>
                    <p>{this.state.list.Process}</p>
                </div>
            </div>
        )
    }
}

export default Moneyreplace;
