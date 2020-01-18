// 注册成功 registerOk
import React, { Component }  from 'react'
import { Button,NavBar,Icon} from 'antd-mobile';
import  'Component/register/register.less';
import { hashHistory } from 'react-router'


import registerOk from '%/registerOk.png';
import registerNo from '%/registerNo.png';


class RegisterOk extends Component {
    constructor(props) {
        super(props);
        const data = this.props.location.state.data;
        const plus = this.props.location.state.plus || false;
        this.state={ 
            data,
            plus
        }
    }
    returnLogin(){
       //img为1的时候，成功，不为1的时候返回上一个页面
        if(this.state.data.img==1){
          
            if (this.state.data.url === 'back') {
                hashHistory.go('-'+(this.state.data.delta || 1))
            } else {
                hashHistory.push(this.state.data.url)  
            }   
            
        }else{
            hashHistory.goBack()
        }
    }
    goBack =()=> {
        if (this.state.data.id) {
            hashHistory.push( { pathname: this.state.data.backUrl || '/', state: {id: this.state.data.id} } )
        } else {
            hashHistory.goBack()
        }
    }
    render(){
        return(
            <div className='registerOk'>
                <NavBar
                    mode="light"
                    icon={<Icon style={{color: '#1F1F1F'}} type="left" />}
                    onLeftClick={this.goBack}
                    rightContent={[
                        <span style={{color: '#108EE9', fontSize: '0.48rem'}} onClick={() => hashHistory.push('/')}> 返回首页 </span>
                    ]}
                >{this.state.data.img==1 && !this.state.plus?this.state.data.title.replace('成功', '')+'成功':this.state.data.title.replace('拒绝', '')}</NavBar>
    
                <div className='registerOk_body' style={{backgroundColor: this.state.plus ? '#FFF': 'none', paddingBottom: this.state.plus ? '1.4rem': '0'}}>
                    {this.state.data.img==1 && !this.state.plus ? <img src={registerOk}  />: <img src={registerNo}  />}
                    <p>{!this.state.plus ? this.state.data.text : this.state.data.title}</p>
                    {
                        this.state.data.desc && !this.state.plus ? (
                            <p style={{color: '#898989',padding: '0 12%'}}>{this.state.data.desc}</p>
                        ) : null
                    }
                </div>
                {
                    this.state.plus ? (
                     <div style={{backgroundColor: '#FFF', padding: '.64rem', marginTop: '1.4rem'}}>
                         <p style={{fontSize: '0.68rem', borderBottom: '1px solid #F7F8FA', paddingBottom: '0.4rem'}}>拒绝原因</p>
                        <div style={{color: '#333', marginTop: '0.4rem'}}>{this.state.data.desc}</div>
                     </div>
                    ) : null
                }
                <div className='registerOk_foot'>
                    <Button  className='registerOk_btn '  onClick={this.returnLogin.bind(this)}>
                     {this.state.data.img==1?this.state.data.btn:'返回'}
                    </Button>
                </div>

            </div>
        )
    }

}


export default RegisterOk;


