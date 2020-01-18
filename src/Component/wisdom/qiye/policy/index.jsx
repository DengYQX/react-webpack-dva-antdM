//园区政策
import { List,ListView } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import { hashHistory } from 'react-router'

import interfaces from '@/api/index'
import './style.less'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";

class app extends React.Component {
    
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds, /**ListView数据源 */
            disabled: false, /** 是否显示 */
            allList:[], /** 接口返回的值 */
            page:1, /** 页码 */
            isMore: true, /** 更多 */
            valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
            pageSize:10, /** 查询条数 */
        }
    }
    /** 组件挂载之后 */
    componentDidMount(){
        this.getList()
    }

    /**
     * GetParkPolicyList 企业服务-政策服务--园区政策
     * @author xiaoDai
     * @param {int} pageIndex [页码]
     * @param {int} pageSize [查询条数]
     * @return [企业服务-政策服务--园区政策]
     */
    getList(){
        if(this.state.isMore){
            interfaces.GetParkPolicyList({pageIndex:this.state.page,pageSize:this.state.pageSize}).then(res=>{
                if(res && res.length > 0){
                    this.setState({
                        valType:1,
                        page:this.state.page+1,
                        allList:[...this.state.allList,...res],
                        isMore: res.length < this.state.pageSize? false : true
                    })
                }else if (this.state.valType == 0){
                    this.setState({ valType: 2 });
                } 
            })
        }
    }
    /** 下拉触发的事件 */
    onEndReached=()=>{
        this.getList();
    }
    /** 跳转 */
    clickSingle(item){
        hashHistory.push({pathname:'/wisdom/qiye/policy/policyDetail',state:{data:item}})

    }
    /** list */
    renderRow(item){
        return(
            <List className="itemBox">
                <div arrow="horizontal" onClick={this.clickSingle.bind(this,item)} >
                    <div className="card">
                        <div className="poverty_alleviation_img">
                            <img src={item.Pic} />
                        </div>
                        <div className="card_text">
                            <div className="card_title">{item.Title}
                            {
                                /** 根据是否招聘渲染出对应的样式 */
                                item.Statusstr == '已公示'?(
                                    <div className="status">{item.Statusstr}</div>
                                ):null
                            }
                            </div>
                            <div className="card_content">{item.DeclarationConditions}</div>
                        </div>
                    </div>
                </div>
            </List>
        )
    }
    /** 组件挂载 */
    render() {
        const {valType} = this.state;
        return(
            <div className='content'>
                <Navigation title="园区政策" />
                {
                    valType == 1 ?
                    (
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(this.state.allList)}
                        style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                        pageSize={this.state.pageSize}
                        renderRow={(item) => this.renderRow(item)}
                        onEndReached={this.onEndReached}
                        />
                    ):(
                       <UnData/>
                        )
                }
            </div>
        )
    }
}
export default app