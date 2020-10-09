import axios from "axios";
import store from "../store";
axios.defaults.withCredentials = true;

export function request(config) {
  // 基本配置信息
  const instance = axios.create({
    baseURL: store.state.baseURL,
    timeout: 5000
  });

  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 请求过程的的操作在这里进行
      // 检测是否有token令牌

      // 自动书写headers
      // 注意传回来的data参数必须带有data和$_isFormDatal两项
      if (config.method == "post") {
        if (config.data && config.data.$_isFormData === false) {
          config.headers["Content-Type"] = "application/json";
          console.log(1);
          config.data = config.data.dataobj;
        } else {
          // config.headers["Content-Type"] = "multipart/form-data";
          config.data = config.data.formData;
        }
      }

      console.log(config);
      return config;
    }
    // err => {
    //   console.log("拦截器检测到错误:" + err);
    //   return Promise.reject(err);
    // }
  );

  // 响应拦截
  instance.interceptors.response.use(
    res => {
      // console.log(res);
      return res.data;
    },
    err => {
      console.log(
        "获取响应失败：真的获取不到数据啊！我哭了！\n" + "错误信息:" + err
      );
    }
  );

  return instance(config);
}
