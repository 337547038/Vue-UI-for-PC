<!--Created by 337547038 on 2018/1/26.-->
<template>
  <li :class="{'active':show}">
    <i :class="{'has-child':data.children,'last-child':num+1===len,'open-child':show}"
       @click="_slideToggle(data)"></i><a @click="_click(data)"
                                          :class="{'active':data.name===active}">{{data.name}}<span v-if="showValue">({{data.value}})</span></a>
    <transition name="tree-toggle">
      <ul v-show="show" v-if="data.children">
        <p class="tree-loading" v-if="data.children.length===0&&$parent.lazy"></p>
        <p v-if="data.children.length>0&&typeof data.children[0]==='string'" v-html="data.children[0]"></p>
        <treeLi
          v-for="(item,index) in data.children"
          :data="item"
          :key="index"
          :num="index"
          :len="data.children.length"
          @click="_click"
          :active="active"
          v-if="data.children.length>0&&typeof data.children[0]==='object'"></treeLi>
      </ul>
    </transition>
  </li>
</template>
<script>
export default {
  name: 'treeLi',
  data () {
    return {
      show: this.data.show || false
    }
  },
  props: ['data', 'len', 'num', 'active', 'showValue'],
  components: {},
  methods: {
    _slideToggle (data) {
      if (this.data.children) {
        this.show = !this.show
        this.$emit('toggle', data, this.show)
      }
    },
    _click (item) {
      // console.log('item')
      // console.log(item)
      this.$emit('click', item)
      // this.$parent.click && this.$parent.click(item)
    }
  },
  computed: {},
  mounted () {
  },
  filters: {}
}
</script>
<style>

</style>
