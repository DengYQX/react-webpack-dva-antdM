//展览展会--详情
import React, { Component }  from 'react'
import { Link } from 'dva/router';
import  Navigation from '@/util/navigation'
import { Button, Carousel } from 'antd-mobile';
import { hashHistory } from 'react-router';
import interfaces from '@/api/index'
import './zhanhui.less'

class ZhanhuiInfor   extends Component{
    constructor(props){
        super(props)
        this.state = {
            imgList: [],
            subject: '',
            intro: '',
            curator: '',
            addr: '',
            date: '',
            organiser: '',
            coordinator: '',
            imgHeight: '6.4rem'
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData() {
        interfaces.GetMaterialInfo({
            ExhibitionID: this.props.location.state.id
        }).then(res=>{
            if (res && res.length > 0) {
                let imgList = []
                for (let i=0; i<res[0].Imglist.length; i++) {
                    imgList.push(res[0].Imglist[i].FullUrl)
                }
                this.setState({
                    imgList: imgList,
                    subject: res[0].ModelInfo.Subject,
                    intro: res[0].ModelInfo.ExhibitionDetails,
                    curator: res[0].ModelInfo.Curator,
                    addr: res[0].ModelInfo.Address,
                    date: res[0].ModelInfo.StartDate + ' - ' + res[0].ModelInfo.EndDate,
                    organiser: res[0].ModelInfo.Organiser,
                    coordinator: res[0].ModelInfo.Coordinator
                })
            }
        })
    }
    jumpGet=()=>{
        hashHistory.push( { pathname:'/getZhanhui', state:{id: this.props.location.state.id} } )
    }
    render(){
        const { imgList, subject, intro, curator, addr, date, organiser, coordinator } = this.state
        return(
            <div className='zhanhuiInfor'>
                <Navigation  title="展览展会详情"/>
                <div className="zhanhuiInfor_box" style={{height: 'calc(100vh - 1.92rem)'}}>
                    <div className='zhanhuiInfor_img'>
                        {
                            this.state.imgList.length > 0
                                ? <Carousel dots={false}>
                                    {this.state.imgList.map(val => (
                                        <div
                                            key={val}
                                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                        >
                                        <img
                                            src={val}
                                        />
                                        </div>
                                    ))}
                                </Carousel>
                                : null
                        }
                    </div>
                    <div className='zhanhuiInfor_title'>
                        {subject}
                    </div>
                    <div className='zhanhuiInfor_head'>
                        展会介绍
                    </div>
                    <div className='zhanhuiInfor_div'>
                        <p>{intro}</p>
                    </div>
                    <div className='zhanhuiInfor_head zhanhuiInfor_margin'>
                        展会详情
                    </div>
                    <div className='zhanhuiInfor_div'>
                        <p>策展人：{curator}</p>
                        <p>展会地点：{addr}</p>
                        <p>展览日期：{date}</p>
                        <p>主办人：{organiser}</p>
                        <p>协办人：{coordinator}</p>
                    </div>
                    <div className='zhanhuiInfor_foot'>
                        <Button className='zhanhuiInfor_btn' onClick={this.jumpGet}>报名申请</Button>
                    </div>
                </div>
            </div>
        )
    }

}
export default ZhanhuiInfor;