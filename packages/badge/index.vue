<!-- Created by 337547038 on $. -->
<template>
  <span :class="{[prefixCls+'-badge']:true,'dot':isDot}">
    <slot></slot>
    <sup v-html="showValue"></sup>
  </span>
</template>

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Badge`,
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    value: [String, Number],
    dot: Boolean,
    max: Number
  },
  methods: {},
  computed: {
    showValue() {
      // value为数字
      if (!isNaN(this.value) && this.value > this.max) {
        return this.max + '+'
      } else {
        return this.value
      }
    },
    isDot() {
      // value有值，并dot为true时
      return this.value && this.dot
    }
  },
  mounted() {
  }
}
</script>
