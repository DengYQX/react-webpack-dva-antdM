import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { WhiteSpace,ListView,InputItem, Modal} from 'antd-mobile';
import './index.less'
import commentNull from '%/commentNull.png';
import commentNo from '%/commentNo.png';
import fabulousNo from '%/fabulousNo.png';
import fabulous from '%/fabulous.png';
import forwardNo from '%/forwardNo.png';
import share from '@/util/share.js'

import interfaces from '@/api/index'

const myImg = src => <img src={src} className="spe am-icon am-icon-md" alt="" />;
class talk extends Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const name=localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : '';
    this.state = {
      dataSource: ds,
      list: [],
      page: 1,
      loginName:name,   //当前登录者姓名
      isMore:true,
      pageSize:10,
    }
  }
  componentWillUnmount() {
    this.setState({
      list: []
    })
  }
  // componentDidMount(){
  //   const {list,page} = this.props;
  //   this.setState({
  //     list,page
  //   })
  // }

  componentWillReceiveProps(nextProps){
    const {list,page} = nextProps;
    const listData = list.map( item => {
      return {
        ...item,
        word: false,
        myLike: 0
      }
    })
    this.setState({ list: listData,page });
  }

  onEndReached=(e)=>{
    this.getList;
  }

  /** 获取值 */
  getList=()=>{
    this.props.getList();
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
                url:'/talk',    //点击按钮跳转的链接
                text: res
            }
            hashHistory.push( { pathname:'/registerOk', state:{data} } )
        }
    });
  }
  //点赞
  likeIt(item){
    if (localStorage.getItem('userId')) {
      interfaces.AddLikeCircle({
        CircleID:item.ID,
        UserID:localStorage.getItem('userId')
      }).then(res=>{
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
        interfaces.AddCircleComments({CircleID:item.ID,UserID:localStorage.getItem('userId'),CommentsContent:e}).then(res=>{
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
    }else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }
    
  }
  //评价
  addWord(item){
    if (localStorage.getItem('userId')) {
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
    } else {
      Modal.alert("您尚未登陆", "您是否需要登陆", [
        { text: "否" },
        { text: "是", onPress: () => hashHistory.push({ pathname: "/login" }) }
      ]);
    }
    
  }
  renderRow(item){
    return(
      <div style={{ backgroundColor:'#fff'}}>
        <div className="trivia_img">
          <img src={item.PhotoPath} className="spe am-icon am-icon-md" style={{ width:'2rem',height:'2rem',marginTop:'1rem'  }} alt="" />
        </div>
        <div className="trivia_boxs" style={{ marginTop: '-2.5rem' }} >
          <div className="trivia_title">
            {item.Title}  
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
            <InputItem onBlur={this.blurWord.bind(this,item)}>{this.state.loginName+':'}</InputItem>
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

export default talk;