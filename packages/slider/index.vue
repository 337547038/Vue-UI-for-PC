<!-- Created by 337547038 on 2019/11/12 0012. -->
<template>
  <div :class="{[prefixCls+'-slider']:true,disabled:disabled}">
    <div :class="`${prefixCls}-slider-runway`">
      <span class="slider-control"
            :style="{left:startLeft+'%'}"
            @mousedown="_mouseDown('left',$event)">
        <i v-html="tooltipStart" class="slider-tooltip"></i>
      </span>
      <span class="slider-control"
            v-if="range"
            @mousedown="_mouseDown('right',$event)"
            :style="{left:endLeft+'%'}">
        <i v-html="tooltipEnd" class="slider-tooltip"></i>
      </span>
      <span class="slider-bar" :style="sliderBarStyle"></span>
      <i class="slider-stop" v-for="(item,index) in sliderStops"
         :key="index"
         :style="{left:item}"></i>
      <span class="slider-marks" v-for="(item,index) in marksList"
            :key="index"
            :style="{left:item.left}"><i v-html="item.label" class="slider-marks-text"></i></span>
    </div>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'
import dom from '../mixins/dom.js'

export default {
  name: `${prefixCls}Slider`,
  data () {
    return {
      prefixCls: prefixCls,
      startLeft: 0,
      endLeft: 0
    }
  },
  mixins: [dom],
  props: {
    value:
      {
        type: [Number, Array],
        default: 0
      },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    disabled: {
      type: Boolean,
      default: false
    },
    step: { // 步长
      type: Number,
      default: 1
    },
    showStops: { // 是否显示间断点
      type: Boolean,
      default: false
    },
    showTooltip: { // 显示提示
      type: Boolean,
      default: true
    },
    formatTooltip: Function, // 格式化提示信息
    marks: Object
  },
  components: {},
  methods: {
    __init () {
      // 根据初始值定位初始位置
      if (this.range) {
        this._setDefaultValue(this.value[0], 'left')
        this._setDefaultValue(this.value[1], 'right')
      } else {
        // 单个时
        this._setDefaultValue(this.value, 'left')
      }
    },
    _setDefaultValue (val, direction) {
      // 控制在最小和最大之间
      let value = val
      if (val < this.min) {
        value = this.min
      }
      if (val > this.max) {
        value = this.max
      }
      // (当前值－最小值)/(最大值-最小值)*100%＝当前值所占的百分比
      const currentValue = this._numberToPercentage(value)
      if (direction === 'left') {
        this.startLeft = currentValue
      }
      if (direction === 'right') {
        this.endLeft = currentValue
      }
    },
    _mouseDown (direction, e) {
      if (this.disabled) {
        return
      }
      const t = e.pageX - e.target.offsetLeft
      document.onmousemove = ev => {
        let distance = (ev.pageX - t) / this.elWidth * 100 // 偏移距离转百分比
        if (distance < 0) {
          distance = 0
        }
        if (distance > 100) {
          distance = 100
        }
        // 步长所点比例
        // const stepPercent = (this.step - this.min) / (this.max - this.min) * 100
        const stepPercent = this._numberToPercentage(this.step)
        if (parseInt(distance) % stepPercent === 0) {
          if (typeof this.value === 'object') {
            // 范围选择时
            if (direction === 'left') {
              // 左边滑块
              this.startLeft = distance
            } else {
              this.endLeft = distance
            }
          } else {
            this.startLeft = distance
          }
          e.target.style.left = distance + '%'
          this._emit()
        }
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
      e.stopPropagation()
    },
    _emit () {
      let val = ''
      if (this.range) {
        const min = this._percentageToNumber(this.startLeft)
        const max = this._percentageToNumber(this.endLeft)
        val = [min, max]
        if (min > max) {
          val = [max, min]
        }
      } else {
        // 单个
        val = this._percentageToNumber(this.startLeft)
      }
      this.$emit('input', val)
    },
    // 将具体值转百分比
    _numberToPercentage (value) {
      // (当前值－最小值)/(最大值-最小值)*100%＝当前值所占的百分比
      return (value - this.min) / (this.max - this.min) * 100
    },
    // 将百分比值转具体值
    _percentageToNumber (currentValue) {
      return parseInt((this.max - this.min) * currentValue / 100 + this.min)
    }
  },
  computed: {
    elWidth () {
      // 返回当前可滑动的宽
      return this.$el.offsetWidth
    },
    range () {
      // 根据值判断是否为范围选择，数组时且长度为2时 为是
      if (typeof this.value === 'object' && this.value.length === 2) {
        return true
      } else {
        return false
      }
    },
    // 选中范围开始位置和长度
    sliderBarStyle () {
      if (this.range) {
        let startLeft = this.startLeft
        if (this.startLeft > this.endLeft) {
          startLeft = this.endLeft
        }
        return {
          left: startLeft + '%',
          width: Math.abs(this.endLeft - this.startLeft) + '%'
        }
      } else {
        return {
          left: '0px',
          width: this.startLeft + '%'
        }
      }
    },
    // 计算间断点的位置和个数，返回每个点的位置
    sliderStops () {
      let stopList = []
      if (this.showStops) {
        // (最大值－最小值)/步长＝个数
        const num = (this.max - this.min) / this.step
        for (let i = 1; i < num; i++) {
          stopList.push((i / 10) * 100 + '%')
        }
      }
      return stopList
    },
    // 格式化返回提示语
    tooltipStart () {
      if (this.showTooltip) {
        const val = this._percentageToNumber(this.startLeft)
        return this.formatTooltip ? this.formatTooltip(val) : val
      } else {
        return ''
      }
    },
    tooltipEnd () {
      if (this.showTooltip) {
        const val = this._percentageToNumber(this.endLeft)
        return this.formatTooltip ? this.formatTooltip(val) : val
      } else {
        return ''
      }
    },
    // 转换mark为key,value形式
    marksList () {
      let list = []
      if (this.marks) {
        for (let i in this.marks) {
          list.push({
            label: this.marks[i],
            left: i + '%'
          })
        }
      }
      return list
    }
  },
  mounted () {
    this.__init()
  }
}
</script>
