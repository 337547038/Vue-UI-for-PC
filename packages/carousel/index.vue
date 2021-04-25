<!-- Created by 337547038 on -->
<template>
  <div :class="{[prefixCls+'-carousel']:true}">
    <div class="carousel-container" :style="style">
      <slot></slot>
      <item-list
        v-for="(item,index) in children"
        :key="`item${index}`"
        :childItem="item"
        :styleCls="{width:item.itemWidth}">
      </item-list>
    </div>
    <div class="direction-nav">
      <a class="carousel-prev" @click="_directionNavClick(-1)">上</a>
      <a class="carousel-next" @click="_directionNavClick(1)">下</a>
    </div>
    <!--<div class="control-nav" v-if="controlNav">
      <a href="javascript:;"
         v-for="(item,index) in swipes"
         :class="{'control-nav-active':index===current}"
         :key="index" @click="_controlNavClick(index)"></a>
    </div>-->
  </div>
</template>

<script>
import ItemList from './ItemList'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Carousel`,
  data () {
    return {
      prefixCls: prefixCls,
      children: [],
      index: this.active,
      width: 0
    }
  },
  props: {
    loop: Boolean,
    move: { // 每次移动单位个数
      type: Number,
      default: 2
    },
    itemWidth: Number,
    controlNav: Boolean,
    active: { // 当前
      type: Number,
      default: 1
    },
    duration: {// transition-duration过渡时间，单位毫秒
      type: Number,
      default: 500
    }
  },
  components: {ItemList},
  methods: {
    init () {
      const child = this.$children
      child.forEach(ch => {
        if (ch.$options.componentName === 'CarouselItem') {
          this.children.push(ch)
        }
      })
      // 总个数大于每次单位移动个数时
      if (this.loop && this.children.length >= this.move) {
        // 将前面move个添加到child的后面，同时将最后move个插入到前面
        const pre = this.children.slice(0, this.move)
        const next = this.children.slice(this.children.length - this.move)
        pre.forEach(item => {
          this.children.push(item)
        })
        for (let i = next.length; i > 0; i--) {
          this.children.unshift(next[i - 1])
        }
      }
    },
    _directionNavClick (type) {
      console.log(this.index)
      console.log(this.maxMove)
      if ((this.index + 1) < this.maxMove) {
        this.index++
      }
    }
  },
  computed: {
    style () {
      if (this.width && this.children.length > 0) {
        const moveWidth = this.width * this.move // 每次移动的宽
        let x = moveWidth * (this.index - 1)
        if (this.loop) {
          // 加上
          x += moveWidth
        }
        return {
          width: this.children.length * this.width + 'px',
          transform: `translateX(-${x}px)`,
          transition: `transform ${this.duration}ms`
        }
      } else {
        return {}
      }
    },
    maxMove () {
      // 最大可移动的单位数
      return Math.ceil(this.children.length / this.move) - 1
    }
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
      if (this.itemWidth) {
        this.width = this.itemWidth
      } else {
        // this.width = this.$el && this.$el.offsetWidth
        this.width = 1394
      }
    })
  }
}
</script>
<style>
  .ak-carousel{overflow: hidden;}
  .carousel-slide{width: 1394px;height: 50px;background: #f0f0f0;float: left}
</style>
