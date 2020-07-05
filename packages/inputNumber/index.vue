<template>
  <div :class="{'disabled':disabled,[prefixCls+'-input-number']:true}">
    <input
      type="text"
      :value="value"
      :class="{'disabled':disabled,[prefixCls+'-input-control']:true}"
      :disabled="disabled"
      :placeholder="placeholder"
      @focus="_focus"
      @blur="_blur"
      @input="_input"
      onkeyup="this.value=this.value.replace(/[^0-9\.]/g,'')">
    <span class="number-control">
      <a href="javascript:;"
         class="icon-less"
         @click="_numberControl(-1)"
         :class="{'disabled':value<=min}">
      </a>
      <a href="javascript:;"
         class="icon-add"
         @click="_numberControl(1)"
         :class="{'disabled':value>=max}">
      </a>
    </span>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}InputNumber`,
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  watch: {},
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: Number,
    min: Number,
    step: {// 每次增加或减少的数
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: String
  },
  mounted() {

  },
  components: {},
  methods: {
    _focus(e) {
      if (!this.disabled) {
        this.$emit('focus', e)
      }
    },
    _blur(e) {
      // 判断有没超过最大值和低于最小值
      const val = e.target.value
      if (!isNaN(this.max) && val > this.max) {
        this._input(this.max)
      }
      if (!isNaN(this.min) && val < this.min) {
        this._input(this.min)
      }
      this.$emit('blur', e)
    },
    _input(e) {
      const val = e.target ? e.target.value : e
      this.$emit('change', val)
      this.$emit('input', val)
    },
    _numberControl(type) {
      let inputValue = this.value || 0
      if (!isNaN(inputValue && !this.disabled)) {
        let val = 0
        if (type > 0) {
          // add
          if (!isNaN(this.max) && (inputValue + this.step) > this.max) {
            // 设有最大值时，且没超出设置时
            val = this.max
          } else {
            // 没有设置最大值，直接相加
            val = inputValue + this.step
          }
        } else {
          // less
          if (!isNaN(this.min) && (inputValue - this.step) < this.min) {
            // 设有最小值时
            val = this.min
          } else {
            val = inputValue - this.step
          }
        }
        const stepString = this.step + ''
        if (stepString.indexOf('.') !== -1) {
          // 表示有小数字点，小数点相加有时精度会丢失 0.2+0.1=0.300000000  或0.29999999999之类的
          const num = stepString.substr(stepString.indexOf('.') + 1).length // 取几位小数
          val = Number(val.toFixed(num))
        }
        this._input(val)
      }
    }
  },
  computed: {}
}
</script>
