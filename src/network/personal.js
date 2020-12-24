import { request } from "@/network/request";
import qs from "qs";
export function showFollowee(postId) {
  const dataobj = { postId };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/followees/" + postId,
    method: "get",
    data: postData
  });
}
export function showFollower(postId) {
  const dataobj = { postId };
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/followers/" + postId,
    method: "get",
    data: postData
  });
}

export function getMyDiscussPost(userId) {
  return request({
    url: "/user/myDiscussPost/" + userId,
    method: "get"
  });
}

export function getProfile(userId) {
  return request({
    url: "/user/profile/" + userId,
    method: "get"
  });
}


// 获取某个用户的评论过的所有文章
export function getMyReplyPost(userId) {
  return request({
    url: "/user/replyPost/" + userId,
    method: "get"
  });
}

export function followUser(type, userId) {
  const dataobj = { entityType: type, entityId: userId};
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/follow",
    method: "post",
    data: postData
  });
}

export function unFollowUser(type, userId) {
  const dataobj = { entityType: type, entityId: userId};
  const formData = qs.stringify(dataobj);
  const postData = { formData, is_isFormData: true };
  return request({
    url: "/unfollow",
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

