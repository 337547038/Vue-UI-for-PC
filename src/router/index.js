import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
console.log('router')

// 默认初始化的路由
export const defaultRouterMap = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('@/views/Index'),
    meta: {
      title: 'HelloWorld'
    }
  },
  {
    path: '/signOut',
    name: 'signOut',
    component: () => import('@/views/SignOut')
  },
  {
    path: '/page1',
    name: 'Page1',
    component: import('@/views/Page1')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/PageNotFound')
  }
]

export default new Router({
  routes: defaultRouterMap
})
// 异步获取的路由
export const asyncRoutes = [
  {
    path: '/page2',
    name: 'Page2',
    component: () => import('@/views/Page2'),
    meta: {
      permission: true
    }
  },
  {
    path: '/page3',
    name: 'Page3',
    component: () => import('@/views/Page2'),
    meta: {
      permission: true
    }
  },
  {
    path: '/page4',
    name: 'Page4',
    component: () => import('@/views/Page2'),
    meta: {
      permission: true
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]
