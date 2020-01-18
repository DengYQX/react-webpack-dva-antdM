// 园区概况----页面不能刷新
import React, { Component }  from 'react'
import { Carousel, Icon } from 'antd-mobile';
import { hashHistory } from 'react-router'
import './parkInformation.less';
import  Navigation from '@/util/navigation'
import { connect } from 'dva';


class ParkInformation extends Component {
    constructor(props){
        super(props)
        this.state = {
        }
        
    }

    
    render(){
        const {summaryData}=this.props
        return(
            <div className='parkInformation'>

                <Navigation  title="园区概况"/>
                <div>
                    <div className='parkInformation_img'>
                       
                        {this.props.summaryData.SP_ParkOverviewPicList.length>0?
                        <Carousel
                        autoplay
                        infinite
                        dots
                        autoplayInterval="5000"
                        dotStyle={{marginBottom: 10}}
                        dotActiveStyle={{marginBottom: 10, backgroundColor: '#FFF'}}
                        >
                        {
                            this.props.summaryData.SP_ParkOverviewPicList.map((item, val) => (
                            <div
                                key={val}
                                style={{ display: 'inline-block', width: '100%', height: "6.4rem" }}
                            >
                                <img
                                src={item.FullThumbUrl}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top',height:'150px'}}
                                onError={this.loadError}
                                onLoad={(res) => {
                                    // fire window resize event to change height
                                    window.dispatchEvent(new Event('resize'));
                                    this.setState({ imgHeight: res.target.height});
                                }}
                                />
                            </div>
                            ))
                        }
                        </Carousel>
                        
                        :<img src={require('%/parkInformation.png')}  /> }
                    </div>
                    <div className='parkInformation_title fontBold'>
                        <p className="fontBold">产业定位</p>
                    </div>
                    <div className='parkInformation_text'>
                      
                        <p>{this.props.summaryData.SP_ParkOverviewDetails.IndustrialPositioning}</p>
                    </div>


                    <div className='parkInformation_title fontBold'>
                        <p className="fontBold">园区战略规划</p>
                    </div>

                    <div className='parkInformation_text'>
                        <p>{this.props.summaryData.SP_ParkOverviewDetails.LocationAdvantage}</p>
                    </div>
                    <div className='parkInformation_title fontBold'>
                        <p className="fontBold">概述描述</p>
                    </div>
                    <div className='parkInformation_text'>
                        <p>{this.props.summaryData.SP_ParkOverviewDetails.OverviewDescription}</p>
                    </div>
                    <div className='parkInformation_title fontBold'>
                        <p className="fontBold">区位优势</p>
                    </div>
                    <div className='parkInformation_text'>
                        <p>{this.props.summaryData.SP_ParkOverviewDetails.StrategicPlanning}</p>
                    </div>
                </div>




            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
      summaryData: state.home.summaryData,
    }
  }
export default connect(mapStateToProps, null)(ParkInformation);

