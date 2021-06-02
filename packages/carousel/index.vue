<!-- Created by 337547038 on -->
<template>
  <div
    :class="{[prefixCls+'-carousel']:true,vertical:direction==='v',[type]:type}"
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
      <a class="carousel-prev" :class="{disabled:!loop&&index<=1}" @click="_directionNavClick(-1)"></a>
      <a class="carousel-next" :class="{disabled:!loop&&index>=maxMove}" @click="_directionNavClick(1)"></a>
    </div>
    <div class="control-nav" v-if="controlNav">
      <a href="javascript:;"
         v-for="item in maxMove"
         :class="{'control-nav-active':index===item}"
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
      index: this.active, // 从1开始
      width: 0,
      duration2: 0,
      timer: '', // 控制自动播放
      maxMove: 0,
      isAnimation: false,
      moveDirection: 0, // 移动方向1右-1左
      defaultMove: 0 // 初始移动位置
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
      // 当前，从1开始
      type: Number,
      default: 1
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
    type: {
      type: String,
      validator: function (value) {
        return ['card', ''].indexOf(value) !== -1
      }
    }
    /* slice: { // 强制截取数据，当总个数%每次移动单位数大于0时，仅在loop=true时有效，
      type: Boolean,
      default: true
    } */
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
      let showPage = 0
      if (!this.loop && this.showNumber > 1) {
        showPage = Math.ceil(this.showNumber / this.move) - 1 // 可视个数所占的页数
      }
      this.maxMove = Math.ceil((this.children.length - showPage) / this.move)
      // 总个数大于每次单位移动个数时
      if (this.loop && this.children.length >= this.move) {
        // 截取后面移动单位个数移动到前面,
        this._unShiftPush(-1)
      }
    },
    _directionNavClick (type) {
      if (this.isAnimation) {
        return
      }
      if (type === 1) {
        // 下一页
        if (this.maxMove > this.index) {
          this.index++
        } else {
          if (this.loop) {
            this.index = 1
          } else {
            return
          }
        }
      } else {
        // 上一页
        if (this.index > 1) {
          this.index--
        } else {
          if (this.loop) {
            this.index = this.maxMove
          } else {
            return
          }
        }
      }
      this.isAnimation = true
      this.$emit('slideBefore', this.index)
      this.moveDirection = type
      this.duration2 = this.duration
      this._setTimeOutReset(type)
    },
    _setTimeOutReset (type) {
      // 动画完成后回到初始translate
      setTimeout(() => {
        if (this.loop) {
          this.moveDirection = 0
          this.duration2 = 0
          this._unShiftPush(type)
        }
        this.isAnimation = false
        this.$emit('slideAfter', this.index)
      }, this.duration)
    },
    _unShiftPush (type, move) {
      if (!this.loop) {
        return
      }
      const moveNum = move || this.move
      if (type === 1) {
        // 删除前面第N个，追加到最后
        const pre = this.children.slice(0, moveNum)
        this.children.splice(0, moveNum)
        pre.forEach(item => {
          this.children.push(item)
        })
      } else {
        // 将数组最后N条移动到最前面
        const next = this.children.slice(this.children.length - moveNum)
        for (let i = next.length; i > 0; i--) {
          this.children.unshift(next[i - 1])
        }
        this.children.splice(this.children.length - moveNum)
      }
    },
    _controlNavClick (page) {
      if (page > this.index) {
        // 相当于下一页
        this._unShiftPush(1, page - this.index)
      } else {
        this._unShiftPush(-1, this.index - page)
      }
      this.index = page
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
      if (this.type === 'card') {
        // 实现卡片模式
        const obj = {3: 2, 5: 3, 7: 4} // 每屏可视个数3,5,7个，中间的添加样式
        let bigIndex = obj[this.showNumber] - 2 + this.index
        let loopIndex = ''
        if (this.loop) {
          bigIndex = obj[this.showNumber] + this.moveDirection
          loopIndex = obj[this.showNumber]
        }
        let cls = ''
        if (bigIndex === index) {
          cls = 'big-size'
        }
        if (loopIndex === index) {
          cls += ' normal-size'
        }
        return cls
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
        let moveWidth = -distance * this.move // 每次移动的宽
        let transformWidth = moveWidth * this.moveDirection
        if (this.loop) {
          transformWidth += moveWidth
        } else {
          transformWidth = moveWidth * (this.index - 1)
          if (this.direction === 'h') {
            const maxX = this.$el.offsetWidth - len * distance // 最大可移动距离
            if (transformWidth < maxX) {
              transformWidth = maxX // 仿止右边出现空白
            }
          }
        }
        return Object.assign({
          overflow: 'hidden',
          transform: `${translate}(${transformWidth}px)`,
          transition: `transform ${this.duration2}ms`
        }, obj)
      } else {
        return {}
      }
    },
    containerStyle () {
      let obj = {'overflow-x': 'hidden'}
      if (this.width) {
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
