import { hashHistory } from 'react-router';
import { PureComponent } from 'react';
import { NavBar, Icon,ListView } from 'antd-mobile';
import { Link } from 'dva/router';
import SearchBar from '@/util/inputSearch';
import interfaces from '@/api/index'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
import './style.less'

class app extends PureComponent {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource,
            jobVal: '',/** input框获取的工作内容 */
            Status: 0, /** 状态（0：全部，1：招聘中，2：停止招聘） */
            pageSize: 10,/** 查询条数 */
            pageIndex: 1, /** 页码 */
            pageIndex1: 1, /** 页码 */
            valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
            list:[],/** 接口返的值 */
        }
    }

    /** 组件挂载之前 */
    componentWillMount(){
        this.getJobVal();
    }

    /**
     * GetOnlinePublishJobList 获取工作岗位信息
     * @author xiaoDai
     * @param {string} Search [用户输入的搜索信息]
     * @param {string} Status [状态(0：全部，1：招聘中，2：停止招聘)]
     * @param {int} pageIndex [页码]
     * @param {int} pageSize [查询条数]
     * @return [工作岗位信息]
     */
    getJobVal = () => {
        const {jobVal,Status,pageIndex,pageSize} = this.state;
        interfaces.GetOnlinePublishJobList({ 
            Search:jobVal,
            Status,
            pageIndex,
            pageSize,
         }).then(res => {
             /** 获取成功后 */
            const list = res || [];
            if(!isEmpty(list)){
                this.setState({
                    list: [...list,...res],
                    isLoading: false,
                    valType:1,
                    pageIndex:pageIndex+1,
                    isMore: list.length < pageSize ? true : false
                });
            }else if (this.state.valType == 0){
                this.setState({ valType: 2 });
            }
          })
    }
    /**
     * GetOnlinePublishJobList 查询工作岗位信息
     * 因为搜索和查询所有的页码不同   所以这里有两套接口
     * @author xiaoDai
     * @param {string} Search [用户输入的搜索信息]
     * @param {string} Status [状态(0：全部，1：招聘中，2：停止招聘)]
     * @param {int} pageIndex [页码]
     * @param {int} pageSize [查询条数]
     * @return [工作岗位信息]
     */
    getJobVals = () => {
        const {jobVal,Status,pageIndex1,pageSize} = this.state;
        interfaces.GetOnlinePublishJobList({ 
            Search:jobVal,
            Status,
            pageIndex:pageIndex1,
            pageSize,
         }).then(res => {
             /** 获取成功后 */
            const list = res || [];
            if(!isEmpty(list)){
                this.setState({
                    list,
                    isLoading: false,
                    valType:1,
                });
                
            }else if (this.state.valType == 0){
                this.setState({ valType: 2 });
            }
          })
    }
    /** 获取搜索内容 */
    changeVal = (val) => {
        this.setState({ jobVal:val });
    }
    /** 工作岗位 */
    renderRow(item) {
        const {ID='',Pic='',JobName='',SalaryRangestr='',Statusstr='',JobDescription='',EnterpriseName='',PublishTimestr=''} = item;
        return (
            <Link to={{pathname:'/jobDetail', state:{ID} }}>
                <div style={{marginTop: 0, backgroundColor: '#FFF'}}>
                    <img src={Pic} alt="" className="gongzuo_img" />
                    <div className="infos">
                    <div className="info">
                        <div className="type">{JobName}   
                            {
                                /** 根据是否招聘渲染出对应的样式 */
                                Statusstr == '招聘中'?(
                                    <div className="status">{Statusstr}</div>
                                ):(
                                    <div className="unStatus">{Statusstr}</div>
                                )
                            }
                        </div>
                        <div className="amount">{SalaryRangestr}</div>
                    </div>
                    <div className="desc" >{JobDescription}</div>
                    <div className="msg">
                        <div className="name">{EnterpriseName}</div>
                        <div className="times" style={{ color: '#898989'}}>{PublishTimestr}</div>
                    </div>
                    </div>
                </div>
            </Link>
        )
      }
    
    /** 组件挂载 */
    render() {
        const{ pageSize,dataSource, jobVal,list,valType }=this.state;
        return (
            <div className="gongzuoBox">
                <NavBar
                    mode="light"
                    icon={<Icon color="#000" type="left" />}
                    onLeftClick={() => {hashHistory.goBack()}}
                    rightContent={[
                      <Link to={{
                        pathname:`/newjianli`,
                        state:{resume:1}
                    }}
                       style={{color: '#108ee9', fontSize: '0.5rem', marginBottom: '0.07rem'}} >简历</Link>
                    ]}
                    >
                    找工作
                </NavBar>
                <div className="SearchNav">
                    <SearchBar
                        placeholder="请输入姓名或公司名称"
                        width="80%"
                        height="1.4rem"
                        changeVal={this.changeVal}
                        val={jobVal}
                    />
                    <div className="searchB" onClick={ this.getJobVals }>
                        搜索
                    </div>
                </div>
                <div className="list">
                {
                    valType == 1 ?
                    (
                    <ListView
                        dataSource={dataSource.cloneWithRows(list)}
                        style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                        pageSize={pageSize}
                        renderRow={(item) => this.renderRow(item)}
                        onEndReached={this.getJobVal}
                    />
                    ):(
                       <UnData/>
                      )
                }
                </div>
            </div>
        );
    }
}

export default app;