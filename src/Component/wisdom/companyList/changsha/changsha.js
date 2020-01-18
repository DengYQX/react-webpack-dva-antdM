//长沙风险补充基金
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import  Navigation from '@/util/navigation'
import { Button,Modal } from 'antd-mobile';
import { connect } from "dva";
import {unLogin} from '@/util/common.js';
import PropTypes from 'prop-types';
import api from '@/api';
import './changsha.less'
import  downImg from   '%/jiantou.png';

class Changsha extends Component{
    constructor(props){
        super(props)
        this.state={
            showModel: false,
            data: []
        }
    }
    componentDidMount() {
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
        if (loginType) {
           api.GetFinancialServiceRiskInfo({
            UserId: localStorage.getItem('userId')
           }).then(res => {
               this.setState({
                showModel: !res ? true : false,
                data: res
               })
              // console.log(res)
           })
        }else{
            Modal.alert('您尚未登陆', '您是否需要登陆', [
                { text: '否', },
                { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
            ]);
        }
    }
    //点击跳转页面
    jumpComing=()=>{
        const{token= ''}=this.props; /** token来源于modol-login中的token */
        const loginType = unLogin(token); /**判断是否登陆的方法  unLogin */
        if (loginType) {
            hashHistory.push({pathname:'/installChangsha', state: this.state.data})
        }else{
            Modal.alert('您尚未登陆', '您是否需要登陆', [
                { text: '否', },
                { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
            ]);
        }
    }
    //关闭模态框
    closeModel=()=>{
        this.setState({
            showModel:false
        })

    }

    render(){
        return(
            <div className='changsha'>
                <Navigation title='长沙风险补充基金'/>
                <div className="changsha_box">
                    <div className='comingPark_div'>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>“风补基金”园区企业业务流程</div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>企业提交申请</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>好融通+银行+园区</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>三方共同搜集企业；并指导企业同步准备三方</p>
                                <p>所需资料</p>
                            </div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>三方走访</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>好融通+银行+园区</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>三方实地走访企业，考察企业资质</p>
                            </div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>好融通审批，出具推荐函</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>好融通</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>企业提供资料，好融通审核，出具推荐函给银行</p>
                            </div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>银行审批</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>银行</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>银行审批通过后，出具推荐函给园区</p>
                            </div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>园区审批</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>园区</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>审批意见</p>
                            </div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>出具确认函</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>园区</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>确认函提交银行，启动放款流程</p>
                            </div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>放款</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>银行</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>银行业务经理群内公示:放款金额、日期、利率</p>
                            </div>
                        </div>
                        <div className='comingPark_img'>
                            <img  src={downImg} />
                        </div>
                        <div className='comingPark_box'>
                            <div className='comingPark_title'>备案</div>
                            <div  className='comingPark_text'>
                                <p className='comingPark_color'>责任部门</p>
                                <p>银行</p>
                                <p className='comingPark_color'>具体事项</p>
                                <p>银行客户经理将放款资料打包发送</p>
                                <p>科风投备案邮箱</p>
                            </div>
                        </div>
                    </div>
                    <div className="changsha_foot"></div>

                    {
                      this.state.showModel ?  <div className="changsha_fix_btn">
                            <div className="changsha_fix" onClick={this.jumpComing}> 立即申请 </div>
                        </div> : <div className="changsha_fix_btn" style={{background: '#B5B5B5'}}>
                            <div className="changsha_fix"  style={{background: '#B5B5B5'}} onClick={this.jumpComing}> 已申请 </div>
                        </div>
                    }
                   
                    {this.state.showModel?(
                        <div className="changsha_model">
                            <div className="changsha_model_body">
                                <div className="changsha_model_title">温馨提示</div>
                                <div className="changsha_model_txt">您还未申请，请前去申请哦！</div>
                                <div className="changsha_model_img">
                                    <img  src={require('%/modelImg.png')}  />
                                </div>
                                <Button className='comingPark_btn' onClick={this.jumpComing}>立即申请</Button>
                            </div>
                            <div  className="changsha_model_del"   onClick={this.closeModel}>
                                <img  src={require('%/delModel.png')}  />
                            </div>
                        </div>
                    ):''}
                </div>
            </div>
        )
    }
}
Changsha.defaultProps = {
    token: '',
};
Changsha.propTypes = {
    token: PropTypes.any,
};

export default connect(({ login }) => ({ token: login.token }))(Changsha);
