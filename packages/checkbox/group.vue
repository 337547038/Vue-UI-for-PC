<!--Created by 337547038 on 2018/9/6.-->
<!--example
<CheckboxGroup :data="groupDate" v-model="group"></CheckboxGroup>
    group: ['a1', 'a3', 'a6'],
    groupDate: [
       {label: '选项1', value: 'a1'},
       {label: '选项2', value: 'a2'},
       {label: '选项3', value: 'a3'},
       {label: '选项4', value: 'a4'},
       {label: '禁用', value: 'a5', disabled: true},
       {label: '勾选禁用', value: 'a6', disabled: true}
    ]
-->
<template>
  <div :class="`${prefixCls}-checkbox-group`">
    <Checkbox v-for="(item,index) in data"
              :key="index"
              :value="item.value"
              :label="item.label||item.value"
              :disabled="item.disabled"
              v-model="groupValue"
              @change="_change">
    </Checkbox>
  </div>
</template>
<script>
import Checkbox from './checkbox'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}CheckboxGroup`,
  data () {
    return {
      prefixCls: prefixCls,
      groupValue: this.value // 初始选中值
    }
  },
  watch: {
    value (v) {
      this.groupValue = v
    }
  },
  updated () {
  },
  props: {
    data: Array,
    value: Array,
    name: String,
    max: Number,
    min: Number,
    change: Function
  },
  components: {Checkbox},
  methods: {
    _change (v) {
      const newLen = this.groupValue.length
      const len = this.value.length
      let isAdd = false
      if (newLen > len) {
        isAdd = true // 表示添加勾选，否则表示取消选择
      }
      // 超出最大或最小值时返回原来的值
      if ((isAdd && len >= this.max) || (!isAdd && len <= this.min)) {
        this.$emit('input', [...this.value])
      } else {
        this.$emit('input', [...this.groupValue])
      }
      this.change && this.change(v)
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
