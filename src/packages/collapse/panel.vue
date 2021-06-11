<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <div :class="{'active':visible}" class="collapse-panel">
    <div @click="slideToggle" class="collapse-title">
      <slot></slot>
    </div>
    <collapse-transition>
      <div ref="content" :class="{'active':visible}" v-show="visible" class="collapse-content">
        <slot name="content"></slot>
      </div>
    </collapse-transition>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import CollapseTransition from '../transition/index.vue'
import {computed, onMounted, inject, defineComponent} from 'vue'

export default defineComponent({
  name: `${prefixCls}CollapsePanel`,
  components: {CollapseTransition},
  props: {
    name: String
  },
  setup(props) {
    const randomName = props.name || Math.random().toString(36).substr(2, 8)
    const visible = computed(() => {
      // return props.active.indexOf(randomName) !== -1
    })
    const parentProps = inject('props')
    const slideToggle = () => {
      /*const index = parentProps.active.indexOf(randomName)
      if (parentProps.accordion) {
        if (index !== -1) {
          parentProps.active.splice(index, 1)
        } else {
          parentProps.active.splice(index, 1, randomName)
        }
      } else {
        // 点击展开，再点关闭
        if (index !== -1) {
          parentProps.active.splice(index, 1)
        } else {
          parentProps.active.push(randomName)
        }
      }*/

      /*const changePanel = (v: string) => {
        props.change && props.change(v)
      }*/

      let change:any = inject('changePanel')
      change && change(randomName)
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
