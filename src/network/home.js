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


