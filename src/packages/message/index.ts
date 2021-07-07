import Dialog from '../dialog/index.vue'
import {createApp, defineComponent} from 'vue'
import {AnyPropName} from '../types'
import {prefixCls} from '../prefix'
// import {removeClass} from '../util/dom'

const dialogCom = (opt: AnyPropName) => {
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  Object.assign(opt, {
    isAlert: true,
    closeModal: false,
    // modelValue: true,
    remove: () => {
      app.unmount()
      document.body.removeChild(mountNode)
    }
  })
  const app = createApp(Dialog, opt)
  const component: any = app.mount(mountNode)
  component.open() // 使用open方式打开
  return component
}

export default defineComponent({
  dialog(opt: AnyPropName) {
    return dialogCom(opt || {})
  },
  confirm(content: string, opt?: AnyPropName) {
    if (!opt) {
      opt = {}
    }
    return dialogCom(Object.assign({}, {
      title: opt.title || '信息',
      content: content,
      confirm: opt.confirm || '确定',
      cancel: '取消',
      className: 'dialog-confirm'
    }, opt))
  },
  alert(content: string, opt?: AnyPropName) {
    if (!opt) {
      opt = {}
    }
    return dialogCom(Object.assign({}, {
      title: opt.title || '信息',
      content: content,
      confirm: opt.confirm || '确定',
      className: 'dialog-alert'
    }, opt))
  },
  msg(content: string, opt?: AnyPropName) {
    if (!opt) {
      opt = {}
    }
    return dialogCom(Object.assign({}, {
      content: content,
      className: 'dialog-msg',
      showClose: false,
      autoClose: opt.autoClose || 3,
      modal: opt && opt.modal || false
    }, opt))
  },
  clear() {
    // 添加一个简单粗暴的方法，用于清除所有alert弹窗
    const dialog = document.querySelectorAll(`.${prefixCls}-dialog-isAlert`)
    if (dialog && dialog.length > 0) {
      dialog.forEach(item => {
        document.body.removeChild(item)
        // 锁定body解锁
        document.body.style.overflow = ''
        document.body.style.paddingRight = '' // 滚动条的宽，防抖动
      })
    }
  }
})
