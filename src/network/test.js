import { request } from "./request";
import qs from "qs";
// 测试专用，使用时需封装到其他合理的文件内

export function publishDiscuss(title, content) {
  const dataobj = { title, content };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/discuss/add",
    method: "post",
    data: postData
  });
}

export function deleteDiscuss(postId) {
  const dataobj = { postId };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/discuss/delete",
    method: "post",
    data: postData
  });
}

export function setWonderful(postId) {
  const dataobj = { postId };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/discuss/wonderful",
    method: "post",
    data: postData
  });
}

export function setTop(postId) {
  const dataobj = { postId };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/discuss/top",
    method: "post",
    data: postData
  });
}


// 关注的用户
export function showFollowee(postId) {
  const dataobj = { postId };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/discuss/top",
    method: "post",
    data: postData
  });
}

// 粉丝
export function showFollower(postId) {
  const dataobj = { postId };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/follower/top",
    method: "post",
    data: postData
  });
}