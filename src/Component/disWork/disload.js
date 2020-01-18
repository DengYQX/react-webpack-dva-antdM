import React, { Component }  from 'react'
import  Navigation from '@/util/navigation'
import { Button } from 'antd-mobile';
import hosts from '@/server';
import './disWork.less'
import { hashHistory } from 'react-router'


class Disload extends Component{
    constructor(props){
        super(props)
        this.state={
            isClose:false,
        }
    }
    componentDidMount(){
        console.log(this.props.isClose)
    }
    jumpComing(){
        hashHistory.push({pathname:'/login'})
    }
    closeModel=()=>{
        this.props.closeModel();
    }
    jumpregion(){
        hashHistory.push({pathname:'/register'})
    }
    render(){
        const {isClose}=this.props;
        return(
            <div>
                {isClose?(
                    <div className='disload'>
                        <div className="changsha_model_body">
                            <div className="changsha_model_title">温馨提示</div>
                            <div className="changsha_model_txt">您还未登陆，请前去登陆哦！</div>
                            <div className="changsha_model_img">
                                <img  src={hosts.imgAddress + 'noloading.png'?hosts.imgAddress + 'noloading.png':require('%/noImg.jpg')}  />
                            </div>
                            <Button className='comingPark_btn' onClick={this.jumpComing}>去登陆</Button>
                            <p className='comingPark_p' onClick={this.jumpregion}>还未注册？前去注册</p>
                        </div>
                        <div  className="changsha_model_del"  onClick={this.closeModel}>
                            <img  src={require('%/delModel.png')}  />
                        </div>
                    </div>):''}
            </div>
        )
    }

}
export default Disload;