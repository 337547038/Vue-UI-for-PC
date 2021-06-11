<!--Created by 337547038 on 2018/1/30.-->
<template>
  <div class="breadcrumb clearfix">
    <template v-for="(item,index) in data">
      <router-link
        v-if="item.href"
        :key="index"
        :class="{'last-child':data.length===index+1}"
        :to="item.href"
        v-text="item.title" />
      <span v-else :key="`span${index}`" v-text="item.title"></span>
      <span
        v-if="data.length>index+1"
        :key="index+100"
        class="separator"
        v-text="separator"></span>
    </template>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import {defineComponent} from 'vue'

export default defineComponent({
  name: `${prefixCls}Breadcrumb`,
  props: {
    data: Array,
    separator: String,
    text: String
  },
  setup() {
    return {
      prefixCls
    }
  }
})
</script>
