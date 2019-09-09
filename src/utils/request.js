import axios from 'axios'
import {getToken} from '@/utils/utils'

// import router from '@/router'

// const baseURL = window.APP_CONFIG.BASE_URL || process.env.BASE_URL
const baseURL = process.env.VUE_APP_BASE_URL
/* const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '服务器已接受请求，但尚未处理',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据,的操作。',
  401: '用户没有权限（用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '服务器找不到请求的资源',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
} */

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
    console.log('err' + error) // for debug
    if (error.response && error.response.status) {
      let status = error.response.status

      if (status === 401) {
        console.log('需要登出系统')
        // 这样写貌似还是存在一些问题，返回前一页的时候有问题
        /* removeToken()
        removeRefreshToken()
        router.push('/login') */
      }
      /* if (status === 500) {
        console.log('账号在其它终端登录')
        removeToken()
        removeRefreshToken()
        // router.push('/login')
        router.push({path: '/login', query: {quit: 'other'}})
      } */
      /* let hasCustomErrorMsg = error.response.data && error.response.data.message
      // 后台自定义错误信息存在大量英文, 暂时统一处理报错信息
      if (!hasCustomErrorMsg && codeMessage[status]) {
        Message({
          message: codeMessage[status],
          type: 'error',
          duration: 5 * 1000
        })
      } */
    }
    return Promise.reject(error)
  }
)

export default service
