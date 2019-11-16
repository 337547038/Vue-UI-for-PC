<!-- Created by 337547038 on 2018/9/7 0007. -->
<template>
  <div class="collapse-panel" :class="{'active':visible}">
    <div class="collapse-title" @click="_slideToggle">
      <slot/>
    </div>
    <!--<transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-leave="afterLeave"
      v-on:before-leave="beforeLeave">-->
      <collapse-transition>
        <div class="collapse-content" v-show="visible" :class="{'active':visible}" ref="content">
          <slot name="content"></slot>
        </div>
      </collapse-transition>
   <!-- </transition>-->
  </div>
</template>

<script>
import {prefixCls} from '../prefix'
import CollapseTransition from '../transition'

export default {
  name: `${prefixCls}CollapsePanel`,
  data() {
    return {
      randomName: this.name || Math.random().toString(36).substr(2, 8),
      padding: []
    }
  },
  props: ['name'],
  components: {CollapseTransition},
  methods: {
    _slideToggle() {
      const index = this.active.indexOf(this.randomName)
      if (this.parent.accordion) {
        if (index !== -1) {
          this.active.splice(index, 1)
        } else {
          this.active.splice(index, 1, this.randomName)
        }
      } else {
        // 点击展开，再点关闭
        if (index !== -1) {
          this.active.splice(index, 1)
        } else {
          this.active.push(this.randomName)
        }
      }
      this.parent._change(this.randomName)
    },
    getStyle(dom, attr) {
      return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr]
    }
    /* beforeEnter(el) {
      this.padding = [this.getStyle(el, 'paddingTop'), this.getStyle(el, 'paddingBottom')]
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
    enter(el) {
      el.style.height = el.scrollHeight + 'px'
      el.style.paddingTop = this.padding[0]
      el.style.paddingBottom = this.padding[1]
    },
    beforeLeave(el) {
      el.style.height = 0
      el.style.paddingTop = 0
      el.style.paddingBottom = 0
    },
    afterLeave(el) {
      el.style.paddingTop = ''
      el.style.paddingBottom = ''
    } */
  },
  computed: {
    visible() {
      return this.active.indexOf(this.randomName) !== -1
    },
    parent() {
      return this.$parent
    },
    active() {
      return this.parent.active
    },
    collapse() {
      return this.parent.transition
    }
  },
  mounted() {
    this.parent.panelName.push(this.randomName)
  }
}
</script>
