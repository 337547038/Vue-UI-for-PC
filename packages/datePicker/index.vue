<!--Created by 337547038 on 2018/9/5.-->
<template>
  <div :class="{[prefixCls+'-date-picker-input']:true,'date-picker-clear':value&&showClear}">
    <v-input
      :placeholder="placeholder"
      :class="{'disabled':disabled}"
      ref="input"
      :value="showValue||value"
      :readonly="readonly"
      :disabled="disabled"
      :clear="showClear&&!disabled"
      @input="_input"
      @blur="_blur">
    </v-input>
    <i :class="`${prefixCls}-icon-date`" v-if="!disabled"></i>
  </div>
</template>
<script>
import vInput from '../input'
import Vue from 'vue'
import dom from '../mixins/dom'
import {prefixCls} from '../prefix'
import emitter from '../mixins/emitter'
import DatePicker from './datePicker'

const Picker = Vue.extend(DatePicker)
export default {
  name: `${prefixCls}DatePicker`,
  mixins: [dom, emitter],
  data() {
    return {
      prefixCls: prefixCls,
      component: '', // 挂载的组件
      offset: {}, // 当前input位置坐标
      status: false, // 防止多次挂裁
      showValue: '' // 显示在输入框的值
    }
  },
  watch: {
    value() {
      this._getShowValue()
    }
  },
  props: {
    value: [String, Number, Date],
    placeholder: String,
    showClear: {// 显示清空
      type: Boolean,
      default: true
    },
    disabledDate: {
      type: Function,
      default: function () {
        return false
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'ymd',
      validator: function (value) {
        // 下拉面板类型 四种类型，年/年月/年月日/年月日时分秒
        return ['y', 'ym', 'ymd', 'ymdHms'].indexOf(value) !== -1
      }
    },
    format: {
      type: [String, Function],
      default: '',
      validator: function (value) {
        // 显示在输入框的值 四种类型，年/年月/年月日/年月日时分秒
        return ['', 'y', 'ym', 'ymd', 'ymdHms', 'Hms'].indexOf(value) !== -1
      }
    },
    valueFormat: {
      // v-model的值
      type: [String, Function],
      default: '',
      validator: function (value) {
        // 四种类型，年/年月/年月日/年月日时分秒，其他类型可通过function返回
        return ['', 'y', 'ym', 'ymd', 'ymdHms', 'Hms'].indexOf(value) !== -1
      }
    },
    change: Function,
    innerHTML: Function,
    appendToBody: {
      // 将日期面板插入到body中
      type: Boolean,
      default: false
    },
    downStyle: Object, // 下拉面板样式
    readonly: { // 日期输入框只读
      type: Boolean,
      default: true
    },
    split: {
      // 分隔符
      type: String,
      default: '-'
    }
  },
  components: {vInput},
  methods: {
    _getShowValue() {
      // 当value变化时，返回指定的输出格式
      if (!this.value) {
        return
      }
      const format = this._parseDate(this.value)
      console.log('format')
      console.log(format)
      if (this.format) {
        // 指定了显示的格式时，按指定的返回
      } else {
        // 没有指定显示的格式时，则按下拉的类型返回
      }
    },
    // 格式化时间
    _parseDate(date) {
      let dateTime = new Date(date.toString())
      if (dateTime.toString() === 'Invalid Date') {
        // 日期不合法
        dateTime = new Date()
      }
      const formatObj = {
        y: dateTime.getFullYear(),
        m: dateTime.getMonth() + 1,
        d: dateTime.getDate(),
        h: dateTime.getHours(),
        i: dateTime.getMinutes(),
        s: dateTime.getSeconds()
      }
      let format = 'y-m-d h:i:s'
      console.log('===========')
      const timeStr = format.replace(/(y|m|d|h|i|s)/g, result => {
        return formatObj[result]
      })
      return timeStr
    },
    _open(e) {
      // 判断当前点击元素在组件里即展开，即属于组件子节点，不在关闭
      if (this.$el.contains(e.target) && !this.disabled && !this.status) {
        this.offset = this.getOffset(this.$refs.input.$el)
        if (!this.appendToBody) {
          // 将插入位置改为0
          this.offset.left = 0
          this.offset.top = 0
        }
        const props = {
          downStyle: this.downStyle,
          offset: this.offset,
          value: this.value,
          input: (time) => {
            this._emit(time)
            this.status = false
            // 这里更新下value
          },
          disabledDate: (time) => { // 不能选的日期
            return this.disabledDate && this.disabledDate(time)
          },
          type: this.type,
          // type: this.type,
          // split: this.split,
          innerHTML: (time) => {
            return this.innerHTML && this.innerHTML(time)
          }
        }
        const propsData = Object.assign({}, props)
        this.component = new Picker({propsData}).$mount()
        if (this.appendToBody) {
          document.body.appendChild(this.component.$el)
        } else {
          this.$el.appendChild(this.component.$el)
        }
        this.status = true
      } else {
        if (this.component) {
          this.component.close()
          this.status = false
        }
      }
    },
    _emit(time) {
      const value = this._format(time)
      this.$emit('input', value)// 返回父组件更新
      this.change && this.change(value)
      this.showValue = '2019'
      // 通知表单组件
      this.dispatch('formItem', `${prefixCls}.form.change`, [value, ''])
    },
    _input(val) {
      // 清空事件
      this.$emit('input', val)
    },
    _format(dateString) {
      // 将日期格式化后返回
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = this._set0(date.getMonth() + 1)
      const day = this._set0(date.getDate())
      const timer = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      let time = ''
      let formatType = this.format ? this.format : this.type
      switch (formatType) {
        case 'y':
          time = year
          break
        case 'ym':
          time = year + this.split + month
          break
        case 'ymd':
          time = year + this.split + month + this.split + day
          break
        case 'ymdHms':
          time = year + this.split + month + this.split + day + ' ' + timer
          break
        case 'Hms':
          time = timer
          break
      }
      return time
    },
    _set0(num) {
      if (parseInt(num) < 10) {
        return '0' + num
      } else {
        return num
      }
    },
    // 当只读模式为false，有失焦事件，对日期进行检验
    _blur(e) {
      const value = e.target.value
      if (!value) {
        return
      }
      const time = new Date(value.toString())
      if (time.toString() === 'Invalid Date') {
        // 日期不合法，直接清空
        this.$emit('input', '')
      }
    }
  },
  computed: {},
  mounted() {
    document.addEventListener('click', this._open)
    this._getShowValue()
  },
  beforeDestroy() {
    document.removeEventListener('click', this._open)
  },
  destroyed() {
    console.log('destroyed')
    // if appendToBody is true, remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  filters: {}
}
</script>
