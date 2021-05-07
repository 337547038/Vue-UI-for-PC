<!-- Created by 337547038 on -->
<template>
  <div
    :class="{[prefixCls+'-carousel']:true,vertical:direction==='v'}"
    @mouseover="_mouseOver"
    @mouseleave="_mouseLeave">
    <div class="carousel-container"
         :style="containerStyle">
      <slot></slot>
      <div :style="style" class="carousel-transform clearfix">
        <item-list
          v-for="(item,index) in children"
          :key="`item${index}`"
          :childItem="item"
          :className="_getItemClass(index)"
          :styleCls="{width:width+'px',height:itemHeight+'px'}">
        </item-list>
      </div>
    </div>
    <div class="direction-nav" v-if="directionNav">
      <a class="carousel-prev" :class="{disabled:!loop&&index<=0}" @click="_directionNavClick(-1)"></a>
      <a class="carousel-next" :class="{disabled:!loop&&(index+1)>=maxMove}" @click="_directionNavClick(1)"></a>
    </div>
    <div class="control-nav" v-if="controlNav">
      <a href="javascript:;"
         v-for="item in maxMove"
         :class="{'control-nav-active':(index+1)===item}"
         :key="item" @click="_controlNavClick(item)">{{item}}</a>
    </div>
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
      width: 0,
      duration2: this.duration,
      timer: '', // 控制自动播放
      maxMove: 0,
      isAnimation: false
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: false
    },
    move: {
      // 每次移动单位个数
      type: Number,
      default: 1
    },
    itemWidth: Number,
    itemHeight: Number,
    active: {
      // 当前，从0开始
      type: Number,
      default: 0
    },
    duration: {
      // transition-duration过渡时间，单位毫秒
      type: Number,
      default: 500
    },
    showTime: {
      // 自动播放时动画停留时间，单位毫秒
      type: Number,
      default: 3000
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    pauseOnHover: {
      // 鼠标滑过暂停
      type: Boolean,
      default: true
    },
    controlNav: {
      // 显示分页小圆点
      type: Boolean,
      default: true
    },
    directionNav: {
      // 显示前后控制
      type: Boolean,
      default: true
    },
    showNumber: {
      type: Number,
      default: 1
    }, // 可见个数
    direction: {
      type: String,
      default: 'h' // h/v两种
    },
    slice: { // 强制截取数据，当总个数%每次移动单位数大于0时，仅在loop=true时有效，
      type: Boolean,
      default: true
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
      // 截取符合要求的个数
      if (this.loop && this.slice) {
        const v = this.children.length % this.move
        if (v > 0) {
          this.children.splice(this.children.length - v, v)
        }
      }
      const showPage = Math.ceil(this.showNumber / this.move) // 可视个数所占的页数
      this.maxMove = Math.ceil((this.children.length - showPage) / this.move)
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
      if (this.isAnimation) {
        return
      }
      this.isAnimation = true
      this.duration2 = this.duration
      let pageIndex = this.index + 1
      if (type === 1) {
        if (this.loop) {
          // 可以多翻一下
          pageIndex -= 1
        }
        if (pageIndex < this.maxMove) {
          this.index++
        }
      } else {
        if (this.loop) {
          // 可以多翻一下
          pageIndex += 1
        }
        if (pageIndex > 1) {
          this.index--
        }
      }
      this._callback(this.index)
      if (this.loop && (this.index === -1 || this.index >= this.maxMove)) {
        // 完成切换后
        let index = 0
        if (this.index === -1) {
          index = (this.maxMove - 1)
        }
        setTimeout(() => {
          this.duration2 = 0
          this.index = index
        }, this.duration)
      }
    },
    _controlNavClick (page) {
      this._callback(page - 1)
      this.index = page - 1
    },
    _callback (index) {
      this.$emit('slideBefore', index)
      setTimeout(() => {
        this.$emit('slideAfter', this.index)
        this.isAnimation = false
      }, this.duration)
    },
    _autoPlay () {
      if (this.autoPlay) {
        this.timer = setInterval(() => {
          // 每隔一定的时单，点下一个
          this._directionNavClick(1)
        }, this.showTime)
      }
    },
    _mouseOver () {
      // 如果鼠标滑动过时暂停和自动播放时，鼠标移上暂停
      if (this.pauseOnHover && this.autoPlay) {
        clearInterval(this.timer)
      }
    },
    _mouseLeave () {
      this._autoPlay()
    },
    _getItemClass (index) {
      if (this.showNumber) {
        // 实现卡片模式
        const obj = {3: 2, 5: 3, 7: 4} // 每屏可视个数3,5,7个，中间的添加样式
        let bigIndex = obj[this.showNumber] - 1 + this.index
        if (this.loop) {
          bigIndex += this.move
        }
        if (bigIndex === index) {
          return 'big-size'
        }
      }
    },
    _getItemWidth () {
      if (this.itemWidth) {
        this.width = this.itemWidth
      } else {
        this.width = (this.$el && this.$el.offsetWidth) / this.showNumber
      }
    },
    _resize () {
      this._getItemWidth()
    }
  },
  computed: {
    style () {
      const len = this.children.length
      let distance = this.width
      let translate = 'translateX'
      let obj = {}
      if (this.direction === 'v') {
        // 垂直方向
        distance = this.itemHeight
        translate = 'translateY'
      } else {
        obj.width = len * distance + 'px'
      }
      if (distance && len > 0) {
        const moveWidth = distance * this.move // 每次移动的宽
        let x = moveWidth * this.index
        if (this.loop) {
          // 加上
          x += moveWidth
        }
        if (this.direction === 'h') {
          const maxX = len * distance - this.$el.offsetWidth // 最大可移动距离
          if (x > maxX) {
            x = maxX // 仿止右边出现空白
          }
        }
        return Object.assign({
          'overflow-x': 'hidden',
          transform: `${translate}(-${x}px)`,
          transition: `transform ${this.duration2}ms`
        }, obj)
      } else {
        return {}
      }
    },
    containerStyle () {
      let obj = {'overflow-x': 'hidden'}
      if (this.width && this.showNumber) {
        Object.assign(obj, {width: this.width * this.showNumber + 'px'})
      }
      if (this.direction === 'v') {
        obj = {
          height: this.itemHeight * this.showNumber + 'px',
          'overflow-y': 'hidden'
        }
      }
      return obj
    }
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
      this._getItemWidth()
    })
    this._autoPlay()
    window.addEventListener('resize', this._resize)
  },
  destroyed () {
    window.removeEventListener('resize', this._resize)
    this.children = []
  }
}
</script>
