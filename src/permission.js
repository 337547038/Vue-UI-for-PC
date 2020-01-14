import {getToken} from './utils/utils'
import router from './router'
import addRoutes from '@/router/permission'

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
      if (!hasPath) {
        console.log('需要添加动态路由')
        addRoutes(router)
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
