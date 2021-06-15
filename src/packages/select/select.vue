<!-- Created by 337547038 on 2021/6 0027. -->
<template>
  <div :class="{'open':show,[prefixCls+'-select']:true,top:direction}">
    <div
      :class="{
        'show-clear':clear&&value.length>0,
        [prefixCls+'-select-control']:true}"
      @click="selectControlClick">
      <input
        v-if="filterable"
        ref="input"
        type="text"
        :class="{
          [prefixCls+'-input-control']:true,
          'focus':show,
          'placeholder':placeholder&&value.length===0,
          'disabled':disabled}"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="keywords"
        @input="change"
        @blur="blur">
      <div
        v-if="!filterable"
        :class="{
          [prefixCls+'-input-control']:true,
          'focus':show,
          'disabled':disabled}"
        :placeholder="!text?placeholder:''">
        <ul v-if="multiple&&text" class="multiple-text" :placeholder="!text?placeholder:''">
          <li v-for="(item,index) in text.split(',')" :key="index">
            <span v-text="item"></span>
            <i class="icon-error" @click.stop="_deleteText(item,index)"></i>
          </li>
        </ul>
        <span v-else-if="text" v-text="text"></span>
      </div>
      <span class="icon-group">
        <i v-if="clear&&value.length>0" class="icon-close" @click="clearClick"></i>
        <i :class="{'open':show,'icon-arrow':true}"></i>
      </span>
    </div>
    <div v-if="$slots.default">
      <slot></slot>
    </div>
    <transition :name="transition">
      <div
        v-show="show&&filterOption.length>0"
        v-if="!$slots.template"
        ref="selectDown"
        :class="{[prefixCls+'-select-down']:true,[downClass]:downClass}"
        :style="showLiNum">
        <ul>
          <li
            v-for="(item,index) in filterOption"
            ref="li"
            :key="index"
            :class="{'disabled':item.disabled,'active':getActive(item),[item.className]:item.className}"
            :title="item.label||item.value"
            @click="itemClick(item,$event)">
            {{ item.label || item.value }}
          </li>
        </ul>
      </div>
      <div
        v-if="$slots.template"
        v-show="show"
        ref="selectDown"
        :class="{[prefixCls+'-select-down']:true,[downClass]:downClass}"
        :style="showLiNum">
        <slot name="template"></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
//import dom from '../util/dom'
import {ref, defineComponent, computed, watch, inject,reactive,toRefs} from 'vue'
import pType from '../util/pType'

export default defineComponent({
  name: `${prefixCls}Select`,
  props: {
    value: [Array, String, Number], // 通过v-model传进来，分多选和单选
    multiple: pType.bool(), // 是否多选
    multipleLimit: pType.number(0),
    placeholder: pType.string(), // 默认显示的文本
    showNum: pType.number(0), // 显示下拉个数，超出显示滚动条
    options: pType.array(), // 下拉选顶
    beforeChange: pType.func(),
    disabled: pType.bool(),
    filterable: pType.bool(), // 是否可搜索
    clear: pType.bool(), // 是否可以清空选项
    downStyle: pType.object(), // 下拉面板样式
    downClass: pType.string(), // 下拉类名
    direction: pType.bool(), // 下拉弹出方向，true向上
    appendToBody: pType.bool()
  },
  setup(props,{emit}) {
    const filterOption=ref(props.options)
    const state=reactive({
      show: false,
      liHeight: '', // li高度，用于显示提定的数量
      text: '',
      keywords: '', // 搜索输入框的值
      appendStyle: {}
    })
    const transition = computed(() => {
      return props.direction?'slide-toggle-top':'slide-toggle'
    })
    const showLiNum=computed(()=>{
      let style = {}
      if (props.showNum && props.options.length > props.showNum) {
        style = {
          height: state.liHeight * props.showNum + 'px',
          overflowY: 'auto'
        }
      }
      style = Object.assign({}, state.appendStyle, props.downStyle || {}, style)
      return style
    })
    return{
      prefixCls,
      ...toRefs(state),
      transition,
      showLiNum
    }
  },
  watch: {
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
      console.log('watch option')
      this.filterOption = val
      this._setFirstText() // 动态改变值时
    }
  },
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
  beforeUnmount() {
    if (this.appendToBody) {
      console.log(this.$refs.selectDown)
      document.body.removeChild(this.$refs.selectDown)
    }
  },
  unmounted() {
    document.removeEventListener('click', this._showHide)
  },
  methods: {
    _showHide(e) {
      if (e && this.$el.contains(e.target)) {
        if (!this.disabled) {
          // 非禁用状态下才能点击
          this.show = true
          this._setPosition(e)
        }
        // e.preventDefault();
        // e.stopPropagation();
        this.$nextTick(() => {
          if (this.$refs.li && this.$refs.li[0]) {
            this.liHeight = this.$refs.li[0].offsetHeight
          }
        })
        this._appendToBody()
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
          let newText = this.text ? this.text.split(',') : [] // label的值，即显示的文字
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
      /* console.log('_setFirstText')
      console.log(this.value)
      console.log(this.filterOption) */
      // 判断当前value是不是存在于列表的value中
      let text = []
      if (this.filterOption && this.filterOption.length > 0) {
        for (let i = 0; i < this.filterOption.length; i++) {
          let item = this.filterOption[i]
          if (this.multiple) {
            // 多选
            if (this.value.indexOf(item.value) !== -1) {
              text.push(item.label || item.value)
            }
          } else {
            // 单选
            if (item.value === this.value) {
              text.push(item.label || item.value) // 没有label时直接取value
              break
            }
          }
        }
        this.text = text.join(',')
      }
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
      const filter = this.options.filter(item => {
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
      this.text = ''
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
    },
    // 点击展开时，判断展开的方向
    _setPosition(e) {
      this.transition = 'slide-toggle' // 恢复
      if (this.maxHeight === 0) {
        this.position = 'top'
        this.transition = 'slide-toggle-top'
      } else if (this.maxHeight) {
        // 设有距浏览器底部高度时
        this.position = ''
        const wh = document.documentElement.clientHeight || document.body.clientHeight
        const clientY = e.clientY // 当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
        if (this.maxHeight > wh - clientY) {
          this.position = 'top'
          this.transition = 'slide-toggle-top'
        }
      }
    },
    _deleteText(item, index) {
      // 多选时删除单个选项
      if (this.multiple) {
        let val = JSON.parse(JSON.stringify(this.value))
        val.splice(index, 1)
        const newText = this.text.replace(item + ',', '').replace(item, '')
        this._emit(val, newText, 1)
      }
    },
    _appendToBody() {
      // 插入到body
      if (this.appendToBody) {
        // 插入到body
        const ww = this.getWindow()
        const offset = this.getOffset(this.$el)
        this.appendStyle = {
          width: offset.width + 'px',
          left: offset.left + 'px',
          top: (offset.top + offset.height) + 'px'
        }
        if (this.position === 'top') {
          this.appendStyle.top = 'auto'
          this.appendStyle.bottom = (ww.height - offset.top) + 'px'
        }
        document.body.appendChild(this.$refs.selectDown)
      }
    }
  }
})
</script>
