<!--Created by 337547038 on 2018/1/26.-->
<template>
  <div :class="`${prefixCls}-tree`">
    <ul>
      <treeItem
        v-for="(item,index) in data"
        :data="item"
        :len="data.length"
        :num="index"
        :key="index"
        @click="_click"
        @toggle="_toggle"
        :active="active"
        :showValue="showValue"></treeItem>
    </ul>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import treeItem from './treeItem'

export default {
  name: `${prefixCls}Tree`,
  data () {
    return {
      prefixCls: prefixCls,
      active: ''
    }
  },
  props: {
    data: Array,
    click: Function,
    lazy: {
      type: Boolean,
      default: false
    },
    toggle: Function,
    showValue: {
      // 在名称后面显示值
      type: Boolean,
      default: false
    }
  },
  components: {treeItem},
  methods: {
    _click (item) {
      // console.log('index')
      // console.log(item)
      this.active = item.name
      this.$emit('click', item)
      this.click && this.click(item)
    },
    _toggle (item, type) {
      // 展开或收起
      this.$emit('toggle', item, type)
      this.toggle && this.toggle(item, type)
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
