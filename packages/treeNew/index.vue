<!--Created by 337547038 on 2018/1/26.-->
<template>
  <div :class="`${prefixCls}-tree`">
    <treeItem
      :data="data"
      :show="true"
      :lazy="lazy"
      :value="value"
      :showCheckbox="showCheckbox"
      @toggle="_toggle"
      @click="_click"
      @change="_change">
      <template slot-scope="node">
        <slot :row="node.row" :index="node.index"></slot>
      </template>
    </treeItem>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import treeItem from './treeItem'

export default {
  name: `${prefixCls}Tree`,
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    data: Array,
    lazy: {
      type: Boolean,
      default: false
    },
    toggle: Function,
    click: Function,
    change: Function, // 多选框选择事件
    showCheckbox: {
      // 显示checkbox
      type: Boolean,
      default: false
    },
    value: [String, Array]
  },
  components: {treeItem},
  methods: {
    _toggle(data) {
      // 展开或收起
      this.$emit('toggle', data)
    },
    // 点击事件
    _click(val) {
      console.log(val)
      this.$emit('input', val)
    },
    _change(item, tid, checked) {
      console.log(item)
      console.log(tid)
      console.log(checked)
      if (tid) {
        const tidList = tid.split(',')
        tidList.forEach(index => {
          /* let checkedAll = true
          this.data[index].forEach(data => {
            if (!data._checked) {
              checkedAll = false
            }
            if (typeof data._checked === 'undefined') {
              this.$set(item, 'someSelect', false)
            } else {
              item.someSelect = false
            }
          }) */
        })
      } else {
        // 一级时，对所有子级处理
      }
    }
  },
  computed: {},
  mounted() {
    console.log(this.data[0].children[0].children[1])
  },
  filters: {}
}
</script>
