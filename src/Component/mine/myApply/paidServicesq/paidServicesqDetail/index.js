import React, { Component }  from 'react'
import Navigation from '@/util/navigation.jsx'
import api from '@/api'
import './style.less'


class paidServicesqDetail extends Component {
    constructor(props) {
        super(props);
        const {dCreateTime,Name,Contact} = this.props.location.state.data;
        this.state={
            createData:dCreateTime,
            Name,
            Contact,
            list:[],
        }
    }
    //开场调用的时候
    componentWillMount(){
        api.GetPCPaidSerivcesInfo({
            PaidSerivcesID: this.props.location.state.data.PaidSerivcesID
        }).then(res => {
           if (res && res.length > 0) {
               this.setState({
                list:res[0]
               })
           }
        })
    }
    
    render(){
        const {createData,Name,Contact,list:{Pic,ServicesName,Category,Specification,LaborFee,Unit,MaterialCost}}=this.state;
        return(
            <div className='detail'>
                <Navigation title="企业详情" />
                <div className='campusInfor_body'>
                    <div className='campusInfor_body_img'>
                        <div style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}>
                        <img
                            src={Pic}
                            alt=""
                            style={{ width: '100%', height: '6.5rem', verticalAlign: 'top' }}
                            onError={this.loadError}
                            onLoad={() => {
                            this.setState({ imgHeight: '150px' });
                            }}
                        />
                        </div>
                    </div>
                    <div className='campusInfor_body_title'>
                        服务名称:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{ServicesName}</span>    
                    </div>
                    <div className='campusInfor_body_title'>
                        类别:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{Category}</span>
                    </div>
                    <div className='campusInfor_body_title'>
                       规格:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{Specification}</span>
                    </div>
                    <div className='campusInfor_body_title'>
                       人工费:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{LaborFee}元/{Unit}</span>
                    </div>
                    <div className='campusInfor_body_title' style={{marginBottom:'10px'}}>
                       材料费:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{MaterialCost}</span>
                    </div>
                    <div className='campusInfor_body_title'>
                       申请人:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{Name}</span>
                    </div>
                    <div className='campusInfor_body_title'>
                       联系电话:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{Contact}</span>
                    </div>
                    <div className='campusInfor_body_title'>
                       申请时间:&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color:'gray' }}>{createData}</span>
                    </div>
                </div>

            </div>
        )
    }


}

export default paidServicesqDetail;








