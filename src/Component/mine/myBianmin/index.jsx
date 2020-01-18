import { Tabs } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
import Bianmin from '@/Component/wisdom/propertyServices/bianmin/';
import interfaces from '@/api/index'
class app extends React.Component {
  constructor(props){
    super(props)
    this.state={
      page1:1,
      page2:1,
      page3:1,
      list1:[],
      list2:[],
      list3:[],
      tab:0,
      isMore1: true, // 是否加载
      isMore2: true, // 是否加载
      isMore3: true, // 是否加载
      pageSize:10,
    }
  }
  componentDidMount(){
    this.getList()
  }
  getList(){
    var that=this;
    if(that.state['isMore'+(that.state.tab+1)]) {
      //states:1.未领取2.已借3.已还
      var post={
        userid:localStorage.getItem('userId'),
        states:that.state.tab+1,
        pageIndex:that.state['page'+(that.state.tab+1)],
        pageSize:this.state.pageSize,
      }
      interfaces.GetMaterialApplicationList(post).then(res=>{
        if(res && res.length > 0){
          that.setState({
            ['list'+(that.state.tab+1)]:[...that.state['list'+(that.state.tab+1)],...res],
            ['page'+(that.state.tab+1)]:this.state['page'+(that.state.tab+1)]+1,
            ['isMore'+(that.state.tab+1)]: res.length < this.state.pageSize ? false : true
          },()=>{
            this.refs['myTest'+(that.state.tab+1)].setInfo(that.state['list'+(that.state.tab+1)])
          })
        }
      })
    }
  }

  render() {
    const tabs = [
        { title: '未领取', sub:'1'},
        { title: '已借', sub: '2' },
        { title: '已还', sub: '3' },
    ];
    const { dataSource } = this.state
    return (
      <div>
        <Navigation title="便民服务申请" />
        <div className="appBox">
            <Tabs tabs={tabs}
            initialPage={0}
            onChange={(tab, index) => { this.setState({ tab:index },()=>{this.getList()})}} >
              <Bianmin type="0" ref="myTest1" getList={this.getList}/>
              <Bianmin type="1" ref="myTest2" getList={this.getList}/>
              <Bianmin type="2" ref="myTest3" getList={this.getList}/>
            </Tabs>
        </div>
      </div>
      
    )
  }
}

export default app;