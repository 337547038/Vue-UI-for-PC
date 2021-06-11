<!--Created by 337547038 on 2019.8.-->
<template>
  <div
    ref="element"
    :class="`${prefixCls}-back-top`"
    :style="{right:right+'px',bottom:bottom+'px',opacity:show?1:0,visibility:show?'visible':'hidden'}"
    @click="elClick">
    <a href="javascript:;" class="icon-top" v-text="text"></a>
  </div>
</template>
<script lang="ts">
import dom from '../util/dom'
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, ref, onMounted, nextTick, onUnmounted} from 'vue'

export default defineComponent({
  name: `${prefixCls}BackTop`,
  props: {
    text: pType.string('返回顶部'),
    height: pType.number(200),
    bottom: pType.number(30),
    right: pType.number(30)
  },
  emits: ['click'],
  setup(props, {emit}) {
    let {scrollTop} = dom()
    const show = ref(false)
    // const element = ref<HTMLInputElement>()
    const element = ref()
    const elClick = () => {
      smoothscroll()
      function smoothscroll() {
        const currentScroll = scrollTop()
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll)
          window.scrollTo(0, currentScroll - (currentScroll / 5))
        }
      }
      emit('click')
    }
    onMounted(() => {
      nextTick(() => {
        document.body.appendChild(element.value)
        window.addEventListener('scroll', windowScroll)
      })
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', windowScroll)
      if (element.value && element.value.parentNode) {
        element.value.parentNode.removeChild(element.value)
      }
    })
    const windowScroll = () => {
      show.value = scrollTop() > props.height
    }
    return {
      prefixCls,
      element,
      show,
      elClick
    }
  }
})
</script>
