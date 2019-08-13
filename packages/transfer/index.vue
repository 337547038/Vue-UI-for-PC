<!--Created by 337547038 on 2018/1/30.-->
<template>
  <div :class="`${prefixCls}-transfer clearfix`">
    <Panel :titles="titles[0]" :data="dataLeft" arrow='left' @change="_panelChange"></Panel>
    <div class="transfer-control">
      <a class="transfer-control-btn" :class="{'control-move':moveToRight.length>0}" @click="_change('right')"
         v-text="btnText[0]">&gt;</a>
      <a class="transfer-control-btn" :class="{'control-move':moveToLeft.length>0}" @click="_change('left')"
         v-text="btnText[1]">&lt;</a>
    </div>
    <Panel :titles="titles[1]" :data="dataRight" arrow='right' @change="_panelChange"></Panel>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import Panel from './panel'

export default {
  name: `${prefixCls}Transfer`,
  data () {
    return {
      prefixCls: prefixCls,
      moveToRight: [], // 已勾选且可移到右边的项的value
      moveToLeft: [],
      dataLeft: [],
      dataRight: []
    }
  },
  props: {
    data: Array,
    titles: {
      type: Array,
      default: function () {
        return ['列表左', '列表右']
      }
    },
    value: Array,
    btnText: {
      type: Array,
      default: function () {
        return ['>', '<']
      }
    },
    change: Function
  },
  components: {Panel},
  methods: {
    __init () {
      // 先根据value的值，对data的checked进行设置，同时去掉data中的checked属性
      if (this.value && this.value.length) {
        this.value.forEach(v => {
          this.data.forEach(item => {
            if (v === item.value) {
              item.checked = true
              this.dataRight.push({label: item.name, value: item.value, disabled: item.disabled})
            } else {
              item.checked = false
              this.dataLeft.push({label: item.name, value: item.value, disabled: item.disabled})
            }
          })
        })
      } else {
        this.data.forEach(item => {
          if (typeof item.checked === 'undefined' || !item.checked) {
            // 放左边
            this.dataLeft.push({label: item.name, value: item.value, disabled: item.disabled})
          } else {
            // 放右边
            this.dataRight.push({label: item.name, value: item.value, disabled: item.disabled})
          }
        })
      }
    },
    _panelChange (selected, arrow) {
      // selected 为已勾选项的值
      // this.moveToRight = arrow === 'left' && selected.length > 0
      // this.moveToLeft = arrow === 'right' && selected.length > 0
      if (arrow === 'left') {
        this.moveToRight = selected
      } else {
        this.moveToLeft = selected
      }
    },
    _change (toArrow) {
      if (toArrow === 'right') {
        // this.dataLeft 减少对应的项
        // this.dataRight 增加对应的项
        /* this.moveToRight.forEach(item => {
          for (let i = 0; i < this.dataLeft.length; i++) {
            if (this.dataLeft[i].value === item) {
              // index.push(i)
              this.dataRight.push(this.dataLeft[i])
              this.dataLeft.splice(i, 1)
              break
            }
          }
        }) */
        this._moveTo(this.moveToRight, this.dataLeft, this.dataRight, 'toRight')
      } else {
        this._moveTo(this.moveToLeft, this.dataRight, this.dataLeft, 'toLeft')
      }
    },
    _moveTo (move, dataLess, dataAdd, arrow) {
      // move已勾选的项，dataLess要移除的，dataAdd要添加的
      if (move.length === 0) {
        return
      }
      move.forEach(item => {
        for (let i = 0; i < dataLess.length; i++) {
          if (dataLess[i].value === item) {
            dataAdd.push(dataLess[i])
            dataLess.splice(i, 1)
            break
          }
        }
      })
      move.splice(0, move.length) // 清空
      // 处理移动后的变
      let value = []
      this.dataRight.forEach(item => {
        value.push(item.value)
      })
      this.$emit('input', value)
      this.change && this.change(arrow, this.dataLeft, this.dataRight)
    },
    getValue () {
      return [this.dataLeft, this.dataRight]
    }
  },
  computed: {},
  mounted () {
    // console.log(titles);
    this.__init()
  },
  filters: {}
}
</script>
