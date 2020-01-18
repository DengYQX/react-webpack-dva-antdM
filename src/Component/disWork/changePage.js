import React, { Component }  from 'react'
import  Navigation from '@/util/navigation'
import { Button } from 'antd-mobile';
import './disWork.less'
import { hashHistory } from 'react-router'
import  returnOther from  '%/returnOther.gif'

class ChangePage extends Component{
    constructor(props){
        super(props)
        this.state={
            url:''
        }
    }
    jumpClick(){
        hashHistory.push({pathname:this.state.url})
    }
    componentDidMount(){
        const {url}=this.props;
        this.setState({
            url:url
        })
    }
    render(){
        return(
            <div className='disWork'>
                <img  src={returnOther}  />
                <p>小谷提示您：<br/>
                    您还未认证，请前去认证哦！</p>
                <Button className='disWork_btn' onClick={this.jumpClick.bind(this)}>去认证</Button>
            </div>
        )
    }

}

export default ChangePage;