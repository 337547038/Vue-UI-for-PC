<!--Created by 337547038 on 2018/1/26.-->
<template>
  <div :class="`${prefixCls}-tree`">
    <ul>
      <treeItem
        v-for="(item,index) in data"
        :data="item"
        :key="index"
        @toggle="_toggle"
        @checkboxChange="_checkboxChange"
      ></treeItem>
    </ul>
  </div>
</template>
<script>
import {prefixCls} from '../prefix'
import treeItem from './treeItem2'

export default {
  name: `${prefixCls}Tree`,
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    data: Array,
    lazy: {
      type: Boolean,
      default: false
    },
    toggle: Function,
    showValue: {
      // 在名称后面显示值
      type: Boolean,
      default: false
    },
    showCheckbox: {
      // 显示checkbox
      type: Boolean,
      default: false
    }
  },
  components: {treeItem},
  methods: {
    _click(item) {
      // console.log('index')
      // console.log(item)
      /* this.active = item.name
      this.$emit('click', item)
      this.click && this.click(item) */
    },
    _toggle(item) {
      console.log('index')
      console.log(item)
      // 展开或收起
      this.$emit('toggle', item)
      this.toggle && this.toggle(item)
    },
    // checkbox勾选事件，对父元素设置勾选或取消半选状态
    _checkboxChange(data) {
      console.log('_checkboxChange index')
      console.log(data)
      data.someSelect = false
      const obj = this._findAllParent(this.data, data.key, []) // 查找所有父元素
      console.log(obj)
      obj.forEach(item => {
        if (item.children) {
          // 没有时先添加属性
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', '')
          }
          let checkedAll = true // 表示全选
          let checkedCancel = true // 表示全不选
          item.children.forEach(child => {
            if (!child.checked) {
              checkedAll = false
            } else {
              checkedCancel = false
            }
          })
          // 还原状态
          if (typeof item.someSelect === 'undefined') {
            this.$set(item, 'someSelect', false)
          } else {
            item.someSelect = false
          }
          if (checkedAll) {
            // 表示所有子级已勾选
            console.log('全选')
            item.checked = true
            item.someSelect = false
          } else if (checkedCancel) {
            // 表示全不选
            console.log('全不选')
            item.checked = false
            item.someSelect = false
          } else {
            // 选择部分
            console.log('选择部分')
            item.checked = false
            item.someSelect = true
          }
        }
      })
    },
    // 查找当前节点的父元素
    _findParent(data, nodeId, allParent, parentNodes) {
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (item.key === nodeId) {
          if (parentNodes) {
            allParent.push(parentNodes)
          }
          break
        } else {
          if (item.children && item.children.length > 0) {
            this._findParent(item.children, nodeId, allParent, item)
          }
        }
      }
    },
    // 查找当前节点的所有父元素
    _findAllParent(data, nodeId, allParent = [], index = 0) {
      if (!nodeId) {
        return
      }
      this._findParent(data, nodeId, allParent)
      if (allParent.length > 0) {
        const parentNode = allParent[index]
        if (parentNode) {
          this._findAllParent(data, parentNode.key, allParent, ++index)
        }
      }
      return allParent
    },
    // 返回当前勾选key值
    getValue() {
      let checkedKey = []
      let checkedName = []
      this._getValueFor(this.data, checkedKey, checkedName)
      return [checkedKey, checkedName]
    },
    // 递归找出所有已勾选的项
    _getValueFor(data, key, name) {
      data.forEach(item => {
        if (item.checked) {
          key.push(item.key)
          name.push(item.name)
        }
        if (item.children && item.children.length > 0) {
          this._getValueFor(item.children, key, name)
        }
      })
    },
    // 这里仅对指定项添加勾选状态，并不对子元素全选操作
    setValue(key) {
      key.forEach(item => {
        this._setValueFor(this.data, item)
      })
    },
    // 递归设置值
    _setValueFor(data, key) {
      data.forEach(item => {
        if (item.key === key) {
          if (item.disabled) {
            return
          }
          this.$set(item, 'checked', true)
          this._checkboxChange(item) // 处理父元素
          return false
        }
        if (item.children && item.children.length > 0) {
          this._setValueFor(item.children, key)
        }
      })
    }
  },
  computed: {},
  mounted() {
  },
  filters: {}
}
</script>
