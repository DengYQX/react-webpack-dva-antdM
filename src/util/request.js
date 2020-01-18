import { Toast } from "antd-mobile";
import Fly from "flyio";
import { hashHistory } from "react-router";
const request = Fly;

let requestNum = 0;
setTimeout(() => {
  requestNum = 0;
  Toast.hide();
}, 30000);
const errorPrompt = err => {
  Toast.offline(err || "接口请求错误", 2);
};
request.config.timeout = 30000;
request.config.mode = "cors";
request.interceptors.request.use(config => {
  requestNum += 1;
  Toast.loading("加载中...", 30);
  config.headers["Content-Type"] = "application/json;charset=UTF-8";
  if (localStorage.getItem("token")) {
    config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  }
  config.timeout = 30000;
  if (config.body && config.body.contentType === "from") {
    config.headers["Content-Type"] = "application/x-www-form-urlencoded";
  }
  const data = config.body;
  if (data && data.contentType) {
    delete data.contentType;
  }
  config.body = data;
  return config;
});

request.interceptors.response.use(
  (response, promise) => {
    const code = parseInt(response.data.StatusCode, 10);
    const url = response.request.url;
    const reg = /IsHasApply|IsApplyed|IsHasDelivery/ig;
    if (code !== 200 && !reg.test(url)) {
      const msg = response.data.Message
        ? response.data.Message
        : response.data.Info;
      errorPrompt(msg);
      return promise.reject(msg);
    }
    let data = promise.resolve(response.data.Detiel || response.data.Info);
    if (reg.test(url) && code === 200) {
      data = true
    }
    requestNum -= 1;
    if (requestNum < 1) {
      requestNum = 0
      Toast.hide();
    }
    Toast.hide();
    return data;
  },
  (err, promise) => {
    requestNum -= 1;
    if (err.status === 401) {
      hashHistory.push("/login");
    } else {
      errorPrompt(err.message);
    }
    return promise.reject(err.message);
  }
);

export default request;
