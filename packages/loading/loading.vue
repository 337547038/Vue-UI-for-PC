<!-- Created by 337547038 on 2018/9/5 0005. -->
<template>
  <transition :name="`${prefixCls}-loading-fade`">
    <div v-show="visible" :style="{ backgroundColor: background || '' }"
         :class="{[prefixCls+'-loading-full']:body,[prefixCls+'-loading']:true}">
      <div :class="`${prefixCls}-loading-spinner`">
        <i :class="[spinner,[prefixCls+'-icon-rotate']]" v-if="spinner"></i>
        <svg viewBox="0 0 50 50" class="loading-svg" v-else>
          <circle class="svg-path" cx="25" cy="25" r="20" fill="none"></circle>
        </svg>
        <p v-if="text" :class="`${prefixCls}-loading-text`">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import {prefixCls} from '../prefix'
import dom from '../mixins/dom.js'

export default {
  name: `${prefixCls}Loading`,
  mixins: [dom],
  data () {
    return {
      prefixCls: prefixCls,
      visible: false,
      scrollbarWidth: '17'
    }
  },
  props: {
    text: String, // 显示在加载图标下方的加载文案
    background: String, // 遮罩背景色
    spinner: String, // 自定义加载图标类名
    lock: {
      type: Boolean,
      default: false
    },
    body: {
      // 添加一个类名，插入body时。body时fixed定位
      type: Boolean,
      default: true
    }
  },
  components: {},
  methods: {
    open () {
      this.visible = true
      if (this.lock) {
        document.body.style.overflow = 'hidden'
        document.body.style.paddingRight = this.scrollbarWidth + 'px'
      }
    },
    close (remove) {
      // remove false通过指令引用，这时不能移除
      this.visible = false
      if (this.$el && remove !== false) {
        // 等待css过渡完成移除
        setTimeout(() => {
          this.$el.parentNode.removeChild(this.$el)
        }, 1000)
      }
      if (this.lock) {
        // 解锁
        document.body.style.overflow = ''
      }
    }
  },
  computed: {},
  mounted () {
    this.scrollbarWidth = this.getScrollbarWidth()
  },
  destroyed () {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>
