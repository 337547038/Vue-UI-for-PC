<!-- Created by 337547038 on 2019/11/8 0008. -->
<template>
  <li :class="{'has-child':data.children,'hover':data.open,'is-active':data.isActive||(data.key||data.title)===value}"
      @mouseenter="_mouseOver(data)"
      @mouseleave="_mouseLeave(data)">
    <router-link
      v-if="data.href"
      :to="data.href"
      :target="data.target"
      class="nav-label">
      <i class="icon" v-if="data.icon" :class="[data.icon]"></i>{{data.title}}
    </router-link>
    <span class="nav-label" v-else @click="_click(data)">
      <i class="icon" v-if="data.icon" :class="[data.icon]"></i>{{data.title}}
    </span>
    <collapse-transition>
      <ul v-show="data.open" v-if="data.children" class="child">
        <navLi v-for="(item,index) in data.children"
               :key="index"
               :data="item"
               :value="value"
               :type="type"
               @click="_click"></navLi>
      </ul>
    </collapse-transition>
  </li>
</template>

<script>
import CollapseTransition from '../transition'

export default {
  name: 'navLi',
  data () {
    return {}
  },
  props: ['data', 'type', 'value'],
  components: {CollapseTransition},
  methods: {
    _mouseOver (item) {
      if (this.type === 'h') {
        // 横向才有鼠标滑过事件
        if (typeof item.open === 'undefined') {
          this.$set(item, 'open', true)
        } else {
          item.open = true
        }
      }
    },
    _mouseLeave (item) {
      if (this.type === 'h') {
        item.open = false
      }
    },
    _click (item) {
      // 没有链接事件时，才有点击事件
      // console.log(item)
      this.$emit('click', item)
    }
  },
  computed: {},
  mounted () {
  }
}
</script>
