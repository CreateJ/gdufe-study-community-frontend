import { request } from "./request";
// import qs from "qs";

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