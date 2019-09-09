<!--Created by 337547038 on 2017/12/26.-->
<template>
  <div :class="`${prefixCls}-cascader`">
    <div
      :class="{[prefixCls+'-input-control']:true,
         'focus':show,
         'placeholder':showPlaceholder,
         'disabled':disabled}"
      v-text="showValue">
    </div>
    <i class="icon-clear" v-if="clear&&value.length>0" @click="_clearClick"></i>
    <span class="mask" v-show="show"></span>
    <transition name="slide-toggle">
      <div class="cascader-down" v-show="show" @click="_stopPropagation">
        <p class="tips" v-text="tipsText" v-if="tipsText"></p>
        <div class="cascader-tab">
          <ul class="clearfix">
            <li
              :class="{'active':index===activeLayer}"
              v-for="(item,index) in selectValue"
              v-text="item.name"
              :key="index"
              @click="activeLayer=index"></li>
          </ul>
        </div>
        <div class="cascader-area">
          <ul class="clearfix">
            <li v-for="(item,index) in children" :title="item.name" :key="index">
              <a v-text="item.name" @click="_childrenClick(item)"></a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import cityData from './cityData'
import {prefixCls} from '../prefix'
import emitter from '../mixins/emitter'

export default {
  name: `${prefixCls}Cascader`,
  data () {
    return {
      prefixCls: prefixCls,
      show: false,
      selectValue: [], // 暂存的值，加工后的数组，同时保存了当前值所在数组的位置
      activeLayer: 0, // 当前第几级
      showValue: this.placeholder, // 用于展示的值，格式化后显示于输入框的值
      showPlaceholder: !!this.placeholder
    }
  },
  mixins: [emitter],
  components: {},
  props: {
    value: Array,
    placeholder:
    String,
    disabled:
      {
        type: Boolean,
        default:
          false
      },
    tipsText: String, // 下拉框下面的提示文字
    selectText:
      {
        type: Array,
        default:

          function () {
            return ['请选择省', '请选择市', '请选择区']
          }
      },
    split: Array, // 分隔符
    data:
      {// 下拉选项数据
        type: Array,
        default:
          function () {
            return cityData || []
          }
      },
    clear: { // 显示清空按钮
      type: Boolean,
      default:
        true
    },
    change: Function
  },
  watch: {
    showValue () {
      const value = this._formatValue(true)
      this.$emit('input', value)
      this.$emit('change', value)
      this.change && this.change(value)
      this.dispatch('formItem', `${prefixCls}.form.change`, [value, ''])
    }
  },
  methods: {
    _showHide (e) {
      if (this.$el.contains(e.target)) {
        if (this.disabled === true) {
          return
        }
        this.show = !this.show
      } else {
        this.show = false
      }
    },
    __init () {
      let length = this.value.length
      // 有值
      if (this.value && length > 0 && length <= 3) {
        // 有值时要默认在最后一级，根据当前和取当前位置拼成数组
        let data
        for (let i = 0; i < length; i++) {
          if (i === 0) {
            data = this.data
          } else if (i === 1) {
            const index = this.selectValue[0].index
            data = this.data[index].children
          } else if (i === 2) {
            const index = this.selectValue[0].index
            const data1 = this.data[index].children
            const index2 = this.selectValue[1].index
            data = data1[index2].children
          }
          this._setDefaultValue(data, i)
        }
        this.activeLayer = length - 1
        this.showValue = this._formatValue()
      } else {
        this.selectValue.push({
          name: this.selectText[0],
          index: 0
        })
      }
    },
    _setDefaultValue (data, index) {
      for (let i in data) {
        // 最后一个比较特别，是数组不是对象，没有name
        if ((data[i].name || data[i]) === this.value[index]) {
          this.selectValue.push({
            name: data[i].name || data[i],
            index: i
          })
          break
        }
      }
    },
    _childrenClick (item) {
      if (item.hasChild) {
        if (this.activeLayer === 0) {
          this.selectValue.splice(0, this.selectValue.length)// 清空
          // 写入当前项
          this.selectValue.push({
            name: item.name,
            index: item.index// 当前值在数据组中的位置，for时就可以直接找到当前项
          })
          // 写入第二项
          this.selectValue.push({
            name: this.selectText[1]
          })
        } else if (this.activeLayer === 1) {
          // 将请选择修改为当前选择
          this.selectValue[1] = {
            name: item.name,
            index: item.index
          }
          // 将第三级设为请选择
          this.selectValue[2] = {name: this.selectText[2]}
        }
        this.activeLayer++// 跳到下一级
      } else {
        // 关闭下拉，将值给输入框，这里有可能是第二级
        this.selectValue[this.activeLayer] = {
          name: item.name,
          index: item.index
        }
        // 如果只有二级时，这里清除下第三级，保证不出错
        if (this.activeLayer === 1) {
          this.selectValue.splice(2, 1)
        }
        this.showValue = this._formatValue()
        this.show = false
        this.showPlaceholder = false
      }
    },
    _formatValue (type) {
      // 将数组转为文本显示出来
      let val = ''
      let array = []
      for (let i in this.selectValue) {
        if (type) {
          // 为真返回数组
          array.push(this.selectValue[i].name)
        } else {
          // 这里返回显示的值，即文本
          let split = ''
          if (this.split && this.split.length === 3) {
            split = this.split[i]
          }
          val += this.selectValue[i].name + split
        }
      }
      return type ? array : val
    },
    _stopPropagation (e) {
      e.stopPropagation()
    },
    _clearClick () {
      this.showValue = ''
      this.selectValue = []
      this.activeLayer = 0
      this.$nextTick(() => {
        this.selectValue.push({
          name: this.selectText[0],
          index: 0
        })
      })
    }
  },
  computed: {
    children () {
      // 根据selectValue和当前的级数
      let array = []
      let data = this.data
      if (this.activeLayer === 0) {

      } else if (this.activeLayer === 1) {
        // 根据索引直接找到当前的子级，省去一级级的遍历
        const index = this.selectValue[0].index
        data = this.data[index].children
      } else if (this.activeLayer === 2) {
        const index = this.selectValue[0].index
        const data1 = this.data[index].children
        const index2 = this.selectValue[1].index
        data = data1[index2].children
      }
      for (let i in data) {
        array.push({
          name: data[i].name || data[i],
          index: i,
          hasChild: !!data[i].children
        })
      }
      return array
    }
  },
  mounted () {
    document.addEventListener('click', this._showHide)
    this.__init()
  },
  destroyed () {
    document.addEventListener('click', this._showHide)
  },
  filters: {}
}
</script>
