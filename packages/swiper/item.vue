<!--Created by 337547038.-->
<template>
  <div class="swiper-slide" :style="style" :class="{'active':active}">
    <slot/>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
export default {
  name: `${prefixCls}SwipeItem`,
  data () {
    return {
      offset: 0, // 由父组件swiper更新
      active: false // 当前添加样式，同样由父组件更新
    }
  },
  props: {},
  components: {},
  methods: {},
  computed: {
    style () {
      let animation = {
        width: this.$parent.containerWidth + 'px',
        float: 'left',
        transform: `translate3d(${this.offset}px, 0, 0)`,
        transition: `transform 0ms`
      }
      if (this.$parent.animation === 'fade') {
        animation = {
          position: 'absolute',
          left: '0',
          top: '0',
          width: '100%',
          height: this.$parent.containerHeight + 'px',
          // zIndex: this.active ? 1 : 0,
          opacity: this.active ? 1 : 0,
          transition: `all ${this.$parent.duration}ms`
        }
      }
      return animation
    }
  },
  mounted () {
    this.$parent.swipes.push(this)// 更新item个数
    // console.log(this.$refs.slide)
  },
  filters: {}
}
</script>
