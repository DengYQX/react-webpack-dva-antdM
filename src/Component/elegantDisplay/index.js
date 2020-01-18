// 风采展示Tab切换页
import React, { Component }  from 'react'
import './elegantDisplay.less'
import {  Icon ,Tabs, ListView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import  Navigation from '@/util/navigation'
import UnData from "@/Component/unData";
import interfaces from '@/api/index'

class ElegantDisplay extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });   
        this.state={
            dataSource: ds,
            list1:[],
            list2:[],
            changeTab:0,   //当前切换tab获取的值
            page1:1,
            page2:1,
            isMore1: true,
            isMore2: true,
            valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
            pageSize:10,
        }
    }
    componentDidMount(){
        this.getList()
    }
    getList(){
        //Type	0.企业1.员工
        if(this.state['isMore'+(this.state.changeTab+1)]){
            interfaces.GetStyleShowList({Type:this.state.changeTab,keyword:'',pageIndex:this.state['page'+(this.state.changeTab+1)],pageSize:this.state.pageSize}).then(res=>{
                if(res && res.length > 0){
                    this.setState({
                        valType:1,
                        ['page'+(this.state.changeTab+1)]: this.state['page'+(this.state.changeTab+1)],
                        ['list'+(this.state.changeTab+1)]: [...this.state['list'+(this.state.changeTab+1)],...res],
                        ['isMore'+(this.state.changeTab+1)]:res.length < this.state.pageSize ? false : true,
                    })
                }else if (this.state.valType == 0){
                    this.setState({ valType: 2 });
                  }
            })
        }
    }
    clickCompany(item){
        console.log(item)
        if(this.state.changeTab==0){
            hashHistory.push( { pathname:'/elegantInfor/', state:{title:'企业详情',id:item.ID,type:'1'} } )
        }else{
            hashHistory.push( { pathname:'/elegantInfor/', state:{title:'员工详情',id:item.ID,type:'1'} } )
        }
       
    }
    //切换的时候
    changTab(index){
        this.setState({
            changeTab:index.sub,
        }, ()=>{
            this.getList()
        })
        
      
    }
    onEndReached = () => {
        this.getList()
    }
    renderRow(item){
        return(
            <div className='elegantDisplay_list'   onClick={this.clickCompany.bind(this,item)}>
                <div className='elegantDisplay_img'>
                    <img src={item.Pic ? item.Pic : require('%/noImg.jpg')}/>
                </div>
                <div className='elegantDisplay_p'>
                    <p className='elegantDisplay_title'>{item.Name}</p>
                    <p className='elegantDisplay_context'>{item.Content}</p>
                    <p className='elegantDisplay_time'>{item.PublishTime}</p>
                </div>
            </div>
        )
    }
    render(){
        const tabs2 = [
            { title: '优秀企业', sub: 0 },
            { title: '优秀员工', sub:1 },
        ];
        const {valType} = this.state;
        return(
            <div className='elegantDisplay'>
                <Navigation  title="风采展示"/>
                <div >
                    <Tabs tabs={tabs2}
                        initialPage={0}
                        tabBarPosition="top"  
                        // onTabClick={this.changTab.bind(this)}
                        renderTab={tab => <span>{tab.title}</span>}
                        onChange={this.changTab.bind(this)}
                        >
                        <div style={{  marginTop:'10px'}}>
                        {
                            valType == 1 ?
                            (
                            <ListView
                                dataSource={this.state.dataSource.cloneWithRows(this.state.list1)}
                                style={{ height: 'calc(100vh - 4rem)', overflow: 'auto' }}
                                pageSize={this.state.pageSize}
                                renderRow={(item) => this.renderRow(item)}
                                onEndReached={this.onEndReached}
                                />
                            ):(
                               <UnData/>
                                )
                        }
                           
                        </div>
                        <div style={{  marginTop:'10px'}}>
                            {
                                this.state.list2.length < 1 && this.state.page2 === 1 ?  <UnData/> : 
                                <ListView
                                dataSource={this.state.dataSource.cloneWithRows(this.state.list2)}
                                style={{ height: 'calc(100vh - 4rem)', overflow: 'auto' }}
                                pageSize={this.state.pageSize}
                                renderRow={(item) => this.renderRow(item)}
                                onEndReached={this.onEndReached}
                                />
                            }

                        </div>

                    </Tabs>

                </div>

            </div>
        )
    }
}

export default ElegantDisplay;
