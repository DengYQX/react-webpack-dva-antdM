import { Component, PropTypes } from "react";
import { Icon } from "antd-mobile";
import "./inputs.less";
class inputElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }
  clear() {
    this.refs.input.value = "";
    this.props.changeVal("");
    this.setState({ data: "" });
  }
  render() {
    const { placeholder, changeVal, width, height } = this.props;
    return (
      <div className="inputElement" style={{ width: width, height: height }}>
        <Icon
          type="search"
          style={{ color: "#9B9B9B" }}
          className="Icons"
          size={"md"}
        />
        <input
          onChange={e => {
            changeVal(e.target.value);
            this.setState({ data: e.target.value });
          }}
          style={{ height: height }}
          autocomplete="off"
          type="text"
          placeholder={placeholder}
          ref="input"
        />
        {this.state.data !== "" ? (
          <Icon
            type="cross-circle-o"
            style={{ color: "#9B9B9B" }}
            className="Icons"
            size={"md"}
            onClick={() => {
              this.clear();
            }}
          />
        ) : null}
      </div>
    );
  }
}

inputElement.propTypes = {
  placeholder: PropTypes.string,
  changeVal: PropTypes.func //输入完默认回调值方法
};

export default inputElement;
