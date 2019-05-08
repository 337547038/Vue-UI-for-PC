<!--example
<MenuNav :data="data" value="a3"></MenuNav>-->
<template>
  <div :class="`${prefixCls}-nav nav-${type}`">
    <ul class="clearfix">
      <li v-for="(item,index) in data"
          :key="index+1"
          :class="{'active':item.name===value || item.name===childActive,
          'has-child':item.children,
          'hover':hoverClass===item.name || item.open}"
          @mouseenter="_mouseOver(item)"
          @mouseleave="_mouseLeave(item)">
        <span>
        <a
          v-if="!router||!item.href"
          :href="item.href?item.href:'javascript:;'"
          v-text="item.title"
          :target="item.target"
          @click="_onClick(item)"
          :title="showTitle?item.title:''">
        </a>
        <router-link
          v-else
          :to="item.href"
          :target="item.target"
          :title="showTitle?item.title:''"
          v-text="item.title">
        </router-link>
        <i @click="_toggle(item)"></i>
          </span>
        <ul class="child" v-if="item.children" v-show="hoverClass===item.name || item.open" :style="{height:ulHeight}">
          <li v-for="(child,childIndex) in item.children"
              :key="childIndex"
              :class="{'active':child.name===value}">
            <a
              v-if="!router||!child.href"
              :href="item.href?item.href:'javascript:;'"
              :target="child.target"
              :title="showTitle?child.title:''"
              @click="_onClick(child)"
              v-text="child.title">
            </a>
            <router-link
              v-else
              :to="child.href"
              :target="child.target"
              :title="showTitle?child.title:''"
              v-text="child.title">
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Menu`,
  data () {
    return {
      prefixCls: prefixCls,
      hoverClass: '', // 鼠标经过添加样式，type=h时
      childActive: '', // 当对应的name值在子菜单里，父层也要添加添加类
      ulHeight: ''
    }
  },
  watch: {
    value () {
      this._findActive()
    }
  },
  props: {
    data: Array,
    value: String,
    type: {
      type: String,
      default: 'h'
    },
    accordion: {
      type: Boolean,
      default: false
    },
    router: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    liHeight: {
      type: Number,
      default: 0
    }
  },
  mounted () {
    this._findActive()
  },
  components: {},
  methods: {
    _mouseOver (item) {
      if (item.children && item.name && this.type === 'h') {
        // 有子菜单和name有对应值，以及横向菜单时才有鼠标经过和离开效果，纵向时有点击展开
        this.hoverClass = item.name
      }
    },
    _mouseLeave (item) {
      if (this.type === 'h') {
        this.hoverClass = ''
      }
    },
    _toggle (item) {
      if (this.accordion) {
        // 只能展开一项
        if (item.open) {
          // 当点击项为展开时，收起即可
          item.open = false
        } else {
          // 点击项收起时，此时点击展开，则展开当前项的同时，收起其它项
          // 收起其它项
          for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].open) {
              this.data[i].open = false
            }
          }
          // 展开当前项
          if (typeof item.open === 'undefined') {
            this.$set(item, 'open', true)
          } else {
            item.open = true
          }
        }
      } else {
        if (typeof item.open === 'undefined') {
          this.$set(item, 'open', true)
        } else {
          item.open = !item.open
        }
      }
      this._setHeight(item)
      this.$emit('toggle', item)
      console.log(item)
    },
    _onClick (item) {
      this.$emit('click', item)
    },
    _setHeight (item) {
      if (item.open && this.liHeight > 0) {
        this.ulHeight = this.liHeight * item.children.length + 'px'
      } else {
        this.ulHeight = ''
      }
    },
    _findActive () {
      this.childActive = ''
      // 先在这里实现，实现功能：value所对应的name值在子菜单里，这时父级也添加类active
      for (let i in this.data) {
        const children = this.data[i].children
        if (children) {
          for (let j in children) {
            if (children[j].name === this.value) {
              this.childActive = this.data[i].name
              break
            }
          }
        }
      }
    }
  },
  computed: {}
}
</script>
