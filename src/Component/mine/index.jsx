import React, { Component, PropTypes } from "react";
import { hashHistory } from "react-router";
import { connect } from "dva";
import "./mine.less";
import img from "%/mine_bg.png";
import { Toast } from "antd-mobile";
import myCompany from "%/myCompany.png";
import mySelect from "%/mySelect.png";
import myReport from "%/myReport.png";
import myInformation from "%/myInformation.png";
import companyReset from "%/companyReset.png";
import mySpeak from "%/mySpeak.png";
import mySetting from "%/mySetting.png";
import myDesk from "%/myDesk.png";
import myMessage from "%/myMessage.png";
import myOrder from "%/myOrder.png";
import api from "@/api"
import Disload from "@/Component/disWork/disload";

class Mine extends Component {
  constructor(props) {
    super(props);
    this.moveStart = "";
    this.moveDistance = "";
    this.imgWidth = "";
    this.newImgWidth = "";
    this.scrollTop = "";
    this.state = {
      isClose: false,
      isAuthSub: false,
      Reason: '',
      authStatus: '',  // 1:未认证，2:已通过，3:已拒绝
      platform: navigator.userAgent.indexOf("Html5Plus") < 0 ? "h5" : "app",
      mineList: [
        {
          text: "企业认证",
          url: companyReset,
          link: "/companyReset"
        },
        {
          text: "我的企业",
          url: myCompany,
          link: "/myCompany"
        },
        {
          text: "我的发布",
          url: myInformation,
          link: "/myInformation"
        },
        {
          text: "我的申请",
          url: mySelect,
          link: "/myApply"
        },
        {
          text: "我的消息",
          url: myMessage,
          link: "/myMessage"
        },
        {
          text: "订单管理",
          url: myOrder,
          link: "/disWork"
        },
        {
          text: "投诉建议",
          url: myReport,
          link: "/myReport"
        },
        // {
        //   text: "物业工作台", //仅物业人员才可见
        //   url: myDesk,
        //   link: "/MyWorkDesk"
        // }
      ]
    };
  }

  clickIndex(link) {
    if (link === '000') {
      const data={
        title:'我的认证',
        btn:'确定',   //按钮的字
        img:1,  //1为成功，0为失败
        url:'/',    //按钮跳转的链接
        text:'您的信息已提交成功！',
        desc: '请及时关注审核状态，我们将在7个工作日内 对您的信息进行审核。'
      }
      hashHistory.push( { pathname:'/registerOk', state:{data:data} } )
    }else if (link === '999') {
      const data={
        title:'我的认证',
        btn:'重新申请',   //按钮的字
        text:'审核未通过！',
        url:'/companyReset',    //按钮跳转的链接
        desc: this.state.Reason // 描述
      }
      hashHistory.push( { pathname:'/certificationFailed', state:{data} } )
    } else if (link === '') {
      Toast.info('您已认证，请在我的企业中查看', 2)
    } else{
      hashHistory.push(link);
    }
  }
  componentDidMount() {
    const userType = localStorage.getItem('userType');
    if (userType ==3 || userType ==4) {
      const data = this.state.mineList;
      data.push({
        text: "物业工作台", //仅物业人员才可见
        url: myDesk,
        link: "/MyWorkDesk"
      })
     // data.splice(7, 1);
      this.setState({
        mineList: data
      })
    }
    if (!this.props.token) {
      this.setState({
        isClose: true
      });
    }
    this.refs.mineBody.style.marginTop =
      this.refs.head.getBoundingClientRect().height + "px";
    this.imgWidth = this.refs.myPic.getBoundingClientRect().width;
    if (localStorage.getItem('userId')) {
      api.GetIsSubmitCertifi({
        UserID: localStorage.getItem('userId')
      }).then(res => {
        // console.log(res, 12)
        let menuLink = this.state.mineList;
        api.GetMyCertiyByUserID({
          UserID: localStorage.getItem('userId')
        }).then(data => {
          // console.log(res, 111) // 1:未认证，2:已通过，3:已拒绝
          if (res && data.Status === 2) {
            menuLink[0].link = '';
          }
          if (res && data.Status === 1) {
            menuLink[0].link = '000';
          }
          if (res && data.Status === 3) {
            menuLink[0].link = '999';
          }
          this.setState({
            authStatus: data.Status,
            Reason: data.Reason,
            mineList: menuLink,
            isAuthSub: res
          })
        })
      })
    }
  }
  closeModel = () => {
    this.setState({
      isClose: false
    });
  };
  start(e) {
    if (this.state.platform === 'h5') {
      e.preventDefault();
    }
    this.moveStart = e.touches[0].pageY;
    this.refs.mineBody.style.marginTop =
      this.refs.head.getBoundingClientRect().height + "px";
  }
  move(e) {
    e.preventDefault();
    this.moveDistance = e.touches[0].pageY - this.moveStart;
    this.refs.myPic.style.width = this.refs.myPic.style.height =
      this.setMyPicWidth() + "px";
    this.refs.mineBody.style.marginTop =
      this.refs.head.getBoundingClientRect().height + "px";
  }
  end(e) {
    this.scrollTop = "";
    document.body.removeEventListener("touchmove", this.a, { passive: false });
  }
  setMyPicWidth() {
    let _new =
      this.refs.myPic.getBoundingClientRect().width + this.moveDistance;
    let old = this.imgWidth;
    let width = _new > old ? old : _new > 0 ? _new : 0;
    if (width === 0) {
      this.refs.myPic.style.marginTop = 0;
      this.refs.text.style.padding = ".534rem 0 0";
      this.refs.text.querySelector(".mine_text").style.marginTop = 0;
      this.refs.text.classList.add("mine-flex");
      this.refs.text.querySelector(".textBox").style.marginLeft = "1rem";
    } else {
      document.body.addEventListener("touchmove", this.a, { passive: false });
      this.refs.myPic.style.marginTop = null;
      this.refs.text.style.padding = null;
      this.refs.text.querySelector(".mine_text").style.marginTop = null;
      this.refs.text.classList.remove("mine-flex");
      this.refs.text.querySelector(".textBox").style.marginLeft = 0;
    }
    this.newImgWidth = width;
    return width;
  }
  a = e => {
    if (this.moveDistance > 0) {
      e.preventDefault();
      let marginTop = this.refs.mineBody.style.marginTop.replace("px", "");
      if (
        Math.abs(marginTop - this.refs.head.getBoundingClientRect().height) <
          5 &&
        this.newImgWidth === this.imgWidth
      ) {
        if (this.scrollTop === "") {
          this.scrollTop = this.refs.mine.scrollTop;
        }
        this.refs.mine.scrollTop = this.scrollTop - this.moveDistance;
      }
    }
  };
  render() {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {};
    const { isOut } = this.props;
    if (isOut) {
      document.body.removeEventListener("touchmove", this.a, {
        passive: false
      });
    }
    return (
      <div
        ref="mine"
        className="mine"
        onTouchStart={e => {
          this.start(e);
        }}
        onTouchMove={e => {
          this.move(e);
        }}
        onTouchEnd={e => {
          this.end(e);
        }}
      >
        <div
          className="mine_head"
          style={{ background: "url(" + img + ")  no-repeat 100% 100%" }}
          ref="head"
        >
          <div className="mine_title">个人中心</div>
          <div
            className="mine_myPic"
            onClick={this.clickIndex.bind(this, "/mySetting")}
            ref="myPic"
          >
            <img
              src={user.img ? user.img : require("../../images/mine_img.png")}
            />
            {
              this.state.authStatus === 2 ? (<p className="authStatus">已认证</p>) : null
            }
          </div>
          <div ref="text">
            <img
              src={user.img ? user.img : require("../../images/mine_img.png")}
              style={{ width: "2.1rem", height: "2.1rem", display: "none" }}
            />
            <div className="textBox">
              <div className="mine_text">{user.name || "小谷"}</div>
              <div className="mine_text">{user.phone || "-----------"}</div>
            </div>
          </div>
          <img
            className="mine_head_ico mine_head_ico_left"
            src={require("../../images/customerService.png")}
            onClick={this.clickIndex.bind(this, "/disWork")}
          />
          <img
            className="mine_head_ico mine_head_ico_right"
            src={require("../../images/setting.png")}
            onClick={this.clickIndex.bind(this, "/mySetting")}
          />
        </div>
        <div className="mine_body" ref="mineBody">
          <div className="mine_body_div">
            {this.state.mineList.map((item, index) => {
              return (
                <div
                  className="mine_body_list"
                  key={index}
                  onClick={this.clickIndex.bind(this, item.link)}
                >
                  <div
                    className="mine_body_img"
                    style={{
                      backgroundImage: `url(${item.url})`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center"
                    }}
                  ></div>
                  <div className="mine_list_text">{item.text}</div>
                </div>
              );
            })}
          </div>
        </div>
        <Disload isClose={this.state.isClose} closeModel={this.closeModel} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    token: state.login.token,
    isOut: state.home.currentTab !== "a4"
  };
}

export default connect(mapStateToProps)(Mine);
