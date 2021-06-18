<!--Created by 337547038 on 2018/9/5.-->
<template>
  <div
    ref="el"
    :class="{[prefixCls+'-date-picker-input']:true,'date-picker-clear':modelValue&&showClear,top:downDirection===1}"
    :style="{width:width}"
    @click="downToggle">
    <v-input
      ref="input"
      :placeholder="placeholder"
      :class="{'disabled':disabled}"
      :value="showValue"
      :readonly="readonly"
      :disabled="disabled"
      :clear="showClear&&!disabled"
      @input="inputHandler"
      @blur="blurHandler"
      @click="selectControlClick" />
    <i v-if="!disabled" class="icon-date"></i>
    <transition :name="downDirection?'slide-toggle-top':'slide-toggle'">
      <div v-show="visible" ref="downPaneEl">下拉面板</div>
    </transition>
  </div>
</template>
<script lang="ts">
import vInput from '../input/index.vue'
import {
  ref, reactive, defineComponent, toRefs, onMounted,
  onBeforeUnmount, provide, inject, nextTick, watch
} from 'vue'
import {prefixCls} from '../prefix'
//import DatePicker from './datePicker.vue'
import pType from '../util/pType'
import getDom from '../util/dom'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}DatePicker`,
  components: {vInput},
  props: {
    modelValue: pType.string(),
    placeholder: pType.string(),
    showClear: pType.bool(true),// 显示清空
    disabledDate: pType.func(),
    disabled: pType.bool(),
    type: pType.oneOfString(['year', 'month', 'date', 'datetime'], 'date'),// 下拉面板类型 四种类型，年/年月/年月日/年月日时分秒
    format: pType.string(), // 显示于输入框的值
    valueFormat: pType.string(), // 实际值，即v-model
    innerHTML: pType.func(),
    appendToBody: pType.bool(true), // 将日期面板插入到body中
    downClass: pType.string(), // 下拉面板样式
    readonly: pType.bool(true), // 日期输入框只读
    direction: pType.number(0), // 下拉弹出方向，0自动，1向上，2向下
    width: pType.string()
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const downPaneEl = ref()
    const el = ref()
    const state = reactive({
      downDirection: props.direction, // 下拉方向
      visible: false,
      showValue: '', // 显示在输入框的值
      appendStyle: {
        top: '',
        width: '',
        bottom: '',
        left: ''
      } // 当前input位置坐标
    })
    watch(() => props.modelValue, (val: string) => {
      getShowValue(val)
    })
    onMounted(() => {
      nextTick(() => {
        document.addEventListener('click', slideUp)
        // 插入到body
        if (props.appendToBody) {
          document.body.appendChild(downPaneEl.value)
        }
        getShowValue()
      })
    })
    onBeforeUnmount(() => {
      if (props.appendToBody && downPaneEl.value) {
        document.body.removeChild(downPaneEl.value)
      }
      document.removeEventListener('click', slideUp)
    })
    const slideUp = () => {
      state.visible = false
    }
    const downToggle = (evt: MouseEvent) => {
      if (evt && el.value.contains(evt.target)) {
        if (!props.disabled) {
          // 非禁用状态下才能点击
          state.visible = true
          setPosition(evt)
        }
        setAppendToBodyStyle()
      } else {
        state.visible = false
      }
      evt.stopPropagation()
    }
    // 添加一个事件，在展开的时候点击收起
    const selectControlClick = (evt: MouseEvent) => {
      if (state.visible) {
        state.visible = false
        evt.stopPropagation()
      }
    }
    // 计算弹出面板方向
    const setPosition = (evt: MouseEvent) => {
      if (props.direction === 0) {
        // 计算弹出方向
        const wh = document.documentElement.clientHeight || document.body.clientHeight
        const clientY = evt.clientY // 当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
        // 最大下拉高度
        let downMaxHeight = 220 // 下拉面板高约220px
        if ((downMaxHeight > wh - clientY) && clientY > downMaxHeight) {
          // 向上
          state.downDirection = 1
        }
      }
    }
    const setAppendToBodyStyle = () => {
      if (props.appendToBody) {
        let {getWindow, getOffset} = getDom()
        const ww = getWindow()
        const offset = getOffset(el.value)
        state.appendStyle = {
          bottom: 'auto',
          width: offset.width + 'px',
          left: offset.left + 'px',
          top: (offset.top + offset.height) + 'px'
        }
        if (state.downDirection === 1) {
          state.appendStyle.top = 'auto'
          state.appendStyle.bottom = (ww.height - offset.top) + 'px'
        }
      }
    }
    const inputHandler = () => {

    }
    const blurHandler = () => {
    }
    // 初始化完成或是当modelValue变化时，返回指定的输出格式
    const getShowValue = (date?: string) => {
      let dateValue = date || props.modelValue
      if (!dateValue) {
        return
      }
      let type = ''
      if (props.format) {
        // 指定了显示的格式时，按指定的返回
        type = props.format
      } else {
        switch (props.type) {
          case 'year':
            type = 'y'
            break
          case 'month':
            type = 'y-MM'
            break
          case 'date':
            type = 'y-MM-dd'
            break
          case 'datetime':
            type = 'y-MM-dd hh:mm:ss'
            break
        }
      }
      state.showValue = parseDate(dateValue, type)
      // 更新v-model
      const vModel = parseDate(dateValue, props.valueFormat || type)
      emitCom(vModel)
    }
    const emitCom = (value: string) => {
      emit('update:modelValue', value)
    }
    const parseDate = (date: string, formatType: string): string => {
      let dateTime = new Date(date)
      if (dateTime.toString() === 'Invalid Date') {
        // 日期不合法
        return ''
        throw new Error('日期不合法')
        // return date
      }
      if (formatType === 'timestamp') {
        return dateTime.getTime().toString() // 时间戳直接返回
      }
      const m = dateTime.getMonth() + 1
      const d = dateTime.getDate()
      const h = dateTime.getHours()
      const mi = dateTime.getMinutes()
      const s = dateTime.getSeconds()
      const formatObj: AnyPropName = {
        y: dateTime.getFullYear(),
        M: m,
        MM: m > 9 ? m : '0' + m,
        d: d,
        dd: d > 9 ? d : '0' + d,
        h: h,
        hh: h > 9 ? h : '0' + h,
        m: mi,
        mm: mi > 9 ? mi : '0' + mi,
        s: s,
        ss: s > 9 ? s : '0' + s,
        w: dateTime.getDay()
      }
      return formatType.replace(/(y|MM|M|dd|d|hh|h|mm|m|ss|s|w)/g, result => {
        let value = formatObj[result]
        if (result === 'w') return ['日', '一', '二', '三', '四', '五', '六'][value]
        return value
      })
    }
    return {
      prefixCls,
      el,
      downPaneEl,
      ...toRefs(state),
      downToggle,
      slideUp,
      selectControlClick,
      inputHandler,
      blurHandler
    }
  }
})
</script>
