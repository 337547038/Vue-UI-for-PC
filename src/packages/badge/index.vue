<!-- Created by 337547038 on $. -->
<template>
  <span :class="{[prefixCls+'-badge']:true,'dot':isDot}">
    <slot></slot>
    <sup v-html="showValue"></sup>
  </span>
</template>

<script>
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, computed} from 'vue'

export default defineComponent({
  name: `${prefixCls}Badge`,
  props: {
    value: pType.oneOfType([pType.string(), pType.number()]),
    dot: pType.bool(),
    max: pType.number()
  },
  setup(props) {
    const showValue = computed(() => {
      if (!isNaN(props.value) && props.value > props.max) {
        return props.max + '+'
      } else {
        return props.value
      }
    })
    // value有值，并dot为true时
    const isDot = computed(() => {
      return props.value && props.dot
    })
    return {
      prefixCls,
      showValue,
      isDot
    }
  }
})
</script>
