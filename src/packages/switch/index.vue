<!--Created by 337547038 on 2021/6.-->
<template>
  <span
    :class="{
      [prefixCls+'-switch']:true,
      'switch-checked':status,
      'disabled':disabled}"
    :style="style"
    @click="click">
    <i :class="`${prefixCls}-switch-inner`"></i>
    <span class="switch-text">
      <slot v-if="status" name="open"></slot>
      <slot v-else name="close"></slot>
    </span>
  </span>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, inject, computed} from 'vue'

export default defineComponent({
  name: `${prefixCls}Switch`,
  props: {
    modelValue: {
      type: [String, Number, Boolean],
      default: false
    },
    disabled: pType.bool(),
    activeColor: pType.string(), // 打开时的颜色
    closeColor: pType.string(), // 关闭时的颜色
    activeValue: [String, Number], // switch 打开时的值
    closeValue: [String, Number] // switch 关闭时的值
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit}) {
    // formItem
    const controlChange: any = inject('controlChange', '')
    const status = computed(() => {
      if (props.activeValue) {
        // 指定了选中值时
        return props.modelValue === props.activeValue
      } else {
        return props.modelValue
      }
    })
    const style = computed(() => {
      let elStyle = {}
      if (props.modelValue && props.activeColor) {
        // 打开状态，并设置了打开时的颜色
        elStyle = {
          borderColor: props.activeColor,
          backgroundColor: props.activeColor
        }
      }
      if (!props.modelValue && props.closeColor) {
        elStyle = {
          borderColor: props.closeColor,
          backgroundColor: props.closeColor
        }
      }
      return elStyle
    })
    const click = () => {
      if (!props.disabled) {
        let checked
        if (!status.value) {
          if (props.activeValue) {
            checked = props.activeValue
          } else {
            checked = true
          }
        } else {
          if (props.closeValue) {
            checked = props.closeValue
          } else {
            checked = false
          }
        }
        emit('update:modelValue', checked)
        emit('change', checked)
        controlChange && controlChange(checked)
      }
    }
    return {
      prefixCls,
      status,
      style,
      click
    }
  }
})
</script>
