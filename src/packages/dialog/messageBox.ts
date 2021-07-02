import Dialog from './dialog.vue'
import {createApp, defineComponent} from 'vue'
import {AnyPropName} from '../types'
import {prefixCls} from '../prefix'
import {removeClass} from '../util/dom'

const dialogCom = (opt: AnyPropName) => {
  console.log(opt)
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  const app = createApp(Dialog, {
    ...opt,
    remove() {
      app.unmount()
      document.body.removeChild(mountNode)
    }
  })
  return app.mount(mountNode)
}

interface optList {
  modal?: boolean
  title?: string
  confirm?: string
}

export default defineComponent({
  dialog(opt: AnyPropName) {
    return dialogCom(opt)
  },
  alert(content: string, opt: optList) {
    return dialogCom(Object.assign({}, {
      title: opt.title || '信息',
      content: content,
      confirm: opt.confirm || '确定',
      isAlert: true,
      closeModal: false
    }, opt))
  },
  msg(content: string, opt: optList) {
    return dialogCom(Object.assign({}, {
      content: content,
      isAlert: true,
      closeModal: false,
      modal: opt && opt.modal || false
    }, opt))
  },
  clear() {
    // 添加一个简单粗暴的方法，用于清除所有alert弹窗
    const dialog = document.querySelectorAll(`.${prefixCls}-dialog-isAlert`)
    if (dialog && dialog.length > 0) {
      dialog.forEach(item => {
        document.body.removeChild(item)
        removeClass(document.body, 'lock-body')// 锁定body解锁
      })
    }
  }
})
