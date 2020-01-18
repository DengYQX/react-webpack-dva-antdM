//在线发布--详情
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import  Navigation from '@/util/navigation'
import { Button, Carousel, TextareaItem } from 'antd-mobile';
import './getPeople.less'

import interfaces from '@/api/index'

class OnLineInfor extends Component{
    constructor(props){
        super(props)
        const id = this.props.location.state.data
        this.state={
            id,
            Imagelist: [],
            info: {}
        }
    }

    componentDidMount() {
        interfaces.GetOnlinePublishJobDetails({ID: this.state.id}).then(res => {
           if(res){
                this.setState({
                    Imagelist: [...this.state.Imagelist, ...res[0].Imagelist],
                    info: res[0].Detail
                })

           }
            
        })
    }

    // 编辑 
    goSave=(e)=>{
        hashHistory.push({ pathname: '/editOnline', state: { data: e, files: this.state.Imagelist } })
    }

    // 删除
    delJob(e) {
        interfaces.DelOnlinePublishJob({ID: e}).then(res => {
            console.log(res)
            const data = {
                title: '删除',
                btn: '返回',   //按钮的字
                img: 1,  //1为成功，0为失败
                url: '/:id/app/',    //点击按钮跳转的链接
                text: '删除成功'
            }
            hashHistory.push({ pathname: '/registerOk', state: { data: data } })
        })
    }

    render(){
        const { info, Imagelist } = this.state
        return(
            <div className='onLineInfor'>
                <Navigation  title='详情' />
                <div className="get_meet">
                    <div className='onLineInfor_img'>
                        <Carousel
                            autoplay
                            infinite
                            dots
                            autoplayInterval="5000"
                            dotStyle={{marginBottom: 10}}
                            dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {Imagelist.map(val => (
                                <div
                                key={val}
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                                >
                                <img
                                    src={val.FullUrl}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top', height: '150' }}
                                    onError={this.loadError}
                                    onLoad={() => {
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: 'auto' });
                                    }}
                                />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                    <div className='onLineInfor_title'>
                        <p className='onLineInfor_tit'>{info.EnterpriseName}  <span className='onLineInfor_money'>{info.SalaryRangestr}</span>  </p>
                        <p className='onLineInfor_litter'>职位:{info.JobName}{'('+info.Statusstr+')'}</p>
                    </div>
                    <div className='onLineInfor_list'>职位描述</div>
                    <div className='onLineInfor_div'>
                        <p>{info.JobDescription}</p>
                    </div>
                    <div className='onLineInfor_list'>岗位要求</div>
                    <div  className='onLineInfor_div'>
                        <p>
                            <p>经验：{info.Educationstr}</p>
                            <p>学历：{info.ExperiRequistr}</p>
                        </p>
                    </div>
                    <div  className='onLineInfor_foot'>
                        <Button className='onLineInfor_btn'  onClick={this.goSave.bind(this, info)}>编辑</Button>
                        <Button className='onLineInfor_rightBtn' onClick={this.delJob.bind(this, info.ID)}>删除</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OnLineInfor;
