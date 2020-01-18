import './style.less'
import { Link } from 'dva/router';
import Navigation from '@/util/navigation.jsx'
import api from '@/api'
import { ListView } from 'antd-mobile';
import UnData from "@/Component/unData";
import {isEmpty} from "@/util/common";
import ImgElement from '@/util/imgElement'
class gonggao extends React.Component {
  constructor(props) {
    super(props)
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      list: [],
      pageIndex: 1,
      pageSize:10,
      valType:0,/**是否获取到值  0初始化  1获取到  2未获取 */
      isLoading: true,
      isMore: false
    }
  }
  componentDidMount() {
    api.GetParkNoticeList({
      Type: 3,
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize
    }).then(res => {
      const list = res || [];
      if(!isEmpty(list)){
      const sh =  document.documentElement.clientHeight || plus.screen.resolutionHeight;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(list),
        height: sh - this.refs.listV.offsetTop,
        list,
        valType:1,
        isLoading: false,
        isMore: list.length < this.state.pageSize ? false : true
      })
      }else if (this.state.valType == 0){
        this.setState({ valType: 2 });
      }
    })
  }
  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.isMore) {
      return;
    }
    api.GetParkNoticeList({
      Type: 3,
      pageIndex: this.state.pageIndex + 1,
      pageSize: this.state.pageSize
    }).then(res => {
      const list = res || [];
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows( [...this.state.list, ...list]),
        pageIndex: this.state.pageIndex + 1,
        list:  [...this.state.list, ...list],
        isLoading: false,
        isMore: list.length < this.state.pageSize ? false : true
      });
    })
  }
  render() {
    const row = (rowData, rowKey) => {
      return (
        <Link to={{pathname: '/noticeTemplate', state: {id: rowData.ID} }} className="itemBox" style={{marginTop: 0, backgroundColor: '#FFF'}}>
         
         <ImgElement url={rowData.ImageUrl} width="4.2rem" height="3.6rem" />
         <div className="infos">
           <div className="titles">{rowData.Title}</div>
           <div className="time">{rowData.PublishTime}</div>
         </div>
        
      </Link>
      )
    }
    const {valType} = this.state;
    return (
      <div>
        <Navigation title="楼宇公告" />
        <div className="appBox" ref="listV">
        {
          valType == 1 ?
          (
          <ListView
            dataSource={this.state.dataSource}
            renderRow={row}
            style={{
              height: this.state.height,
              overflow: 'auto',
            }}
            pageSize={4}
            scrollRenderAheadDistance={500}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={10}

          />
          ):(
           <UnData/>
          )
        }
        </div>
      </div>
      
    )
  }
}

export default gonggao;