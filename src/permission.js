import router from './router'
import {getToken} from './utils/utils'
// 配置白名单
const whiteList = ['/login', '/page1', '/signOut', '/']
router.beforeEach((to, from, next) => {
  // 设置不同的标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  let hasAcessToken = getToken()
  if (!hasAcessToken) {
    // 进入白名单控制
    if (~whiteList.indexOf(to.path)) {
      next()
    } else {
      // 如需刷新token，可在这发刷新请求
      console.log('需要退出')
      next({
        path: '/signOut',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})
router.afterEach((to, from) => {
  // NProgress.done()
  console.log(`进入页面 '${to.path}' 成功!`)
})
