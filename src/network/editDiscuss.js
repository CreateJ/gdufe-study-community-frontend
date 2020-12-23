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