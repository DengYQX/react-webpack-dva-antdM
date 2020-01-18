import React, { Component, PropTypes } from 'react';
import { connect } from 'dva'
import { Tabs, WhiteSpace,Icon} from 'antd-mobile';
import './styles.less'
import WuyePage from './wuye/'
import Qiye from './qiye/'
import Dangqun  from  './dangqun/' 

const tabs = [
  { title: '企业服务', sub: '1' },
  { title: '物业服务', sub: '2' },
  { title: '党群服务', sub: '3' },
];
class wisdom extends React.Component {
  render() {
    const {currentWisdomTab, changeWisdomTabs, children} = this.props;
    return (
      <div className="appBox" ref="wisdomBox" >
        <Tabs tabs={tabs}
          initialPage={currentWisdomTab}
          page={currentWisdomTab}
          onChange={(tab, index) => { changeWisdomTabs(index) }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className="appBox_itemBox">
            <Qiye />
          </div>
          <div className="appBox_itemBox">
            <WuyePage />
          </div>
          <div className="appBox_itemBox">
            <Dangqun  />
          </div>
        </Tabs>
    
      </div>
    )
  }
}

wisdom.propTypes = {
  // Injected by React Router
  children: PropTypes.node // eslint-disable-line
};

function mapStateToProps(state, ownProps) {
  return {
    currentWisdomTab: state.home.currentWisdomTab,
    currentWisdomScroll: state.home.currentWisdomScroll
  }
}
function dispatchToProps(dispatch) {
  return {
    changeWisdomTabs(payload, params) {
      dispatch({
        type: 'home/changeWisdomTabs',
        payload
      })
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(wisdom);