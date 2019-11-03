// import Cookies from 'js-cookie'
const TokenKey = 'token'
const TokenPrefix = '' // token 前缀
const TokenExpires = 0.5 / 24 //

// 设置 localStorage 添加对时间的控制，date单位为天
export function setStorage (key, value, date) {
  const now = new Date()
  const saveDate = date ? now.setSeconds(now.getSeconds() + date * 24 * 3600) : null
  const valueDate = JSON.stringify({
    value: value,
    time: saveDate
  })
  window.localStorage.setItem(key, valueDate)
}

// 获取 localStorage
export function getStorage (key) {
  const now = new Date()
  const local = window.localStorage.getItem(key)
  if (local) {
    const dataObj = JSON.parse(local)
    if (dataObj.time) {
      // 存在时间值，则判断是否过期
      if (now < new Date(dataObj.time)) {
        // 在当前时间后，表示没过期
        return dataObj.value
      } else {
        // 如果时间过期了，返回空值，并清空
        window.localStorage.removeItem(key)
        return null
      }
    } else {
      return dataObj.value
    }
  } else {
    return local
  }
}

// 移除 localStorage
export function removeStorage (key) {
  return window.localStorage.removeItem(key)
}

// 设置token
export function setToken (token) {
  token = TokenPrefix + token
  // setStorage(TokenKey, token, TokenExpires)
  setStorage(TokenKey, token, TokenExpires)
}

// 获取 token
export function getToken () {
  return getStorage(TokenKey)
}
