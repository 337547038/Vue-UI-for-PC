<template>
  <div>
    <ak-dialog v-model="visible">dialog</ak-dialog>
    <!--    <Child @click="childClick"></Child>-->
    <ak-button @click="visible=true">0</ak-button>
<!--    <p>
      <router-link to="/">123abc</router-link>
    </p>-->
  </div>
</template>
<script>
import {ref, getCurrentInstance, onMounted, onBeforeMount} from 'vue'
// import {Message} from '../packages/dialog'
import Child from './child.vue'

export default {
  components: {},
  setup(props, {attrs}) {
    // const {ctx, proxy} = getCurrentInstance()
    const value1 = ref(1)
    const callback=close=>{
      console.log('点击手动关闭')
      close()
    }
    const visible=ref(false)
    return {
      value1,
      callback,
      visible
    }
  },
  mounted() {
    console.log('mounted')
    // this.$alert('3')
    // this.$alert()
    // this.$msg()
  }
}
</script>
