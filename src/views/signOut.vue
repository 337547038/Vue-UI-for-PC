<!-- Created by 337547038 on 2018/11/2 0002. -->
<template>
  <div>退出成功</div>
</template>

<script>
import {removeStorage} from '@/utils/utils'

export default {
  name: 'signOut',
  data () {
    return {}
  },
  props: {},
  components: {},
  created () {
    // 移除登录时保存的信息
    removeStorage('token')
    removeStorage('id')
    removeStorage('_menu')
    removeStorage('md5')
  },
  methods: {},
  computed: {},
  mounted () {
  }
}
</script>
