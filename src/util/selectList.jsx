import { Component, PropTypes } from "react";
import "@/util/selectList.less";

class selectList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultKey: 0
    };
  }
  close = e => {
    this.props.onOpenChanged();
  };
  componentDidMount() {
    setTimeout(() => {
      console.log(this.refs);
    }, 1000);
  }
  handlerSelect(key, e) {
    // console.log(key, e)
    e.stopPropagation();
    this.setState({
      defaultKey: key || 0
    });
  }
  confirm = () => {
    this.props.onOpenChanged(this.props.list[this.state.defaultKey]);
  };
  render() {
    const { isOpen, list, names, triggerOffset } = this.props;
    return isOpen ? (
      <div>
        <div onClick={this.close} className="popupModel"></div>
        <div
          className="popupContent clear"
          style={{ left: 0, top: 0 }}
          onClick={this.close}
        >
          <div className="contnetBlock">
            <div className="contnetBlockMain">
              {list.map((item, key) => (
                <div
                  className={
                    this.state.defaultKey === key
                      ? "item actions"
                      : "item default"
                  }
                  onClick={this.handlerSelect.bind(this, key)}
                  key={key}
                >
                  {item[names]}
                </div>
              ))}
              <div className="item actions" ref="contentBlock"></div>
              <div className="item actions"></div>
            </div>
            <div className="actionBts">
              <div
                className="item reset"
                onClick={this.handlerSelect.bind(this, 0)}
              >
                重置
              </div>
              <div onClick={this.confirm} className="item confirm">
                确定
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

selectList.propTypes = {
  isOpen: PropTypes.bool,
  list: PropTypes.object,
  onOpenChanged: PropTypes.func
};

export default selectList;
