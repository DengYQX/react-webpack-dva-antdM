//个人中心-物业工作台---物品放行--详情--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Carousel,NavBar,Icon } from 'antd-mobile';
import '../myApply.less'
//GetRepairManageDetails
import interfaces from "@/api/index"; 
class PassingInfor extends Component{
    constructor(props) {
        super(props);
        const data = this.props.location.state.item;
        console.log(data)
        this.state={ 
            data:data,
            infor:{},
            imgList:[],
            imgHeight: '6.4rem',
        }
    }
    componentDidMount(){
        interfaces.GetRepairManageDetails({ID:this.state.data.ID}).then(res=>{
            this.setState({
                infor:res[0].Detail,
                imgList:res[0].ProblemPicList,
            })
        })
    }

    render(){
        return(
            <div className='repairInfor'>
                <NavBar mode="light" icon={<Icon type="left"  color='#000'/>}
                    onLeftClick={() => hashHistory.goBack()}>{this.state.data.Status=='1'?'未受理详情':(this.state.data.Status=='2'?'已受理详情':'已完成详情')}</NavBar>
                <div>
                    
                       {this.state.imgList.length>0? <Carousel
                            autoplay
                            infinite
                            dots
                            autoplayInterval="5000"
                            dotStyle={{marginBottom: 10}}
                            dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
                            >
                            {
                                this.state.imgList.map((item, val) => (
                                <div
                                    key={val}
                                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                    <img
                                    src={item.FullThumbUrl}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top',height:'150px'}}
                                    onError={this.loadError}
                                    onLoad={(err) => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                    }}
                                    />
                                </div>
                                ))
                            }
                            </Carousel>  :''}
                   
                    <div className='repairInfor_title'>
                        <div className='repairInfor_title_div'>
                            {this.state.infor.CompanyName}
                            {this.state.infor.Status=='3'?(<span className='repairInfor_span_grey'>已完成</span>):(<span className='repairInfor_span_blue'>{this.state.infor.Status=='1'?'未受理':'已受理'}</span>)}
                        </div>
                        <div className='repairInfor_list'>
                            所在楼宇： <span>{this.state.infor.BuildID}</span>
                        </div>
                    </div>
                    <div className='repairInfor_padding'>
                        
                        <div className='repairInfor_list'>
                            下单用户： <span>{this.state.infor.Name}</span>
                        </div>
                        <div className='repairInfor_list'>
                            手机号码： <span>{this.state.infor.Telephone}</span>
                        </div>
                        <div className='repairInfor_list'>
                            {this.state.infor.Status=='3'?'完成时间：':(this.state.infor.Status=='1'?'报修时间：':'受理时间：')}

                            <span>{this.state.infor.Status=='3'?this.state.infor.CompleteTime:(this.state.infor.Status=='1'?this.state.infor.ApplyTime:this.state.infor.dUpdateTime)} </span>

                        </div>
                        <div className='repairInfor_list'>
                            报修事宜：<span>{this.state.infor.Content}</span>
                        </div>
                        <div className='repairInfor_list'>
                            详情描述： 
                        </div>
                        <div className='repairInfor_div'>
                            <p>{this.state.infor.ProblemDetails}</p>
                        </div>
                        


                    </div>
                     






                </div>
            </div>
        )
    }
}

export default PassingInfor;