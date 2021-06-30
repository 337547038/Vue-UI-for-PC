<!-- Created by 337547038 on 2018/8/31 0031. -->
<template>
  <transition :name="animation">
    <div
      v-show="visible"
      ref="el"
      :class="`${prefixCls}-dialog-modal`"
      :style="{zIndex:zIndex,left:left,top:top}"
      @click="btnClick('modal')">
      <div
        :class="{[prefixCls+'-dialog']:true,[className]:className,[prefixCls+'-dialog-isAlert']:isAlert,'dialog-full-screen':fullScreen}"
        :style="{width:width,top:top}"
        @click.stop="">
        <a
          v-if="showClose"
          :class="`${prefixCls}-dialog-close icon-close`"
          @click="btnClick('close')">
        </a>
        <div v-if="autoClose>0" :class="`${prefixCls}-dialog-auto-close`">
          <span v-text="closeTips.replace('S',autoTime)"></span>
        </div>
        <div
          v-if="title||$slots.title"
          ref="headEl"
          :class="`${prefixCls}-dialog-header`"
          @mousedown="mouseDown">
          <template v-if="title">{{ title }}</template>
          <slot v-else name="title"></slot>
        </div>
        <div
          v-if="content||$slots.default"
          :style="scrollStyle"
          :class="{
            [prefixCls+'-dialog-alert']:isAlert,
            [prefixCls+'-dialog-content']:true}">
          <div v-if="content" :class="[prefixCls+'-dialog-text']">
            <i v-if="icon" :class="[{['icon-'+iconName]:icon}]"></i>
            <span v-html="content"></span>
          </div>
          <slot v-else></slot>
        </div>
        <slot name="footer"></slot>
        <div v-if="confirm||cancel" :class="`${prefixCls}-dialog-footer`">
          <d-button v-if="confirm" type="primary" @click="btnClick('confirm')">{{ confirm }}</d-button>
          <d-button v-if="cancel" type="cancel" @click="btnClick('cancel')">{{ cancel }}</d-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, computed, onMounted, nextTick, ref, onBeforeUnmount, watch} from 'vue'
import dButton from '../button/button.vue'
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {getOffset, scrollTop, getWindow} from '../util/dom'

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
    modal: pType.bool(true), // 是否需要遮罩层
    closeModal: pType.bool(true), // 是否可以通过点击 modal 关闭 Dialog
    lockScroll: pType.bool(false), // 是否在 Dialog 出现时将 body 滚动锁定
    className: pType.string(),
    showClose: pType.bool(true), // 是否显示关闭按钮
    confirm: pType.string(), // 确认按钮
    cancel: pType.string(), // 取消按钮
    move: pType.bool(false),// 允许拖动窗口
    autoClose: pType.number(0), // 自动关闭时间
    closeTips: pType.string('S秒后自动关闭'), // 自动关闭时提示语,大写S会被替换为具体时间
    beforeClose: pType.func(true), // 关闭前的回调
    animation: pType.string('fade'),
    isAlert: pType.bool(), // 用于区别引用形式，组件或者是插件，不需要通过外部传参。true时关闭弹窗时同时从body移除
    icon: pType.oneOfType([pType.number(), pType.string()], 0), // 主要用于this.$dialog中常见的几种提示
    fullScreen: pType.bool(false)
  },
  emits: ['callback'],
  setup(props, {emit, attrs}) {
    const el = ref()
    const headEl = ref()
    const state = reactive({
      autoTime: props.autoClose, // 自动关闭时间
      visible: props.modelValue, // 控制窗口显示隐藏
      clearTime: 0,
      isAlert: false,
      left: '',
      top: ''
    })
    watch(() => props.modelValue, (bool: boolean) => {
      state.visible = bool
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
    const scrollStyle = computed(() => {
      return {}
    })
    const open = () => {
      state.visible = true
      autoClose() // 调用自动关闭
    }
    const close = () => {
      state.visible = false
    }
    const btnClick = (type: string) => {
      if (props.autoClose) {
        clearInterval(state.clearTime)
      }
      // 点击遮罩层不允许操作时
      if (!props.closeModal && type === 'modal') {
        return false
      }
      // 点确定并且绑定了回调事件时，由确定回调关闭
      if (type === 'confirm' && attrs.onCallback) {
        emit('callback', close) // 将关闭方法传出去
        return false
      }
      if (props.beforeClose && !props.beforeClose()) {
        // beforeClose返回false时阻止关闭
        props.beforeClose(type, close)
      } else {
        close()
      }
    }
    const autoClose = () => {
      // 自动关闭
      if (props.autoClose > 0) {
        state.clearTime = window.setInterval(() => {
          if (state.autoTime > 1) {
            state.autoTime--
          } else {
            emit('callback')
            close()
          }
        }, 1000)
      }
    }
    const mouseDown = (evt: MouseEvent) => {
      if (props.move && headEl.value) {
        let flag = false
        let offSet = getOffset(headEl.value)
        let x = evt.pageX - offSet.left
        let y = evt.pageY - offSet.top
        const scrollTop = scrollTop()
        flag = true
        document.onmousemove = (evt: MouseEvent) => {
          if (flag) {
            let left = evt.pageX - x
            let top = evt.pageY - y - scrollTop
            const windowWH = getWindow()
            const dialogHeight = el.value.offsetHeight
            const dialogWidth = el.value.dialogWidth
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
          flag = false
        }
      }
    }
    onMounted(() => {
      nextTick(() => {
        if (props.appendToBody && el.value) {
          document.body.appendChild(el.value)
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
      scrollStyle,
      mouseDown,
      headEl
    }
  }
})
</script>
