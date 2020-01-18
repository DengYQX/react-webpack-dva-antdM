import { PureComponent } from 'react';
import Navigation from '@/util/navigation.jsx'
import { WhiteSpace, Button, Modal } from 'antd-mobile';
import interfaces from '@/api/index'
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';

import './style.less'


/** 工作岗位详情 */
class jobDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list:[],/** 接口返的list */
            Imagelist: [], /** 图片list */
            JobID: '', /** 工作ID */
            JobType: true, /** 是否投递过该公司 */
        }
    }
    
    /** 组件挂载之前 */
    componentWillMount () {
        /** 从location中获取需要查询的岗位id */
        const {ID} = this.props.location.state;
        /** 获取ID后存入state */
        this.setState({ JobID:ID })
        /** 调用getJobVal 查询工作岗位信息 */
        this.getJobVal(ID);
        /** 查询是否投递过简历 */
        this.SelJobVal(ID);
        
    }

    /**
     * GetOnlinePublishJobDetails 查询工作岗位信息
     * @author xiaoDai
     * @param {int} ID [需要查询的岗位id]
     * @return [工作岗位信息]
     */
    getJobVal = (ID) => {
        interfaces.GetOnlinePublishJobDetails({ 
            ID ,
         }).then(res => {
             /** 从接口中获取值成功后 */
            this.setState({
              list:res[0].Detail,
              Imagelist:res[0].Imagelist[0],
            })
        })
    }

    /**
     * GetOnlinePublishJobDetails 查询是否投递过该公司
     * @author xiaoDai
     * @param {int} ID [需要查询的岗位id]
     * @param {int} UserID [需要查询的用户id]
     * @return [工作岗位信息]
     */
    SelJobVal = (JobID) => {
        const UserID = localStorage.getItem('userId');
        interfaces.IsHasDelivery({ 
            JobID ,
            UserID ,
         })
         .then((res) => {
             /** 从接口中获取值成功后 */
            this.setState({
                JobType: res,
            })
        })
    }

    /**
     * AddJobResume 投递简历
     * @author xiaoDai
     * @param {int} JobID [投递查询的岗位id]
     * @param {int} UserID [用户ID]
     * @return 
     */
    jumpComing = () => {
        const { JobID } = this.state;
        const UserID = localStorage.getItem('userId');
        if(UserID){
            interfaces.AddJobResume({ 
                JobID ,
                UserID ,
            }).then(() => {
                const data = {
                    title: "提交",
                    btn: "确定", //按钮的字
                    img: 1, //1为成功，0为失败
                    url: "/gongzuo", //按钮跳转的链接
                    text: "提交成功"
                };
                hashHistory.push({ pathname: "/registerOk", state: { data } });
            }).catch((res)=>{
                if(res == '请建立自己的简历再投递'){
                    hashHistory.push({ pathname: "/newjianli",state:{ jianli:0 } });
                }
            })
        }else{
            Modal.alert('您尚未登陆', '您是否需要登陆', [
                { text: '否', },
                { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
            ]);
        }
    }

    /** 组件挂载 */
    render() {
        const { JobType,list:{EnterpriseName='',SalaryRangestr='',JobName='', Status=1, Statusstr='',JobDescription='',Educationstr='',ExperiRequistr=''},Imagelist:{FullUrl=''}}=this.state;
        return (
            <div className="jobDetail">
                <Navigation title="详情" />
                <img
                    src={FullUrl}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top', height: '150' }}
                />
                <div className="active_details">
                    <div className="details_title">
                        <span className="fontBold">{EnterpriseName}</span>
                        <div className="status">{SalaryRangestr}</div>
                    </div>
                    <div style={{borderBottom: '.043rem solid #e5e5e5',paddingLeft:'0.64rem',paddingBottom:'1rem'}}>职位:{JobName}({Statusstr})</div>
                </div>
                <WhiteSpace />
                <div className="active_details">
                    <div className="details_title" style={{borderBottom: '.043rem solid #e5e5e5'}}>
                        <span className="jobDetail">职为描述</span>
                    </div>
                    <div className="details_content">
                        <p>{JobDescription}</p>
                    </div>
                </div>
                <WhiteSpace />
                <div className="active_info">
                    <div className="info_title fontBold">岗位要求</div>
                    <div className="info_content">1.{Educationstr}</div>
                    <div className="info_content" style={{ paddingBottom:'10px' }}>2.{ExperiRequistr}</div>
                </div>
                <WhiteSpace />
                <div className='jobDeatil_foot'>
                {
                    /** 根据是否招聘判断是否显示投递按钮 */
                    Status === 1 ? JobType ? <Button className='jobDeatil_btn' onClick={this.jumpComing}>投递</Button> : <Button className='jobDeatil_btn' style={{ background: 'gray'}}>已投递</Button> : null
                   
                }
                </div>
            </div>
        );
    }
}

jobDetail.defaultProps = {
    ID : ''
};

jobDetail.propTypes = {
    ID: PropTypes.any,
};

export default jobDetail;