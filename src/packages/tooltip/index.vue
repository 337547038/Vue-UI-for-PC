<!--Created by 337547038 on 2017/12/19.-->
<template>
  <slot></slot>
  <transition :name="transition">
    <div v-show="visible" ref="tooltipEl" :class="[`${prefixCls}-tooltip`,direction,className]" :style="tooltipStyle">
      <span v-if="content" v-html="content"></span>
      <slot v-else name="content"></slot>
    </div>
  </transition>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, reactive, ref, onMounted, onBeforeUnmount, toRefs, nextTick, getCurrentInstance} from 'vue'
import {getOffset, getWindow} from '../util/dom'

export default defineComponent({
  name: `${prefixCls}Tooltip`,
  props: {
    content: pType.string(),
    direction: pType.string('top-left'),
    maxWidth: pType.number(500),
    delay: pType.number(0), // 鼠标移开后延时移除时间，主要能够让鼠标移动提示文字上，单位毫秒
    always: pType.bool(false),
    appendToBody: pType.bool(true),
    transition: pType.string('fade'),
    y: pType.number(8), // 当前标签与提示语之间的距离，用于微调
    x: pType.number(0), // x轴微调
    className: pType.string()
  },
  setup(props) {
    const tooltipEl = ref()
    const state = reactive({
      clearTime: '',
      visible: false,
      tooltipStyle: {}
    })
    const el = ref()
    const instance = getCurrentInstance()
    onMounted(() => {
      nextTick(() => {
        const sel = instance&&instance.proxy&&instance.proxy.$el.nextElementSibling
        if (!sel) {
          return
        }
        // console.log(gel)
        el.value = sel
        if (props.always) {
          // 一直显示的
          state.visible = true
          setPosition()
        }
        sel.addEventListener('mouseenter', mouseEnter, false)
        sel.addEventListener('mouseleave', mouseLeave, false)
        if (props.appendToBody) {
          document.body.appendChild(tooltipEl.value)
        }
      })
    })
    onBeforeUnmount(() => {
      el.value.removeEventListener('mouseenter', mouseEnter, false)
      el.value.removeEventListener('mouseleave', mouseLeave, false)
      if (props.appendToBody && tooltipEl.value) {
        document.body.removeChild(tooltipEl.value)
      }
    })
    const translate = (px: number) => {
      // 通过transform平移标签时，如平移的单位为非偶数，会出现字体模糊，这里强制取偶
      if (parseInt(px) % 2 === 0) {
        // 偶数
        return parseInt(px)
      } else {
        return parseInt(px) + 1
      }
    }
    const setPosition = () => {
      const offset = getOffset(el.value)
      const windowWidth = getWindow().width
      const space = props.y// 当前标签与提示语之间的距离
      let style = {
        maxWidth: props.maxWidth + 'px'
      }
      const windowHeight = getWindow().height
      const bottom = windowHeight - offset.top + space + 'px'
      switch (props.direction) {
        case 'top-left':
          style.left = offset.left + props.x + 'px'
          style.bottom = bottom
          break
        case 'top':
          // 先让提示左边和当前标签中间对齐（偏移位置+标签宽的一半），再向左移50%
          style.transform = 'translateX(-50%)'
          style.left = translate(offset.left + offset.width / 2 + props.x) + 'px'
          style.bottom = bottom
          break
        case 'top-right':
          style.right = windowWidth - (offset.left + offset.width + props.x) + 'px'
          style.bottom = bottom
          break
        case 'left':
          // top先让提示语顶部跟标签中间对齐，再上移50%
          style.right = windowWidth - (offset.left - 8 + props.x) + 'px'
          style.top = translate(offset.top + offset.height / 2) + 'px'
          style.transform = 'translateY(-50%)'
          break
        case 'right':
          // top和左边一样
          style.left = offset.left + offset.width + 8 + props.x + 'px'
          style.top = translate(offset.top + offset.height / 2) + 'px'
          style.transform = 'translateY(-50%)'
          break
        case 'bottom-left':
          style.left = offset.left + props.x + 'px'
          style.top = offset.top + offset.height + space + 'px'
          break
        case 'bottom':
          style.left = translate(offset.left + offset.width / 2 + props.x) + 'px'
          style.transform = 'translateX(-50%)'
          style.top = offset.top + offset.height + space + 'px'
          break
        case 'bottom-right':
          style.right = windowWidth - (offset.left + offset.width + props.x) + 'px'
          style.top = offset.top + offset.height + space + 'px'
          break
      }
      state.tooltipStyle = style
    }
    const mouseEnter = () => {
      if (!props.always) {
        setPosition()
        window.clearTimeout(state.clearTime)
        state.visible = true
        // 提示内容上添加鼠标事件
        if (props.delay) {
          tooltipEl.value.addEventListener('mouseenter', toolTipEnter, false)
          tooltipEl.value.addEventListener('mouseleave', toolTipLeave, false)
        }
      }
    }
    const mouseLeave = () => {
      state.clearTime = window.setTimeout(() => {
        state.visible = false
      }, props.delay)
    }
    const toolTipEnter = () => {
      window.clearTimeout(state.clearTime)
    }
    const toolTipLeave = () => {
      mouseLeave()
      // 同时移除事件
      tooltipEl.value.removeEventListener('mouseenter', toolTipEnter, false)
      tooltipEl.value.removeEventListener('mouseleave', toolTipLeave, false)
    }
    return {
      prefixCls,
      ...toRefs(state),
      tooltipEl
    }
  }
})
</script>
