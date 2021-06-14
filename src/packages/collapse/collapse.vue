<!-- Created by 337547038. -->
<template>
  <div :class="`${prefixCls}-collapse`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {provide, defineComponent, reactive} from 'vue'

export default defineComponent({
  name: `${prefixCls}Collapse`,
  props: {
    modelValue: pType.array([]),
    accordion: pType.bool()// 风琴模式
  },
  emits: ['change'],
  setup(props, {emit}) {
    const provideChangePanel = (v: boolean) => {
      /*console.log(v)
      console.log('provideChangePanel')*/
      emit('change', v)
    }
    provide('changePanel', provideChangePanel)
    provide('props', reactive({
      modelValue: props.modelValue,
      accordion: props.accordion
    }))
    return {
      prefixCls
    }
  }
})
</script>
