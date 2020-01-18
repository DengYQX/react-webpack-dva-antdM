import React, { Component, PropTypes } from 'react'
import TabBarBox from '../layout/MainLayout'
import share from '@/util/share.js'
import { connect } from 'dva';

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    // 开启分享服务
     if (navigator.userAgent.indexOf("Html5Plus") > 0) {
       share.getShareSerivces();
     }
  }
 
  render() {
    const { location } = this.props;
    return (
      <TabBarBox location={location} />
    )
  }
}

App.propTypes = {
    // Injected by React Router
  children: PropTypes.node // eslint-disable-line
}
export default App
