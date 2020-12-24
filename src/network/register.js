import { request } from "./request";
import qs from "qs";

export function sendRegister(username, password, email) {
  let dataobj = {
    username,
    password,
    email
  };
  const formData = qs.stringify(dataobj);
  const postData = { formData, $_isFormData: true };
  return request({
    method: "post",
    url: "/register",
    data: postData
  });
}

export function registerConfirm(userId, code) {
  return request({
    url: "/activation/" + userId + "/" + code,
  })
}