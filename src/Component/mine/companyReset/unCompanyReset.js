import React, { Component } from 'react'
import { NavBar, Icon,  Button, } from 'antd-mobile';
import { hashHistory } from 'react-router';

class unCompanyReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" color="#000" />}
                    onLeftClick={()=>hashHistory.goBack()}
                    className="my_report_title"
                >暂未认证</NavBar>
                <div style={{ textAlign:'center' }}>
                    <img src={require('%/returnOther.gif')} style={{ width:"7rem",height:"6rem",marginTop:'3rem' }} />
                    <p style={{ fontSize:'13px',marginTop:'1rem' }}>小谷提醒您:</p>
                    <div>您还未认证,请立即前去认证哦!</div>
                </div>
                <Button type="primary" className="submit" style={{ marginTop:'8rem' }} onClick={()=>{  hashHistory.push( { pathname:'/companyReset'} ) }}>去认证</Button>
            </div>
        );
    }
}
export default unCompanyReset;