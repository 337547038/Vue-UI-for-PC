<!-- Created by 337547038 on 2018/8/15 0015. -->
<template>
  <div :class="{className,[prefixCls+'-form-item-error']:error,[prefixCls+'-form-item']:true}">
    <label v-if="label || $slots.label" :class="{'required':isRequired,[prefixCls+'-form-label']:true}">
      <slot name="label">{{label}}</slot>
    </label>
    <div :class="`${prefixCls}-form-box`">
      <slot></slot>
      <div :class="`${prefixCls}-form-tips`" v-text="errorTips" v-if="showMessage&&errorTips"></div>
    </div>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'
import Validate from './validate'
// import emitter from '../mixins/emitter'

export default {
  name: `${prefixCls}FormItem`,
  componentName: 'formItem',
  data () {
    return {
      prefixCls: prefixCls,
      rules: {},
      errorTips: '',
      error: false, // 验证错误添加样式
      showMessage: true,
      trigger: ''
    }
  },
  // mixins: [emitter],
  props: {
    className: String,
    label: String,
    prop: String,
    required: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  methods: {
    _onFieldChange (value, event) {
      // 改变表单元素统一返回格式,value当前值 event当前元素
      console.log('_onFieldChange')
      console.log(value)
      // console.log(event.target.tagName)
      // 表单元素改变事件
      // 如果选择了blur时，change时不再触发
      let controlType = ''
      if (event && event.target) {
        controlType = event.target.tagName
      }
      if (this.trigger === 'blur' && controlType === 'INPUT') {
      } else {
        this.validate('', value)
      }
    },
    _onFieldBlur () {
      // 失去焦点时
      if (this.trigger === 'blur') {
        this.validate()
      }
    },
    validate (callback, value) {
      // 两个参数 1回调 2当前值(按钮提交时value为空)，
      // 验证
      let value2 = value
      if (value === 'undefined' || value === undefined) {
        value2 = this.form.value[this.prop]
      }
      let rule = this.form.rules[this.prop]
      if (rule) {
        const result = Validate(value2, rule)
        if (this.showMessage) {
          if (result === true) {
            this.errorTips = ''
            this.error = false
          } else {
            this.errorTips = result
            this.error = true
          }
        }
        if (callback) {
          callback(result, this.prop)
        }
      }
    },
    resetField () {
      // 表单重置
      // 移除错误提示
      this.errorTips = ''
      this.error = false
    }
  },
  computed: {
    isRequired () {
      // 是否根据验证规则自动生成必填样式名
      let bool = false
      if (this.required && this.rules) {
        const rule = this.rules[this.prop]
        if (rule) {
          rule.forEach(item => {
            if (item.type === 'required') {
              bool = true
              return false
            }
          })
        }
      }
      return bool
    },
    form () {
      // 查找form父组件
      let parent = this.$parent
      let parentName = parent.$options.componentName
      if (parent) {
        while (parentName !== `${prefixCls}Form` && parent.$parent) {
          parent = parent.$parent
          parentName = parent.$options.componentName
        }
      }
      return parent
    }
  },
  created () {
  },
  mounted () {
    this.rules = this.form.rules
    this.showMessage = this.form.showMessage
    this.trigger = this.form.trigger
    if (this.form.rules && this.form.rules[this.prop]) {
      // 监听表单元素改变事件
      this.$on(`${prefixCls}.form.change`, this._onFieldChange)
      this.$on(`${prefixCls}.form.blur`, this._onFieldBlur)
      // 将需要验证的字段保存至form
      // 考虑到formItem父组件不一定是form，有可能是祖先组件。这里不能使用$parent
      // this.$parent.fields.push(this)
      // this.dispatch('AKForm', 'ak.form.addField', [this])
      this.form.fields.push(this)
    }
  },
  beforeDestroy () {
  }
}
</script>
