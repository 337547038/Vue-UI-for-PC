<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <div :class="cls">
    <Radio v-for="(item,index) in data"
           :key="index" v-model="groupValue"
           :checked="item.value"
           :disabled="item.disabled" @input="_change">{{item.label}}
    </Radio>
  </div>
</template>
<script>
import Radio from './radio'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}RadioGroup`,
  data () {
    return {
      groupValue: this.value
    }
  },
  watch: {
    value (v) {
      this.groupValue = v
    }
  },
  props: {
    value: {},
    data: Array,
    change: Function
  },
  components: {Radio},
  methods: {
    _change (v) {
      this.$emit('input', v)
      this.change && this.change(v)
    }
  },
  mounted () {

  },
  computed: {
    cls () {
      return `${prefixCls}-radio-group`
    }
  }
}
</script>
