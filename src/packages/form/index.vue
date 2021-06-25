<!-- Created by 337547038 on 2021/6/18 0018. -->
<template>
  <form :class="`${prefixCls}-form`">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import {provide, defineComponent, reactive, toRefs, onMounted} from 'vue'
import pType from '../util/pType'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}Form`,
  props: {
    rules: pType.object({}),
    showMessage: pType.bool(true),
    modelValue: pType.object({}),
    trigger: pType.oneOfString(['change', 'blur'], 'change'),
    labelWidth: pType.string(),
    required:pType.bool(true)
  },
  setup(props) {
    const state = reactive({
      defaultValue: '' // 用于保存所有表单元素初始值
    })
    let formItemFields: AnyPropName = [] // 所有formItem
    provide('formProps', props)
    provide('getFormItemFields', (formItem: any) => {
      formItemFields.push(formItem)
    })
    const setValue = (obj: AnyPropName, type?: string) => {
      if (type !== 'reset') {
        state.defaultValue = JSON.stringify(obj)
      }
      Object.assign(props.modelValue, obj)
    }
    // 重置表单元素值
    const resetForm = () => {
      setValue(JSON.parse(state.defaultValue), 'reset')
      // 将所有提示清空
      formItemFields && formItemFields.forEach((item: any) => {
        item.clear()
      })
    }
    const validate = (field?: string[]) => {
      let allTips: string[] = []
      let validateFields = formItemFields
      if (field && field.length > 0) {
        // 指定校验字段时
        validateFields = formItemFields.filter((fi: any) => {
          return field.indexOf(fi.prop) !== -1
        })
      }
      return new Promise((resolve, reject) => {
        validateFields.forEach((item: any) => {
          // console.log(item.prop)
          item.validate()
            .then(() => {
              allTips.push('true')
              returnResult()// 通过
            })
            .catch((res: string) => {
              allTips.push(res)
              returnResult()
            })
        })
        const returnResult = () => {
          if (allTips.length === validateFields.length) {
            const tips = allTips.filter(fi => {
              return fi !== 'true'
            })
            if (tips.length > 0) {
              // console.log('不通过')
              reject(tips)
            } else {
              resolve(props.modelValue)
            }
          }
        }
      })
    }
    onMounted(() => {
      setValue(props.modelValue)
    })
    return {
      prefixCls,
      ...toRefs(state),
      setValue,
      resetForm,
      validate
    }
  }
})
</script>
