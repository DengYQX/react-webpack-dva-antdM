// 新闻资讯
import React, { Component }  from 'react'
import './newInfor.less'
import { NavBar, Icon,ListView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import interfaces from '@/api/index'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
// GetParkNoticeList
class NewInfor extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const type = this.props.location.state ? this.props.location.state.type : 2;
        this.state={
            dataSource: ds,
            newList:[],
            type,
            page:1,
            isMore: true, // 是否加载
            valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
            pageSize:10,
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData(){
        if(this.state.isMore) {
            interfaces.GetParkNoticeList({Type: this.state.type, pageIndex:this.state.page,pageSize:this.state.pageSize}).then(res=>{
                if(res && res.length > 0){
                    this.setState({
                        valType:1,
                        page:this.state.page+1,
                        newList:[...this.state.newList,...res],
                        isMore: res.lenght < this.state.pageSize ? false : true
                    })
                }else if (this.state.valType == 0){
                    this.setState({ valType: 2 });
                }
            })
        }
    }
    clickNew(item){
        console.log(item)
        hashHistory.push( { pathname:'/noticeTemplate/', state:{title:this.state.type === 1 ? '园区通知详情': '新闻资讯详情',id:item.ID,url:'GetParkNoticeInfo'} } )
    }
    renderRow(item){
        return(
            <div className='newInfor_list'  onClick={this.clickNew.bind(this,item)} >
                <div className='newInfor_list_img'>
                    <img  src={item.ImageUrl?item.ImageUrl:require('%/noImg.jpg')} />
                </div>
                <div className='newInfor_list_p'>
                    <p className='newInfor_list_title'>{item.Title}</p>
                    <p className='newInfor_list_time'>{item.PublishTime}</p>
                </div>
            </div>
        )
    }
    onEndReached=()=>{
        this.getData()
    }
    render(){
    const {valType, type} = this.state;
    return (
            <div className='newInfor'>
                <NavBar mode="light"
                icon={<Icon type="left" color='#000'/>}
                onLeftClick={() => hashHistory.goBack()}
                >{type === 1 ? '园区通知' : '新闻资讯'}
                </NavBar>
                <div>{
                    valType == 1 ?
                    (
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.newList)}
                        style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                        pageSize={this.state.pageSize}
                        renderRow={(item) => this.renderRow(item)}
                        onEndReached={this.onEndReached}
                        />):(
                 <UnData/>
                )
              }
                </div>
            </div>

        )
    }
}

export default NewInfor;