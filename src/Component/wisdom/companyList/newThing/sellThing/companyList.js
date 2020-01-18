//待办服务--申请成功
import React, { Component }  from 'react'
import { hashHistory } from 'react-router';
import { Link } from 'dva/router';
import  Navigation from '@/util/navigation'
import { ListView } from 'antd-mobile';
import './sellThing.less'
import interfaces from "@/api/index";
class CompanyList extends Component{
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        const type=this.props.location.state.type;
        this.state={
            dataSource: ds,
            companyList:[],
            type:type,
            page:1,
            isMore:true,
            pageSize:10,
        }
    }
    componentDidMount(){
        this.getData()
    }
    getData(){
        if(this.state.isMore){
            interfaces.GetInsteadServicesList({Type:this.state.type,pageIndex:this.state.page,pageSize:this.state.pageSize}).then(res=>{
                if(res && res.length > 0){
                    this.setState({
                        page:this.state.page+1,
                        companyList:[...this.state.companyList,...res],
                        isMore:res.length < this.state.pageSize ?false:true
                    })
                }
            })
        }
    }
    clickSingle(item){
        hashHistory.push({pathname:'/companySingle',state:{ID:item.ID}})
    }
    onEndReached=()=>{
        this.getData()
    }
    renderRow(item){
        return(
            <div className='companyList_single' onClick={this.clickSingle.bind(this,item)}>
                <div className='companyList_png'> 
                    <img src={item.ImgUrl?item.ImgUrl :require('%/noImg.jpg')} />
                </div>
                <div className='companyList_div'>
                    <p className='companyList_title'>{item.CompanyName}</p>
                    <p className='companyList_context'>{item.CompanyIntroduction}</p>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div className='companyList'>
                <Navigation    title='申请成功'/>
                <div className='companyList_img'>
                    <img  src={require('%/registerOk.png')} />
                    <p>申请成功，已为您推荐以下公司</p>
                </div>
                <div className='companyList_list'>推荐</div>
                <div >
                    {/* {this.state.companyList.map((item,index)=>{
                        return(
                            <div className='companyList_single' key={index} onClick={this.clickSingle.bind(this,item)}>
                                <div className='companyList_png'> 
                                    <img src={require('%/medicalBox.png')} />
                                </div>
                                <div className='companyList_div'>
                                    <p className='companyList_title'>{item.title}</p>
                                    <p className='companyList_context'>{item.context}</p>
                                 </div>

                            </div>
                        )
                    })} */}
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.companyList)}
                        style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                        pageSize={this.state.pageSize}
                        renderRow={(item) => this.renderRow(item)}
                        onEndReached={this.onEndReached}
                        />
                </div>

            </div>
        )
    }
}

export  default  CompanyList;
