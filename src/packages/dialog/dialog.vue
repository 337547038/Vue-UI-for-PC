<!-- Created by 337547038 on 2018/8/31 0031. -->
<template>
  <transition :name="animation">
    <div
      v-show="visible"
      ref="el"
      :class="{[`${prefixCls}-dialog-modal`]:true,modal:modal,center:center}"
      :style="{zIndex:zIndex}"
      @click="btnClick('modal')">
      <div
        ref="dialogEl"
        :class="{[prefixCls+'-dialog']:true,[className]:className,[prefixCls+'-dialog-isAlert']:isAlert}"
        :style="{width:width,top:top,left:left,'transition-duration':moveFlag?'0s':''}"
        @click.stop="">
        <a
          v-if="showClose"
          :class="`${prefixCls}-dialog-close icon-close`"
          @click="btnClick('close')">
        </a>
        <div v-if="autoClose>0" :class="`${prefixCls}-dialog-auto-close`">
          <span v-html="closeTips.replace('S',autoTime)"></span>
        </div>
        <div
          v-if="title||$slots.title"
          ref="headEl"
          :class="{[`${prefixCls}-dialog-header`]:true,move:move}"
          @mousedown="mouseDown">
          <template v-if="title">{{ title }}</template>
          <slot v-else name="title"></slot>
        </div>
        <div
          v-if="content||$slots.default"
          :style="{height:height}"
          :class="{
            [prefixCls+'-dialog-alert']:isAlert,
            [prefixCls+'-dialog-content']:true}">
          <i v-if="icon" :class="[{['icon-'+iconName]:icon}]"></i>
          <div v-if="content" :class="[prefixCls+'-dialog-text']" v-html="content">
          </div>
          <slot v-else></slot>
        </div>
        <div v-if="$slots.footer" :class="`${prefixCls}-dialog-footer`">
          <slot name="footer"></slot>
        </div>
        <div v-if="confirm||cancel" :class="`${prefixCls}-dialog-footer`">
          <d-button v-if="confirm" type="primary" @click="btnClick('confirm')">{{ confirm }}</d-button>
          <d-button v-if="cancel" type="cancel" @click="btnClick('cancel')">{{ cancel }}</d-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  computed,
  onMounted,
  nextTick,
  ref,
  onBeforeUnmount,
  watch
} from 'vue'
import dButton from '../button/button.vue'
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {getOffset, scrollTop, getWindow, getScrollbarWidth} from '../util/dom'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}Dialog`,
  components: {dButton},
  props: {
    zIndex: pType.number(),
    modelValue: pType.bool(false),
    title: pType.string(), // 标题，也可通过具名 slot 传入，title优先
    content: pType.string(),
    appendToBody: pType.bool(true), // Dialog 自身是否插入至 body 元素上
    top: pType.string(), // 默认弹出时距离顶部的距离
    width: pType.string(),
    height: pType.string(),// 内容区域的高度
    center: pType.bool(false), // 垂直对齐
    modal: pType.bool(true), // 是否需要遮罩层
    closeModal: pType.bool(true), // 是否可以通过点击 modal 关闭 Dialog
    lockScroll: pType.bool(false), // 是否在 Dialog 出现时将 body 滚动锁定
    className: pType.string(),
    showClose: pType.bool(true), // 是否显示关闭按钮
    confirm: pType.string(), // 确认按钮
    cancel: pType.string(), // 取消按钮
    callback: pType.func(),
    move: pType.bool(false),// 允许拖动窗口
    autoClose: pType.number(0), // 自动关闭时间
    closeTips: pType.string('S秒后自动关闭'), // 自动关闭时提示语,大写S会被替换为具体时间
    beforeClose: pType.func(true), // 关闭前的回调
    animation: pType.string('fade'),
    isAlert: pType.bool(), // 用于区别引用形式，组件或者是插件，不需要通过外部传参。true时关闭弹窗时同时从body移除
    icon: pType.oneOfType([pType.number(), pType.string()], 0) // 主要用于this.$dialog中常见的几种提示
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const el = ref()
    const headEl = ref()
    const dialogEl = ref()
    const state = reactive<AnyPropName>({
      autoTime: props.autoClose, // 自动关闭时间
      visible: props.modelValue, // 控制窗口显示隐藏
      left: '',
      top: props.top,
      moveFlag: false,
      scrollbar: {}
    })
    let clearTime = 0
    watch(() => props.modelValue, (bool: boolean) => {
      state.visible = bool
      bool && autoClose() // 调用自动关闭
      setScrollBarLock(bool) // 锁住
    })
    const iconName = computed(() => {
      let icon = props.icon
      switch (props.icon) {
        case 1:
          icon = 'success'
          break
        case 2:
          icon = 'failure'
          break
        case 3:
          icon = 'tips'
          break
      }
      return icon
    })
    const autoClose = () => {
      // 自动关闭
      if (props.autoClose > 0) {
        state.autoTime = props.autoClose
        clearTime = window.setInterval(() => {
          if (state.autoTime > 1) {
            state.autoTime--
          } else {
            // emit('callback')
            props.callback && props.callback()
            close()
          }
        }, 1000)
      }
    }
    const open = () => {
      state.visible = true
      autoClose() // 调用自动关闭
      setScrollBarLock(true) // 锁住
    }
    const close = () => {
      state.visible = false
      if (props.autoClose) {
        window.clearInterval(clearTime)
      }
      emit('update:modelValue', false)
      setScrollBarLock(false) // 解锁
    }
    const btnClick = (type: string) => {
      // 点击遮罩层不允许操作时
      if (!props.closeModal && type === 'modal') {
        return false
      }
      // 点确定并且绑定了回调事件时，由确定回调关闭
      // 自动关闭时不处理，即时间没到也可以点确定取消直接关闭
      // console.log('props.callback')
      // console.log(props.callback)
      if (!props.autoClose && type === 'confirm' && props.callback) {
        // emit('callback', close) // 将关闭方法传出去
        props.callback(close) // 回调时使用return true关闭
        return false
      }

      if (props.beforeClose && !props.beforeClose(type, close)) {
        // beforeClose返回false时阻止关闭
        // props.beforeClose(type, close)
        return false
      } else {
        close()
      }
    }
    const mouseDown = (evt: MouseEvent) => {
      if (props.move && headEl.value) {
        state.moveFlag = false
        let offSet = getOffset(headEl.value)
        let x = evt.pageX - offSet.left
        let y = evt.pageY - offSet.top
        const scrollT = scrollTop()
        state.moveFlag = true
        document.onmousemove = (evt: MouseEvent) => {
          if (state.moveFlag) {
            let left = evt.pageX - x
            let top = evt.pageY - y - scrollT
            const windowWH = getWindow()
            const dialogHeight = dialogEl.value.offsetHeight
            const dialogWidth = dialogEl.value.offsetWidth
            if (left <= 0) {
              left = 0// 最左边
            } else if (left > windowWH.width - dialogWidth) {
              // 最右边，窗口宽－弹层宽
              left = windowWH.width - dialogWidth
            }
            if (top <= 0) {
              top = 0
            } else if (top > windowWH.height - dialogHeight) {
              top = windowWH.height - dialogHeight
            }
            state.left = left + 'px'
            state.top = top + 'px'
            // this.$el.style.transitionDuration = '0s' // 拖动时要设为0，否则拖动很慢的感觉
          }
          return false
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          state.moveFlag = false
        }
      }
    }
    const setScrollBarLock = (bool: boolean) => {
      if (props.lockScroll) {
        // 滚动body滚动
        const {hasScroll, width} = state.scrollbar
        if (hasScroll && bool) {
          // 当前页面有滚动条
          document.body.style.overflow = 'hidden'
          document.body.style.paddingRight = width + 'px' // 滚动条的宽，防抖动
        }
        if (!bool && hasScroll) {
          // 解锁
          document.body.style.overflow = ''
          document.body.style.paddingRight = '' // 滚动条的宽，防抖动
        }
      }
    }
    onMounted(() => {
      nextTick(() => {
        if (props.appendToBody && el.value) {
          document.body.appendChild(el.value)
        }
        if (props.lockScroll) {
          state.scrollbar = getScrollbarWidth(true) // 滚动条宽
        }
      })
    })
    onBeforeUnmount(() => {
      if (props.appendToBody && el.value.parentNode) {
        el.value.parentNode.removeChild(el.value)
      }
    })
    return {
      prefixCls,
      ...toRefs(state),
      iconName,
      el,
      open,
      close,
      btnClick,
      mouseDown,
      headEl,
      dialogEl
    }
  }
})
</script>
