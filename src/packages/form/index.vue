<!-- Created by 337547038 on 2021/6/18 0018. -->
<template>
  <form :class="`${prefixCls}-form`">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import {ref, provide, defineComponent, reactive, computed, toRefs, inject, onMounted} from 'vue'
import pType from '../util/pType'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}Form`,
  props: {
    rules: pType.object({}),
    showMessage: pType.bool(true),
    modelValue: pType.object({}),
    trigger: pType.oneOfString(['change', 'blur'], 'change'),
    labelWidth: pType.string()
  },
  setup(props) {
    const state = reactive({
      formItemFields: [], // 所有formItem
      defaultModel: {} // 用于保存所有表单元素初始值
    })
    provide('formProps', props)
    provide('getFormItemFields', (formItem:any) => {
      state.formItemFields.push(formItem)
    })
    const setValue = (obj?: AnyPropName) => {
      state.defaultModel = obj || JSON.stringify(props.modelValue)
    }
    // 重置表单元素值
    const resetFields = () => {
      setValue(JSON.parse(state.defaultModel as string))
    }
    const validate = (field: string[]) => {
      return new Promise((resolve, reject) => {
        resolve(true)
      }).catch(res => {
        return res
      })
    }
    onMounted(() => {
      setValue()
    })
    return {
      prefixCls,
      ...toRefs(state),
      setValue,
      resetFields,
      validate
    }
  }
})
</script>
