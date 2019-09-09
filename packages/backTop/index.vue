<!--Created by 337547038 on 2019.8.-->
<template>
  <div
    :class="`${prefixCls}-back-top`"
    :style="{right:right+'px',bottom:bottom+'px',opacity:show?1:0,visibility:show?'visible':'hidden'}"
    @click="_click">
    <a v-text="text" href="javascript:;"></a>
  </div>
</template>
<script>
import comm from '../mixins/dom'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}BackTop`,
  data () {
    return {
      prefixCls: prefixCls,
      show: false
    }
  },
  mixins: [comm],
  props: {
    text: {
      type: String,
      default: '返回顶部'
    },
    height: {
      type: Number,
      default: 200
    },
    bottom: {
      type: Number,
      default: 30
    },
    right: {
      type: Number,
      default: 30
    },
    click: {
      type: Function
    }
  },
  components: {},
  methods: {
    _windowScroll () {
      if (this.scrollTop() > this.height) {
        this.show = true
      } else {
        this.show = false
      }
    },
    _click () {
      let that = this
      smoothscroll()

      function smoothscroll () {
        const currentScroll = that.scrollTop()
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll)
          window.scrollTo(0, currentScroll - (currentScroll / 5))
        }
      }

      this.$emit('click')
      this.click && this.click()
    }
  },
  computed: {},
  mounted () {
    this.$nextTick(() => {
      document.body.appendChild(this.$el)
      this._windowScroll()
    })
    window.addEventListener('scroll', this._windowScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this._windowScroll)
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  filters: {}
}
</script>
