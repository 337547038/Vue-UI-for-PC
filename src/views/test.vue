<template>
  <div>
    <ak-button @click="click">click{{ visible }}</ak-button>
    <ak-dialog
      v-model="visible"
      confirm="submit"
      cancel="cancel"
      :callback="callback"
      :move="true"
      title="title">
      dialog
    </ak-dialog>
  </div>
</template>
<script>
import {ref, getCurrentInstance, onMounted, onBeforeMount, inject} from 'vue'
// import {Message} from '../packages/dialog'
import Child from './child.vue'

export default {
  components: {Child},
  setup(props, {attrs}) {
    // const {ctx, proxy} = getCurrentInstance()
    // const msgbox = inject('MessageBox')
    // msgbox.msg('4',{icon:4})
    const value1 = ref(1)
    const callback = () => {
      console.log('点击手动关闭')
      // return true
      // close()
    }
    const beforeClose = () => {
      return false
    }
    const visible = ref(false)
    const click = () => {
      visible.value = true
    }

    return {
      value1,
      callback,
      visible,
      click,
      beforeClose
    }
  },
  mounted() {
    console.log('mounted')
    // this.$msg('3')
    // this.$alert()
    // this.$msg()
  }
}
</script>
