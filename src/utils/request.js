import axios from 'axios'
import {getToken} from '@/utils/utils'

// import router from '@/router'

// const baseURL = window.APP_CONFIG.BASE_URL || process.env.BASE_URL
const baseURL = process.env.VUE_APP_BASE_URL

// create an axios instance
const service = axios.create({
  baseURL: baseURL, // api的base_url
  timeout: 30 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (getToken()) {
      config.headers['X-Authorization'] = getToken()
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)
// respone interceptor
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('err：' + error) // for debug
    /* if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
      console.log('错误回调', error)
      return Promise.reject(error) // reject这个错误信息
    } */
    if (error.response && error.response.status) {
      let status = error.response.status
      if (status === 401) {
        console.log('需要登出系统')
      }
    }
    return Promise.reject(error)
  }
)

export default service
