import {getStorage, getToken} from './utils/utils'
// import router from './router'
// import addRoutes from '@/router/permission'
import router, {asyncRoutes, asyncRoutesOther} from './router'

console.log(router)
/* asyncRoutes这个路由表示需要匹配菜单权限，当带有permission=false表示特殊项，不需要匹配 */
function filterAsyncRouter(asyncRoutes, menuList) {
  return asyncRoutes.filter(route => {
    if (route.children) {
      route.children = filterAsyncRouter(route.children, menuList)
    }
    if (route.meta && route.meta.permission === false) {
      return true // 直接返回
    } else {
      return menuList.indexOf(route.path) !== -1
    }
  })
}

// 配置白名单
const whiteList = ['/login', '/404', '/', '/signOut']
router.beforeEach((to, from, next) => {
  // 设置不同的标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (~whiteList.indexOf(to.path)) {
    // 白名单，直接允许
    next()
    return false
  } else {
    let hasAcessToken = getToken()
    if (!hasAcessToken) {
      console.log('登录超时或者是页面确实是不存在')
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      // 已登录状态
      // 添加动态路由
      // 防止意外重复添加动态路由，判断依据检查一个动态添加的路径是否存在
      const hasPath = router.resolve({path: '*'}).route.name
      const menuList = getStorage('_menu', 1)
      const asyncRoute = filterAsyncRouter(asyncRoutes, menuList)
      // const asyncRoute = asyncRoutes
      console.log(asyncRoute)
      if (!hasPath) {
        console.log('需要添加动态路由')
        router.addRoutes(asyncRoute) // 动态
        router.addRoutes(asyncRoutesOther) // 404
        next({...to, replace: true})
      }
      next()
    }
  }
})
router.afterEach((to, from) => {
  // NProgress.done()
  console.log(`进入页面 '${to.path}' 成功!`)
})
