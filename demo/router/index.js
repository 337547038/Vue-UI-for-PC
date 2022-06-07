import Vue from 'vue'
import Router from 'vue-router'

import routerCon from './router.con'

Vue.use(Router)

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: routerCon
  /* routes: [
    {
      path: '/button',
      name: 'button',
      component: r => require.ensure([], () => r(require('../docs/button.md')))
    },
    {
      path: '/table',
      name: 'table',
      component: r => require.ensure([], () => r(require('../docs/table.md')))
    }
  ] */
})
