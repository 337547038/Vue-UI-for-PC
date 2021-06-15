<!-- Created by 337547038 on 2021/6 0006. -->
<template>
  <textarea ref="textareaEl" v-model="textValue" :class="`${prefixCls}-textarea`" :style="style" @input="change"></textarea>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, inject, computed, ref,onMounted,watch} from 'vue'

export default defineComponent({
  name: `${prefixCls}Textarea`,
  // inheritAttrs: false,
  props: {
    modelValue: pType.string(),
    autoHeight: pType.bool(true),
    width: pType.string('100%'),
    height: pType.string('80px')
  },
  emits:['update:modelValue'],
  setup(props, {emit}) {
    const textValue = ref(props.modelValue)
    const border = ref(2)
    const textareaEl=ref()
    const style = computed(() => {
      return {
        width: props.width,
        height: props.height,
        minHeight: props.height,
        overflow: props.autoHeight ? 'hidden' : '',
        boxSizing: 'border-box'
      }
    })
    const getBorder=()=> {
      // 取下边框的高，计算会准确点
      border.value = textareaEl.value.offsetHeight - textareaEl.value.clientHeight
    }
    const change=e=> {
      const {value} = e.target as HTMLInputElement
      emitChange(value)
    }
    const controlChange: any = inject('controlChange')
    const emitChange=(value:string)=>{
      emit('update:modelValue', value)
      controlChange && controlChange(value)
    }
    onMounted(()=>{
      getBorder()
    })
    watch(textValue,(value:string)=>{
      emitChange(value)
      if (props.autoHeight) {
        textareaEl.value.style.height = 'auto'
        textareaEl.value.style.height = (textareaEl.value.scrollHeight + border.value) + 'px'
      }
    })
    return {
      textValue,
      style,
      textareaEl,
      change
    }
  }
})
</script>
