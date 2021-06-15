<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <div :class="`${prefixCls}-radio-group`">
    <Radio
      v-for="(item,index) in options"
      :key="index"
      v-model="groupValue"
      :value="item.value"
      :disabled="disabled||item.disabled"
      @change="change($event,item)">
      {{item.label}}
    </Radio>
  </div>
</template>
<script lang="ts">
import Radio from './radio.vue'
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {ref, defineComponent} from 'vue'
import {FormControlOption} from '../types'

export default defineComponent({
  name: `${prefixCls}RadioGroup`,
  components: {Radio},
  props: {
    modelValue: pType.string(),
    options: pType.array<FormControlOption>(),
    disabled: pType.bool() // 控制整个组
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit}) {
    const groupValue = ref(props.modelValue)
    const change = (val: [string | number], item: FormControlOption) => {
      emit('update:modelValue', val)
      emit('change', val, item)
    }
    return {
      groupValue,
      change,
      prefixCls
    }
  }
})
</script>
