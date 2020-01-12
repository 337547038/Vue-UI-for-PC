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
// 需要刷新token时
/* // 存储请求的数组
let subscribesArr = []

// 请求push到数组中
function subscribesArrRefresh(cb) {
  subscribesArr.push(cb)
}

// 用新token发起请求
function reloadSubscribesArr(newToken) {
  subscribesArr.map(cb => cb(newToken))
}
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = getToken()
    const tempToken = getCookies('tempToken')
    const refreshToken = getToken(true)
    if (!token && tempToken && refreshToken) {
      console.log('需要换token')
      axios.get(baseURL + '/api/auth/token', {
        headers: {
          'X-Authorization': refreshToken
        }
      })
        .then(res => {
          console.log(res)
          const result = res.data
          if (result) {
            console.log('换取token成功')
            setToken(result.token)
            setToken(result.refreshToken, true)
            setCookies('tempToken', result.token, 0.5 / 24)// 更新本地过期时间
            reloadSubscribesArr('Bearer_' + result.token)
          } else {
            console.log('换取token失败')
            return config
          }
        })
        .catch(res => {
          console.log('换取token异常catch')
          return config
        })
      return new Promise((resolve, reject) => {
        subscribesArrRefresh((newToken) => {
          config.headers['X-Authorization'] = newToken
          resolve(config)
        })
      })
    } else {
      if (token) {
        config.headers['X-Authorization'] = token
      }
      return config
    }
  },
  error => {
    Promise.reject(error)
  }
) *//* // 存储请求的数组
let subscribesArr = []

// 请求push到数组中
function subscribesArrRefresh(cb) {
  subscribesArr.push(cb)
}

// 用新token发起请求
function reloadSubscribesArr(newToken) {
  subscribesArr.map(cb => cb(newToken))
}
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = getToken()
    const tempToken = getCookies('tempToken')
    const refreshToken = getToken(true)
    if (!token && tempToken && refreshToken) {
      console.log('需要换token')
      axios.get(baseURL + '/api/auth/token', {
        headers: {
          'X-Authorization': refreshToken
        }
      })
        .then(res => {
          console.log(res)
          const result = res.data
          if (result) {
            console.log('换取token成功')
            setToken(result.token)
            setToken(result.refreshToken, true)
            setCookies('tempToken', result.token, 0.5 / 24)// 更新本地过期时间
            reloadSubscribesArr('Bearer_' + result.token)
          } else {
            console.log('换取token失败')
            return config
          }
        })
        .catch(res => {
          console.log('换取token异常catch')
          return config
        })
      return new Promise((resolve, reject) => {
        subscribesArrRefresh((newToken) => {
          config.headers['X-Authorization'] = newToken
          resolve(config)
        })
      })
    } else {
      if (token) {
        config.headers['X-Authorization'] = token
      }
      return config
    }
  },
  error => {
    Promise.reject(error)
  }
) */
// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    const token = getToken()
    if (token) {
      config.headers['X-Authorization'] = token
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
