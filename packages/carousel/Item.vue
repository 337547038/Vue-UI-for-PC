<!-- Created by 337547038 on 0005. -->
<!--<template>
  <div></div>
</template>-->

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}CarouselItem`,
  data () {
    return {}
  },
  props: {},
  components: {},
  methods: {},
  computed: {},
  mounted () {
    this.$parent.itemList.push(this)
  },
  render () {
    return null
  }
}
</script>
