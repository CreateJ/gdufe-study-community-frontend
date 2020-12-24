import { request } from './request'

export function getIndexData(){
  return request({
    url: '/index',
    method: 'get'
  })
}

export function getIndexDataNew(statu,page){
  return request({
    url: "/index",
    params: {
      orderMode: statu,
      currentPage: page
    }
  })
}

export function searchPost(keyWord) {
  return request({
    params: {
      keyword: keyWord
    },
    url: "/search",
    method: "get"
  });
}

