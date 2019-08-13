<!--Created by 337547038 on 2018/1/30.-->
<template>
  <div class="breadcrumb clearfix">
    <template v-for="(item,index) in data">
      <router-link
        v-text="item.title"
        :class="{'last-child':data.length===index+1}"
        :to="item.href" :key="index" v-if="item.href"></router-link>
      <span v-else v-text="item.title" :key="index"></span>
      <span
        v-text="separator"
        v-if="data.length>index+1"
        class="separator"
        :key="index+100"></span>
    </template>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Breadcrumb`,
  data () {
    return {}
  },
  props: {
    data: Array,
    separator: String,
    text: String
  },
  components: {},
  methods: {},
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
