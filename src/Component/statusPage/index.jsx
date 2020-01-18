// 注册成功 registerOk
import React, { Component }  from 'react'
import { Button } from 'antd-mobile';
import Navigation from '@/util/navigation.jsx'
class linkPage extends Component {
    constructor(props) {
        super(props);
        const data = this.props.location.state;
        this.state={ 
            data,
        }
    }
    render(){
        return(
            <div className='registerOk'>
                <Navigation title={this.state.data.title} />

                <div className='registerOk_body'>
                    <img src={this.state.data.img} style={{width: '80%', height: "auto"}} />
                    <p>{this.state.data.text}</p>
                    
                </div>
                <div className='registerOk_foot'>
                    <Button className='registerOk_btn' onClick={this.state.data.linkFunc}>
                        {this.state.data.buttonName}
                    </Button>
                </div>

            </div>
        )
    }

}


export default linkPage;


