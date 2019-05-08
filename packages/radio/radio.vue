<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <label :class="{
  'disabled':disabled,
  'checked':isChecked===modelValue,[prefixCls+'-radio']:true}">
    <input type="radio" v-model="modelValue" :value="isChecked" @change="_onChange" :disabled="disabled">
    <span class="radio-inner"></span>
    <span class="radio-text"><slot/></span>
  </label>
</template>
<script>
import {prefixCls} from '../prefix'
import emitter from '../mixins/emitter'

export default {
  name: `${prefixCls}Radio`,
  data () {
    return {
      prefixCls: prefixCls,
      isChecked: null,
      modelValue: this.value
    }
  },
  mixins: [emitter],
  props: {
    checked: String, // 在组使用时
    disabled: {
      type: Boolean,
      default: false
    },
    value: {},
    change: Function
  },
  watch: {
    value (v) {
      this.modelValue = v
    }
  },
  methods: {
    _onChange (e) {
      let emitValue = e.target.value || true
      if (!this.checked) {
        this.isChecked = true
      }
      this.$emit('input', emitValue)
      this.change && this.change(emitValue)
      this.dispatch('formItem', `${prefixCls}.form.change`, [emitValue, e])
    }
  },
  mounted () {
    // checked组使用时传过来的value
    // v-model=isChecked时选中状态
    if (this.checked) {
      this.isChecked = this.checked
    } else {
      if (this.value) {
        this.isChecked = this.value
      }
    }
  },
  computed: {}
}
</script>
