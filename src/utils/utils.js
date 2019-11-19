/** 设置 localStorage 添加对时间的控制，hour单位为小时
 * data=null时使用原始sessionStorage(key,value两个参数默认为session)，即关闭浏览器过期
 * data=0时，使用localStorage，即永不过期
 * data>0时添加时间控制，即指定过期时间，类似于cookies
 * */
export function setStorage (key, value, hour) {
  if (hour === 0) {
    window.localStorage.setItem(key, JSON.stringify(value))
  } else if (hour === undefined) {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } else if (hour > 0) {
    const now = new Date()
    const valueDate = JSON.stringify({
      value: value,
      time: now.setSeconds(now.getSeconds() + hour * 3600)
    })
    window.localStorage.setItem(key, valueDate)
  }
}

/** 获取 Storage
 * 一个参数key默认为sessionStorage
 * 两个参数key,any任意值为localStorage
 * */
export function getStorage (key, any) {
  if (any === undefined) {
    const val = window.sessionStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    }
    return val
  } else {
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
        return dataObj
      }
    } else {
      return local
    }
  }
}

/** 移除 Storage
 * 一个参数key默认为sessionStorage
 * 两个参数key,any任意值为localStorage
 * */
export function removeStorage (key, any) {
  if (any === undefined) {
    window.sessionStorage.removeItem(key)
  } else {
    window.localStorage.removeItem(key)
  }
}

/** 深度复制数组 */
export function deepCopy (obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return
  // 根据obj的类型判断是新建一个数组还是一个对象
  let newObj = obj instanceof Array ? [] : {}
  for (let key in obj) {
    // 遍历obj,并且判断是obj的属性才拷贝
    if (obj.hasOwnProperty(key)) {
      // 判断属性值的类型，如果是对象递归调用深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
