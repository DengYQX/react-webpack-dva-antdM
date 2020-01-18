import { Component, PropTypes } from "react";
import Navigation from "@/util/navigation.jsx";

class webView extends Component {
  constructor(props) {
    super(props);
    const linkParams = this.props.location.state || {} 
    this.state = {
      defaultKey: 0,
      linkParams
    };
  }
  render() {
    const {url="", title=""} = this.state.linkParams
    console.log(this.props)
    return (
      <div style={{width: '100%', height: '100%'}}>
          <Navigation title={title} />
          <iframe frameBorder="no" width="100%" height="100%" src={url}>
          </iframe>
      </div>  
    );
  }
}

webView.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string
};

export default webView;
