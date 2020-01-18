
// 党群服务--Tab切换页
import React, { Component }  from 'react'
import Navigation from '@/util/navigation'

class DangqunMap extends Component{

    render(){
        return(
            <div>
                <Navigation title="党群服务电子地图" />
                <div style={{
                        width: '100%',
                        height: '26.5rem',
                        overflow: 'scroll',
                        webkitOverflowScrolling: 'touch'
                }}>
                    <iframe src="http://techamazing.cn/ppc/index.jsp?from=singlemessage&isappinstalled=0&scene=1&clicktime=1577346822&enterid=1577346822" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>
                </div>
            </div>
        );
    }
}

export default DangqunMap;
