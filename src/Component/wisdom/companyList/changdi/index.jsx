import Navigation from '@/util/navigation.jsx'
import { hashHistory } from 'react-router'
import MedicalBox from '%/medicalBox.png'
import { ListView } from 'antd-mobile';
import './index.less'
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
import interfaces from "@/api/index";
//GetSiteServiceList
class Changdi extends React.Component {
    constructor(props) {
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds,
            list: [],
            page:1,
            isMore: true, // 是否加载
            valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
            pageSize:10,
        }
    }
    componentDidMount(){
        this.getList()
    }
    getList(){
        if (this.state.isMore) {
            interfaces.GetSiteServiceList({pageIndex:this.state.page,pageSize:this.state.pageSize}).then(res=>{
                if(res && res.length > 0){
                    this.setState({
                        valType:1,
                        page:this.state.page+1,
                        list:[...this.state.list,...res],
                        isMore: res.length < this.state.pageSize ? false : true
                    })
                }else if (this.state.valType == 0){
                    this.setState({ valType: 2 });
                }
            })
        }
    }

    goDetails(item) {
        console.log(item)
        hashHistory.push({pathname:'/changdifuwu',state:{ID:item.ID}})
    }
    onEndReached=()=>{
        this.getList()
    }
    goReservation(item) {
        hashHistory.push({pathname:'/reservation',state:{ID:item.ID}})
    }
    renderRow(item){
        return(
            <div className="item_box" >
                <div> <img src={item.ImgUrl?item.ImgUrl :require('%/noImg.jpg')} /></div>
                <div className="right_box">
                    <div onClick={this.goDetails.bind(this,item)}>
                        <p>{item.SiteName}</p>
                        {item.Price==0?<p style={{ marginTop: '0.512rem', marginBottom: '0.512rem', color: '#419AF4' }}>免费</p>
                        :<p style={{ marginTop: '0.512rem', marginBottom: '0.512rem', color: '#FF9300' }}>{item.Price}元/小时</p>}
                        <p>{item.Address}</p>
                    </div>
                    <div className="button"  onClick={this.goReservation.bind(this,item)}>在线申请</div>
                </div>
            </div>
        )
    }
    render() {
        const {valType} = this.state;
        return (
            <div className="changdi">
                <Navigation title="场地服务" />
                {
                valType == 1 ?
                    (
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRows(this.state.list)}
                            style={{ height: 'calc(100vh - 1.92rem)', overflow: 'auto' }}
                            pageSize={this.state.pageSize}
                            renderRow={(item) => this.renderRow(item)}
                            onEndReached={this.onEndReached}
                            />
                    ):(
                       <UnData/>
                    )
                }
                {/* {this.state.list.map((item) => {
                    return (
                        <div className="item_box" onClick={this.goDetails.bind(this)}>
                            <div> <img src={item.imgsrc} /></div>
                            <div className="right_box">
                                <div>
                                    <p>{item.title}</p>
                                    <p style={{ marginTop: '0.512rem', marginBottom: '0.512rem', color: '#419AF4' }}>{item.price}</p>
                                    <p>{item.place}</p>
                                </div>
                                <div className="button">在线申请</div>
                            </div>
                        </div>
                    )
                })} */}
            </div>
        )
    }
}

export default Changdi