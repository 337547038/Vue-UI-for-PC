<!-- Created by 337547038 on 2021/6/14. -->
<template>
  <div :class="{className,[prefixCls+'-form-item-error']:error,[prefixCls+'-form-item']:true}">
    <label
      v-if="label || $slots.label"
      :class="{'required':isRequired,[prefixCls+'-form-label']:true}"
      :style="labelStyle">
      <slot name="label">{{ label }}</slot>
    </label>
    <div :class="`${prefixCls}-form-box`">
      <slot></slot>
      <div v-if="messageShow&&errorTips" :class="`${prefixCls}-form-tips ${iconType}`" v-text="errorTips"></div>
      <div v-else-if="messageShow&&!error" :class="`${prefixCls}-form-tips ${iconType}`"></div>
    </div>
    <slot name="other"></slot>
  </div>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import Validate from './validate'
import {ref, provide, defineComponent, reactive, computed, toRefs, inject} from 'vue'
import pType from '../util/pType'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}FormItem`,
  props: {
    className: pType.string(),
    label: pType.string(),
    prop: pType.string(),
    required: pType.bool(true),
    verify: pType.string(),  // 用于快速验证，formItem带验证规则时，使用默认提示
    rules: pType.array<AnyPropName>([]),
    showMessage: pType.bool(true),
    trigger: pType.oneOfString(['change', 'blur'], 'change')
  },
  setup(props) {
    const formProps: AnyPropName = inject('formProps', {})
    let rules = ref(props.rules)
    if (props.rules.length === 0) {
      // 使用form的，这里优先使用formItem
      rules = formProps.rules
    }
    const state = reactive({
      errorTips: '',
      iconType: '', // 提示类型，
      error: false, // 验证错误添加样式
      rules2: rules,
      trigger2: Object.assign(props.trigger, formProps.trigger),
      messageShow: Object.assign(props.showMessage, formProps.showMessage),// 优先使用form的
      controlValue: '' // 组件的值，改变事件时*/
    })
    // 有快速校验规则，追加
    if (props.verify) {
      const verifyMsg: { [index: string]: string; } = {
        required: '必填字段',
        mobile: '手机号格式不正确',
        tel: '电话号码不正确',
        mail: '请输入正确邮箱',
        digits: '必须为正整数',
        number: '必须为数字'
      }
      const temRule = props.verify.split(',')
      temRule.forEach(item => {
        state.rules2.push({
          type: item,
          msg: verifyMsg[item]
        })
      })
    }
    const isRequired = computed(() => {
      let bool = false
      if (props.required && state.rules2 && state.rules2.length > 0) {
        if (state.rules2) {
          state.rules2.forEach(item => {
            if (item.type === 'required') {
              bool = true
              return false
            }
          })
        }
      }
      // 通过formItem写的verify也要添加
      if (props.required && props.verify && props.verify.indexOf('required') !== -1) {
        bool = true
      }
      return bool
    })
    // 如果form组件设置了label的宽
    const labelStyle = computed(() => {
      if (formProps.labelWidth) {
        return {
          width: formProps.labelWidth
        }
      } else {
        return null
      }
    })
    const validate = (value: any, callback?: any) => {
      let value2 = value
      // 外部调用时没有值
      if (value === undefined) {
        value2 = state.controlValue
      }
      if (state.rules2) {
        const result = Validate(value2, state.rules2)
        // console.log(result)
        if (state.messageShow) {
          if (result === true) {
            // 通过
            state.errorTips = ''
            state.error = false
            state.iconType = 'success'
          } else {
            state.errorTips = result
            state.error = true
            state.iconType = 'failure'
          }
        }
      }
      callback && callback(state.errorTips)
    }
    const focusTips = (value: any) => {
      let typeTips = ''
      state.rules2.forEach(item => {
        if (item.type === 'tips') {
          typeTips = item.msg
        }
      })
      if (typeTips && !value) {
        // 没有值时才提示
        state.errorTips = typeTips
        state.error = true
      }
    }
    provide('controlChange', (val: any, type: string) => {
      state.controlValue = val
      // 将组件值存起来，不触发其他操作，在没有手动触发时也使用validate来校验
      if (type === 'mounted') {
        return
      }
      if (type === 'focus') {
        focusTips(val)
      } else if (state.trigger2 === 'blur') {
        // 失去焦点校验
        if (type === 'blur') {
          validate(val)
        }
      } else {
        validate(val)
      }
    })
    return {
      prefixCls,
      ...toRefs(state),
      isRequired,
      labelStyle,
      validate
    }
  }
})
</script>
