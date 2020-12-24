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

// 关注某用户
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


// 取关注用户
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

// 我关注的
export function showFollowees(userId) {
  return request({
    url: "/followees/" + userId,
    method: "get"
  });
}

// 粉丝
export function showFollowers(userId) {
  return request({
    url: "/followers/" + userId,
    method: "get"
  });
}

// 查找包含某个关键字的文章
export function searchPost(keyWord) {
  return request({
    params: {
      keyword: keyWord
    },
    url: "/search",
    method: "get"
  });
}

// 查找包含某个关键字的文章
// export function searchPost(keyWord) {
//   request({
//     // params: {
//     //   keyword: keyWord
//     // },
//     url: "/search?keyWord="+keyWord,
//     method: "get"
//   });
// }


// 获取某个用户的所有文章
export function getMyDiscussPost(userId) {
  return request({
    url: "/user/myDiscussPost/" + userId,
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
