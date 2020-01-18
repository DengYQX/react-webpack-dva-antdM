//待办服务--详情
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import  Navigation from '@/util/navigation'
import { Button,Carousel } from 'antd-mobile';
import './sellThing.less'
import interfaces from "@/api/index";

class CompanySingle extends Component{
    constructor(props){
        super(props)
        const ID=this.props.location.state.ID
        this.state={
            ID:ID,
            companyInfor:{},
            imgList:[],
            imgHeight:'150px',
        }
    }
    componentDidMount(){
        interfaces.GetInsteadServicesInfo({InsteadServicesID:this.state.ID}).then(res=>{
            this.setState({
                imgList:res[0].Imglist,
                companyInfor:res[0].ModelInfo
            })
        })
    }

    render(){
        return(
            <div className='companySingle'>
                <Navigation title='详情'/>
                    <div className='campusInfor_body_img'>
                        {this.state.imgList.length>0?<Carousel
                        autoplay
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                        >
                        {this.state.imgList.map((item,index) => (
                            <span
                            key={index}
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                            <img
                                src={item.FullThumbUrl}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top',height:'150px' }}
                                onLoad={() => {
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                                }}
                            />
                            </span>
                        ))}
                        </Carousel>:''}
                    
                    </div>
                    <div className='campusInfor_body_border'>
                        <p>{this.state.companyInfor.CompanyName}</p>
                    </div>
                    <div className='campusInfor_body_title'>
                        <p>企业简介</p>
                    </div>
                    <div className='campusInfor_body_text'>
                        {this.state.companyInfor.CompanyIntroduction}
                    </div>
                    <div className='campusInfor_body_title'>
                        <p>服务介绍</p>
                    </div>
                    <div className='campusInfor_body_text'>
                        {this.state.companyInfor.ServicesIntroducation}
                    </div>
                <div className='campusInfor_foot'>
                    <Button className='campusInfor_btn_helf campusInfor_btn_left' >开始导航</Button>
                    <Button className='campusInfor_btn_helf campusInfor_btn_right' href= {'tel:'+this.state.companyInfor.Telphone} >一键拨号</Button>
                </div>

            </div>
        )
    }
}
export default CompanySingle;