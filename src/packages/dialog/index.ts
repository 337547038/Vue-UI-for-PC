import Dialog from './dialog.vue'
import MessageBox from './messageBox'
export {Dialog,MessageBox}

/*
const Message = {
  msg(opt: any) {
    const vnode = h(Dialog, {})
    const container = document.createElement('div')
    render(vnode, container)
    document.body.appendChild(container.firstElementChild)
    console.log('================')
  },
  alert1(opts) {
    const mountNode = document.createElement('div')
    document.body.appendChild(mountNode)
    const app = createApp(Dialog, {
      ...opts,
      remove() {
        app.unmount(mountNode)
        document.body.removeChild(mountNode)
      }
    })
    return app.mount(mountNode)
  },
  alert00() {
    /!*const div = document.createElement('div')
    document.body.appendChild(div)
    // com 为自己写的组件,  SoltChild 可以是自己的子组件 ，也可以不传
    const vm = createVNode(Dialog, {}, {
      // slots
      // default:()=>createVNode(SoltChild)
    })
    console.log(vm)
    console.log('vm')
    // vm.appContext = app._context; // 这句很关键，关联起了数据
    render(vm, div)*!/
  },
  alert() {
    const vnode = h(Dialog, {})
    const container = document.createElement('div')
    render(vnode, container)
    document.body.appendChild(container.firstElementChild)
  }
}*/
