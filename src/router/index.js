import Vue from 'vue'
import Router from 'vue-router'

const Page1 = () => import('@/views/page1')
const Page2 = () => import('@/views/page2')
const PageNotFound = () => import('@/views/pageNotFound')
const HelloWorld = () => import('@/views/index')
const signOut = () => import('@/views/signOut')

Vue.use(Router)
console.log('router')

// 默认初始化的路由
export const defaultRouterMap = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: {
      title: 'HelloWorld'
    }
  },
  {
    path: '/signOut',
    name: 'signOut',
    component: signOut
  },
  {
    path: '/page1',
    name: 'Page1',
    component: Page1
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound
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
    component: Page2,
    meta: {
      permission: true
    }
  },
  {
    path: '/page3',
    name: 'Page3',
    component: Page2,
    meta: {
      permission: true
    }
  },
  {
    path: '/page4',
    name: 'Page4',
    component: Page2,
    meta: {
      permission: true
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]
