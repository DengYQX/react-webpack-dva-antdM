import React, { Component, PropTypes } from 'react'
import { hashHistory } from 'react-router'
import { NavBar, Icon } from 'antd-mobile';
import './myApply.less' //样式文件
import myApply_admission from '%/myApply_admission.png';
import myApply_repair from '%/myApply_repair.png';
import myApply_goods from '%/myApply_goods.png';
import myApply_renovation from '%/myApply_renovation.png';
import myApply_people from '%/myApply_people.png';
import myApply_policy from '%/myApply_policy.png';
import myApply_agency from '%/myApply_agency.png';
import paid_service from '%/paid_service.png';
import myApply_recruit from '%/myApply_recruit.png';
import api from '@/api'

class MyApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      statusName: '',
      ReasonRefusal: '',
      type: '',
      myApplyList: [{
        text: '入园申请',
        url: myApply_admission,
        link: '/disWork'
      }, {
        text: '报修申请',
        url: myApply_repair,
        link: '/repairList'
      }, {
        text: '装修申请',
        url: myApply_renovation,
        link: '/myApplyRenovation',
        applyState: 1,  //申请状态 1为成功 2为申请中 3为拒绝
      }, {
        text: '物品放行申请',
        url: myApply_goods,
        link: '/myApplyGoods'
      }, {
        text: '便民服务申请',
        url: myApply_people,
        link: '/myApply/MyBMapply'
      }, {
        text: '政策申请',
        url: myApply_policy,
        link: '/policyApply'
      }, {
        text: '代办服务申请',
        url: myApply_agency,
        link: '/agent'
      },{
        text: '有偿服务申请',
        url: paid_service,
        link: '/paidServicesq'
      }, {
        text: '招聘会申请',
        url: myApply_recruit,
        link: '/myApplyRecruit',
      }],
    }
  }
  componentDidMount() {
    const{token= ''}=this.props; /** token来源于modol-login中的token */
    if (localStorage.getItem('userId')) {
       api.GetMyJoinParkApplyDetails({
        UserId: localStorage.getItem('userId')
       }).then(res => {
           if (res && res.length > 0) {
            this.setState({
                status: res[0].Status,
                statusName: res[0].Statusstr,
                type: res[0].RegisterType,
                ReasonRefusal: res[0].ReasonRefusal
            })
           }
       })
    }else{
        Modal.alert('您尚未登陆', '您是否需要登陆', [
            { text: '否', },
            { text: '是', onPress: () => hashHistory.push( { pathname:'/login' } ) },
        ]);
    }
  }
  applyDetails(item) {
    if (item.link !== '/disWork') {
      hashHistory.push({ pathname: item.link, state: {data: item} })
    }else {
      // 状态（1：初审中，2：审核中，3：已通过，4：初审拒绝，5：审核拒绝） 
      let tels = {
          title: this.state.statusName,
          btn:'立即前往',   //按钮的字
          img:1,  //1为成功，0为失败
          url: this.state.type === 1 ? '/nowShopping' : '/replaceChangsha',    //按钮跳转的链接
          text: this.state.type === 1 ? '恭喜您，可进行免费的工商注册' : "是否立即办理工商迁移变更"
      }
      if (this.state.status !==4 && this.state.status !==5) {
          hashHistory.push( { pathname:'/registerOk', state:{data: tels} } )
      }else {
          tels.img = 1;
          tels.title = '审核未通过';
          tels.btn = '再次申请';
          tels.url = '/coming';
          tels.desc = this.state.ReasonRefusal;
          hashHistory.push( { pathname:'/registerOk', state:{data: tels, plus: true} } )
      }
    }
  }

  render() {
    return (
      <div className='my_apply'>
        <NavBar
          mode="light"
          icon={<Icon type="left" color="#000" />}
          onLeftClick={()=>hashHistory.goBack()}
          className="my_apply_title"
        >我的申请</NavBar>
        <div className="apply_list">
          {this.state.myApplyList.map((item,index)=>{
            return (
              <div className="apply_list_text" key={index} onClick={this.applyDetails.bind(this,item)}>
                <img src={item.url?item.url:require('%/noImg.jpg')} alt="" className="apply_list_img" />
                {item.text}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

export default MyApply;