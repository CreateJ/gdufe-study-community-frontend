import { request } from './request'

export function getUserInfo(userId){
  return request({
    url: "/user/profile/"+userId,
  })
}