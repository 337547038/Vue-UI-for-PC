<!-- Created by 337547038 on 2018/9/5 0005. -->
<template>
  <transition :name="`${prefixCls}-loading-fade`">
    <div
      v-show="visible"
      :style="{ backgroundColor: background || '','z-index':zIndex }"
      :class="{[prefixCls+'-loading-full']:!el,[prefixCls+'-loading']:true}">
      <div :class="`${prefixCls}-loading-spinner`">
        <i v-if="spinner" :class="[spinner,[prefixCls+'-icon-rotate']]"></i>
        <svg v-else viewBox="0 0 50 50" class="loading-svg">
          <circle class="svg-path" cx="25" cy="25" r="20" fill="none" />
        </svg>
        <p v-if="text" :class="`${prefixCls}-loading-text`">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {reactive, toRefs, onMounted, nextTick, onBeforeUnmount, defineComponent} from 'vue'
import {getScrollbarWidth} from '../util/dom'

export default defineComponent({
  name: `${prefixCls}Loading`,
  props: {
    text: pType.string(), // 显示在加载图标下方的加载文案
    background: pType.string(), // 遮罩背景色
    spinner: pType.string(), // 自定义加载图标类名
    lock: pType.bool(),
    el: pType.object(),
    zIndex: pType.number()
  },
  setup(props) {
    const state = reactive({
      visible: false,
      scrollbarWidth: 17
    })
    onMounted(() => {
      nextTick(() => {
        state.scrollbarWidth = getScrollbarWidth() as number
      })
    })
    /*    onBeforeUnmount(() => {

    })*/
    const open = () => {
      console.log('open')
      state.visible = true
      if (props.lock) {
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = state.scrollbarWidth + 'px'
      }
    }
    const close = () => {
      // remove false通过指令引用，这时不能移除
      state.visible = false
      if (props.lock) {
        // 解锁
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }
    }
    return {
      prefixCls,
      ...toRefs(state),
      open,
      close
    }
  }
  /*unmounted() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },*/
})
</script>
