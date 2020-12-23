<!-- Created by 337547038 on 2020/12/2 0002. -->
<template>
  <div :class="{[prefixCls+'-dropdown']:true}"
       @mouseenter="_mouseOver"
       @mouseleave="_mouseLeave"
       @click.stop="_click">
    <slot></slot>
    <span
      @mouseenter.stop="_mouseOver($event,'slot')"
      @mouseleave.stop="_mouseLeave($event,'slot')"
      @click.stop="_click($event,'slot')"
      v-if="$slots.trigger">
      <slot name="trigger"></slot>
    </span>
    <transition name="slide-toggle">
      <div
        :class="{[prefixCls+'-dropdown-menu']:true,top:position}"
        v-show="show"
        ref="dropdown"
        @mouseenter="_menuMouseOver"
        @mouseleave="_menuMouseLeave">
        <slot name="dropdown"></slot>
        <span class="arrow"></span>
      </div>
    </transition>
  </div>
</template>

<script>
import dom from '../mixins/dom'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Dropdown`,
  data () {
    return {
      prefixCls: prefixCls,
      show: false,
      position: '',
      appendChild: false,
      timer: ''
    }
  },
  mixins: [dom],
  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    maxHeight: Number // 距离浏览底部高度，当小于这个高度时将向上弹出
  },
  components: {},
  methods: {
    // 下拉项点击
    itemClick (item) {
      this.show = false
      this.$emit('click', item)
    },
    _mouseOver (e, type) {
      if (!this.show) { // 已展开时不重复
        this._control('hover', type, true, e)
      }
    },
    _mouseLeave (e, type) {
      // 表示离开的是slots标签或者是没有slots里离开
      if ((type && this.$slots.trigger) || (!type && !this.$slots.trigger)) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this._control('hover', type, false, e)
        }, 500)
      }
    },
    _click (e, type) {
      this._control('click', type, !this.show, e)
    },
    _hide () {
      if (this.trigger === 'click') {
        this.show = false
      }
    },
    _control (triggle, type, show, e) {
      if (this.trigger === triggle) {
        console.log(this.$slots.trigger)
        console.log(type)
        if (this.$slots.trigger) {
          if (type) {
            this.show = show
          }
        } else {
          if (!type) {
            this.show = show
          }
        }
      }
      e && this._setPosition(e)
      this.$nextTick(() => {
        if (this.show && this.appendToBody) {
          // 插入到body
          const ww = this.getWindow()
          const offset = this.getOffset(this.$el)
          this.$refs.dropdown.style.left = offset.left + 'px'
          if (this.position === 'top') {
            this.$refs.dropdown.style.bottom = (ww.height - offset.top) + 'px'
          } else {
            this.$refs.dropdown.style.top = (offset.top + offset.height) + 'px'
          }
          document.body.appendChild(this.$refs.dropdown)
          this.appendChild = true
        }
        if (!this.show && this.appendToBody && this.appendChild) {
          document.body.removeChild(this.$refs.dropdown)
          this.appendChild = false
        }
      })
    },
    _setPosition (e) {
      if (this.maxHeight) {
        // 设有距浏览器底部高度时
        this.position = ''
        const wh = document.documentElement.clientHeight || document.body.clientHeight
        const clientY = e.clientY // 当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
        if (this.maxHeight > wh - clientY) {
          this.position = 'top'
        }
      }
    },
    _menuMouseOver () {
      if (this.trigger === 'hover') {
        clearTimeout(this.timer)
        this.show = true
      }
    },
    _menuMouseLeave () {
      if (this.trigger === 'hover') {
        this.show = false
      }
    }
  },
  computed: {},
  mounted () {
    document.addEventListener('click', this._hide)
  },
  destroyed () {
    document.removeEventListener('click', this._hide)
    if (this.appendToBody && this.appendChild) {
      document.body.removeChild(this.$refs.dropdown)
    }
  }
}
</script>
