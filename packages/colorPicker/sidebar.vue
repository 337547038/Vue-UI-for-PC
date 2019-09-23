<!-- Created by 337547038 on $. -->
<template>
  <div class="color-slider" @mousedown="_barClick">
    <span class="color-slier-thumb" :style="{top:top+'px'}" @mousedown="_mouseDown"></span>
  </div>
</template>

<script>
export default {
  name: 'colorSidebar',
  props: {
    value: Object // rgb格式，初始值
  },
  data () {
    return {
      top: null
    }
  },
  watch: {
    sideBarHeight () {
      this.calcTop()
    }
  },
  computed: {
    sideBarHeight () {
      return this.$parent.sideBarHeight
    }
  },
  methods: {
    _mouseDown (e) {
      // let {top: t, height: h} = this.$el.getBoundingClientRect()
      const h = this.sideBarHeight
      const t = e.pageY - this.top
      document.onmousemove = ev => {
        let top = ev.pageY - t
        if (top >= h) top = h
        if (top <= 0) top = 0
        this._changeBg(top, h)
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
      e.stopPropagation()
    },
    // 修改背景图
    _changeBg (top, h) {
      // 侧栏一共分为六个区域，每块区域的长度
      this.top = top
      let total = h / 6
      let rgb = []
      if (top <= (h * 1) / 6) {
        let g = this._getValue(top, total, 0)
        rgb = [255, g, 0]
      } else if (top <= (h * 2) / 6) {
        let r = this._getValue(top, total, 1)
        rgb = [255 - r, 255, 0]
      } else if (top <= (h * 3) / 6) {
        let b = this._getValue(top, total, 2)
        rgb = [0, 255, b]
      } else if (top <= (h * 4) / 6) {
        let g = this._getValue(top, total, 3)
        rgb = [0, 255 - g, 255]
      } else if (top < (h * 5) / 6) {
        let r = this._getValue(top, total, 4)
        rgb = [r, 0, 255]
      } else if (top <= (h * 6) / 6) {
        let b = this._getValue(top, total, 5)
        rgb = [255, 0, 255 - b]
      }
      // 通知父级组件调用ColorPanel修改当前选中的颜色
      // this.change && this.change(rgb)
      const bgColor = {
        r: rgb[0],
        g: rgb[1],
        b: rgb[2]
      }
      this.$emit('input', bgColor)
    },
    _barClick (e) {
      let height = this.sideBarHeight
      let top = e.offsetY
      this._changeBg(top, height)

      // 点击背景后，滑块移动到指针处，在未松开鼠标时依然可拖动
      this._mouseDown(e)
    },
    _getValue (top, total, index) {
      const value = ((top - total * index) / total) * 255
      return parseInt(value)
    },
    // 通过选择或输入背景颜色修改时，重新计算滑块位置
    calcTop () {
      let {r, g, b} = this.value
      let height = this.sideBarHeight
      let top = 0
      let total = height / 6
      if (r === 255 && b === 0) top = (g / 255) * total
      if (g === 255 && b === 0) top = (r / 255 + 1) * total
      if (g === 255 && r === 0) top = (b / 255 + 2) * total
      if (b === 255 && r === 0) top = (g / 255 + 3) * total
      if (b === 255 && g === 0) top = (r / 255 + 4) * total
      if (r === 255 && g === 0) top = (b / 255 + 5) * total
      this.top = top
    }
  }
}
</script>
