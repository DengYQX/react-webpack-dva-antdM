import { hashHistory } from 'react-router'  
import Navigation from '@/util/navigation.jsx'
import { Carousel } from 'antd-mobile';
import povertyAlleviationImg from '%/povertyAlleviationImg.png';// 图片
import './index.less'

import interfaces from "@/api/index";

class ChangdiDetails extends React.Component {
    constructor(props) {
        super(props)
        const ID=this.props.location.state.ID;
        this.state = {
            ID:ID,
            imgList:[],
            modeInfor:{},
            imgHeight: '6.4rem',
        }
    }
    componentDidMount(){
        interfaces.GetSiteServiceInfo({SiteServiceID:this.state.ID}).then(res=>{
            this.setState({
                imgList:res[0].Imglist,
                modeInfor:res[0].ModelInfo,
            })
        })
    }  
    goReservation() {
        hashHistory.push({pathname:'/reservation',state:{ID:this.state.ID}})
    }
    render() {
        return (
            <div className="changdi_details">
                <Navigation title="场地服务详情" />
                {/* <img src={povertyAlleviationImg} /> */}
                {this.state.imgList.length>0? <Carousel
                autoplay
                infinite >
                {this.state.imgList.map(val => (
                    <a
                    key={val}
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                        <img
                            src={val.FullThumbUrl}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}/>
                    </a>
                ))}
                </Carousel> :''}
                

                <div className="details_title">
                    <p>{this.state.modeInfor.SiteName}</p>
                    {this.state.modeInfor.Price==0?<span>免费</span>:<span>{this.state.modeInfor.Price}元/小时</span>}
                </div>
                <div className="details_content">
                    <p>内容介绍</p>
                    <div className="txt">{this.state.modeInfor.Contents}</div>
                </div>
                <div className="details_content">
                    <p>场地详情</p>
                    <div className="info">
                        <div >场地面积: {this.state.modeInfor.Area}</div>
                        <div>容纳人数：{this.state.modeInfor.ActivitieScale}</div>
                        <div>地点：{this.state.modeInfor.Address} </div>
                    </div>
                </div>
                <div className="reserve" onClick={this.goReservation.bind(this)}>申请预定</div>
            </div>
        )
    }
}
export default ChangdiDetails