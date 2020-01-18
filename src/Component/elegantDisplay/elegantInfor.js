// 风采展示---详情
import React, { Component }  from 'react'
import './elegantDisplay.less'
import {  NavBar,Icon ,Carousel,WingBlank} from 'antd-mobile';
import { hashHistory } from 'react-router'

import interfaces from '@/api/index'

class ElegantInfor   extends Component{
    constructor(props){
        super(props)
        const firstPage = this.props.location.state;
        console.log(firstPage)
        this.state={
            firstPage:firstPage,
            data:{
                name:'',
                Content:'',
                PublishTime:'',
            },
            Imglist:[],
            imgHeight: 140,
        }
    }
    componentDidMount(){
        if(this.state.firstPage.type=='1'){
            //风采展示详情
            interfaces.GetStyleShowInfo({StyleShowID:this.state.firstPage.id}).then(res=>{
                console.log(res)
                this.setState({
                    Imglist:res[0].Imglist,
                    data:res[0].StyleShowModel
                })
            })
        }
    }
    render(){
        const firstPage = this.props.location.state;
        return (
            <div className='inforElegant'>
                <NavBar 
                    mode="light"
                    icon={<Icon type="left" color="#000" />}
                    onLeftClick={()=>hashHistory.goBack()} >{firstPage.title}</NavBar>
                 <WingBlank>
                 <Carousel
                 autoplay
                 infinite
                 dots
                 autoplayInterval="5000"
                 dotStyle={{marginBottom: 10}}
                 dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
                 >
                 {
                     this.state.Imglist.map((item, val) => (
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
                 </Carousel>
                
                    
                </WingBlank>

                <div className="infoBox">
                    <div className="tops">
                    {this.state.data.Name}
                    </div>

                    <div className="content">
                    {this.state.data.Content}
                    </div>
                
                    <div className="times"> {this.state.data.PublishTime}</div>
                </div>

            </div>
        )
    }

}
export default ElegantInfor;