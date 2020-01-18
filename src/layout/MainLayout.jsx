import React, { Component, PropTypes } from 'react';
import { TabBar, ListView } from 'antd-mobile';
import Wisdom from '../Component/wisdom/';
import Mine from '../Component/mine/';
import Home from '../Component/home/';
import Circle from '../Component/Circle/';
import './MainLayout.less';
import { connect } from 'dva'
import homeOff from '%/homeOff.png';
import homeOn from '%/homeOn.png';

import myOff from '%/myOff.png';
import myOn from '%/myOn.png';

import menuOff from '%/menuOff.png';
import menuOn from '%/menuOn.png';

import msgOff from '%/msgOff.png';
import msgOn from '%/msgOn.png';

import  disWork from  '%/disWork.gif'

class TabBarBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'blueTab',
      hidden: false,
    };
  }

  render() {
    const {currentTab, changeTabs, changeWisdomTabs, changeWisdomScroll} = this.props;
    return (
      <div style={{ position: 'fixed',left: 0, right: 0, bottom: 0, top: 0 }}>
        <TabBar
          unselectedTintColor="#B5B6B6"
          tintColor="#131415"
          barTintColor="white"
          tabBarPosition="bottom"
          hidden={this.state.hidden}
          prerenderingSiblingsNumber={0}
        >
          <TabBar.Item
            title="走进园区"
            key="1"
            icon={<div style={{
              width: '0.91rem',
              height: '0.91rem',
              background: `url(${homeOff}) center center /  21px 21px no-repeat` }}
            />
            }
            selectedIcon={<div style={{
              width: '0.91rem',
              height: '0.91rem',
              background: `url(${homeOn}) center center /  21px 21px no-repeat` }}
            />
            }
            selected={currentTab === 'a1'}
            onPress={() => {
              changeTabs('a1');
              changeWisdomScroll(0);
              changeWisdomTabs(0)
            }}
            data-seed="logId"
          >
           <Home />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '0.91rem',
                height: '0.91rem',
                background: `url(${menuOff}) center center /  21px 21px no-repeat`}}
              />
            }
            selectedIcon={
              <div style={{
                width: '0.91rem',
                height: '0.91rem',
                background: `url(${menuOn}) center center /  21px 21px no-repeat` }}
              />
            }
            title="智慧创谷"
            key="2"
            selected={currentTab === 'a2'}
            onPress={() => {
              changeTabs('a2');
              changeWisdomTabs(0)
            }}
            data-seed="logId1"
          >
           <Wisdom />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '0.91rem',
                height: '0.91rem',
                background: `url(${msgOff}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '0.91rem',
                height: '0.91rem',
                background: `url(${msgOn}) center center /  21px 21px no-repeat` }}
              />
            }
            title="园圈"
            key="3"
            selected={currentTab === 'a3'}
            onPress={() => {
              changeTabs('a3');
              changeWisdomTabs(0)
              changeWisdomScroll(0);
            }}
          >
            <Circle />
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '0.91rem',
                height: '0.91rem',
                background: `url(${myOff}) center center /  21px 21px no-repeat` }}
              />
            }
            selectedIcon={
              <div style={{
                width: '0.91rem',
                height: '0.91rem',
                background: `url(${myOn}) center center /  21px 21px no-repeat` }}
              />
            }
            title="我的"
            key="my"
            selected={currentTab === 'a4'}
            onPress={() => {
              changeTabs('a4');
              changeWisdomTabs(0)
              changeWisdomScroll(0);
            }}
          >
          <Mine />

          </TabBar.Item>
        </TabBar>
      </div>
    );
  }
}

TabBarBox.propTypes = {
// Injected by React Router
  children: PropTypes.node // eslint-disable-line
};


function mapStateToProps(state, ownProps) {
  return {
    currentTab: state.home.currentTab
  }
}
function dispatchToProps(dispatch) {
  return {
    changeTabs(payload, params) {
      dispatch({
        type: 'home/changeTabs',
        payload
      })
    },
    changeWisdomScroll(payload, params) {
      dispatch({
        type: 'home/changeWisdomScroll',
        payload
      })
    },
    changeWisdomTabs(payload, params) {
      dispatch({
        type: 'home/changeWisdomTabs',
        payload
      })
    }
  }
}
export default connect(mapStateToProps, dispatchToProps)(TabBarBox);
