/*
 * 时间格式化
*/

window.formatTime = function (t) {
    let ret = '';
    let fmt = 'YYYY-MM-DD hh:mm:ss';
    const pad = (val) => {
        let data = parseInt(val, 10);
        if (data < 10) {
            data = '0' + data;
        }
        return data;
    }
    if (t) {
        const  year = new Date(t.toString()).getFullYear().toString(),
           month = (new Date(t.toString()).getMonth() + 1).toString(),
           date =  new Date(t.toString()).getDate().toString(),
           hours = new Date(t.toString()).getHours().toString(),
           minutes = new Date(t.toString()).getMinutes().toString(),
           seconds =  new Date(t.toString()).getSeconds().toString();
           ret =  `${year}-${pad(month)}-${pad(date)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }
    // let opt = {
    //     "Y+": year,        // 年
    //     "M+": month,     // 月
    //     "D+": date,            // 日
    //     "h+": hours,           // 时
    //     "m+": minutes,         // 分
    //     "s+": seconds        // 秒
    //     // 有其他格式化字符需求可以继续添加，必须转化成字符串
    // };
    // for (let k in opt) {
    //     ret = new RegExp("(" + k + ")").exec(fmt);
    //     if (ret) {
    //         fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    //     };
    // };
    return ret;
}
/**
 * unLogin [进行登陆验证,返回一个boolean值]
 * @author daiweijia
 * @param string token [判断用户是否登陆的验证]
 * @return 返回值  登陆返回true,未登陆返回false
 */
export function unLogin(token) {
    /** 当token不为空时,用户为登陆状态 */
    if(token){
        return true;
    }else{
        return false;
    }
}

/**
 * isEmpty [判断一个值是否为空]
 * @author daiweijia
 * @param string key [description]
 * @return 是否为空
 */
export function isEmpty(key) {
    const type = typeof key;
    if (type == 'undefined' || type == 'null') return true;
    if (type == 'string') {
        const res = key.replace(/(^\s*)|(\s*$)/g, '');
        if (res == '' || res == null || res == 'null' || res == undefined || res == 'undefined') { return true; }
        return false;
    }
    if (type == 'object') {
    /** 数组或者对象 */
        if (key == null) return true;
        if (Object.keys(key).length > 0) return false;
        return true;
    }
    if (type == 'boolean') return !key;
    // if (type == 'number') return !key;
    return true;
}