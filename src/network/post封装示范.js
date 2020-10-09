import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建一个AXIOS实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
  // baseURL: 'xxxx' // 线上地址
  // baseURL: 'xxxx' // 本地测试地址
  baseURL: 'http://xxxxx' // 本地测试地址
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 10000 // 请求超时
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发出请求前做点什么
    if (store.getters.token) {
      // 让每个请求携带令牌
      // “X-Token”是自定义头密钥
      // 请根据当前情况修改
      config.headers['X-Token'] = getToken()
    }
    // 这里做了统一处理，多加了$_isFormData去判断是什么样得post请求
    if (config.data && config.data.$_isFormData === false) {
      config.headers['Content-Type'] = 'application/json'
      // console.log(JSON.stringify(config.data.dataobj))
      config.data = config.data.dataobj
    } else {
      config.headers['Content-Type'] = 'multipart/form-data'
    }
    // console.log(config)
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // 用于调试
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    let res
    if (typeof (response.data) === 'string') {
      res = JSON.parse(response.data)
    } else if (typeof (response.data) === 'object') {
      res = response.data
    }
    if (res.Data.Statu_Code !== '200') {
      // 403:令牌过期；
      if (res.Data.Statu_Code === '403') {
        // 重新登录
        MessageBox.confirm(res.Data.Msg, '确认注销', {
          confirmButtonText: '重新登录',
          // cancelButtonText: '取消',
          showCancelButton: false,
          showClose: false,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else if (res.Data.Statu_Code === '401') {
        // 重新登录
        MessageBox.confirm(res.Data.Msg, '提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        Message({
          message: res.Data.Msg || 'Error',
          type: 'error',
          duration: 2 * 1000,
          offset: 100
        })
        return Promise.reject(new Error(res.message || 'Error'))
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 2 * 1000,
      offset: 100
    })
    return Promise.reject(error)
  }
)

export default service