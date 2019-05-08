// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Component from '../packages/index'
// import promise from 'es6-promise'
import store from './store'
import './permission' // 路由守卫，页面访问控制
import vPermission from './directive/permission'
import * as filters from '@/filters' // 导入所有filters
Vue.config.productionTip = false
// 全局注册基础组件
Vue.use(Component)
// promise.polyfill()
Vue.use(vPermission)
// 对 filters 全部进行全局注册
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
