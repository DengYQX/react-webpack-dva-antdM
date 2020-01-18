import { PureComponent } from 'react';

/** 暂无数据 */
class UnInquiry extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    
    /** 组件挂载 */
    render() {
        return (
            <div style={{ textAlign:'center' }}>
                <img src={require('%/modelImg.png')} style={{ width:"7rem",height:"6rem",marginTop:'3rem' }} />
                <p style={{ fontSize:'13px',marginTop:'1rem' }}>暂无数据</p>
            </div>
        );
    }
}

export default UnInquiry;