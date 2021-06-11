<!-- Created by 337547038 on 2021/5/21 0021. -->
<template>
  <div :class="{[`${prefixCls}-btn-group`]: true}">
    <slot></slot>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}ButtonGroup`,
  props: {},
  setup() {
    return {
      prefixCls
    }
  }
}
</script>
