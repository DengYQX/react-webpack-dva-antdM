import './style.less';
import { Link } from 'dva/router';
import baoxiu from '%/wisdom/baoxiu.png';
import bianmin from '%/wisdom/bianmin.png';
import louyu from '%/wisdom/louyu.png';
import tingche from '%/wisdom/tingche.png';
import wuping from '%/wisdom/wuping.png';
import wuye from '%/wisdom/wuye.png';
import yizhan from '%/wisdom/yizhan.png';
import youcang from '%/wisdom/youcang.png';
import zhuangxiu from '%/wisdom/zhuangxiu.png';
import propertyBrief from '%/propertyBrief.png';

const list = [
    {url: baoxiu, text: '报修服务', link: '/repairService'},
    {url: bianmin, text: '便民服务', link: '/bianmin'}, 
    {url: louyu, text: '楼宇公告', link: '/gonggao'}, 
    {url: tingche, text: '停车管理', link: '/notService'},
    {url: wuping, text: '物品放行',link:'/moveThing'},  
    {url: wuye, text: '物业缴费',link:'/notService'}, 
    {url: yizhan, text: '物业驿站',link:'/wisdom/wuye/propertyStation'}, 
    {url: youcang, text: '有偿服务', link: '/paidService'},
    {url: zhuangxiu, text: '装修申请', link: '/decorationApplication'},
    {url: propertyBrief, text: '物业简介', link: '/propertyBrief'},
];

const wuyePage = () => (
    <div>
        <div className="tile fontBold">
            物业服务
        </div>
        <div className="contentBox clear">
            {list.map(item => (
              <Link to={{pathname: item.link,  state:{title: item.text}}} className="itemLink">
                <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                 {item.text}
              </Link>
            ))}
        </div>
    </div>
);

export default wuyePage;