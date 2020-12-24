import { request } from "@/network/request";
import qs from 'qs';

export function getPostAllInfo(postId) {
  return request({
    url: "/discuss/detail/" + postId,
    method: "get"
  });
}

export function sendLike(entityType, entityId, entityUserId, postId) {
  let dataobj = {
    entityType,
    entityId,
    entityUserId,
    postId
  };
  const formData = qs.stringify(dataobj);
  const postData = { formData, $_isFormData: true };
  return request({
    url: "/like",
    method: "post",
    data : postData
  });
}

export function setTop(postId) {
  let dataobj = {postId:postId};
  const formData = qs.stringify(dataobj);
  const postData = { formData, $_isFormData: true };
  return request({
    url: "/discuss/top",
    method: "post",
    data : postData
  });
}


export function setWonderful(postId) {
  let dataobj = {postId};
  const formData = qs.stringify(dataobj);
  const postData = { formData, $_isFormData: true };
  return request({
    url: "/discuss/wonderful",
    method: "post",
    data : postData
  });
}

