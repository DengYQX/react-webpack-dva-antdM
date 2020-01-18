import './style.less'
import DownloadFlle from '@/util/download.js'
import Navigation from '@/util/navigation.jsx'
import { Link } from 'dva/router';
import { Button } from 'antd-mobile';

import interfaces from '@/api/index'

class app extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileList: [],
      info: {},
      telList: []
    }
  }

  componentDidMount() {
    interfaces.GetTraCenterUnderlineInfo({}).then(res => {
      console.log(res)
      this.setState({
        fileList: [...this.state.fileList, ...res[0].Filelist],
        info: res[0].Info,
        telList: res[0].Info.Telphone.split(',')
      })
    })
  }

  render() {
    const { fileList, info, telList } = this.state
    console.log(info)
    return (
      <div className="onlineDealBox">
        <Navigation title="线下办理" />
        <div className="contentBox">
          <div className="item fontBold">
            相关附件
          </div>
          {
            fileList.map((item,index) => {
              return (
                <div className="item" style={{ color: '#00A1E9' }} key={index}>
                  <DownloadFlle url={item.FullUrl} name={item.Name} key={item.ID} />
                  <img src={require('%/wisdom/yan.png')} />
                </div>
              )
            })
          }
          <div className="item fontBold" style={{ marginTop: '0.3rem' }}>
            上下班时间
          </div>
          <div className="content">
            <p dangerouslySetInnerHTML={{__html:info.WorkShift}}></p>
          </div>
          <div className="item fontBold" style={{ marginTop: '0.3rem' }}>
            联系电话
          </div>
          {
            telList.map((item,index) => {
              return (
                <div className="item" style={{ color: '#00A1E9' }} key={index}>
                  <a href={'tel:'+item} style={{width:'100%',display:'block'}}>{item}<img src={require('%/home/call.png')} style={{float:'right'}}/></a>
                </div>
              )
            })
          }
          <div className="item fontBold" style={{ marginTop: '0.3rem' }}>
            官网网址
          </div>
          <div className="item" style={{ color: '#00A1E9' }}>
            {info.WebSite}
          </div>
        </div>
        <Link to="/wisdom/qiye/trademark/forwardFiles" className="bottomMax" style={{ margin: '1rem auto' }}>相关文件模板</Link>
      </div>
    )
  }
}

export default app;