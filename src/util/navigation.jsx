import { Component, PropTypes } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { hashHistory } from 'react-router'
class navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: ''
    }
  }
  goBack =()=> {
    hashHistory.goBack()
  }
  render() {
    return(
      <div>
        <NavBar
            mode="light"
            icon={<Icon style={{color: '#1F1F1F'}} type="left" />}
            >
           
        </NavBar>
        <div className="topNavigation" style={this.props.isGoBack? {position: 'absolute'}: null } >
          {!this.props.isGoBack ? (
            <NavBar
                mode="light"
                icon={<Icon style={{color: '#1F1F1F'}} type="left" />}
                onLeftClick={this.goBack}
                >
               <span className="fontBold"> {this.props.title}</span>
            </NavBar>
          ) : (
            <NavBar style={{backgroundColor: '#fff', color: '#333'}}>
              <span className="fontBold"> {this.props.title}</span>
            </NavBar>
          )}
          
          </div>
      </div>
    );
  }
}

navigation.propTypes = {
    title: PropTypes.string
}

export default navigation;