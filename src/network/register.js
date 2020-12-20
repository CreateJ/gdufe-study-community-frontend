import { request } from "./request";
import qs from 'qs';

export function Register(data){
  const {username,password,email} = data;
  let dataobj = {
    username,
    password,
    email,
    // rememberme: true,   
  };
  const formData = qs.stringify(dataobj)
  const postData = { formData, $_isFormData: true }
  return request({
    method: "post",
    url: "/register",
    // withCredentials: true,
    data: postData,
  });
}