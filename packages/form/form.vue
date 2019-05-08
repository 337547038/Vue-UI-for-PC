<!-- Created by 337547038 on 2018/8/15 0015. -->
<template>
  <form :class="cls">
    <slot></slot>
  </form>
</template>

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Form`,
  componentName: `${prefixCls}Form`,
  data () {
    return {
      fields: [], // 需要验证的字段
      defaultModel: {} // 用于保存所有表单元素初始值
    }
  },
  props: {
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    model: {
      type: Object,
      default: () => {
        return {}
      }
    },
    trigger: {
      // 触发验证类型，change和blur两种，仅对input
      default: 'change',
      validator: function (value) {
        return ['change', 'blur'].indexOf(value) !== -1
      }
    }
  },
  components: {},
  created () {
    // 接收formItem发送过来需要验证的集合
    /* this.$on('ak.form.addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    }) */
  },
  methods: {
    validate (callback) {
      this._validateComm(this.fields, callback)
    },
    validateField (props, cb) {
      // 对指定字段验证props=['a','b']
      if (props.length > 0) {
        let fields = this.fields.filter((field) => {
          return props.indexOf(field.prop) !== -1
        })
        this._validateComm(fields, cb)
      }
    },
    _validateComm (fields, callback) {
      let valid = true
      let count = 0
      let errorTips = []
      console.log('validate fields')
      console.log(fields)
      if (fields.length > 0) {
        fields.forEach(field => {
          // 引用formItem的validate验证方法
          field.validate((result, field) => {
            if (result !== true) {
              // 错误结果
              valid = false
              errorTips.push(result)
            }
            if (++count === fields.length && callback) {
              callback(valid, errorTips)
            }
          })
        })
      }
    },
    resetFields () {
      // 重置表单元素值
      this.$emit('update:model', Object.assign({}, this.defaultModel))
      // 清空错误提示
      this.fields.forEach(field => {
        field.resetField()
      })
    }
  },
  computed: {
    cls () {
      return `${prefixCls}-form`
    }
  },
  mounted () {
    // 保存表单所有元素初始值，用于重置表单
    this.defaultModel = Object.assign({}, this.model)
  }
}
</script>
