<!-- Created by 337547038 on $. -->
<template>
  <div class="drag">
    <ul ref="drag">
      <li v-for="(item,index) in data"
          :key="index"
          :class="{'disabled':item.disabled}"
          :draggable="!item.disabled">
        <div>{{item.label}}</div>
        <div>{{item.label}}</div>
        <p @click="click(item)">{{index+1}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'drag',
  data() {
    return {}
  },
  props: {
    data: Array,
    value: String
  },
  methods: {
    click(item) {
      console.log(item.label)
    },
    _initDrag() {
      const node = this.$refs.drag
      let draging = null
      const that = this
      // 使用事件委托，将li的事件委托给ul
      node.ondragstart = function (event) {
        // firefox设置了setData后元素才能拖动！！！！
        // event.dataTransfer.setData('te', event.target.innerText) // 不能使用text，firefox会打开新tab
        event.dataTransfer.setData('text/html', event.target.innerHTML) // 不能使用text，firefox会打开新tab
        draging = event.target
      }
      node.ondragover = function (event) {
        event.preventDefault()
        const target = event.target
        // 因为dragover会发生在ul上，所以要判断是不是li
        if (target.nodeName === 'LI' && target.className !== 'disabled') {
          if (target !== draging) {
            const targetRect = target.getBoundingClientRect()
            const dragingRect = draging.getBoundingClientRect()
            if (target) {
              if (target.animated) {
                return
              }
            }
            if (that._index(draging) < that._index(target)) {
              target.parentNode.insertBefore(draging, target.nextSibling)
            } else {
              target.parentNode.insertBefore(draging, target)
            }
            that._animate(dragingRect, draging)
            that._animate(targetRect, target)
          }
        }
      }
    },
    // 获取元素在父元素中的index
    _index(el) {
      let index = 0
      if (!el || !el.parentNode) {
        return -1
      }
      while (el && (el = el.previousElementSibling)) {
        index++
      }
      return index
    },
    _animate(prevRect, target) {
      const ms = 300
      if (ms) {
        const currentRect = target.getBoundingClientRect()
        if (prevRect.nodeType === 1) {
          prevRect = prevRect.getBoundingClientRect()
        }

        this._css(target, 'transition', 'none')
        this._css(target, 'transform', `translate3d(${prevRect.left - currentRect.left}px,${prevRect.top - currentRect.top}px,0)`)
        /* eslint-disable */
        target.offsetWidth // 触发重绘
        this._css(target, 'transition', 'all ' + ms + 'ms')
        this._css(target, 'transform', 'translate3d(0,0,0)')
        const that = this
        clearTimeout(target.animated)
        target.animated = setTimeout(function () {
          that._css(target, 'transition', '')
          that._css(target, 'transform', '')
          target.animated = false
        }, ms)
      }
    },
    // 给元素添加style
    _css(el, prop, val) {
      const style = el && el.style
      if (style) {
        if (val === void 0) {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            val = document.defaultView.getComputedStyle(el, '')
          } else if (el.currentStyle) {
            val = el.currentStyle
          }
          return prop === void 0 ? val : val[prop]
        } else {
          if (!(prop in style)) {
            prop = '-webkit-' + prop
          }
          style[prop] = val + (typeof val === 'string' ? '' : 'px')
        }
      }
    }
  },
  mounted() {
    this._initDrag()
  }
}
</script>
