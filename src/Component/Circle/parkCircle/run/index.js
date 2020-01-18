import React, { Component } from 'react'
import { } from 'antd-mobile';
import './index.less'
import Navigation from '@/util/navigation.jsx'
import Talk from "../talk";
import interfaces from '@/api/index'

/** 单身邂逅 */
class run extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list:[],
      page:1,
      isMore:true,
      pageSize:10,
    }
  }

  getListVal(){
    if(this.state.isMore){
      interfaces.GetLegalKnowledgeAndCommentAndLikeList({
        pageIndex:this.state.page,
        Type: 2,
        pageSize:this.state.pageSize
      }).then(res=>{
        if(res && res.length>0){
          res.forEach(item=>{
            item.PuslishTime=item.PuslishTime.split(' ')[0],
            item.word=false;
            item.LikeUserList.forEach(i=>{
              if(i.UserID==localStorage.getItem('userId')){
                item.myLike=1
              }else{
                item.myLike=0
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

  render() {
    const {list,page} = this.state;
    return (
      <div className='legal_trivia'>
        <Navigation title="单身邂逅" />
        <Talk list={list} page={page} getList={this.getListVal()} />
      </div>
    )
  }
}

export default run;