<!-- Created by 337547038 on 2019/9/23 0023. -->
<template>
  <div>
    <slot></slot>
    <transition name="slide-toggle">
      <div :class="`${prefixCls}-color-picker`" v-show="visible" @click="_stopPropagation">
        <div class="color-picker-content">
          <Sidebar ref="siderbar" v-model="bgColor"></Sidebar>
          <Panel :bgColor="bgColor" :showColor="showColor" ref="panel"></Panel>
        </div>
        <div class="color-picker-control">
          <div class="color-input">
            <input type="text" :class="`${prefixCls}-input-control`" :value="colorToRgba" @change="_onChange">
          </div>
          <div class="color-confirm" @click="_confirm" v-html="text"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Sidebar from './sidebar'
import Panel from './panel'
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}ColorPicker`,
  data () {
    return {
      prefixCls: prefixCls,
      visible: false,
      bgColor: { // 侧栏颜色
        r: null,
        g: null,
        b: null
      },
      showColor: { // 实际显示的颜色
        r: null,
        g: null,
        b: null
      },
      sideBarHeight: 0
    }
  },
  props: {
    value: {
      type: String,
      default: '#41a259'
    },
    format: {
      type: String,
      default: 'hex' // 显示格式，hex和rgb两种
    },
    change: Function,
    text: {
      type: String,
      default: '确定'
    }
  },
  components: {Sidebar, Panel},
  methods: {
    _stopPropagation (e) {
      e.stopPropagation()
    },
    _onChange (e) {
      let value = e ? e.target.value : this.value
      // 过滤所有空格
      value = value.replace(/\s+/g, '')
      // 如果输入的第一位是#，则输入的是16进制的颜色
      let list = []
      if (value[0] === '#') {
        list = this._HexToRgb(value)
      } else {
        value = value.replace(/[a-zA-Z()]/g, '')
        list = value.split(',')
      }
      if (!list || (list.length !== 3 && list.length !== 4)) {
        return
      }
      this.showColor.r = this._calcColorNumber(list[0])
      this.showColor.g = this._calcColorNumber(list[1])
      this.showColor.b = this._calcColorNumber(list[2])
      // 修改完当前颜色，重新计算背景色
      this._calcBg(e)
    },
    // 判断是否为16进制，返回一个色号rgb数组
    _HexToRgb (value) {
      let color = value.replace('#', '')
      // 判断格式，只能是3位和6位
      if (color.length !== 3 && color.length !== 6) return
      if (/[^0-9a-f]/g.test(color)) return
      // 将其转换成rgb色号数组 f00=>[255,0,0]
      let rgb = []
      for (let i = 0; i < color.length; i++) {
        let num = parseInt(color[i].toString() + color[i], 16)
        if (color.length === 6 && i % 2 === 0) {
          num = parseInt(color[i].toString() + color[i + 1], 16)
          rgb.push(num)
        } else if (color.length === 3) {
          rgb.push(num)
        }
      }
      return rgb
    },
    _RgbToHex () {
      let value = '#'
      for (let key in this.showColor) {
        if (key === 'a') continue
        if (this.showColor[key] === null) return

        let v = parseInt(this.showColor[key]).toString(16)
        if (v.length === 1) v += v
        value += v
      }
      return value
    },
    // 根据当前颜色，计算侧栏滑块的颜色
    _calcBg (e) {
      let {r, g, b} = this.showColor
      let newColor = [
        {name: 'r', value: r},
        {name: 'g', value: g},
        {name: 'b', value: b}
      ]
      newColor.sort((a, b) => {
        return b.value - a.value
      })
      let max = newColor[0].value
      let mid = newColor[1].value
      let min = newColor[2].value

      // 计算点像右延长至边界的点的色标
      newColor[1].value = ((min - mid) * max) / (min - max)
      newColor[2].value = 0

      newColor[0].value = 255
      newColor[1].value = parseInt((255 * newColor[1].value) / max)

      if (min === max) {
        newColor[1].value = 0
      }
      newColor.forEach(e => {
        this.bgColor[e.name] = e.value
        // this.$set(this.bgColor,[e.name],e.value)
      })
      if (e) {
        this.$refs.siderbar.calcTop()
        this.$refs.panel.calcXY()
      }
      // this.$refs.siderbar.calcTop()
    },
    // 判断输入的数值是否超出了范围
    _calcColorNumber (cn) {
      if (cn > 255) cn = 255
      if (cn < 0) cn = 0
      return cn
    },
    _confirm (e) {
      this.visible = false
      this.$emit('input', this.colorToRgba)
      this.change && this.change(this.colorToRgba)
      e.stopPropagation()
    },
    _showClick (e) {
      if (this.$el.contains(e.target)) {
        this.visible = true
        this.$nextTick(() => {
          this.sideBarHeight = this.$el.querySelector('.color-slider').offsetHeight
          this.$refs.panel.calcXY()
        })
      } else {
        this.visible = false
      }
    }
  },
  computed: {
    colorToRgba () {
      if (this.showColor.r === null) return
      // 根据颜色格式返回数值
      let value = ''
      if (this.format === 'hex') {
        value = this._RgbToHex()
      } else {
        let {r, g, b} = this.showColor
        value = `rgb(${r},${g},${b})`
      }
      value = value.replace(/\s+/g, '')
      return value
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.sideBarHeight = this.$el.querySelector('.color-slider').offsetHeight
      this._onChange()
    })
    document.addEventListener('click', this._showClick)
  },
  destroyed () {
    document.removeEventListener('click', this._showClick)
  }
}
</script>
