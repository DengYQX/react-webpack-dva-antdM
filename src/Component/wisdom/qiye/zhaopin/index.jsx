import { Link } from 'dva/router';
import gongzuo from '%/wisdom/gongzuo.png';
import Navigation from '@/util/navigation.jsx'

const list = [
    {url: gongzuo, text: '找工作', link: '/gongzuo'}
 
];

const wuyePage = () => (
    <div style={{backgroundColor: '#FFF'}}>
        <Navigation title="人才招聘" />
        <div className="tile">
            人才招聘
        </div>
        <div className="contentBox clear">
            {list.map(item => (
              <Link to={item.link} className="itemLink">
                <img src={item.url} style={{width: '1rem', height: '0.91rem'}} />
                 {item.text}
              </Link>
            ))}
        </div>
    </div>
);

export default wuyePage;