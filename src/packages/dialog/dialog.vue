<!-- Created by 337547038 on 2018/8/31 0031. -->
<template>
  <transition :name="animation">
    <div
      v-show="visible"
      ref="el"
      :class="`${prefixCls}-dialog-modal`"
      :style="{zIndex:zIndex}"
      @click="btnClick('modal')">
      <div
        :class="{[prefixCls+'-dialog']:true,[className]:className,[prefixCls+'-dialog-isAlert']:isAlert,'dialog-full-screen':fullScreen}"
        @click.stop="">
        <a
          v-if="showClose"
          :class="`${prefixCls}-dialog-close icon-close`"
          @click="btnClick('close')">
        </a>
        <div v-if="autoClose>0" :class="`${prefixCls}-dialog-auto-close`">
          <span v-text="autoTime"></span>秒后自动关闭
        </div>
        <div
          v-if="title||$slots.title"
          ref="head"
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

export default defineComponent({
  name: `${prefixCls}Dialog`,
  components: {dButton},
  props: {
    zIndex: pType.number(),
    modelValue: pType.bool(false),
    title: pType.string(), // 标题，也可通过具名 slot 传入，title优先
    content: pType.string(),
    appendToBody: pType.bool(true), // Dialog 自身是否插入至 body 元素上
    width: pType.string(),
    height: pType.string(),// 内容区域的高度
    modal: pType.bool(true), // 是否需要遮罩层
    closeModal: pType.bool(true), // 是否可以通过点击 modal 关闭 Dialog
    lockScroll: pType.bool(false), // 是否在 Dialog 出现时将 body 滚动锁定
    className: pType.string(),
    showClose: pType.bool(true), // 是否显示关闭按钮
    confirm: pType.string(), // 确认按钮
    cancel: pType.string(), // 取消按钮
    /*move: {
      // 允许拖动窗口
      type: Boolean,
      default: true
    },*/
    autoClose: pType.number(0), // 自动关闭时间
    beforeClose: pType.func(true), // 关闭前的回调
    // callback: pType.func(false), // 确定按钮关闭前的回调
    animation: pType.string('fade'),
    /*after: Function,
    center: {
      // 默认水平垂直居中。false时不设置位置
      type: Boolean,
      default: true
    },
    isAlert: {
      // 用于区别引用形式，组件或者是插件，不需要通过外部传参。true时关闭弹窗时同时从body移除
      type: Boolean,
      default: false
    },*/
    icon: pType.oneOfType([pType.number(), pType.string()], 0), // 主要用于this.$dialog中常见的几种提示
    fullScreen: pType.bool(false)
  },
  emits: ['callback'],
  setup(props, {emit, attrs}) {
    const el = ref()
    const state = reactive({
      autoTime: props.autoClose, // 自动关闭时间
      visible: props.modelValue, // 控制窗口显示隐藏
      clearTime: 0,
      isAlert: false
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
    const mouseDown = () => {
      console.log('mouseDown')
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
      mouseDown
    }
  }
})
</script>
