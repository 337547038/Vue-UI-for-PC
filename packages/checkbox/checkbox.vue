<!--Created by 337547038 on 2018/9/6.-->
<!--example
<Checkbox v-model="value">text</Checkbox> or
<Checkbox v-model="value" text='text'></Checkbox>
-->
<template>
  <label :class="{[prefixCls+'-checkbox']:true,'checked':checked,'disabled':disabled}">
    <input type="checkbox" :disabled="disabled" v-model="checked" :value="value" @change="_change">
    <span :class="`${prefixCls}-checkbox-inner`"></span>
    <span :class="`${prefixCls}-checkbox-text`" v-if="label" v-text="label"></span>
    <span :class="`${prefixCls}-checkbox-text`" v-else><slot></slot></span>
  </label>
</template>
<script>
import emitter from '../mixins/emitter'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Checkbox`,
  mixins: [emitter],
  data () {
    return {
      prefixCls: prefixCls,
      checked: this.modelValue
    }
  },
  watch: {
    modelValue () {
      this.checked = this.modelValue
    }
  },
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
    value: String,
    validateEvent: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  methods: {
    _change (e) {
      this.$emit('change', this.checked)
      if (this.validateEvent) {
        this.dispatch('formItem', `${prefixCls}.form.change`, [this.checked, e])
      }
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
