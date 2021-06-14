<!-- Created by 337547038 on 2021.6. -->
<template>
  <div :class="{'active':visible}" class="collapse-panel">
    <div class="collapse-title" @click="slideToggle(1)">
      <slot></slot>
      <span v-if="$slots.trigger" @click="slideToggle()">
        <slot name="trigger"></slot>
      </span>
    </div>
    <collapse-transition>
      <div v-show="visible" ref="content" :class="{'active':visible}" class="collapse-content">
        <slot name="content"></slot>
      </div>
    </collapse-transition>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import CollapseTransition from '../transition/index.vue'
import {computed, onMounted, inject, defineComponent} from 'vue'
import {AnyPropName, VoidFun} from '../types'

export default defineComponent({
  name: `${prefixCls}CollapsePanel`,
  components: {CollapseTransition},
  props: {
    name: String
  },
  setup(props, {slots}) {
    const randomName = props.name || Math.random().toString(36).substr(2, 8)
    const parentProps = inject('props') as AnyPropName
    const changePanel = inject('changePanel') as VoidFun
    const visible = computed(() => {
      return parentProps.modelValue.indexOf(randomName) !== -1
    })
    const slideToggle = (type?: number) => {
      if (type === 1 && slots.trigger) {
        return
      }
      const modelValue = parentProps.modelValue
      const index = modelValue.indexOf(randomName)
      if (parentProps.accordion) {
        // 每次只能展开一个面板
        if (index !== -1) {
          modelValue.splice(index, 1)
        } else {
          modelValue.splice(index, 1, randomName)
        }
      } else {
        // 点击展开，再点关闭
        if (index !== -1) {
          modelValue.splice(index, 1)
        } else {
          modelValue.push(randomName)
        }
      }
      // 点事件
      changePanel && changePanel(visible.value)
    }
    onMounted(() => {
      // parentProps.panelName.push(randomName)
    })
    return {
      visible,
      slideToggle
    }
  }
})
</script>
