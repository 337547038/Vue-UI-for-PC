<!-- Created by 337547038 on -->
<template>
  <div
    ref="domEl"
    :class="{[prefixCls+'-carousel']:true,vertical:direction==='v',[type]:type}"
    @mouseleave="mouseLeaveDom"
    @mouseover="mouseOverDom">
    <div
      class="carousel-container"
      :style="containerStyle">
      <slot></slot>
      <div :style="style" class="carousel-transform clearfix">
        <item-list
          v-for="(item,index) in children"
          :key="`item${index}`"
          :child-item="item"
          :class-name="getItemClass(index)"
          :style-cls="{width:width+'px',height:itemHeight+'px'}" />
      </div>
    </div>
    <div v-if="directionNav" class="direction-nav">
      <a class="carousel-prev" :class="{disabled:!loop&&index<=1}" @click="directionNavClick(-1)"></a>
      <a class="carousel-next" :class="{disabled:!loop&&index>=maxMove}" @click="directionNavClick(1)"></a>
    </div>
    <div v-if="controlNav" class="control-nav">
      <a
        v-for="item in maxMove"
        :key="item"
        href="javascript:;"
        :class="{'control-nav-active':index===item}"
        @click="controlNavClick(item)">{{ item }}</a>
    </div>
  </div>
</template>

<script lang="ts">
import ItemList from './ItemList.vue'
import {prefixCls} from '../prefix'
import {defineComponent, computed, reactive, toRefs, ref, onMounted, nextTick, onUnmounted, provide} from 'vue'
import pType from '../util/pType'

export default defineComponent({
  name: `${prefixCls}Carousel`,
  components: {ItemList},
  props: {
    loop: pType.bool(),
    move: pType.number(1), // 每次移动单位个数
    itemWidth: pType.number(),
    itemHeight: pType.number(),
    active: pType.number(1),// 当前，从1开始
    duration: pType.number(500), // transition-duration过渡时间，单位毫秒
    showTime: pType.number(3000),// 自动播放时动画停留时间，单位毫秒
    autoPlay: pType.bool(),
    pauseOnHover: pType.bool(true), // 鼠标滑过暂停
    controlNav: pType.bool(true), // 显示分页小圆点
    directionNav: pType.bool(true), // 显示前后控制
    showNumber: pType.number(1),// 可见个数
    direction: pType.string('h'), // h/v两种
    type: pType.oneOfString(['card', ''])
  },
  emits: ['slideBefore', 'slideAfter'],
  setup(props, {emit}) {
    const state = reactive({
      children: [],
      index: props.active, // 从1开始
      width: 0,
      duration2: 0,
      // timer: 0, // 控制自动播放
      maxMove: 0,
      isAnimation: false,
      moveDirection: 0, // 移动方向1右-1左
      defaultMove: 0 // 初始移动位置
    })
    provide('childrenList', state.children)
    const domEl = ref()
    const style = computed(() => {
      const len = state.children.length
      let distance = state.width
      let translate = 'translateX'
      const obj = reactive({
        width: ''
      })
      if (props.direction === 'v') {
        // 垂直方向
        distance = props.itemHeight
        translate = 'translateY'
      } else {
        obj.width = len * distance + 'px'
      }
      if (distance && len > 0) {
        let moveWidth = -distance * props.move // 每次移动的宽
        let transformWidth = moveWidth * state.moveDirection
        if (props.loop) {
          transformWidth += moveWidth
        } else {
          transformWidth = moveWidth * (state.index - 1)
          if (props.direction === 'h') {
            const maxX = domEl.value.offsetWidth - len * distance // 最大可移动距离
            if (transformWidth < maxX) {
              transformWidth = maxX // 仿止右边出现空白
            }
          }
        }
        return Object.assign({
          overflow: 'hidden',
          transform: `${translate}(${transformWidth}px)`,
          transition: `transform ${state.duration2}ms`
        }, obj)
      } else {
        return {}
      }
    })
    const containerStyle = computed(() => {
      const obj = reactive({
        'overflow-x': 'hidden',
        height: '',
        'overflow-y': ''
      })
      if (state.width) {
        Object.assign(obj, {width: state.width * props.showNumber + 'px'})
      }
      if (props.direction === 'v') {
        obj.height = props.itemHeight * props.showNumber + 'px'
        obj['overflow-y'] = 'hidden'
      }
      return obj
    })
    const init = () => {
      let showPage = 0
      if (!props.loop && props.showNumber > 1) {
        showPage = Math.ceil(props.showNumber / props.move) - 1 // 可视个数所占的页数
      }
      state.maxMove = Math.ceil((state.children.length - showPage) / props.move)
      // 总个数大于每次单位移动个数时
      if (props.loop && state.children.length >= props.move) {
        // 截取后面移动单位个数移动到前面,
        unShiftPush(-1)
      }
    }
    const directionNavClick = (type: number) => {
      if (state.isAnimation) {
        return
      }
      if (type === 1) {
        // 下一页
        if (state.maxMove > state.index) {
          state.index++
        } else {
          if (props.loop) {
            state.index = 1
          } else {
            return
          }
        }
      } else {
        // 上一页
        if (state.index > 1) {
          state.index--
        } else {
          if (props.loop) {
            state.index = state.maxMove
          } else {
            return
          }
        }
      }
      state.isAnimation = true
      emit('slideBefore', state.index)
      state.moveDirection = type
      state.duration2 = props.duration
      setTimeOutReset(type)
    }
    const setTimeOutReset = (type: number) => {
      // 动画完成后回到初始translate
      setTimeout(() => {
        if (props.loop) {
          state.moveDirection = 0
          state.duration2 = 0
          unShiftPush(type)
        }
        state.isAnimation = false
        emit('slideAfter', state.index)
      }, props.duration)
    }
    const unShiftPush = (type: number, move?: number) => {
      if (!props.loop) {
        return
      }
      const moveNum = move || props.move
      if (type === 1) {
        // 删除前面第N个，追加到最后
        const pre = state.children.slice(0, moveNum)
        state.children.splice(0, moveNum)
        pre.forEach(item => {
          state.children.push(item)
        })
      } else {
        // 将数组最后N条移动到最前面
        const next = state.children.slice(state.children.length - moveNum)
        for (let i = next.length; i > 0; i--) {
          state.children.unshift(next[i - 1])
        }
        state.children.splice(state.children.length - moveNum)
      }
    }
    const controlNavClick = (page: number) => {
      if (page > state.index) {
        // 相当于下一页
        unShiftPush(1, page - state.index)
      } else {
        unShiftPush(-1, state.index - page)
      }
      state.index = page
    }
    let timer: any = 0
    const autoPlay = () => {
      if (props.autoPlay) {
        timer = setInterval(() => {
          // 每隔一定的时单，点下一个
          directionNavClick(1)
        }, props.showTime)
      }
    }
    const mouseOverDom = () => {
      // 如果鼠标滑动过时暂停和自动播放时，鼠标移上暂停
      if (props.pauseOnHover && props.autoPlay) {
        clearInterval(timer)
      }
    }
    const mouseLeaveDom = () => {
      autoPlay()
    }
    const getItemClass = (index: number) => {
      if (props.type === 'card') {
        // 实现卡片模式
        const obj: { [index: number]: any; } = {3: 2, 5: 3, 7: 4} // 每屏可视个数3,5,7个，中间的添加样式
        // const obj = {3: 2, 5: 3, 7: 4} // 语法报错
        let bigIndex = obj[props.showNumber] - 2 + state.index
        let loopIndex = 0
        if (props.loop) {
          bigIndex = obj[props.showNumber] + state.moveDirection
          loopIndex = obj[props.showNumber]
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
    }
    const getItemWidth = () => {
      if (props.itemWidth) {
        state.width = props.itemWidth
      } else {
        state.width = (domEl.value.offsetWidth) / props.showNumber
      }
    }
    const resize = () => {
      getItemWidth()
    }
    onMounted(() => {
      init()
      nextTick(() => {
        getItemWidth()
      })
      autoPlay()
      window.addEventListener('resize', resize)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', resize)
      state.children = []
    })
    return {
      prefixCls,
      ...toRefs(state),
      domEl,
      style,
      containerStyle,
      controlNavClick,
      mouseOverDom,
      mouseLeaveDom,
      getItemClass,
      directionNavClick
    }
  }
})
</script>
