<!-- Created by 337547038 on $. -->
<template>
  <div class="tabs-view">
    <a href="javascript:;" class="prev fa fa-angle-double-left" @click="_slide('p')"></a>
    <a href="javascript:;" class="next fa fa-angle-double-right" @click="_slide('n')"></a>
    <a href="javascript:;" class="close fa fa-times" @click="_del" title="关闭全部标签页"></a>
    <ul :style="transform">
      <li v-for="(item,index) in data"
          :key="item.name"
          :class="{last:index+1===data.length,active:item.active,home:index===0}">
        <router-link :to="item.path">{{item.meta.title||item.name}}</router-link>
        <i class="del fa fa-times" @click="_del(index)" v-if="index!==0"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tabsView',
  data () {
    return {
      translateX: 0 // 当前已移动的距离
    }
  },
  props: ['data'],
  mounted () {
    this.$nextTick(() => {
    })
  },
  computed: {
    // 最后一个元素偏移父元素的距离+自身宽
    offsetLeft () {
      return this.$el.querySelector('.last').offsetLeft + this.$el.querySelector('.last').offsetWidth
    },
    transform () {
      return {
        transform: `translateX(-${this.translateX}px)`
      }
    }
  },
  methods: {
    _slide (direction) {
      this.$nextTick(() => {
        const elWidth = this.$el.offsetWidth - 90
        const maxMove = this.offsetLeft - elWidth // 最大可移位置
        let moveDistance = 0
        if (elWidth < this.offsetLeft) {
          // 可移动状态
          if (direction === 'n') {
            moveDistance = elWidth + this.translateX // 本次需移动的距离
            if (moveDistance > maxMove) {
              moveDistance = maxMove
            }
          } else {
            // 向左
            moveDistance = this.translateX - elWidth // 本次需移动的距离
            if (moveDistance < 0) {
              moveDistance = 0
            }
          }
        }
        this.translateX = moveDistance
      })
    },
    _del (index) {
      this.$emit('click', index)
    }
  }
}
</script>
