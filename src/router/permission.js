/** 处理异步动态路由
 * 通过读取存储的菜单_menu权限和登录情况token添加路由
 * 同时为了防止伪造修改菜单，增加一个md5认证 */
import {asyncRoutes, asyncRoutesOther} from './index'
import {getStorage} from '../utils/utils'
import md5 from 'js-md5'

/**
 * 通过 meta.permission 作为是否需要从后台控制菜单的依据
 * 如果 path 存在于 menu 中, 则认为是有权限的
 *
 *  @param menu
 *  @param route
 */
function hasMenuPermission (route, menu) {
  if (route.meta && route.meta.permission && Array.isArray(menu)) {
    return menu.some(item => item.href === route.path)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRoutes
 * @param menu
 */
function filterAsyncRouter (asyncRoutes, menu) {
  const accessedRouters = asyncRoutes.filter(route => {
    if (hasMenuPermission(route, menu)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menu)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export default function addRoutes (router) {
  const menuList = getStorage('_menu', 1)
  console.log('addRoutes')
  const token = getStorage('token', 1)
  // 刷新时判断，也可放permission里页面跳转时判断
  // 这里用同样的算法，将算出来的md5和登录时的md5作比较，不相等则表示作了修改，作退出处理
  const setMd5 = md5(JSON.stringify(menuList) + token)
  const getMd5 = getStorage('md5', 1)
  if (menuList && getMd5 && setMd5 !== getMd5) {
    console.log('菜单权限异常，退出处理')
    router.push('/signOut')
    return false
  }
  if (menuList && token) {
    asyncRoutes.push.apply(asyncRoutes, asyncRoutesOther) // 这里将两个动态路由合并起来，考虑到实际情况需将路由分开写
    const addRoutesList = filterAsyncRouter(asyncRoutes, menuList)
    router.addRoutes(addRoutesList)
    console.log('addRoutes success ...', addRoutesList)
  }
}
