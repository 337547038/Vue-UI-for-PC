<!-- Created by 337547038 on 2021/6 0027. -->
<template>
  <div
    ref="el"
    :class="{'open':visible,[prefixCls+'-select']:true,top:downDirection===1}"
    :style="{width:width}"
    @click="downToggle">
    <div
      :class="{
        [prefixCls+'-select-control']:true}"
      @click="selectControlClick">
      <input
        v-if="filterable"
        ref="input"
        type="text"
        :class="{
          [prefixCls+'-input-control']:true,
          [size]:size,
          'focus':visible,
          'placeholder':placeholder&&modelValue.length===0,
          'disabled':disabled}"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="keywords"
        @input="searchChange"
        @blur="searchBlur">
      <div
        v-if="!filterable"
        :class="{
          [prefixCls+'-input-control']:true,
          [size]:size,
          'focus':visible,
          'disabled':disabled}"
        :placeholder="!text?placeholder:''">
        <ul v-if="multiple&&text" class="multiple-text" :placeholder="!text?placeholder:''">
          <li v-for="(item,index) in text.split(',')" :key="index">
            <span v-text="item"></span>
            <i class="icon-error" @click.stop="deleteText(item,index)"></i>
          </li>
        </ul>
        <span v-else-if="text" v-text="text"></span>
      </div>
      <span class="group-icon">
        <i v-if="clear&&modelValue.length>0" class="icon-close" title="清空" @click="clearClick"></i>
        <i :class="{'open':visible,'icon-arrow':true}"></i>
      </span>
    </div>
    <div v-if="$slots.default">
      <slot></slot>
    </div>
    <transition :name="downDirection?'slide-toggle-top':'slide-toggle'">
      <div
        v-show="visible"
        ref="selectDown"
        :class="{[prefixCls+'-select-down']:true,[downClass]:downClass}"
        :style="downPanelStyle">
        <ul v-if="!$slots.template">
          <li
            v-for="(item,index) in options"
            v-show="!item._disabled"
            :key="index"
            :class="{'disabled':item.disabled,'active':getActive(item),[item.class]:item.class}"
            :title="item.label||item.value"
            @click="itemClick(item,$event)"
            v-html="getItemText(item.label || item.value)">
          </li>
        </ul>
        <slot v-else name="template"></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import {getWindow, getOffset} from '../util/dom'
import {
  ref,
  defineComponent,
  computed,
  watch,
  inject,
  reactive,
  toRefs,
  onMounted,
  onBeforeUnmount,
  nextTick,
  provide
} from 'vue'
import pType from '../util/pType'
import {FormControlOption} from '../types'

export default defineComponent({
  name: `${prefixCls}Select`,
  props: {
    modelValue: pType.oneOfType([pType.array(), pType.string(), pType.number()]),
    multiple: pType.bool(), // 是否多选
    multipleLimit: pType.number(0),
    placeholder: pType.string(), // 默认显示的文本
    options: pType.array<FormControlOption>([]), // 下拉选顶
    beforeChange: pType.func(true),
    disabled: pType.bool(),
    filterable: pType.bool(), // 是否可搜索
    clear: pType.bool(), // 是否可以清空选项
    downHeight: pType.number(0), // 显示下拉最大高度，超出显示滚动条
    downStyle: pType.object(), // 下拉面板样式
    downClass: pType.string(), // 下拉类名
    direction: pType.number(0), // 下拉弹出方向，0自动，1向上，2向下
    appendToBody: pType.bool(),
    width: pType.string(),
    size: pType.string()
  },
  emits: ['update:modelValue', 'change', 'limitChange'],
  setup(props, {emit, slots}) {
    const el = ref()
    const selectDown = ref()
    const optionsList = ref(props.options)
    const state = reactive({
      visible: false,
      downDirection: props.direction, // 下拉方向
      text: '',
      keywords: '', // 搜索输入框的值
      appendStyle: {
        top: '',
        width: '',
        bottom: '',
        left: ''
      }
    })
    watch(() => props.modelValue, () => {
      setFirstText()
    })
    watch(() => props.options, () => {
      setFirstText()
    })
    // 下拉面板style样式
    const downPanelStyle = computed(() => {
      let style = {}
      if (props.downHeight) {
        style = {
          'max-height': props.downHeight + 'px',
          overflowY: 'auto'
        }
      }
      style = Object.assign({}, state.appendStyle, props.downStyle || {}, style)
      return style
    })
    onMounted(() => {
      nextTick(() => {
        document.addEventListener('click', slideUp)
        // 插入到body
        if (props.appendToBody) {
          document.body.appendChild(selectDown.value)
        }
        setFirstText()
      })
    })
    onBeforeUnmount(() => {
      /*console.log('onBeforeUnmount..302')
      console.log(selectDown.value)*/
      if (props.appendToBody && selectDown.value) {
        document.body.removeChild(selectDown.value)
      }
      document.removeEventListener('click', slideUp)
    })
    // methods
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
        let downMaxHeight = props.downHeight
        if (!downMaxHeight) {
          downMaxHeight = props.options.length * 25 // 按每项高25px算
        }
        if ((downMaxHeight > wh - clientY) && clientY > downMaxHeight) {
          // 向上
          state.downDirection = 1
        }
      }
    }
    // 计算插入body的位置样式
    const setAppendToBodyStyle = () => {
      if (props.appendToBody) {
        // let {getWindow, getOffset} = getDom()
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
    // 设置初始值
    const setFirstText = () => {
      let text = []
      if (props.modelValue && props.options && props.options.length > 0) {
        for (let i = 0; i < props.options.length; i++) {
          let item = props.options[i]
          if (props.multiple) {
            // 多选
            if (props.modelValue.indexOf(item.value) !== -1) {
              text.push(item.label || item.value)
            }
          } else {
            // 单选
            if (item.value === props.modelValue) {
              text.push(item.label || item.value) // 没有label时直接取value
              break
            }
          }
        }
      }
      if (slots.template) {
        text = [props.modelValue]
      }
      state.text = text.join(',')
    }
    const itemClick = (item: FormControlOption, evt: MouseEvent) => {
      if (!item.disabled) {
        if (props.beforeChange&&!props.beforeChange(item)) {
          state.visible = false
          evt.stopPropagation()
          return
        }
        let activeValue = (item.label || item.value) as string
        if (props.multiple) {
          // 多选
          let newText = state.text ? state.text.split(',') : [] // label的值，即显示的文字
          if (props.multipleLimit > 0 && props.multipleLimit <= newText.length) {
            emit('limitChange', props.modelValue)
            return false
          }
          let newValue = ref(props.modelValue) // value
          let index = newText.indexOf(activeValue)
          if (index !== -1) {
            // 原来选择了，这里取消
            newText.splice(index, 1)
            newValue.value.splice(index, 1)
          } else {
            // 添加
            newText.push(activeValue)
            newValue.value.push(item.value)
          }
          state.text = newText.join(',')
          emitCom(newValue, newText, 1)
        } else {
          // 单选
          state.text = activeValue
          state.visible = false // 收起下拉
          emitCom(item.value, item, 1)
        }
        state.keywords = activeValue
      }
      evt.stopPropagation()
    }
    const controlChange: any = inject('controlChange', '')
    const emitCom = (value: any, item: any, type: number) => {
      // type 0系统触发，1手动触发
      emit('update:modelValue', value)
      controlChange && controlChange(value)
      if (type === 1) {
        emit('change', value, item) // 改变事件
      }
    }
    const searchChange = (evt: InputEvent) => {
      // 可搜索时输入框改变事件
      const {value} = evt.target as HTMLInputElement
      state.keywords = value
      props.options.forEach(item => {
        const itemValue = item.label || item.value
        item._disabled = itemValue.indexOf(value) === -1
      })
    }
    const searchBlur = (evt: InputEvent) => {
      // 搜索输入框失焦时，判断输入的值是否符合
      // state.visible = false
      const {value} = evt.target as HTMLInputElement
      const filter = props.options.filter(item => {
        return (item.label || item.value) === value && !item.disabled
      })
      if (filter.length > 0) {
        // 输入框符合要求
        const item = filter[0]
        // this.$emit('input', item.value)
        emitCom(item.value, item, 1)
        state.text = (item.label || item.value) as string
      } else {
        // 还原
        state.keywords = props.modelValue ? state.text : ''
      }
      // 还原下拉数据
      setTimeout(() => {
        props.options.forEach(item => {
          item._disabled = false
        })
      }, 500)
    }
    const getActive = (item: FormControlOption) => {
      if (props.multiple) {
        return props.modelValue.indexOf(item.value) !== -1
      } else {
        return item.value === props.modelValue
      }
    }
    const clearClick = (evt: MouseEvent) => {
      const value = props.multiple ? [] : ''
      emitCom(value, '', 1)
      state.keywords = ''
      state.text = ''
      evt.stopPropagation()
    }
    const deleteText = (item: string, index: number) => {
      // 多选时删除单个选项
      if (props.multiple) {
        let val = props.modelValue
        val.splice(index, 1)
        const newText = state.text.split(',')
        newText.splice(index, 1)
        state.text = newText.join(',')
        emitCom(val, state.text, 1)
      }
    }
    const getItemText = (label: string): string => {
      if (state.keywords && props.filterable) {
        const reg = new RegExp(`${state.keywords}`, 'gi')
        // return label.replace(//gi,)
        return label.replace(reg, '<b>' + '$&' + '</b>')
      } else {
        return label
      }
    }
    provide('getChildOption', (item: FormControlOption) => {
      optionsList.value.push(item)
    })
    return {
      el,
      selectDown,
      prefixCls,
      ...toRefs(state),
      downPanelStyle,
      downToggle,
      getActive,
      selectControlClick,
      itemClick,
      searchChange,
      searchBlur,
      clearClick,
      deleteText,
      getItemText,
      slideUp
    }
  }
})
</script>
