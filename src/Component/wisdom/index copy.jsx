import './styles.less';
import { Grid, NavBar, Icon, Tabs, WhiteSpace } from 'antd-mobile';

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const data1 = Array.from(new Array(9)).map(() => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
}));

class NavBarExample extends React.Component{
  render() {
    return (
      <NavBar
        mode="light"
        icon={<Icon type="left" color="#000"/>}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
          <Icon key="1" type="ellipsis" />,
        ]}
      >智慧创谷</NavBar>
    )
  }
}

const tabs = [
  { title: 'First Tab', key: '1' },
  { title: 'Second Tab', key: '2' },
  { title: 'Third Tab', key: '3' },
];

const TabExample = () => (
  <div>
    <Tabs tabs={tabs}
      initialPage={0}
      onChange={(tab, index) => { console.log('onChange', index, tab); }}
      onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of first tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of second tab
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        Content of third tab
      </div>
    </Tabs>
  </div>
);

const GridExample = () => (
  <div>
    <div className="sub-title">政策服务</div>
    <Grid data={data} activeStyle={false} hasLine={false} />
    
    <div className="sub-title">代办服务</div>
    <Grid data={data} activeStyle={false} hasLine={false} />

    <div className="sub-title">市场对接</div>
    <Grid data={data} activeStyle={false} hasLine={false} />
  </div>
);

class Wisdom extends React.Component {
  render() {
    return (
      <div>
        <NavBarExample />
        <GridExample />
        <WhiteSpace />
        <TabExample />
      </div>
    )
  }
}

export default Wisdom;
