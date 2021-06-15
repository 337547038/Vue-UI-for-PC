<!--
&lt;!&ndash; Created by 337547038 on 2018/9/7 0007. &ndash;&gt;
<template>
  <div :class="cls">
    <Radio
      v-for="(item,index) in data"
      :key="index"
      v-model="groupValue"
      :value="item.value"
      :disabled="disabled||item.disabled"
      @input="_change(item,$event)">
      {{ item.label }}
    </Radio>
  </div>
</template>
<script>
import Radio from './radio'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}RadioGroup`,
  components: {Radio},
  props: {
    value: {},
    data: Array,
    disabled: { // 控制整个组
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      groupValue: this.value
    }
  },
  computed: {
    cls() {
      return `${prefixCls}-radio-group`
    }
  },
  watch: {
    value(v) {
      this.groupValue = v
    }
  },
  methods: {
    _change(item, value) {
      this.$emit('input', value)
      this.$emit('change', value, item)
    }
  }
}
</script>
-->
