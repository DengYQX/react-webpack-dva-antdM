import React, { Component }  from 'react'
import { Button,NavBar} from 'antd-mobile';
import  './index.less';
import { hashHistory } from 'react-router'
import Navigation from '@/util/navigation';
import registerNo from '%/registerNo.png';

/** 认证未通过 */
class CertificationFailed extends Component {
    constructor(props) {
        super(props);
        const data = this.props.location.state.data;
        this.state={ 
            data
        }
    }
    returnLogin() {
        hashHistory.push(this.state.data.url)
    }
    /** 组件挂载 */
    render(){
        return(
            <div className='Certifi'>
                <Navigation title={this.state.data.title} />
                <div className='Certifi_body'>
                    <img src={registerNo}  />
                    <p>{this.state.data.text}</p>
                </div>
                <div className='Certifi_div'>拒绝原因</div>
                <div className='Certifi_yuanying'>{this.state.data.desc}</div>
                <div className='Certifi_foot'>
                    <Button  className='Certifi_btn ' onClick={this.returnLogin.bind(this)}>
                        {this.state.data.btn}
                    </Button>
                </div>

            </div>
        )
    }

}


export default CertificationFailed;


