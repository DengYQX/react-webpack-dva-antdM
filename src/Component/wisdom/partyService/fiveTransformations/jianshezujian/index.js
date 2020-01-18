import React, { Component } from "react";
import { WhiteSpace } from 'antd-mobile';
import './index.less'

/** 建设xxx的组件  接受info进行数据渲染 */
class jianshe extends Component {
  /** 初始化 */
  constructor(props) {
    super(props);
  }

  /** 组件挂载 */
  render() {
    const { info } = this.props;
    return (
      <div className='branch_setting'>
        <WhiteSpace />
        <div className="processing_title fontBold">主要目标</div>
        <div className="processing_text">
          {
            info.map((value,index)=> <p dangerouslySetInnerHTML={{__html:value.MainTargets}}></p>)
          }
        </div>
        <WhiteSpace />
        <div className="processing_title fontBold">主要任务</div>
        <div className="processing_text">
          {
            info.map((value,index)=> <p dangerouslySetInnerHTML={{__html:value.MainTasks}}></p> )
          }
        </div>
      </div>
    )
  }
}

export default jianshe;