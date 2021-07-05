<template>
  <div>
    <div id="a"></div>
    <ak-button v-loading.el.lock="loading" type="primary" @click="openFullScreen">加载</ak-button>
    <ak-button type="primary" @click="openFullScreen2">服务方式</ak-button>
  </div>
</template>
<script>
import {ref, inject} from 'vue'

export default {
  setup() {
    const loading = ref(false)
    const openFullScreen = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3000)
    }
    const Loading = inject('Loading')
    const openFullScreen2 = () => {
      const loading = Loading.loading()
      setTimeout(() => {
        loading.close()
      }, 3000)
    }
    return {
      loading,
      openFullScreen,
      openFullScreen2
    }
  },
  mounted(){
  }
}
</script>
