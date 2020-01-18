import { Component, PropTypes } from 'react';
import noImg from '%/noImg.jpg'

class imgElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: '',
        imgHeight: ''
    }
  }
  loadError(e) {
    e.target.src = noImg;
  }
  componentDidMount() {
    this.setState({ imgHeight: this.props.height});
  }
  render() {
    const {url, width, height} = this.props; 
    return(
      <div className="imgElement" >
        <img onError={this.loadError} src={url || noImg} alt="" onLoad={() => {
          this.setState({ imgHeight: this.props.height});
        }} style={{width, height}} />
      </div>
    );
  }
}

imgElement.propTypes = {
    url: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string
}

export default imgElement;