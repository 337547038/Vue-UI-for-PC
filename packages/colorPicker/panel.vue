<!-- Created by 337547038 on $. -->
<template>
  <div class="color-panel" :style="{background: background}" @mousedown="_bgClick">
    <div class="color-white-panel"></div>
    <div class="color-block-panel"></div>
    <div class="color-cursor" :style="{left:style.left+'px',top:style.top+'px'}" @mousedown.stop="_onMouseDown"></div>
  </div>
</template>

<script>
export default {
  name: 'colorPanel',
  props: {
    bgColor: {
      type: Object,
      default: () => {
      }
    },
    showColor: {
      type: Object,
      default: () => {
      }
    }
  },
  data () {
    return {
      style: {
        left: 0,
        top: 0
      },
      panelBgInfo: {} // 颜色面板的信息left,top,width,height
    }
  },
  watch: {
    bgColor () {
      this._changeShowColor()
    }
  },
  computed: {
    background () {
      let {r, g, b} = this.bgColor
      return `rgba(${r}, ${g}, ${b})`
    }
  },

  mounted () {
    this.$nextTick(() => {
      // this.calcXY()
    })
  },

  methods: {
    _bgClick (e) {
      // 防止滑块触发背景点击事件
      console.log('0000')
      if (e.target.className === 'color-cursor') return

      const {offsetX, offsetY} = e
      const {w} = this.panelBgInfo

      // 基于点击的位置给滑块定位
      this.style = {
        left: offsetX,
        top: offsetY
      }

      // 因为是基于右上角给推断颜色，所以将颜色的原点设在右上角
      // 所以此处x需要用宽度减去滑块的left
      const x = w - offsetX
      const y = offsetY

      this._calcWidthColor(x, y)

      // 点击背景后，滑块移动到指针处，在未松开鼠标时依然可拖动
      this._onMouseDown(e)
      e.stopPropagation()
    },
    _calcWidthColor (x, y) {
      const {w, h} = this.panelBgInfo

      let newColor = JSON.parse(JSON.stringify(this.bgColor))

      for (let key in newColor) {
        // hue => 色相、三原色
        const hue = newColor[key]
        const value = ((255 - hue) * x + hue * w) / w
        newColor[key] = value
      }

      this._calcHeightColor(x, y, w, h, newColor)
    },
    // 通过右边界交点计算原点的坐标
    _calcHeightColor (x, y, w, h, color) {
      for (let key in color) {
        // hue => 色相、三原色
        const hue = color[key]
        const value = ((h - y) * hue) / h
        const int = parseInt(value)

        this.showColor[key] = int
      }
    },
    // 滑块被点击时
    _onMouseDown (e) {
      console.log('_onMouseDown')
      const {w, h} = this.panelBgInfo
      const l = e.pageX - this.style.left
      const t = e.pageY - this.style.top

      document.onmousemove = res => {
        const {pageX, pageY} = res
        let left = pageX - l
        let top = pageY - t
        if (left <= 0) left = 0
        if (left >= w) left = w
        if (top <= 0) top = 0
        if (top >= h) top = h
        this.style = {
          left: left,
          top: top
        }
        const x = w - left
        const y = top
        this._calcWidthColor(x, y)
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
      e.stopPropagation()
    },
    // 根据当前显示的颜色定位滑块位置
    calcXY () {
      const w = this.$el.offsetWidth
      const h = this.$el.offsetHeight
      this.panelBgInfo = {w, h}

      const {r, g, b} = this.showColor
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let x = (min / max) * w
      if (max === 0) {
        // 0不能作除数
        x = 0
      }
      const y = h - (max / 255) * h
      this.style.left = w - x
      this.style.top = y
    },
    // 背景颜色修改时，需基于当前滑块重新计算当前选中的颜色
    _changeShowColor () {
      const {w, h} = this.panelBgInfo
      let {left, top} = this.style
      // const x = w - left
      // const y = top
      this._calcWidthColor(w - left, top, w, h)
    }
  }
}
</script>
