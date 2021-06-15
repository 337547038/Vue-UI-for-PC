<template>
  <div :class="{'disabled':disabled,[prefixCls+'-input-number']:true}">
    <input
      type="text"
      :value="value"
      :class="{'disabled':disabled,[prefixCls+'-input-control']:true}"
      :disabled="disabled"
      :placeholder="placeholder"
      onkeyup="this.value=this.value.replace(/[^0-9\.]/g,'')"
      @focus="focus"
      @blur="blur"
      @input="input">
    <span class="number-control">
      <a
        href="javascript:;"
        class="icon-minus"
        :class="{'disabled':value<=min}"
        @click="numberControl(-1)">
      </a>
      <a
        href="javascript:;"
        class="icon-plus"
        :class="{'disabled':value>=max}"
        @click="numberControl(1)">
      </a>
    </span>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, inject} from 'vue'

export default defineComponent({
  name: `${prefixCls}InputNumber`,
  props: {
    value: pType.number(0),
    max: pType.number(),
    min: pType.number(),
    step: pType.number(1),// 每次增加或减少的数
    disabled: pType.bool(),
    placeholder: pType.string()
  },
  emits: ['focus', 'blur', 'change', 'update:modelValue'],
  setup(props, {emit}) {
    const focus = e => {
      if (!props.disabled) {
        emit('focus', e)
      }
    }
    const blur = e => {
      // 判断有没超过最大值和低于最小值
      const val = e.target.value
      if (!isNaN(props.max) && val > props.max) {
        input(props.max)
      }
      if (!isNaN(props.min) && val < props.min) {
        input(props.min)
      }
      emit('blur', e)
    }
    const input = e => {
      const val = e.target ? e.target.value : e
      emit('change', val)
      emit('update:modelValue', val)
    }
    const numberControl = type => {
      let inputValue = props.modelValue || 0
      if (!isNaN(inputValue && !props.disabled)) {
        let val = 0
        if (type > 0) {
          // add
          if (!isNaN(props.max) && (inputValue + props.step) > props.max) {
            // 设有最大值时，且没超出设置时
            val = props.max
          } else {
            // 没有设置最大值，直接相加
            val = inputValue + props.step
          }
        } else {
          // less
          if (!isNaN(props.min) && (inputValue - props.step) < props.min) {
            // 设有最小值时
            val = props.min
          } else {
            val = inputValue - props.step
          }
        }
        const stepString = props.step + ''
        if (stepString.indexOf('.') !== -1) {
          // 表示有小数字点，小数点相加有时精度会丢失 0.2+0.1=0.300000000  或0.29999999999之类的
          const num = stepString.substr(stepString.indexOf('.') + 1).length // 取几位小数
          val = Number(val.toFixed(num))
        }
        input(val)
      }
    }
    return {
      prefixCls,
      input,
      blur,
      focus,
      numberControl
    }
  }
})
</script>
