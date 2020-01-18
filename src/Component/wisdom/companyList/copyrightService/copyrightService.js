//园区活动--报名
import React, { Component } from "react";
import { Tabs, WhiteSpace, Button, InputItem, Picker, List, PickerView } from 'antd-mobile';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation'
import './copyrightService.less'

import interfaces from '@/api/index'

class CopyrightService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Type: 1,
      list: [],
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    interfaces.GetCopyrightServiceList({Type: this.state.Type}).then(res => {
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
    }, () => {
      this.getData()
    })
  }

  render() {
    const tabs = [
      { title: '国版', sub: '1' },
      { title: '省版', sub: '2' }
    ];
    return (
      <div className='copyright_service'>
        <Navigation title="版权服务" />
        <Tabs tabs={tabs}
          initialPage={0}
          onChange={tab => this.changeTab(tab.sub)}
        >
          <div>
            {
              this.state.list.map((item,index) => {
                return (
                  <div key={index}>
                    <WhiteSpace />
                    <div className="copyright_text">
                      <div className="text_title fontBold">{item.Title}</div>
                      <div className="text_content">
                        <p dangerouslySetInnerHTML={{__html:item.Contents}}></p>
                        <p style={{width: '100%'}} dangerouslySetInnerHTML={{__html:item.ImgUrl}}></p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          
        </Tabs>
      </div>
    )
  }
}

export default CopyrightService;

