<!--Created by 337547038 on 2018/1/26.-->
<template>
  <div :class="`${prefixCls}-tree`">
    <treeItem @toggle="toggle" />
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import treeItem from './treeNode.vue'
import pType from '../util/pType'
import {defineComponent, provide, toRefs, watch, reactive} from 'vue'
import {TreeList} from '../types/tree'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}Tree`,
  components: {treeItem},
  props: {
    data: pType.array([]),
    lazy: pType.bool(),
    showCheckbox: pType.bool(), // 显示checkbox
    modelValue: [String, Array]
  },
  emits: ['click', 'update:modelValue', 'change'],
  setup(props, {emit, slots}) {
    const {modelValue} = toRefs(props)
    const state = reactive<AnyPropName>({
      dataList: [],
      lazy: props.lazy,
      showCheckbox: props.showCheckbox,
      modelValue: props.modelValue
    })
    provide('propsData', state)
    provide('treeSlots', slots)
    // checkbox点击事件
    const checkboxChange = (item: TreeList) => {
      emit('change', item)
      // console.log(item)
      item.tid && setParentChecked(item.tid) // 设置父级
      setChildChecked(item.id, item.checked as boolean) // 设置子级
    }
    // 将父节点全选或全不选
    const setParentChecked = (id: string) => {
      if (!id) {
        return
      }
      let parent: any = {}
      let checked = true
      let someChecked = false
      state.dataList.forEach((item: TreeList) => {
        if (item.id === id) {
          parent = item
        }
        if (item.tid === id) {
          // 兄弟节点，其中有一条没选，则false
          if (!item.checked) {
            checked = false
          }
          // 有其中一条选择了，则有部分选择
          if (item.checked) {
            someChecked = true
          }
        }
      })
      parent.checked = checked
      if (checked) {
        // 全选时，修改部分选择为false
        someChecked = false
      }
      parent.someChecked = someChecked
      // 继续上一层
      setParentChecked(parent.tid)
    }
    // 设置子级
    const setChildChecked = (id: string, bool: boolean) => {
      state.dataList.forEach((item: TreeList) => {
        if (item.tid === id) {
          item.checked = bool
          if (item.hasChild) {
            setChildChecked(item.id, bool)
          }
        }
      })
    }
    provide('checkboxChange', checkboxChange)
    watch(() => props.data, (val: AnyPropName) => {
      formatData(val)
    })
    watch(() => props.modelValue, (val: AnyPropName) => {
      state.modelValue = val
    })
    // 格式化数据
    const formatData = (data: AnyPropName, tid?: string) => {
      data && data.forEach((item: TreeList) => {
        const newItem = JSON.parse(JSON.stringify(item))
        delete newItem.children
        const hasChild = item.children && item.children.length > 0
        let checked = {}
        if (props.showCheckbox) {
          // 添加选中属性
          checked = {checked: false, someChecked: false}
        }
        // 如果没有id时，根据label自动生成一个
        if (!newItem.id) {
          newItem.id = item.label + '-' + Math.random().toString(36).substr(2, 8)
        }
        state.dataList.push(Object.assign({}, checked, newItem, {tid: tid, hasChild: hasChild}))
        if (hasChild) {
          formatData(item.children, newItem.id)
        }
      })
    }
    formatData(props.data)
    const toggle = (item: TreeList, loading: any) => {
      if (props.lazy) {
        // 异步加载时
        emit('click', item, (result: any) => {
          item.lazy = true // 用来表示已经加载过数据了
          item.hasChild = true // 添加有子节点标识，才会展开子级
          loading && loading(false) // 关闭加载等待
          let checked = {}
          if (props.showCheckbox) {
            // 添加选中属性
            checked = {checked: false}
          }
          // 将数据添加上父节点信息，追加到数据列表
          result.forEach((re: TreeList) => {
            state.dataList.push(Object.assign({}, checked, re, {tid: item.id}))
          })
        })
      } else {
        emit('click', item)
      }
      // 更新v-model
      if (typeof props.modelValue === 'object') {
        const temp = (modelValue && modelValue.value) as string[]
        const index = temp.indexOf(item.id)
        if (index !== -1) {
          // 表示存在，则删除
          temp.splice(index, 1)
        } else {
          temp.push(item.id)
        }
        emit('update:modelValue', temp)
      } else {
        emit('update:modelValue', item.id)
      }
    }
    return {
      prefixCls,
      toggle
    }
  }
})
</script>
