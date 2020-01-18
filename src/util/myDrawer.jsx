import { Component, PropTypes, DefaultProps } from 'react';
import './drawer.less';
// 过渡动画时长300ms
const ANIMATION_TIME = 300;
class drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
       taskCls: 'drawer-bottom',
    }
  }
  componentDidUpdate(prevProps) {
    const { isVisible, rootEl } = this.props;
    if (isVisible != prevProps.isVisible) {
      this.changeAddPointTaskArea(isVisible);
      // 锁住根节点，在抽屉打开后抽屉外的主页面不允许上下滑动
      rootEl && (rootEl.style.height = this.props.isVisible ? document.documentElement.clientHeight + 'px' : null);
      rootEl && (rootEl.style.overflow = this.props.isVisible ? 'hidden' : null);
    }
  }

  changeAddPointTaskArea = toShow => {
    const { taskCls } = this.state;
    if (toShow) {
      // 若已是显示状态，直接返回
      if (taskCls.indexOf('drawer-open') >= 0) return;
      // 隐藏状态下先移除 display:none 显示元素
      this.taskNode && this.taskNode.classList.remove('display-none');
      // 隐藏状态下先显示元素，加一个延迟与 display-none 的效果分隔开
      setTimeout(() => {
        this.setState({
          taskCls: 'drawer-bottom drawer-open',
        }, () => {
          // 曝光自动检测需要在抽屉弹窗动效执行完后
          setTimeout(() => {
            this.props.expoCheckFunc && this.props.expoCheckFunc();
          }, ANIMATION_TIME);
        });
      }, 10);
    } else {
      // 若已是隐藏状态，直接返回
      if (taskCls.indexOf('drawer-open') < 0) return;
      // 显示状态下先执行过渡动效，再设置 display:none
      this.setState({
        taskCls: 'drawer-bottom',
      }, () => {
        // 显示到隐藏的过渡动效执行时间是0.3s
        setTimeout(() => {
          this.taskNode && this.taskNode.classList.add('display-none');
        }, ANIMATION_TIME);
      });
    }
  }

  onChange = flag => {
    this.props.onChangeVisible(flag);
  }

  onMaskClick = e => {
    if (!this.props.maskClosable) {
      return;
    }
    this.onChange(false);
  };
  render() {
    const { sidebar, sidebarStyle, closable } = this.props;
    const { taskCls } = this.state;
    const containerStyle = {
      height: (document.documentElement.clientHeight - sidebarStyle.height) + 'px',
    };

    return (
      <div className="display-none" ref={node => { this.taskNode = node; }}>
        <div className={taskCls} style={containerStyle}>
          <div className="drawer-sidebar" style={sidebarStyle}>
            {
              closable ? <div
                className="close"
                onClick={this.onChange.bind(this, false)}
              /> : null
            }
            {sidebar}
          </div>
          <div
            className="drawer-overlay"
            onClick={this.onMaskClick}
            />
        </div>
      </div>
    );
  }
}

drawer.propTypes = {
    isVisible: PropTypes.bool,
    onChangeVisible: PropTypes.func,
    closable: PropTypes.bool,
    maskClosable: PropTypes.bool,
    rootEl: PropTypes.node,
    sidebar: PropTypes.object,
    sidebarStyle: PropTypes.object,
    expoCheckFunc: PropTypes.func,
}
drawer.DefaultProps ={
  isVisible: false,
  onChangeVisible: () => {},
  closable: true,
  maskClosable: true,
  rootEl: null,
  sidebar: {},
  sidebarStyle: {},
  expoCheckFunc: () => {},
}

export default drawer;