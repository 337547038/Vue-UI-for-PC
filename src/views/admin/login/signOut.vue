<!-- Created by 337547038 on 2019/11/6 0006. -->
<template>
  <div></div>
</template>

<script>
import {removeStorage, removeToken} from '@/utils/utils'
export default {
  name: 'signOut',
  data () {
    return {}
  },
  props: {},
  components: {},
  methods: {},
  computed: {},
  created () {
    // 清空登录时保存的信息
    removeStorage('id')
    removeStorage('_menu')
    removeStorage('md5')
    removeToken()
  },
  mounted () {
  }
}
</script>
