import {request} from "@/network/request";

export function getPostAllInfo(postId) {
  return request({
    url: "/discuss/detail/" + postId,
    method: "get"
  });
}
