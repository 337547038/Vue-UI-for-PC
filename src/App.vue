<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import '@/scss/index.scss'

import {getToken} from '@/utils/utils'
import addRoutes from '@/router/permission'

export default {
  name: 'App',
  created () {
    // if has logged,addRoutes
    // 防止意外重复添加动态路由，判断依据检查一个动态添加的路径是否存在
    console.log(this.$router.resolve({path: '*'}))
    const hasPath = this.$router.resolve({path: '*'}).route.name
    if (getToken() && !hasPath) {
      addRoutes(this.$router)
      console.log('App created addRoutes')
    }
  }
}
</script>
