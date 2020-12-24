import { request } from "./request";
import qs from "qs";

export function getUserInfo(userId) {
  return request({
    url: "/user/profile/" + userId
  });
}

export function upLoadHeader(file) {
  const dataobj = { headerImage: file };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/user/upload",
    method: "post",
    data: postData,
    //headers: {'Content-Type': 'multipart/form-data'}
  });
}

export function changePassword(oldPW, newPW, surePW) {
  const dataobj = { oldPassword: oldPW, newPassword: newPW, newPasswordConfirm: surePW };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/user/password",
    method: "post",
    data: postData,
    //headers: {'Content-Type': 'multipart/form-data'}
  });
}
