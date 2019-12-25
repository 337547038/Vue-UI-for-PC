/**
 * Created by 337547038 on 2018/9/5 0005.
 */
/**
 * 方法一
 * <div v-loading="loading1">容器区域</div>
 *
 * 方法二
 * this.$loading({})
 * **/
import akLoading from './loading'
import Vue from 'vue'
import {prefixCls} from '../prefix'

/* const Loading = function (options) {
  let Message = Vue.extend(akLoading)
  const propsData = Object.assign({}, options)
  // propsData.visible = true
  let component = new Message({
    propsData
  }).$mount()
  document.body.appendChild(component.$el)
  component.open()
  return component
} */
let loadingComponent = ''
// Loading.directive = function () {
const Loading = function () {
  Vue.directive('loading', {
    bind: function (el, binding) {
      const text = el.getAttribute(`${prefixCls}-loading-text`) || ''
      const spinner = el.getAttribute(`${prefixCls}-loading-spinner`) || ''
      const background = el.getAttribute(`${prefixCls}-loading-background`) || ''
      let Loading = Vue.extend(akLoading)
      const propsData = {
        text: text,
        spinner: spinner,
        background: background,
        lock: binding.modifiers.lock,
        body: binding.modifiers.body || false
      }
      let component = new Loading({
        propsData
      }).$mount()
      let parent = el
      if (binding.modifiers.body) {
        // 将入至body
        parent = document.body
      }
      parent.appendChild(component.$el)
      loadingComponent = component
      if (binding.value) {
        loadingComponent.open()
        el.className = el.className + ` ${prefixCls}-loading-parent-relative`
      }
    },
    inserted: function (el, binding) {
    },
    update: function (el, binding) {
      if (binding.value) {
        loadingComponent.open()
        el.className = el.className + ` ${prefixCls}-loading-parent-relative`
      } else {
        loadingComponent.close(false)
        setTimeout(() => {
          el.className = el.className.replace(` ${prefixCls}-loading-parent-relative`, '')
        }, 1000)
      }
    }
  })
}
export default Loading
