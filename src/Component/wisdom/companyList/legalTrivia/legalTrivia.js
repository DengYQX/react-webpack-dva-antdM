//法律小知识
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { WhiteSpace,ListView,InputItem, Modal} from 'antd-mobile';
import './legalTrivia.less'
import Navigation from '@/util/navigation.jsx'
import povertyAlleviationImg from '%/povertyAlleviationImg.png';
import commentNull from '%/commentNull.png';
import commentNo from '%/commentNo.png';
import comment from '%/comment.png';
import fabulousNo from '%/fabulousNo.png';
import fabulous from '%/fabulous.png';
import forwardNo from '%/forwardNo.png';
import forward from '%/forward.png';
import share from '@/util/share.js'

import interfaces from '@/api/index'

class LegalTrivia extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const name= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : '';
    this.state = {
      dataSource: ds,
      list: [],
      page:1,
      loginName:name,   //当前登录者姓名
      isMore:true,
      pageSize:10,
    }
  }
  componentDidMount(){
    this.getList()
  }
  onEndReached=(e)=>{
    this.getList()
  }
  getList(){
    if(this.state.isMore){
      interfaces.GetLegalKnowledgeAndComment({pageIndex:this.state.page,pageSize:this.state.pageSize}).then(res=>{
        if(res && res.length>0){
          res.forEach(item=>{
            item.PuslishTime=item.PuslishTime.split(' ')[0],
            item.word=false;
            item.myLike=0
            item.LikeUserList.forEach(i=>{
              if(i.UserID==localStorage.getItem('userId')){
                item.myLike=1
              }
            })
  
          })
          this.setState({
            list:[...this.state.list,...res],
            page:this.state.page+1,
            isMore:res.length<this.state.pageSize?false:true
          })
        }
       
      })

    }
    
  } 
  //点击分享的时候  
  showOther(item){
    //跳转公共页面的相关参数---失败
    console.log(item)
    const  info = {
        link: 'https://www.baidu.com/',//链接跳转路径
        title: item.Tip, //活动标题名称   
        name: item.Title,//标题名称
        img: item.Pic[0].FullThumbUrl,//自定义图片
        conetnt: item.Content,  //内容
    }
    share.shareAction({
      //  type: 1,  朋友圈 默认为 微信
        info, 
        func: (res) => {
            const data={
                title:'分享',
                btn:'返回',   //按钮的字
                img: 1,  //1为成功，0为失败
                url:'/legalTrivia',    //点击按钮跳转的链接
                text: res
            }
            hashHistory.push( { pathname:'/registerOk', state:{data} } )
        }
    });
  }
  //点赞
  likeIt(item){
    if (localStorage.getItem('userId')) {
      interfaces.LikeLegalKnowledge({LegalKnowledgeID:item.ID,UserID:localStorage.getItem('userId')}).then(res=>{
        //如果点赞成功，就将item中的myLike=1
        //修改对象数组中的值
        for(var i=0;i<this.state.list.length;i++){
          if(this.state.list[i].ID==item.ID){
            let { list } = this.state;
            // 修改具体数组对象中的值
            list[i]['myLike'] = 1;
            //LikeUserList  加一条假数据  {cName:'登陆者姓名'}
            list[i]['LikeUserList'].push({cName:this.state.loginName})
            let newListData = list;
            this.setState({
              list: newListData
            },()=>{
              console.log(item)
            })
          }
        }
        
      })
    } else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }

  }

  //评价，失去焦点的时候
  blurWord(item,e){
    console.log(item)
    console.log(e)  //输入框的值
    if (localStorage.getItem('userId')) {
      if(e){
        interfaces.Comments({LegalKnowledgeID:item.ID,UserID:localStorage.getItem('userId'),CommentsContent:e}).then(res=>{
          for(var i=0;i<this.state.list.length;i++){
            if(this.state.list[i]===item){
              //CommentUsesrList
              let { list } = this.state;
              list[i]['CommentUsesrList'].push({cName: this.state.loginName,Comment: e})   //在评价列表中加入一条假数据
              list[i]['word'] = false;   //关闭评论输入
              let newListData = list;
              this.setState({
                list: newListData
              })
            }
          }
        })
      }else{
        //没有内容的时候，失去焦点的时候关闭评论输入
        this.state.list.forEach((i,index)=>{
          if(i===item){
            let { list } = this.state;
            list[index]['word'] = false;
            let newListData = list;
            this.setState({
              list: newListData
            })
          }
        })
      }
    } else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }
    
  }
  //评价
  addWord(item){
    for(var i=0;i<this.state.list.length;i++){
      if(this.state.list[i]===item){
        let { list } = this.state;
          // 修改具体数组对象中的值
        list[i]['word'] = true;
        let newListData = list;
        this.setState({
          list: newListData
        })
      }
    }

  }
  renderRow(item){
    return(
      <div>
        <div className="trivia_box" >
          <div className="trivia_title">
            {item.Title}
            <span className={item.Tip == '法律小常识' ? 'title1' : item.Tip == '经典案例' ? 'title2' : 'title3'}>
              {item.Tip }
            </span>
          </div>
          <div className="trivia_content">{item.Content}</div>
          <div className="trivia_img">
            {
              (item.Pic==null || item.Pic.length ==0 )?'': item.Pic.map((i,index) => {        
                return (
                  <img key={index} src={i.FullThumbUrl} alt=""/>
                )
              })
            }
          </div>
          <div className="trivia_time">
            <span>{item.PuslishTime}</span>
            <span>
              <img src={forwardNo}   onClick={this.showOther.bind(this,item)}  alt=""/>
             
              <img src={commentNo}   onClick={this.addWord.bind(this,item)}  alt=""/>
              {/* {item.comment.length} */}
              {item.myLike==0? <img src={fabulousNo}  onClick={this.likeIt.bind(this,item)} alt=""/>: <img src={fabulous}   alt=""/>}
            </span>
          </div>
          <div className="comment">
            <p>
              <img src={fabulousNo} alt=""/>
              <span>{ (item.LikeUserList==null || item.LikeUserList.length ==0 )?'':item.LikeUserList.map((k,index)=>{
                return(
                <span>{k.cName+(index===item.LikeUserList.length-1 ? '' : ',')}</span>
                )
              })}</span>
            </p>
            {
              (item.CommentUsesrList==null || item.CommentUsesrList.length ==0 )?'':item.CommentUsesrList.map((i,index) => {
                return (
                  <p key={index}>
                    {index==0?<img src={commentNo} alt=""/>:<img src={commentNull} alt=""/>}
                    <span>{i.cName+'：'}{i.Comment}</span>
                  </p>
                )
              })
            }
            {item.word ? <div>
            <InputItem  onBlur={this.blurWord.bind(this,item)}>{this.state.loginName+':'}</InputItem>
            </div>:''}
          </div>
        </div>
        <WhiteSpace />
      </div>

    )
  }

  render() {
    return (
      <div className='legal_trivia'>
        <Navigation title="法律小知识" />
        <WhiteSpace size="xs" />
        <ListView
            dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
            style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
            pageSize={this.state.pageSize}
            renderRow={(item) => this.renderRow(item)}
            onEndReached={this.onEndReached}
            />

      
      </div>
    )
  }
}

export default LegalTrivia;