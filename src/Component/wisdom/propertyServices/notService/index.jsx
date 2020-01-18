import React from 'react';
import 'antd-mobile/lib/button/style/';
import './style.less';
import  Navigation from '@/util/navigation'

class notService extends React.Component {
  constructor(props) {
    super(props);
    const title = this.props.location.state ? this.props.location.state.title: '停车管理' 
    this.state = {
      defaultKey: 0,
      title
    };
  }
  render() {
    return (
      <div style={{height: '100%', overflow: 'hidden'}}>
        <Navigation  title={this.state.title} />
        <div className="normals">
          <img src="http://47.112.21.206:8090/resources/notServices.png" alt=""/>
          该功能暂未开放
        </div>
      </div>
    );
  }
};

export default notService;
