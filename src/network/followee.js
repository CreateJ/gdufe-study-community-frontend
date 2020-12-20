import { request } from "@/network/request";

export function showFollowee(userId) {
  return request({
    url: "/followees/" + userId,
    method: "get"
  });
}