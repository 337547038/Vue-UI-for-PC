<!--Created by 337547038 on 2021/6.-->
<template>
  <div :class="`${prefixCls}-checkbox-group`">
    <Checkbox
      v-for="(item,index) in options"
      :key="index"
      v-model="groupValue"
      :value="item.value"
      :label="item.label||item.value"
      :disabled="disabled||item._disabled||item.disabled"
      :class="item.class"
      :before-change="beforeChange"
      @change="change($event,item)" />
  </div>
</template>
<script lang="ts">
import Checkbox from './checkbox.vue'
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, ref, watch} from 'vue'
import {FormControlOption} from '../types'

export default defineComponent({
  name: `${prefixCls}CheckboxGroup`,
  components: {Checkbox},
  props: {
    options: pType.array<FormControlOption>(),
    modelValue: pType.array<string[]>([]),
    name: String,
    max: pType.number(),
    min: pType.number(),
    disabled: pType.bool(),
    beforeChange: pType.func(true)
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit}) {
    const groupValue = ref(props.modelValue)
    watch(() => props.modelValue, (v: any) => {
      groupValue.value = v
    })
    const setChecked = (arr: string[]) => {
      const newLen = arr.length
      if (newLen >= props.max) {
        // 将所有未勾选的设为禁用状态
        props.options.forEach((item: any) => {
          if (arr.indexOf(item.value) === -1) {
            item._disabled = true
          }
        })
      } else if (newLen <= props.min) {
        // 将所有已勾选的设为禁用状态
        props.options.forEach((item: any) => {
          if (arr.indexOf(item.value) !== -1) {
            item._disabled = true
          }
        })
      } else if (props.min || props.max) {
        // 将所有_disabled去掉
        props.options.forEach(item => {
          item._disabled = false
        })
      }
    }
    const change = (val: any, item: FormControlOption) => {
      setChecked(val)
      emit('update:modelValue', val)
      emit('change', val, item)
    }
    // 全选或全不选
    const toggleSelect = (boolean: boolean) => {
      let value: string[] = []
      props.options && props.options.forEach((item: any) => {
        if (boolean) {
          // 全选时
          if (item.disabled && props.modelValue.indexOf(item.value) === -1) {
            // 禁用且没有勾选的过滤
          } else {
            value.push(item.value)
          }
        } else {
          // 取消选择时
          if (item.disabled && props.modelValue.indexOf(item.value) !== -1) {
            // 禁用且没有勾选的过滤
            value.push(item.value)
          }
        }
      })
      emit('update:modelValue', value)
    }
    // 返回所选值
    const getValue = () => {
      return props.options.filter((item: any) => {
        return props.modelValue.indexOf(item.value) !== -1
      })
    }
    return {
      prefixCls,
      groupValue,
      change,
      getValue,
      toggleSelect
    }
  }
})
</script>
