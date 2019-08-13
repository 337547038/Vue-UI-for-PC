<!--Created by 337547038 on 2018/1/29.-->
<template>
  <div :class="`${prefixCls}-steps`" class="clearfix">
    <div class="steps-item"
         v-for="(item,index) in data"
         :class="{'active':active===index,'completed':active>index,['steps-item-'+index]:true}"
         @click="_click(index)"
         :key="index">
      <div class="steps-line-icon">
        <i class="steps-icon" :class="[item.icon]">
          <span v-text="index+1" v-if="!item.icon"></span></i>
      </div>
      <div class="steps-title" v-html="item.title"></div>
      <div class="steps-intro" v-html="item.desc"></div>
    </div>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Steps`,
  data () {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    data: Array,
    active: {
      type: Number,
      default: 0
    }
  },
  components: {},
  methods: {
    _click (index) {
      this.$emit('click', index)
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
