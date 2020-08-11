<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <label :class="{
  'disabled':disabled,
  'checked':label===modelValue,[prefixCls+'-radio']:true}">
    <input type="radio" v-model="modelValue" :value="label" @change="_onChange" :disabled="disabled">
    <span class="radio-inner"></span>
    <span class="radio-text" v-if="$slots.default">
      <slot/>
    </span>
  </label>
</template>
<script>
import {prefixCls} from '../prefix'
import emitter from '../mixins/emitter'

export default {
  name: `${prefixCls}Radio`,
  data() {
    return {
      prefixCls: prefixCls,
      modelValue: this.value
    }
  },
  mixins: [emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {},
    label: { // 当label等于value时为选中状态
      type: [String, Boolean, Number],
      default: true
    }
  },
  watch: {
    value(v) {
      this.modelValue = v
    }
  },
  methods: {
    _onChange(e) {
      let emitValue = e.target.value || true
      this.$emit('input', emitValue)
      this.$emit('change', emitValue)
      this.dispatch('formItem', `${prefixCls}.form.change`, [emitValue, e])
    }
  },
  mounted() {
  },
  computed: {}
}
</script>
