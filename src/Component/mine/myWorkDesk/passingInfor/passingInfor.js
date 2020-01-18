//个人中心-物业工作台---物品放行--详情--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Button,NavBar, Carousel, Icon } from 'antd-mobile';
import api from '@/api';
import '../myWorkDesk.less'
import ImgElement from '@/util/imgElement'

class PassingInfor extends Component{
    constructor(props) {
        super(props);
        const data = this.props.location.state.data;
        this.state={ 
            data,
            Imagelist: [],
            imgHeight: 140,
            infos: {}
        }
    }
    componentDidMount() {
        api.GetArticlesReleaseInfo({
            ArticlesReleaseID: this.state.data.id
        }).then(res => {
            if (res && res.length > 0) {

                this.setState({
                    infos: res[0].ModelInfo,
                    Imagelist: res[0].Imglist
                })
            }
        })
    }
    clickOk(){
        hashHistory.push({ pathname:'/getPassing', state:{id: this.state.infos.ID} })
    }
    clickNo(){
        // hashHistory.push( { pathname:'/passingInfor', state:{data:data} } )
        hashHistory.push({ pathname:'/noPassing', state:{id: this.state.infos.ID} })
    }
    render(){
        console.log(this.state.data.state)
        return(
            <div className='passingInfor'>
                <NavBar mode="light" icon={<Icon type="left"  color='#000'/>}
                    onLeftClick={() => hashHistory.goBack()}>{this.state.data.title}详情</NavBar>
                <div>
                    <div className='passingInfor_img'>
                        <Carousel
                            autoplay
                            infinite
                            dots={false}
                            autoplayInterval="5000"
                            >
                            {this.state.Imagelist.map(val => (
                                <div
                                key={val}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                <img
                                    src={val.FullUrl}
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        this.setState({ imgHeight: '6.3rem' });
                                     }}
                                />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className='passingInfor_title'>
                        {this.state.data.state=='4'? `申请人：${this.state.infos.UName}` : this.state.infos.EnterpriseName}
                        {this.state.data.state=='5'?(<span className='passingInfor_span_grey'>已过期</span>):(<span className='passingInfor_span_blue'>{this.state.data.state=='3'?'待放行':'已放行'}</span>)}
                    </div>
                    <div className='passingInfor_padding'>
                        {
                            this.state.data.state != 4? (
                                <div>
                                <div className='passingInfor_list'>
                                    所在楼宇： <span>{this.state.infos.BuildNo}</span>
                                </div>
                                <div className='passingInfor_list'>
                                    姓名： <span>{this.state.infos.UName}</span>
                                </div>
                                <div className='passingInfor_list'>
                                    联系电话：<span>{this.state.infos.UTel }</span>
                                </div>
                                <div className='passingInfor_list' style={{lineHeight: 'normal',height: 'auto', padding: '0.40rem 0'}}>
                                    迁出内容： 
                                    <p style={{marginTop: '0.2rem', color: '#666'}}>{this.state.infos.ApplyContent  }</p>
                                </div>
                                <div className='passingInfor_list'>
                                    迁出时间：<span>{this.state.infos.ApplyTime}</span>
                                </div>
                                </div>
                            ) : null
                        }
                        

                        {/* 已放行显示 */}
                        {this.state.data.state=='4'? (<div>
                            <div className='passingInfor_div'>
                                <p>{this.state.infos.ApplyContent}</p>
                            </div>
                            <div className='passingInfor_list'>
                                迁出时间：<span>{this.state.infos.ApplyTime}</span>
                            </div>
                            <div className='passingInfor_list'>
                                放行时间：<span>{this.state.infos.ReleaseTime}  </span>
                            </div>
                        </div>) :""}

                    </div>
                     
                    {/* 待放行显示 */}
                    {this.state.data.state == 3 ? (<div className="passingInfor_foot">
                        <Button className="passingInfor_btn passingInfor_btn_blue" onClick={this.clickOk.bind(this)}>同意放行</Button>
                        <Button className="passingInfor_btn passingInfor_btn_grey" onClick={this.clickNo.bind(this)}>拒绝放行</Button>
                    </div>):""}

                </div>
            </div>
        )
    }
}

export default PassingInfor;