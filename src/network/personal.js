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