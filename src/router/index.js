import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// console.log('router')

// 默认初始化的路由
export const defaultRouterMap = [
  {
    path: '/',
    name: 'HelloWorld',
    component: () => import('@/views/index'),
    meta: {
      title: 'HelloWorld'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404')
  },
  {
    path: '/signOut',
    name: 'signOut',
    component: () => import('@/views/admin/login/signOut')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/admin/login')
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({y: 0}),
  routes: defaultRouterMap
})
// 异步获取的路由，permission: false不用权限
export const asyncRoutes = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin/layout'),
    redirect: '/admin/main',
    meta: {
      title: '主页',
      icon: 'fa fa-home'
    },
    children: [
      {
        path: '/admin/main',
        name: 'main',
        component: () => import('@/views/admin/main'),
        meta: {
          title: '后台首页'
        }
      }
    ]
  },
  {
    path: '/admin/components',
    name: 'components',
    component: () => import('@/views/admin/layout'),
    redirect: '/admin/table',
    meta: {
      title: '组件',
      icon: 'fa fa-file-code-o'
    },
    children: [
      {
        path: '/admin/table',
        name: 'table',
        component: () => import('@/views/admin/table'),
        meta: {
          title: '表格'
        }
      },
      {
        path: '/admin/echarts',
        name: 'echarts',
        component: () => import('@/views/admin/echarts'),
        meta: {
          title: '图形图表'
        }
      }
    ]
  },
  {
    path: '/admin/userCenter',
    name: 'components',
    component: () => import('@/views/admin/layout'),
    redirect: '/admin/user',
    meta: {
      title: '用户管理',
      icon: 'fa fa-user-o'
    },
    children: [
      {
        path: '/admin/user',
        name: 'user',
        component: () => import('@/views/admin/user'),
        meta: {
          title: '用户列表'
        }
      },
      {
        path: '/admin/addUser',
        name: 'addUser',
        component: () => import('@/views/admin/user/add'),
        meta: {
          title: '新增用户',
          permission: false
        }
      },
      {
        path: '/admin/addUser2',
        name: 'addUser2',
        component: () => import('@/views/admin/user/add'),
        meta: {
          title: '新增用户2',
          permission: false
        }
      }
    ]
  }
]
export const asyncRoutesOther = [
  {
    path: '*',
    redirect: '/404'
  }
]
