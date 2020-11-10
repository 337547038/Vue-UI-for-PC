<!-- Created by 337547038 on 2018/8/27 0027. -->
<!--<Select placeholder="请选择" :options="options" v-model="value"></Select>-->
<template>
  <div :class="{'open':show,[prefixCls+'-select']:true}">
    <div :class="{
    'show-clear':clear&&value.length>0,
    [prefixCls+'-select-control']:true}" @click="_selectControlClick">
      <input type="text" v-if="filterable"
             :class="{
             [prefixCls+'-input-control']:true,
             'focus':show,
             'placeholder':placeholder&&value.length===0,
             'disabled':disabled}"
             :placeholder="placeholder"
             :disabled="disabled"
             @input="_change"
             @blur="_blur"
             :value="keywords"
             ref="input">
      <div :class="{
           [prefixCls+'-input-control']:true,
           'focus':show,
           'placeholder':placeholder&&value.length===0,
           'disabled':disabled}"
           v-text="text" v-if="!filterable">
      </div>
      <span class="icon-group">
      <i class="icon-close" v-if="clear&&value.length>0" @click="_clearClick"></i>
        <i :class="{'open':show,'icon-arrow':true}"></i>
      </span>
    </div>
    <div v-if="$slots.default">
      <slot></slot>
    </div>
    <transition name="slide-toggle">
      <div
        :class="`${prefixCls}-select-down`"
        v-show="show&&filterOption.length>0"
        :style="showLiNum"
        v-if="!$slots.template">
        <ul>
          <li v-for="(item,index) in filterOption" @click="_itemClick(item,$event)"
              :class="{'disabled':item.disabled,'active':_getActive(item),[item.className]:item.className}" ref="li"
              :key="index" :title="item.label||item.value">
            {{item.label||item.value}}
          </li>
        </ul>
      </div>
      <div :class="`${prefixCls}-select-down`" v-if="$slots.template" v-show="show">
        <slot name="template"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import emitter from '../mixins/emitter'

export default {
  name: `${prefixCls}Select`,
  mixins: [emitter],
  data() {
    return {
      prefixCls: prefixCls,
      filterOption: this.options,
      show: false,
      liHeight: '', // li高度，用于显示提定的数量
      text: '',
      keywords: '' // 搜索输入框的值
    }
  },
  props: {
    value: [Array, String, Number], // 通过v-model传进来，分多选和单选
    multiple: {
      // 是否多选
      type: Boolean,
      default: false
    },
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: String, // 默认显示的文本
    showNum: {
      // 显示下拉个数，超出显示滚动条
      type: Number,
      default: 0
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    }, // 下拉选顶
    change: Function, // 下拉选择后回调
    beforeChange: Function,
    disabled: {
      // 是否禁用
      type: Boolean,
      default: false
    },
    filterable: {
      // 是否可搜索
      type: Boolean,
      default: false
    },
    clear: {
      // 是否可以清空选项
      type: Boolean,
      default: false
    },
    validateEvent: {
      // 给formItem发送改变通知
      type: Boolean,
      default: true
    },
    downStyle: Object // 下拉面板样式
  },
  components: {},
  mounted() {
    console.log('ok')
    this._setFirstText()
    if (this.$slots.template) {
      // 自定模板时没办法将值和value对应起来
      this.text = this.value
    }
    /* 注册点击事件 */
    document.addEventListener('click', this._showHide)
    if (this.filterable) {
      this.keywords = this.value ? this.text : ''
    }
    console.log('$slots')
    console.log(this.$slots)
  },
  watch: {
    show(value) {
      if (this.filterable) {
        if (value) {
          // 聚焦。有时点了不是输入框，而是旁边的方向，这里也让输入框聚焦
          this.$refs.input.focus()
        } else {
          this.$refs.input.blur()
        }
      }
    },
    value(v) {
      console.log('value watch')
      if (this.$slots.template) {
        // 自定模板时没办法将值和value对应起来
        this.text = v
      }
      this._setFirstText() // 动态改变值时
    },
    // 当数据为异步时
    options(val) {
      this.filterOption = val
      this._setFirstText() // 动态改变值时
    }
  },
  methods: {
    _showHide(e) {
      if (e && this.$el.contains(e.target)) {
        if (!this.disabled) {
          // 非禁用状态下才能点击
          this.show = true
        }
        // e.preventDefault();
        // e.stopPropagation();
        this.$nextTick(() => {
          if (this.$refs.li && this.$refs.li[0]) {
            this.liHeight = this.$refs.li[0].offsetHeight
          }
        })
      } else {
        this.show = false
      }
    },
    _itemClick(item, e) {
      if (!item.disabled) {
        if (this.beforeChange && !this.beforeChange(item)) {
          this.show = false
          e.stopPropagation()
          return
        }
        if (this.multiple) {
          // 多选
          let newText = (this.text && this.text !== this.placeholder) ? this.text.split(',') : [] // label的值，即显示的文字
          if (this.multipleLimit > 0 && this.multipleLimit < newText.length) {
            return false
          }
          let newValue = this.value // value
          let activeValue = item.label || item.value
          let index = newText.indexOf(activeValue)
          if (index !== -1) {
            // 原来选择了，这里取消
            newText.splice(index, 1)
            newValue.splice(index, 1)
          } else {
            // 添加
            newText.push(activeValue)
            newValue.push(item.value)
          }
          this.text = newText.join(',')
          // this.$emit('input', newValue)
          this._emit(newValue, newText, 1)
        } else {
          // 单选
          this.text = item.label || item.value
          this.show = false // 收起下拉
          // this.$emit('input', item.value)
          this._emit(item.value, item, 1)
        }
        // this.$emit('change', item.value)
        this.keywords = this.text
      }
      e.stopPropagation()
    },
    _setFirstText() {
      console.log('_setFirstText')
      console.log(this.value)
      console.log(this.filterOption)
      // 设置第一项选项；如果有值则选中对应项，如果没值显示默认，没默认显示选第一项
      if (this.value.toString().length > 0) {
        let text = []
        for (let i in this.filterOption) {
          const option = this.filterOption[i]
          if (this.multiple) {
            // 多选
            if (this.value.indexOf(option.value) !== -1) {
              text.push(option.label || option.value)
            }
          } else {
            // 单选
            if (option.value === this.value) {
              this.text = option.label || option.value
              break
            }
          }
        }
        if (this.multiple) {
          this.text = text.join(',')
        }
      } else {
        // 有placeholder时显示placeholder，没有时显示第一项
        if (this.placeholder) {
          this.text = this.placeholder
        } else {
          this.text = this.filterOption[0].label || this.filterOption[0].value
          // 更新value值
          // this.$emit('input', this.text)
          this._emit(this.text, this.filterOption[0], 0)
        }
      }
      console.log(this.text)
    },
    _change(e) {
      // 可搜索时输入框改变事件
      this.keywords = e.target.value
      let newArray = []
      for (let i in this.options) {
        const value = this.options[i].label || this.options[i].value
        if (value.indexOf(e.target.value) > -1) {
          newArray.push(this.options[i])
        }
      }
      this.filterOption = newArray
    },
    _blur(e) {
      // 搜索输入框失焦时，判断输入的值是否符合
      const value = e.target.value
      const filter = this.options.filter((item) => {
        return (item.label || item.value) === value && !item.disabled
      })
      if (filter.length > 0) {
        // 输入框符合要求
        const item = filter[0]
        // this.$emit('input', item.value)
        this._emit(item.value, item, 1)
        this.text = item.label || item.value
      } else {
        // 还原
        this.keywords = this.value ? this.text : ''
      }
      // 还原下拉数据
      setTimeout(() => {
        this.filterOption = this.options
      }, 500)
    },
    _getActive(item) {
      if (this.multiple) {
        return this.value.indexOf(item.value) !== -1
      } else {
        return item.value === this.value
      }
    },
    _clearClick(e) {
      const value = this.multiple ? [] : ''
      // this.$emit('input', value)
      this._emit(value, '', 1)
      this.keywords = ''
      this.text = this.placeholder
      e.stopPropagation()
    },
    _emit(value, label, type) {
      // type 0系统触发，1手动触发
      this.$emit('input', value)
      // 手动触发的给组件formItem发送验证广播
      if (type === 1) {
        this.$emit('change', value, label) // 改变事件
        this.change && this.change(value, label)
        if (this.validateEvent) {
          this.dispatch('formItem', `${prefixCls}.form.change`, [value, ''])
        }
      }
    },
    _selectControlClick(e) {
      // 添加一个事件，在展开的时候点击收起
      if (this.show) {
        this.show = false
        e.stopPropagation()
      }
    },
    close() {
      this.$nextTick(() => {
        this.show = false
      })
    }
  },
  computed: {
    showLiNum() {
      let style = {}
      if (this.showNum && this.options.length > this.showNum) {
        style = {
          height: this.liHeight * this.showNum + 'px',
          overflowY: 'auto'
        }
      }
      if (this.downStyle) {
        style = Object.assign({}, this.downStyle, style)
      }
      return style
    }
  },
  filters: {},
  destroyed() {
    document.removeEventListener('click', this._showHide)
  }
}
</script>
