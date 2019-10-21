<!-- Created by 337547038 on 2019/1/22 0022. -->
<template>
  <vForm
    :rules="rules"
    :model.sync="model"
    ref="form"
    :showMessage="showMessage"
    :trigger="trigger">
    <FormItem v-for="(item,index) in data"
              :label="item.item.label"
              :key="index"
              :prop="item.name||`name${index}`"
              :class="[item.item.className]"
              :required="item.item.required">
      <vInput
        v-model="item.control.value"
        v-bind="item.control"
        :type="item.type"
        v-if="item.type==='text'||item.type==='password'"/>
      <radio-group
        v-model="item.control.value"
        v-bind="item.control"
        v-if="item.type==='radio'"></radio-group>
      <checkbox-group
        v-model="item.control.value"
        v-bind="item.control"
        v-if="item.type==='checkbox'"></checkbox-group>
      <date-picker
        v-model="item.control.value"
        v-bind="item.control"
        v-if="item.type==='datePicker'"></date-picker>
      <v-select
        v-model="item.control.value"
        v-bind="item.control"
        v-if="item.type==='select'"></v-select>
      <v-switch
        v-model="item.control.value"
        v-bind="item.control"
        v-if="item.type==='switch'"></v-switch>
      <v-textarea
        v-model="item.control.value"
        v-bind="item.control"
        v-if="item.type==='textarea'"></v-textarea>
      <div
        v-bind="item.control"
        v-if="item.type==='txt'"
        v-html="item.control.value"></div>
      <div class="item-tips" v-if="item.other" v-html="item.other.value" @click="item.other.click(item)"></div>
    </FormItem>
  </vForm>
</template>

<script>
import {prefixCls} from '../prefix'
import vForm from '../form/form'
import FormItem from '../form/formItem'
import vInput from '../input'
import {RadioGroup} from '../radio'
import {CheckboxGroup} from '../checkbox'
import DatePicker from '../datePicker'
import vSelect from '../select'
import vSwitch from '../switch'
import vTextarea from '../textarea'

export default {
  name: `${prefixCls}AutoForm`,
  data () {
    return {
      prefixCls: prefixCls,
      rules: {}, // form组件rules参数
      model: {}, // form组件model参数
      defaultValue: [] // 保存一个初始值，用于重置表单，所有值
    }
  },
  components: {vForm, FormItem, vInput, RadioGroup, CheckboxGroup, DatePicker, vSelect, vSwitch, vTextarea},
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    trigger: {
      // 触发验证类型，change和blur两种，仅对input
      default: 'change',
      validator: function (value) {
        return ['change', 'blur'].indexOf(value) !== -1
      }
    }
  },
  watch: {
    data: {
      handler: function (newVal) {
        this._getRulesModel(true)
      },
      deep: true
    },
    defaultValue (v) {
      // console.log('defaultValue')
      //  console.log(v)
    }
  },
  created () {
    this.defaultValue = []
    this._getRulesModel()
  },
  methods: {
    _getRulesModel (type) {
      // 根据传进来的data提取form所需的rules，model两个参数
      let index = 0 // 系统指定顺序名称，如果不存在name值
      this.data.forEach(item => {
        let name = item.name || 'name' + index
        this.model[name] = item.control.value
        if (!type) {
          // type 表示监听data的值，这里不需要重复更新验证规则
          this.rules[name] = item.rules
          this.defaultValue.push(item.control.value)
        }
        index++
      })
    },
    validate (callback) {
      // 调用组件form的验证方法
      this.$refs.form.validate((result, object) => {
        callback(result, object)
      })
    },
    validateField (props, callback) {
      this.$refs.form.validateField(props, (result, object) => {
        callback(result, object)
      })
    },
    resetFields () {
      let i = 0
      this.data.forEach(item => {
        item.control.value = this.defaultValue[i]
        i++
      })
      console.log(this.data)
      // 清空提示信息
      this.$refs.form.resetFields()
    }
  },
  computed: {},
  mounted () {
  }
}
</script>
