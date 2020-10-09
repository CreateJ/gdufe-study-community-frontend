import { request } from "./request";
import qs from 'qs';

export function checkLoginData(data) {
  const {username,password,code} = data;
  let dataobj = {
    username,
    password,
    code,
    // rememberme: true,   
  };
  const formData = qs.stringify(dataobj)
  const postData = { formData, $_isFormData: true }
  return request({
    method: "post",
    url: "/login",
    // withCredentials: true,
    data: postData,
  });
}
























export function getKaptcha() {
  return request({
    url: "/kaptcha?",
    params: {
      p: Math.random()
    }
  });
}
