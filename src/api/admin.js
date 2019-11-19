import request from '@/utils/request'

// 用户登录
export function logIn (data) {
  return request({
    url: '/static/mock/login.json',
    method: 'GET',
    data
  })
}

export function getTable (data) {
  return request({
    url: '/static/mock/table.json',
    method: 'GET',
    data
  })
}
