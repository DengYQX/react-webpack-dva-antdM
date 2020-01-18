import React, { PureComponent } from 'react';
import modelImg from "%/modelImg.png";

/** */
class unData extends PureComponent {
    /**组件挂载 */
    render() {
        return (
            <div>
              <img src={modelImg} style={{ width:'8rem', height: 'auto', width: '8rem', marginTop: '3rem', marginLeft: '4rem', marginBottom: '0.8rem' }} />
              <div style={{textAlign: 'center',fontSize: '18px'}}>暂无数据</div>
            </div>
        );
    }
}
unData.defaultPros = {};
unData.propTypes = {};
export default unData;
