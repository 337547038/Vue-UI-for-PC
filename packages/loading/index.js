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
// Loading.directive = function () {
const Loading = function () {
  Vue.directive('loading', {
    bind: function (el, binding) {
      el.style.position = 'relative'
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
      /* else {
              // 将当前标签设为relative
              // el.style.position = 'relative'
            } */
      parent.appendChild(component.$el)
      // const elCls = el.className
      if (binding.value) {
        component.open()
        // el.className = elCls + ` ${prefixCls}-loading-parent-relative`
      }
      el.component = component // 保存当前组件和样式，更新时调用
      // el.elCls = elCls
    },
    inserted: function (el, binding) {
    },
    update: function (el, binding) {
      if (binding.value) {
        el.component.open()
        // el.className = el.elCls + ` ${prefixCls}-loading-parent-relative`
      } else {
        el.component.close(false)
        // el.className = el.elCls
      }
    }
  })
}
export default Loading
