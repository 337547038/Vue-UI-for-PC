<template>
  <div :class="`${prefixCls}-tabs`">
    <slot></slot>
<!--    <div class="tabs-nav">
      <div v-for="(item,index) in children" :key="index" class="tabs-tab">{{ item }}</div>
    </div>
    <slot name="content"></slot>
    <div class="tabs-content">
      <div class="tab-pane"></div>
    </div>-->
    <li v-for="(item,index) in children">
      <tttest :data="item"></tttest>
    </li>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import {defineComponent, provide, reactive, toRefs, renderSlot} from 'vue'
import pType from '../util/pType'
import tttest from './tttt.vue'
export default defineComponent({
  name: `${prefixCls}Tabs`,
  components:{tttest},
  props: {
    modelValue: pType.string('tab-1'),
    beforeLeave: pType.func(true),
    showContent: pType.bool(true)// 是否显示切换内容
  },
  emits: [],
  setup(props, {emit}) {
    const state = reactive({
      children: []
    })
    provide('childrenList', state.children)
    return {
      prefixCls,
      ...toRefs(state)
    }
  }
})
</script>
