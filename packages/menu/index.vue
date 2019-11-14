<!--example
<MenuNav :data="data" value="a3"></MenuNav>-->
<template>
  <div :class="`${prefixCls}-nav nav-${type}`">
    <ul class="clearfix">
      <NavLi v-for="(item,index) in data"
             :key="index"
             :data="item"
             :type="type"
             :value="activeKey"
             @click="_click"></NavLi>
    </ul>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import NavLi from './li'

export default {
  name: `${prefixCls}Menu`,
  data () {
    return {
      prefixCls: prefixCls,
      activeKey: this.value // 添加选中样式
    }
  },
  watch: {
    activeKey (val) {
      // 要将之前设置的父级的恢复
      this._resetActive(this.data)
      this._findParent(this.data, val)
    }
  },
  props: {
    data: Array,
    type: {
      type: String,
      default: 'h'
    },
    accordion: {
      type: Boolean,
      default: false
    },
    value: { // 当前激活菜单的key值
      type: String,
      default: ''
    },
    isOpen: { // 是否展开当肖激活菜单，仅在type=v有效
      type: Boolean,
      default: true
    },
    showTitle: {
      type: Boolean,
      default: false
    },
    click: Function
  },
  mounted () {
    this._findParent(this.data, this.value)
  },
  components: {NavLi},
  methods: {
    _click (item) {
      console.log(item)
      if (!item.children) {
        // 如果有子级时，不能选
        this.activeKey = item.key || item.title // 设置当前选中key值
      }
      if (this.type === 'v' && item.children) {
        // 垂直方向时，点击展开/收起子级
        if (this.accordion) {
          // 如果只能展开一项时，仅对一级栏目
          let isFirst = false
          this.data.forEach(d => {
            if (JSON.stringify(item) === JSON.stringify(d)) {
              isFirst = true
            }
          })
          // 如果是一级栏目，关闭其它的
          if (isFirst) {
            this.data.forEach(d => {
              if (JSON.stringify(d) !== JSON.stringify(item)) {
                d.open = false
              }
            })
          }
        }
        if (typeof item.open === 'undefined') {
          this.$set(item, 'open', true)
        } else {
          item.open = !item.open
        }
      }
      this.$emit('click', item)
      this.click && this.click(item)
    },
    _findParent (data, key, parent = []) {
      data.forEach(item => {
        if ((item.key || item.title) === key) {
          // 将父级设置当前选中样式
          if (typeof parent.isActive === 'undefined') {
            this.$set(parent, 'isActive', true)
          } else {
            parent.isActive = true
          }
          // 将当前设置为展开，这里仅在第一次有用，后面点击时都已经是展开状态了
          if (this.type === 'v' && this.isOpen) {
            if (typeof parent.open === 'undefined') {
              this.$set(parent, 'open', true)
            } else {
              parent.open = true
            }
          }
          // 继续往上找
          this._findParent(this.data, parent.key || parent.title, [])
        }
        if (item.children) {
          this._findParent(item.children, key, item)
        }
      })
    },
    _resetActive (data) {
      data.forEach(item => {
        item.isActive = false
        if (item.children) {
          this._resetActive(item.children)
        }
      })
    }
  },
  computed: {}
}
</script>
