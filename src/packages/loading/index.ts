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
import akLoading from './loading.vue'
import {prefixCls} from '../prefix'
import {AnyPropName} from '../types'
import {defineComponent, render, h, App} from 'vue'

const appendChild = (opt: AnyPropName) => {
  const vNode = h(akLoading, opt)
  const container = opt.el || document.createElement('div')
  render(vNode, container)
  if (opt.el) {
    opt.el.appendChild(container.firstElementChild)
  } else {
    document.body.appendChild(container.firstElementChild)
  }
  return vNode.component && vNode.component.proxy
}
export default defineComponent({
  loading(opt?: AnyPropName) {
    const component: any = appendChild(opt || {})
    component && component.open()
    return component
  },
  vLoading(app: App) {
    app.directive('loading', {
      mounted(el, binding) {
        el.style.position = 'relative'
        const text = el.getAttribute(`${prefixCls}-loading-text`) || ''
        const spinner = el.getAttribute(`${prefixCls}-loading-spinner`) || ''
        const background = el.getAttribute(`${prefixCls}-loading-background`) || ''
        const zIndex = el.getAttribute(`${prefixCls}-loading-zIndex`) || ''
        let bodyEl
        if (binding.modifiers.el) {// 插入到body
          bodyEl = document.body
        }
        const component: any = appendChild({
          text: text,
          spinner: spinner,
          background: background,
          lock: binding.modifiers.lock,
          zIndex: parseInt(zIndex),
          el: bodyEl || el
        })
        if (binding.value) {
          component && component.open()
        }
        el.component = component // 保存当前组件和样式，更新时调用
      },
      updated(el, binding) {
        if (binding.value) {
          el.component.open()
        } else {
          el.component.close()
        }
      }
    })
  }
})
