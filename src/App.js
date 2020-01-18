import dva from 'dva';
import createLoading from 'dva-loading';
import Models from './models/index'
import Routes from './Router'; //路由配置
import './Config/Config.js';//引入默认配置
import './util/mui.min.js';
import './util/common.js';
import './Style/common.less';
import "video-react/dist/video-react.css"; 
// import 'antd-mobile/dist/antd-mobile.min.css';
// import VConsole from 'vconsole'
//  new VConsole();

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
  // history: browserHistory,
  onError(e) {
    console.log(e.message);
    // message.error(e.message, ERROR_MSG_DURATION);
  }
});

// 2. Plugins
app.use(createLoading());
//app.use();

// 3. Model
Object.keys(Models).forEach( item => {
  //  console.log(Models[item].default);
    app.model(Models[item].default);
})
//app.model(Demo);
// Moved to router.js
// 4. Router
app.router(Routes);
// 5. Start
app.start('#root');