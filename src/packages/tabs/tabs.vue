<template>
  <div :class="`${prefixCls}-tabs`">
    <slot></slot>
    <div class="tabs-nav">
      <div
        v-for="(item,index) in children"
        :key="index"
        class="tabs-tab"
        :class="{disabled:item.disabled,active:getShow(item,index)}"
        @click="tabsClick(item,index)">
        <render-slot :slots="item.slots" :label="item.label" :type="0" />
      </div>
    </div>
    <slot name="content"></slot>
    <div v-if="showContent" class="tabs-content">
      <div v-for="(item,index) in children" v-show="getShow(item,index)" :key="index" class="tab-pane">
        <render-slot :slots="item.slots" :type="1" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import {defineComponent, provide, reactive, toRefs, renderSlot} from 'vue'
import pType from '../util/pType'
import RenderSlot from './renderSlot'

export default defineComponent({
  name: `${prefixCls}Tabs`,
  components: {RenderSlot},
  props: {
    modelValue: pType.string('tab-1'),
    beforeLeave: pType.func(true),
    showContent: pType.bool(true)// 是否显示切换内容
  },
  emits: ['change', 'update:modelValue'],
  setup(props, {emit}) {
    const state = reactive({
      children: [],
      active: props.modelValue
    })
    provide('childrenList', state.children)
    const tabsClick = (item: any, index: number) => {
      if (props.beforeLeave&&props.beforeLeave(item)) {
        // 判断阻止点击
        state.active = item.name || 'tab-' + (index + 1)
        emit('change', item, index)
        emit('update:modelValue', state.active)
      }
    }
    const getShow = (item: any, index: number) => {
      if (item.name) {
        return item.name === state.active
      } else {
        // 没有指定name时
        return state.active === 'tab-' + (index + 1)
      }
    }
    return {
      renderSlot,
      prefixCls,
      ...toRefs(state),
      tabsClick,
      getShow
    }
  }
})
</script>
