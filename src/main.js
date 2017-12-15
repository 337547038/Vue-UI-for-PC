// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import plugin from '../src/components/plugins'
for(let i in plugin){
  Vue.use(plugin[i].default);
}
/*注册个公共头部*/
import Header from '../src/pages/commHead.vue'
Vue.component('comHeader', Header);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
