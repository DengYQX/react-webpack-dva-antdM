import React, { PureComponent } from 'react';
import {NavBar,Icon } from 'antd-mobile';
import ParkCircle from "./parkCircle";
import './index.less'
class circle extends PureComponent {
  render() {
    return (
      <div className="appBox">
        <NavBar 
        
            >
            园圈
        </NavBar>
        <div className="appBox_itemBox">
            <ParkCircle />
        </div>
      </div>
    )
  }
}

export default circle;