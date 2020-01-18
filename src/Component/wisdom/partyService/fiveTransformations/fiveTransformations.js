
// 党群服务--Tab切换页
import React, { Component } from 'react'
import { Link } from 'dva/router';
import { Tabs, WhiteSpace } from 'antd-mobile';
import './fiveTransformations.less'
import Navigation from '@/util/navigation'

import branchSetting from '%/branchSetting.png';
import organizationLife from '%/organizationLife.png';
import AdministrationService from '%/AdministrationService.png';
import workingSystem from '%/workingSystem.png';
import positionConstruction from '%/positionConstruction.png';

class FiveTransformations extends Component {

  render() {
    const list = [
      { url: branchSetting, link: '/branchSetting', text: '支部设置...' }, 
      { url: organizationLife, link: '/organizationLife', text: '组织生活...' },
      { url: AdministrationService, link: '/guanli', text: '管理服务...' }, 
      { url: workingSystem, link: '/zhidu', text: '工作制度...' },
      { url: positionConstruction, link: '/zhendi', text: '阵地建设...' }
    ];
    return (
      <div className='five_transformations'>
        <Navigation title="五化支部建设" />
        <div className='qiyePage_title'>五化支部建设</div>
        <div className="contentBox clear">
          {list.map(item => (
            <Link to={{ pathname: item.link, state: { data: item } }} className="itemLink">
              <img src={item.url} style={{ width: '1rem', height: '0.91rem' }} />
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    )
  }

}

export default FiveTransformations;
