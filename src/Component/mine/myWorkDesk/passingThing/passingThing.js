//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import { hashHistory } from 'react-router'
import { Icon,ListView ,Tabs,SearchBar } from 'antd-mobile';
import  Navigation from '@/util/navigation'
import '../myWorkDesk.less'
import InputSearch from "@/util/inputSearch.jsx";
import ImgElement from '@/util/imgElement';
import api from '@/api'

const tabs2 = [
    { title: '待放行', sub: '3' },
    { title: '已放行', sub: '4' },
    { title: '已过期', sub: '5' },
];

class PassingThing  extends Component{
    constructor(props){
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });
        this.state={
            dataSource,
            search:'',
            boxHeight: 200,
            pageIndex: 1,
            pageSize: 8,
            height: 0,
            list: [],
            status: 3,
            isLoading: true,
            isMore: false,
            searchText: '',
            changeTab:{title: "待放行", sub: "3"},   //当前切换tab获取的值
            //待放行
            beginPass:[],

        }
    }
    componentDidMount () {
        const sh =  document.documentElement.clientHeight || plus.screen.resolutionHeight;
        api.GetWYArticlesReleaseList({
            keyword: this.state.searchText,
            states: this.state.changeTab.sub,
            pageIndex: this.state.pageIndex,
            pageSize: this.state.pageSize
        }).then(data => {
            const list = data || [];
            this.setState({
                list,
                boxHeight:   sh - this.refs.contentBox.offsetTop,
                dataSource: this.state.dataSource.cloneWithRows(list),
                isLoading: false,
                isMore: list.length < this.state.pageSize ? false : true
            })
        })
    }
    changTab(item){
        api.GetWYArticlesReleaseList({
            keyword: "",
            states: item.sub,
            pageIndex: 1,
            pageSize: this.state.pageSize
        }).then(data => {
            const list = data || [];
            this.setState({
                list,
                dataSource: this.state.dataSource.cloneWithRows(list),
                isLoading: false,
                pageIndex: 1,
                changeTab: item,
                isMore: list.length < this.state.pageSize ? false : true
            })
        })
    }
    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading || !this.state.isMore) {
          return;
        }
        api.GetWYArticlesReleaseList({
            keyword: this.state.searchText,
            states: this.state.changeTab.sub,
            pageIndex: this.state.pageIndex + 1,
            pageSize: this.state.pageSize 
        }).then(data => {
            const list = data || [];
            this.setState({
                list: [...this.state.list, ...list],
                dataSource: this.state.dataSource.cloneWithRows([...this.state.list, ...list]),
                isLoading: false,
                pageIndex: this.state.pageIndex + 1,
                isMore: list.length < this.state.pageSize ? false : true
            })
        })
        
      }
    //点击单个查看详情
    clickSingle(item){
        var tite=item.States == 3 ?'待放行':(item.States== 4 ?'已放行':'已过期')
        const data={
            title:tite,
            id:item.ID,
            state: item.States,
            item
        }
        hashHistory.push( { pathname:'/passingInfor', state:{data} } )

    }

    search() {
        api.GetWYArticlesReleaseList({
            keyword: this.state.searchText,
            states: this.state.changeTab.sub,
            pageIndex: 1,
            pageSize: this.state.pageSize
        }).then(data => {
            const list = data || [];
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(list),
                isLoading: false,
                pageIndex: 1,
                isMore: list.length < this.state.pageSize ? false : true
            })
        })
    }

    changeVal = val => {
  //      console.log(val)
        this.setState({
          searchText: val
        });
    }

    render(){
        //    <p className='passingThing_list_number'>{rowData.NumberID} <span className='passingThing_list_span'>待放行</span> </p>
        const row = (rowData, rowKey) => {
            return (
                <div className='passingThing_list' onClick={this.clickSingle.bind(this, rowData)}>
                  <div className='passingThing_list_img' style={{width: 'auto'}}>
                    <ImgElement url={rowData.ImgUrl} width="3.6rem" height="3.6rem" />
                  </div>
                  <div className='passingThing_list_text'>
                      <p className='passingThing_list_company'>{rowData.EnterpriseName}</p>
                      <p className='passingThing_list_number'>{rowData.NumberID}</p>
                      <p className='passingThing_list_time'>{rowData.ApplyTime}</p>
                  </div>
                </div>
            )
        };
        return(
            <div className='peripheralSearch' style={{color: '#666'}}>
                <Navigation  title="物品放行"/>
               
                <div className="searchBox">
                     <InputSearch
                         changeVal={this.changeVal}
                         width="100%"
                         height="1.4rem"
                         placeholder="请输入姓名或公司名称"
                     />
                     <div
                         className="searchBoxButton"
                         onClick={() => {
                         this.search();
                         }}
                     >
                         搜索
                     </div>
                 
                </div>
                <div className="passingThing" ref="contentBox" style={{height: this.state.boxHeight}}>    
                    <Tabs tabs={tabs2}
                        initialPage={0}
                        tabBarPosition="top"  
                        renderTab
                        renderTab={tab => <span>{tab.title}</span>}
                        onChange={this.changTab.bind(this)}>
                        <div style={{ marginTop:'10px'}}>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={row}
                            style={{
                                height: this.state.boxHeight - 10,
                                overflow: 'auto',
                            }}
                            pageSize={4}
                            scrollRenderAheadDistance={500}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={10}

                            />
                        </div>
                    </Tabs>   
                </div>    
           </div>

           
        )
    }
}

export default PassingThing;