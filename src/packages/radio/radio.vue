<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <label
    :class="{
      'disabled':disabled,
      'checked':checked,[prefixCls+'-radio']:true}"
    @click="changeHandler">
    <span>
      <span class="radio-inner"></span>
      <span v-if="$slots.default" class="radio-text">
        <slot></slot>
      </span>
      <span v-if="label" class="radio-text" v-html="label"></span>
    </span>
  </label>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {inject, computed} from 'vue'

export default {
  name: `${prefixCls}Radio`,
  props: {
    disabled: pType.bool(false),
    value: [String, Number],
    modelValue: [String, Number, Boolean],
    label: pType.string()
  },
  emits: ['change', 'update:modelValue'],
  setup(props, {emit}) {
    const checked = computed(() => {
      // 存在value时，当v-model=value时为选中状态
      // 不存在value时，当v-model=true时为选中状态
      let bool
      if (props.value !== undefined) {
        bool = props.value === props.modelValue
      } else {
        bool = !!props.modelValue
      }
      return bool
    })
    // formItem
    const controlChange: any = inject('controlChange')
    const changeHandler = () => {
      // 点击后只有选中状态
      if (props.disabled) {
        return
      }
      const val = props.value || true
      emit('change', val)
      emit('update:modelValue', val)
      controlChange && controlChange(val)
    }
    return {
      prefixCls,
      checked,
      changeHandler
    }
  }
}
</script>
