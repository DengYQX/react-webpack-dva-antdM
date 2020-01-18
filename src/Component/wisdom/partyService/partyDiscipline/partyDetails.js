//个人中心-物业工作台---物品放行--只有物业人员有权限进入 
import React, { Component } from 'react'
import './partyDiscipline.less'
import Navigation from '@/util/navigation.jsx'

/** image */
import source from '%/wisdom/source.png';
import time from '%/wisdom/time.png';

class PartyDetails extends Component {
  constructor(props) {
    super(props)
    const data = this.props.location.state.data
    this.state = {
      data,
    }
  }

  /** 组件挂载 */
  render() {
    const html = this.state.data.Content;
    const {data:{Source,PublishTime,Title}} = this.state;
    return (
      <div className='party_details'>
        <Navigation title="详情" />
        <div className="details_title">
          <p className="p_title">{Title}</p>
          <div style={{ marginBottom:'10px' }}>
            {/* <p className="p_icon" style={{background: `url(${source}) center center /  21px 21px no-repeat` }}/> */}
            <img src={source} alt=""/>
            <span className="span_source">{Source}</span>
            {/* <p className="p_icon" style={{background: `url(${time}) center center /  21px 21px no-repeat` }}/> */}
            <img src={time} alt=""/>
            <span className="span_source">{PublishTime}</span>
          </div>
        </div>
        <div className="details_text">
          <p dangerouslySetInnerHTML={{__html:html}}></p>
        </div>
      </div>
    )
  }
}

export default PartyDetails;