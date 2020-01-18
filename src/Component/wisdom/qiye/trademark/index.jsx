import { Tabs } from 'antd-mobile';
import './style.less'
import { Link } from 'dva/router';
import Navigation from '@/util/navigation.jsx'
import { Button } from 'antd-mobile';

import interfaces from '@/api/index'

class app extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Type: 1,
      list: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    interfaces.GetTrademarkCenterList({Type: this.state.Type}).then(res=>{
      console.log(res)
      this.setState({
        list: res == null ? [] : [...this.state.list, ...res]
      })
    }) 
  }

  changeTab(index) {
    this.setState({
      Type: index,
      list: []
    }, ()=>{
      this.getData()
    })
  }

  render() {
    const tabs = [
      { title: '职能职责', sub: '1' },
      { title: '注册流程', sub: '2' },
      { title: '申请材料', sub: '3' },
    ];
    return (
      <div className="appBox">
        <Navigation title="商标中心" />
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={tab => { this.changeTab(tab.sub) }}
        >
          <div className="blocks">
            {
              this.state.list.map((item,index) => {
                return (
                  <div className="blockBox" key={index}>
                    <div className="titles fontBold">{item.Title}</div>
                    <div className="content">
                      <p dangerouslySetInnerHTML={{__html:item.Contents}}></p>
                    </div>
                  </div>
                )
              })
            }
            <div className='campusInfor_foot' style={{ bottom: 80 }}>
              <Link to="/wisdom/qiye/trademark/onlineDeal" className='campusInfor_btn_helf'>线上办理</Link>
              <Link to="/wisdom/qiye/trademark/offlineDeal" className='campusInfor_btn_helf' style={{ background: 'none', backgroundColor: '#B5B6B6', color: '#FFF' }}>线下办理</Link>
            </div>
          </div>
        </Tabs>
      </div>
    )
  }
}

export default app;