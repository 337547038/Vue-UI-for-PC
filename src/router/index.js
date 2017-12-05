import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import layer from '@/pages/layer'
import test from '@/pages/test'
import dialog from '@/pages/dialog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/layer',
      name: 'layer',
      component: layer
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: dialog
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
