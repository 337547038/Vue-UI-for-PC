<!-- Created by 337547038 on 2021/5/21 0021. -->
<template>
  <div :class="{[`${prefixCls}-btn-group`]: true}">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {provide, defineComponent} from 'vue'

export default defineComponent({
  name: `${prefixCls}ButtonGroup`,
  props: {
    size: pType.string(),
    round: pType.bool(),
    disabled: pType.bool(),
    width: pType.string()
  },
  emits: ['click'],
  setup(props, {emit}) {
    provide('groupConfig', props)
    provide('btnClick', (event: Element, name: string) => {
      if (!props.disabled) {
        emit('click', event, name)
      }
    })
    return {
      prefixCls
    }
  }
})
</script>
