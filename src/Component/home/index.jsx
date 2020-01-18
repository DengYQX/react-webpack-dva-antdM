import React, { Component, PropTypes } from 'react';
import { Carousel, WingBlank, Icon} from 'antd-mobile';
import { Link } from 'dva/router';
import { connect } from 'dva';
import './styles.less';
const newsImg =  'http://47.112.21.206:8090/resources/newsImg.png';
const yqgkss  = newsImg;
import jzfp from '%/home/jzfp.png';
import qyml from '%/home/qyml.png';
import rysq from '%/home/rysq.png';
import yqhd from '%/home/yqhd.png';
import yqpt from '%/home/yqpt.png';
import yqvr from '%/home/yqvr.png';
import zbpt from '%/home/zbpt.png';
import zsrz from '%/home/zsrz.png';
import Navigation from '@/util/navigation'
import ImgElement from '@/util/imgElement'
import { Player, BigPlayButton } from 'video-react';

class demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: ['1'],
        autoPlay: false,
        imgHeight: 140,
    }
  }
  componentDidMount() {
    if (this.props.newsData.length < 1) {
      if (this) {
        if (this.initHome) {
          this.initHome()
        }
      }
    }
    this.refs.homeBox.scrollTop = this.props.scrollTop;
    document.addEventListener("resume", function(){
      if (this) {
        if (this.initHome) {
          this.initHome()
        }
      }
    }, false);
  }
  initHome = () => {
    this.props.GetHomeBannerList({
      params: {
        Type: '1'
      }
    })
    this.props.GetTopParkNoticeList({
      params: {
        Type: '1'
      }
    })

    this.props.GetTopParkNoticeList({
      params: {
        Type: '2'
      }
    })

    this.props.GetTopStyleShowList({
      params: null
    })

    this.props.GetParkOverview({
      params: null
    })
  }
  loadError(e) {
    e.target.src = "http://47.112.21.206:8090/resources/banner.png";
  }
  handleScroll(e) {
    if (this.props) {
      if (this.props.changeScroll) {
        this.props.changeScroll(e.target.scrollTop)
      }
    }
    
  }
  render() {
    const {gardenData, newsData, fengCaiData, summaryData, BannerList} = this.props;
    const list = [
      {url: rysq, link:'/comingPark',text: '入园申请'},{url: qyml, link:'/businessList', text: '企业名录'}, {url: yqhd, text: '园区活动',link:'/campusActive'}, {url: zsrz, text: '招商入驻', link: '/investmentPromotion'},
      {url: jzfp, text: '精准扶贫', link: '/povertyAlleviation'},{url: yqvr, link: '/webView', text: '园区VR', htmlLink: 'https://720yun.com/t/c6vku9d9dp7?scene_id=38982443'}, {url: yqpt, link: '/gardenMating', text: '园区配套'}, {url: zbpt, text: '周边配套', link: '/peripheral'}
    ];
    if (summaryData.SP_ParkOverviewDetails && !this.state.autoPlay) {
      setTimeout(() => {
        this.setState({
          autoPlay: true
        })
      }, 3000)      
    }
    return (
        <div className="homeBox" ref="homeBox" onScroll={this.handleScroll.bind(this)}>
           <Navigation title="走进园区" isGoBack />
           <WingBlank>
            {
              BannerList.length > 0 ? (
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
                  {BannerList.map(val => (
                    <div
                      key={val}
                      style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                      <img
                        src={val.FullPhoto}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onError={this.loadError}
                        onLoad={() => {
                          window.dispatchEvent(new Event('resize'));
                          this.setState({ imgHeight: 'auto' });
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              ) : null
            }
          </WingBlank>
          {
            gardenData.length > 0 ? (
              <div className="notice clear">
                <Link className="mark"  to={{pathname:`/newInfor`, state:{type: 1}}} >园区通知</Link>
                <div className="content clear">
                  <WingBlank>
                    <Carousel className="font-carousel"
                      vertical
                      dots={false}
                      dragging={false}
                      swiping={false}
                      autoplay={true}
                      infinite
                      speed={2000}
                      autoplayInterval={2400}
                    >

                      {gardenData.map(type => (
                        <Link to={{pathname:`/noticeTemplate/`, state:{title: type.Title, id: type.ID, type: type.Type}}} 
                        style={{
                          height: '1.6rem',
                          fontSize: '0.46rem',
                          wordWrap: 'break-word',
                          textOverflow: 'ellipsis',
                          lineHeight: '0.8rem',
                          overflow: 'hidden',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertica',
                          display: '-webkit-box',
                          color: '#999'
                        }} key={type.ID}>{type.Title}</Link>
                      ))}
                    </Carousel>
                  </WingBlank>
                </div>
              </div>
            ) : null

          }
          

          <div className="menu clear">
            {list.map(item => (
              <Link to={{pathname: item.link, state: {url: item.htmlLink || false, title: item.text}}} className="itemLink">
                <img src={item.url?item.url:require('%/noImg.jpg')} style={{width: '1rem', height: '0.91rem'}} />
                 {item.text}
              </Link>
            ))}
          </div>
          

          {newsData.length > 0 ? (
            <div className="infoBox">
             <div className="tops">
                <div className="types">
                  <div className="bgIcon bgIconB"></div>
                  新闻资讯
                </div>
                <Link className="moves"  to="/newInfor">更多 <Icon type="right" /> </Link>
             </div>
 
             <div className="content">
                {
                  newsData.map((item, index) => (
                    <Link to={{pathname:`/noticeTemplate/`, state:{title: item.Title, id: item.ID, type: item.Type}}}  className="itemBox" key={index}>
                      <ImgElement url={item.ImageUrl} width="4.2rem" height="3.15rem" />
                      <div className="infos">
                          <div className="titles">{item.Title}</div>
                          <div className="time">{item.PublishTime}</div>
                      </div>
                    </Link>
                  ))
                }
 
             </div>
 
           </div>
          ) : null}
         
         {
            summaryData.SP_ParkOverviewDetails ? (
              <div className="infoBox">
                <div className="tops">
                  <div className="types">
                    <div className="bgIcon bgIconY"></div>
                    园区概况
                  </div>
                  <Link className="moves" to="/parkInformation">更多 <Icon type="right" /> </Link>
                </div>
    
                <div className="content">
                  
                <Carousel
                  autoplay
                  infinite
                  dots={false}
                  autoplayInterval="5000"
                  dotStyle={{marginBottom: 10}}
                  dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
                  >
                      {summaryData.SP_ParkOverviewPicList.map(val => (
                          <div
                          key={val}
                          style={{ display: 'inline-block', width: '100%', height: 180 }}
                          >
                          <img
                              src={val.FullUrl}
                              alt=""
                              style={{ width: '100%', height:180 }}
                              onError={this.loadError}
                          />
                          </div>
                      ))}
                      
                 </Carousel>


                  <div className="desc">
                    { summaryData.SP_ParkOverviewDetails.OverviewDescription}
                  </div>
      
                </div>
    
              </div>
  
            ): null

          }

          {
            summaryData.SP_ParkOverviewDetails ? (
              <div className="infoBox">
                <div className="tops">
                  <div className="types">
                    <div className="bgIcon bgIconR"></div>
                    宣传视频
                  </div>
        
                </div>
    
                <div className="content" style={{position: 'relative'}}>
                  
                  <Player
                    fluid
                    style={{width: '100%', height: 240}}
                    width='100%'
                    height='240'
                    playsInline
                    autoPlay={this.state.autoPlay}
                    src={summaryData.SP_ParkOverviewDetails.PromotionalVideoUrl}
                  >
                  <BigPlayButton position="center" /> 
                  </Player>
                </div>
    
              </div>
  
            ): null

          }
      
          {
           fengCaiData.length > 0 ? (
            <div className="infoBox">
              <div className="tops">
                <div className="types">
                  <div className="bgIcon bgIconG"></div>
                  风采展示
                </div>
                <Link className="moves" to="/elegantDisplay">更多 <Icon type="right" /> </Link>
              </div>

              <div className="content">

              <Carousel
                autoplay
                infinite
                dots={false}
                autoplayInterval="5000"
                dotStyle={{marginBottom: 10}}
                dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
                >
                    {fengCaiData.map( (item, index) => (
                        <Link to={{pathname:`/noticeTemplate/`, state:{title: item.Title, id: item.ID, type: item.Type}}} key={index}>
                        <ImgElement url={item.Pic} width="100%" height="180px" />
                        <div className="desc">
                          {item.Content}
                        </div>
                      </Link>
                    ))}
                      
                </Carousel>
              </div>

            </div>
           ) : null
          }
        

        </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    gardenData: state.home.gardenData,
    newsData: state.home.newsData,
    scrollTop: state.home.scrollTop,
    BannerList: state.home.BannerList,
    fengCaiData: state.home.fengCaiData,
    summaryData: state.home.summaryData,
    loading: !!state.loading.models.demo
  }
}

function dispatchToProps(dispatch) {
  return {
    GetTopParkNoticeList(payload = {}) {
      dispatch({
        type: 'home/GetTopParkNoticeList',
        payload
      })
    },
    GetTopStyleShowList(payload = {}) {
      dispatch({
        type: 'home/GetTopStyleShowList',
        payload
      })
    },
    GetParkOverview(payload = {}) {
      dispatch({
        type: 'home/GetParkOverview',
        payload
      })
    },
    changeScroll(payload = {}) {
      dispatch({
        type: 'home/changeScroll',
        payload
      })
    },
    GetHomeBannerList(payload = {}) {
      dispatch({
        type: 'home/GetHomeBannerList',
        payload
      })
    }
  }
}
export default connect(mapStateToProps, dispatchToProps)(demo);