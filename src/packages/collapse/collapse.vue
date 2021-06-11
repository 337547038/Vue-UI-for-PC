<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <div :class="`${prefixCls}-collapse`">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {provide, defineComponent} from 'vue'

export default defineComponent({
  name: `${prefixCls}Collapse`,
  props: {
    value: pType.array(),
    accordion: pType.bool(),// 风琴模式
    change: pType.func(),
    transition: pType.string('collapse')// 过渡动画名
  },
  setup(props) {
    const changePanel = (v: string) => {
      props.change && props.change(v)
    }
    provide('changePanel', changePanel)
    provide('props', props)
    /*const panelName = ref([])
    provide('panelName', panelName)*/
    return {
      prefixCls
    }
  }
})
</script>
