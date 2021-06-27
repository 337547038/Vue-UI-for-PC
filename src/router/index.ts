import {createRouter, /*createWebHistory*/ createWebHashHistory} from 'vue-router'
//import {DefineComponent} from 'vue'
import routesList from 'virtual:generated-pages'

// console.log(routesList)
const routes = []
routesList.forEach((item: any) => {
  if (item.name.indexOf('-README') !== -1) {
    routes.push({
      name: item.name.replace('-README', ''),
      path: item.path.replace('/readme', ''),
      component: item.component
    })
  }
})
routes.push(
  {
    path: '/',
    name: 'index',
    component: () => import('../packages/README.md')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  })
console.log(routes)
const router = createRouter({
  // 返回 savedPosition，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {top: 0}
    }
  },
  // history: createWebHistory(), // 路由的history模式
  history: createWebHashHistory(),
  routes
})

export default router
