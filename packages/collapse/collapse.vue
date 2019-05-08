<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <div :class="cls">
    <slot></slot>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Collapse`,
  data () {
    return {
      active: [this.value], // 展开的name值
      panelName: [] // 面板name的值
    }
  },
  props: {
    value: String,
    accordion: {// 风琴模式
      type: Boolean,
      default: false
    },
    change: Function,
    transition: {
      // 过渡动画名
      type: String,
      default: 'collapse'
    }
  },
  components: {},
  methods: {
    _change (v) {
      this.change && this.change(v)
    }
  },
  computed: {
    cls () {
      return `${prefixCls}-collapse`
    }
  },
  mounted () {
  }
}
</script>
