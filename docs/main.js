// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import DemoBlock from './components/demo-block.vue'
import Component from '../packages/index'
import Lazy from '../packages/lazy'

Vue.component('demo-block', DemoBlock)
Vue.config.productionTip = false
// 全局注册组件
Vue.use(Component)
Vue.use(Lazy)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
