import './style.less'
import { hashHistory, Link } from 'react-router';
import { List, ListView, Tabs, WhiteSpace } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import api from '@/api'
import UnData from "@/Component/unData";

class bianmin extends React.Component {
  constructor(props) {
    super(props)
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      list: [],
      pageIndex: 1,
      pageSize:10,
      isLoading: true,
      isMore: false
    }
  }
  componentDidMount() {
    console.log(this.props.type, 'aa')
    if (!this.props.type) { //从物业服务里面进来
      api.GetMaterialList({
        pageIndex: this.state.pageIndex,
        pageSize: this.state.pageSize
      }).then(res => {
        const list = res || [];
        this.setState({
          list,
          isLoading: false,
          isMore: list.length < this.state.pageSize ? true : false
        });
      })
    }else {
      //从我的服务服务申请进来
    }
  }
  //点击申请
  apply = (item) => {
    hashHistory.push({pathname:`/bianmin/apply`,state:{data:item}});
  }
  setInfo=(val)=>{
    this.setState({
      list:val
    },()=>{
      console.log('zi',this.state.list)
    })
  }
 
  onEndReached = () => {
    if (!this.props.type) {
      if (this.state.isLoading || !this.state.isMore) {
        return;
      }
      api.GetMaterialList({
        pageIndex: this.state.pageIndex + 1,
        pageSize: this.state.pageSize
      }).then(res => {
        const list = res || [];
        this.setState({
          list: [...this.state.list, ...list],
          isLoading: false,
          pageIndex: this.state.pageIndex + 1,
          isMore: list.length < this.state.pageSize ? true : false
        });
      })

    }else {
      this.props.getList()
    }
  }

  renderRow(item) {
    
    const options = !this.props.type ? (<div className="options">
      {
        item.States == 0 && item.IsOnLine ?
        <div>
          <div className="apply" onClick={this.apply.bind(this,item)}>在线申请</div>
        </div> : 
        item.States == 1 ?
        <p style={{color: '#999', width: '3.4rem', textAlign: 'center', fontSize: '0.62rem'}}>已借出</p> : <div>
        <div className="apply" style={{background: '#b5b5b5'}} >不可申请</div>
      </div>
      }
    </div>) : null
    return (
      <div className="bianmin" style={{ marginTop: 0, paddingRight: '0.56rem'}}>
        <div className="content">
          <img src={ item.ImgUrl?item.ImgUrl :require('%/noImg.jpg')} alt="" />
          <div className="infos">
            <div className="titles">{item.GoodsName}</div>
            <div className="desc">{item.Address}</div>
            {
              this.props.type ? <div className="desc" style={{ marginTop: "0.3rem" }}>申请时间：{item.dCreateTime}</div> : null
            }
          </div>
        </div>
        {options}
      </div>
    )
  }

  render() {
    const { dataSource, pageSize } = this.state
    return (
      <div>
        {
          !this.props.type ? <Navigation title="便民服务" /> : null
        }
       
        {this.state.list.length < 1 ?  <UnData /> :  
         <div className="appBox" style={{ backgroundColor: "#FFF" }}>
            <ListView
              dataSource={dataSource.cloneWithRows(this.state.list)}
              style={{ height: '100%', overflow: 'auto' }}
              pageSize={pageSize}
              renderRow={(item) => this.renderRow(item)}
              onEndReached={this.onEndReached}
            />
          </div>
        }
      </div>
    )
  }
}

export default bianmin;