<template>
  <div>
    111111
    <router-link to="/test">123abc</router-link>
    <ak-button @click="click">click</ak-button>
  </div>
</template>
<script>
import {createApp} from 'vue'
import {defineComponent, h, createVNode, onBeforeUnmount, onUnmounted} from 'vue'
import HelloWorld from './child.vue'

export default {
  setup() {
    const msg = messageBox.alert({animation: 'abc'})
    console.log(msg)
    const click = () => {
      msg.remove()
    }
    return {
      click
    }
  }
}
/*const App = defineComponent({
  setup(){
    onBeforeUnmount(()=>{
      console.log('aa')
    })
    onUnmounted(()=>{
      console.log('bbb')
    })
  },
  render() {
    return h('div', {id: 'app'}, [
      h('img', {src: 'img'}),
      h(HelloWorld, {msg: 'HelloWorld'})
    ]
    )
  }
})
const div = document.createElement('div')
document.body.appendChild(div)
createApp(App).mount(div)*/
</script>
