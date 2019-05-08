import Vue from 'vue'
import vuex from 'vuex'
import getters from './getters'
import app from './modules/app'

Vue.use(vuex)
export default new vuex.Store({
  getters,
  modules: {
    app
  }
})
