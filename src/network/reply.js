import { request } from "./request";
import qs from "qs";

export function AddComment(replyRequestInfo, content) {
  const { postId, entityType, entityId, targetId } = replyRequestInfo;
  let dataobj = {
    content,
    entityType,
    entityId,
    targetId
  };
  console.log(dataobj);
  const formData = qs.stringify(dataobj)
  const postData = { formData, $_isFormData: true }
  return request({
    method: "post",
    url: "/comment/add/"+postId,
    // withCredentials: true,
    data: postData,
  });
}
