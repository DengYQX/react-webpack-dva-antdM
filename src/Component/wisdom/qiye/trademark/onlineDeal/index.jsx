import './style.less'
import Navigation from '@/util/navigation.jsx'
import { Player, BigPlayButton } from 'video-react';

import interfaces from '@/api/index'

class app extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      autoPlay: false,
      info: {}
    }
  }

  /** 组件挂载之后 */
  componentDidMount() {
    interfaces.GetTraCenterOnlineList({}).then(res => {
      console.log(res)
      this.setState({
        info: res,
        autoPlay: true
      })
    })
  }

  /** 跳转按钮 */
  jumpWebSite=(webSite)=>{
    console.log(webSite);
    window.location.href(webSite);
  }

  /** 组件挂载 */
  render() {
    const { info } = this.state
    return (
      <div className="onlineDealBox">
        <Navigation title="线上办理" />
        <div className="contentBox">
          <div className="item fontBold">
            视频教学
          </div>
          <Player
           fluid
           style={{width: '100%', height: 240}}
           width='100%'
           height='240'
           playsInline
           autoPlay={this.state.autoPlay}
           src={info.VideoURL}
         >
         <BigPlayButton position="center" /> 
         </Player>
          <div className="item fontBold" style={{ marginTop: '0.3rem' }}>
            联系电话
          </div>
          <div className="item" style={{ color: '#00A1E9' }}>
            <a href={'tel:'+info.Telphone} style={{display: 'flex', width: '100%', justifyContent: 'space-between',height:'18px'}}>
              {info.Telphone}
              <img src={require('%/home/call.png')} />
            </a>
          </div>
          <div className="item fontBold" style={{ marginTop: '0.3rem' }}>
            官网网址
          </div>
          <div className="item" style={{ color: '#00A1E9' }} onClick={this.jumpWebSite.bind(this,info.WebSite)}>
            {info.WebSite}
          </div>
        </div>
      </div>
    )
  }
}

export default app;