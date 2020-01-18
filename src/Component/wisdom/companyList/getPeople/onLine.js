//在线发布
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { NavBar, Icon, ListView } from 'antd-mobile';
import './getPeople.less'

import interfaces from '@/api/index'

class Online extends Component{
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state={
            dataSource: ds,
            list:[],
            pageIndex: 1,
            pageSize: 10,
            isMore:true, 
        }
    }

    componentDidMount() {
        this.jobList()
    }

    // 在线发布岗位列表
    jobList() {
        const { pageIndex, pageSize, isMore} = this.state
        if(isMore){
            interfaces.GetOnlinePublishJobList({Search: '', Status: 0, pageIndex, pageSize}).then(res => {
                console.log(res)
                if(res && res.length > 0) {
                    this.setState({
                        pageIndex: pageIndex + 1,
                        list: [...this.state.list, ...res],
                        isMore:res.length<pageSize?false:true
                    })
                }
            })
        }
    }
    
    jumpSingle(item){
        hashHistory.push({pathname:'/onLineInfor',state:{data:item.ID}})
    }

    addNews=()=>{
        hashHistory.push({pathname:'/addOnline'})
    }

    onEndReached = () => {
        this.jobList()
    }

    renderRow(item) {
        return (
            <div className='online_single' onClick={this.jumpSingle.bind(this,item)}>
                <div className='online_img'>
                    <img  src={item.Pic?item.Pic :require('%/noImg.jpg')} />
                </div>
                <div className='online_div'>
                    <p className='online_title'>{item.JobName}
                        {item.Statusstr == '招聘中' ? <span className='online_blue'>{item.Statusstr}</span> : <span className='online_blue' style={{background: '#E8323C'}}>{item.Statusstr}</span>}
                        <span className='online_money'>{item.SalaryRangestr}</span> 
                    </p>
                    <p className='online_context'>{item.JobDescription}</p>
                    <p className='online_company'>{item.EnterpriseName}  
                        <span className='online_time'>{item.PublishTimestr}</span> 
                    </p>
                </div>
            </div>
        )
    }

    render(){
        const { dataSource, pageSize } = this.state
        return(
            <div className='online'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left"  color="#000"/>}
                    onLeftClick={() => hashHistory.goBack()}
                    rightContent={[
                        <img  src={require('%/infoAdd.png')}  style={{ marginRight: '16px',width:'18px',height:'18px' }}  onClick={this.addNews} />,
                    ]}
                    style={{borderBottom:'1px solid #EDEEEF'}}
                >在线发布</NavBar>
                <div className="get_meet">
                    <ListView
                        dataSource={dataSource.cloneWithRows(this.state.list)}
                        style={{ height: '100%', overflow: 'auto' }}
                        pageSize={pageSize}
                        renderRow={(item) => this.renderRow(item)}
                        onEndReached={this.onEndReached}
                    />
                </div>
            </div>
        )
    }
}


export default Online;