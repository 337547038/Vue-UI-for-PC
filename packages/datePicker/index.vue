<!--Created by 337547038 on 2018/9/5.-->
<template>
  <div :class="{[prefixCls+'-date-picker-input']:true,'date-picker-clear':value&&showClear}">
    <v-input
      :placeholder="placeholder"
      :class="{'disabled':disabled}"
      ref="input"
      :value="value"
      readonly="readonly"
      :disabled="disabled"
      :clear="showClear&&!disabled"
      @input="_input">
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
  data () {
    return {
      prefixCls: prefixCls,
      component: '', // 挂载的组件
      offset: {}, // 当前input位置坐标
      status: false // 防止多次挂裁
    }
  },
  watch: {},
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
        // 四种类型，年/年月/年月日/年月日时分秒
        return ['y', 'ym', 'ymd', 'ymdHms'].indexOf(value) !== -1
      }
    },
    change: Function,
    innerHTML: Function
  },
  components: {vInput},
  methods: {
    _open (e) {
      // 判断当前点击元素在组件里即展开，即属于组件子节点，不在关闭
      if (this.$el.contains(e.target) && !this.disabled && !this.status) {
        this.offset = this.getOffset(this.$refs.input.$el)
        const props = {
          offset: this.offset,
          value: this.value,
          input: (time) => {
            const value = this._format(time)
            this.$emit('input', value)// 返回父组件更新
            this.change && this.change(value)
            // 通知表单组件
            this.dispatch('formItem', `${prefixCls}.form.change`, [value, ''])
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
        document.body.appendChild(this.component.$el)
        this.status = true
      } else {
        if (this.component) {
          this.component.close()
          this.status = false
        }
      }
    },
    _input () {
      // 清空事件
      this.$emit('input', '')
    },
    _format (dateString) {
      // 将日期格式化后返回
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = this._set0(date.getMonth() + 1)
      const day = this._set0(date.getDate())
      const timer = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      let time = ''
      switch (this.type) {
        case 'y':
          time = year
          break
        case 'ym':
          time = year + '-' + month
          break
        case 'ymd':
          time = year + '-' + month + '-' + day
          break
        case 'ymdHms':
          time = year + '-' + month + '-' + day + ' ' + timer
          break
      }
      return time
    },
    _set0 (num) {
      if (parseInt(num) < 10) {
        return '0' + num
      } else {
        return num
      }
    }
  },
  computed: {},
  mounted () {
    document.addEventListener('click', this._open)
  },
  beforeDestroy () {
    document.removeEventListener('click', this._open)
  },
  destroyed () {
    console.log('destroyed')
    // if appendToBody is true, remove DOM node after destroy
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  filters: {}
}
</script>
