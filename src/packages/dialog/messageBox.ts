import Dialog from './dialog.vue'
import {h, createApp, render, onBeforeUnmount} from 'vue'
export default {
  setup() {
    const alert = () => {
      const vnode = h(Dialog, {})
      const container = document.createElement('div')
      render(vnode, container)
      document.body.appendChild(container)
    }
    onBeforeUnmount(()=>{
      console.log('onBeforeUnmount')
    })
    return {
      alert
    }
  }
}
