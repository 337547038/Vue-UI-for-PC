<!--Created by 337547038 on 2018/9/6.-->
<!--<template>
  <label :class="{[prefixCls+'-checkbox']:true,'checked':checked===value,'disabled':disabled}">
    <input v-model="checked" type="checkbox" :disabled="disabled" :value="value" @change="_change">
    <span :class="`${prefixCls}-checkbox-inner`"></span>
    <span v-if="$slots.default" :class="`${prefixCls}-checkbox-text`"><slot></slot></span>
    <span v-else :class="`${prefixCls}-checkbox-text`" v-text="label"></span>
  </label>
</template>
<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Checkbox`,
  components: {},
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    label: String,
    modelValue: {},
    value: {
      type: [String, Boolean, Number],
      default: true
    },
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      prefixCls: prefixCls,
      checked: this.modelValue
    }
  },
  computed: {
    /* checkedCls () {
      // 当value=v-model或v-model中包含了value值时为true
      if (typeof this.modelValue === 'object') {
        return this.modelValue.indexOf(this.value) !== -1
      } else {
        // modelValue值为true为勾选状态
        return !!this.modelValue
      }
    } */
  },
  watch: {
    modelValue () {
      this.checked = this.modelValue
    }
  },
  mounted () {
  },
  methods: {
    _change (e) {
      let value = this.checked
      // console.log(typeof this.modelValue)
      if (typeof this.modelValue === 'string' && this.value) {
        if (value) {
          value = e.target.value
        } else {
          value = ''
        }
      }
      this.$emit('change', value, this.label)
      if (this.validateEvent) {
        // this.dispatch('formItem', `${prefixCls}.form.change`, [value, e])
      }
    }
  }
}
</script>-->
