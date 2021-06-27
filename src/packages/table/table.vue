<!-- Created by 337547038 on 2021/6/22 0022. -->
<template>
  <div
    ref="el"
    :class="{[prefixCls+'-table']:true,[className]:className}"
    :style="{width:width,height:height,overflowY: height?'auto':'',overflowX: width?'auto':''}">
    <div style="display: none">
      <slot></slot>
    </div>
    <table
      :class="{'no-stripe':!stripe,
               'no-border':!border,
               'no-hover':!hover,
               'no-ellipsis':!ellipsis,
               [className]:className}">
      <colgroup>
        <col v-for="(col,index) in colWidth" :key="index" :width="col">
      </colgroup>
      <table-head
        ref="tableHeadEl"
        :drag="drag"
        :title="title"
        :sort-single="sortSingle"
        :show-header="showHeader"
        :select-checked="selectChecked"
        :head-max-layer="headMaxLayer"
        @event="tableHeadEvent" />
      <tbody v-if="data.length===0">
        <tr>
          <td :colspan="columnsData.length" class="empty">
            {{ emptyText }}
          </td>
        </tr>
      </tbody>
      <table-body
        v-else
        :data="data"
        :row-col-span="rowColSpan"
        :has-child="hasChild"
        :lazy-load="lazyLoad"
        :extend-toggle="extendToggle"
        :title="title"
        :selected-rows="selectedRows"
        @rowClick="rowClick"
        @cellClick="cellClick" />
    </table>
    <Pagination
      v-if="Object.keys(pagination).length>0"
      :total="data&&data.length"
      v-bind="pagination" />
    <div v-if="dragLine&&drag&&dragHead.mouseDown" class="table-drag-line"></div>
  </div>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import Pagination from '../pagination/index.vue'

import TableHead from './tableHead.vue'
import TableBody from './tableBody.vue'
import {reactive, provide, toRefs, onMounted, defineComponent, computed, onUnmounted, nextTick, ref, watch} from 'vue'
import pType from '../util/pType'
import {AnyPropName} from '../types'
import {getOffset} from '../util/dom'

export default defineComponent({
  name: `${prefixCls}Table`,
  components: {TableHead, TableBody, Pagination},
  props: {
    data: pType.array([]),
    height: pType.string(), // table的高，溢出显示滚动条，且表头固定
    width: pType.string(),
    className: pType.string(),
    hover: pType.bool(true), // 鼠标悬停时的高亮
    border: pType.bool(true), // 表格纵向边框
    stripe: pType.bool(true),// 是否显示间隔斑马纹
    ellipsis: pType.bool(true),
    showHeader: pType.bool(true), // 是否显示表头
    drag: pType.bool(true), // 允许拖动表头
    dragLine: pType.bool(true),
    dragWidth: pType.array<number>([60, 0]),// 拖动时的最小宽和最大宽限制，0为不限
    title: pType.bool(true), //鼠标滑过单元格时显示title提示
    emptyText: pType.string('暂无数据'),
    rowColSpan: pType.func(),
    hasChild: pType.bool(false),
    lazyLoad: pType.func(),
    extendToggle: pType.bool(), // 默认展开扩展
    sortSingle: pType.bool(), // 单个排序
    columns: pType.array(), // 表头数据
    pagination: pType.object() // 分页相关参数
  },
  emits: ['selectClick', 'sortChange', 'rowClick', 'cellClick', 'dragChange'],
  setup(props, {emit, slots}) {
    const el = ref()
    const tableHeadEl = ref()
    const columnsData = ref<AnyPropName>([])
    const state = reactive<AnyPropName>({
      colWidth: [],
      selectedRows: [], // 已选择的行
      dragHead: {}, // 临时存放表头拖动信息
      ctrlIsDown: false, // 是否按下ctrl键
      ctrlRowIndex: -1, // 按下ctrl键盘时点击的checkbox序号
      isSetThWidth: false, // 用于记录是否已经重新设置过表头的实际宽
      headMaxLayer: 1 // 表头的层级
    })
    provide('columnsType', !!props.columns) // column组件用来判断添加表头数据
    const selectChecked = computed(() => {
      // 表头checkbox勾选状态0全不选，1全选，2半选
      const len = state.selectedRows.length
      if (len === 0) {
        return 0 // 全不选
      } else if (len === props.data.length) {
        return 1 // 全选
      } else {
        return 2
      }
    })
    // 对外提供的方法，用于多选或取消表格行
    const toggleRowSelection = (row: any, selected = true) => {
      // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）row, selected
      const index = state.selectedRows.indexOf(row)
      if (!selected) {
        // 取消勾选当前行
        if (index !== -1) {
          state.selectedRows.splice(index, 1)
        }
      } else {
        // 勾选当前行，没有时添加。有时不重复添加
        if (index === -1) {
          state.selectedRows.push(row)
        }
      }
    }
    watch(() => props.columns, () => {
      columnsData.value = []
      getColumns(props.columns)
    })
    const getColumns = (data: any, layer = 0) => {
      layer++
      if (state.headMaxLayer < layer) {
        state.headMaxLayer = layer
      }
      // 使用传参形式
      // 有slots时，将slots添加到columns里
      data.forEach((item: any) => {
        item.layer = layer // 表示层级
        if (item.children) {
          // 有多级表头
          item.colspan = item.children.length // 添加一个属性，表示横向需要合并children长度
          columnsData.value.push(item)
          getColumns(item.children, layer)
        } else {
          // 有具名插槽时
          if (Object.keys(slots).length) {
            for (let key in slots) {
              if (item.prop === key) {
                item.slots = {
                  default: slots[key]
                }
              }
            }
          }
          columnsData.value.push(item)
        }
      })
    }
    // 表头使用参数形式
    if (props.columns) {
      getColumns(props.columns)
    }
    provide('getColumns', columnsData) // columns.value的形式不是双向的
    provide('setSelectedRows', (bool: boolean, row: any, index: number) => {
      // 由单元格勾选时触发，添加或删除
      const indexOf = state.selectedRows.indexOf(row)
      if (bool && indexOf === -1) {
        state.selectedRows.push(row)
      } else {
        state.selectedRows.splice(indexOf, 1)
      }
      if (state.ctrlIsDown) {
        // ctrl键盘当前为按下状态
        if (state.ctrlRowIndex !== -1) {
          // 不为空，表示已经点击了第一个。此时将上一次保存的即ctrlRowIndex和index之间的记录勾上或取消
          let start = state.ctrlRowIndex
          let end = index
          if (state.ctrlRowIndex > index) {
            start = index
            end = state.ctrlRowIndex
          }
          for (let i = start; i < end; i++) {
            toggleRowSelection(props.data[i], indexOf === -1)
          }
        }
        state.ctrlRowIndex = index
      }
      emit('selectClick', state.selectedRows, bool, row, index)
    })
    // 获取设置列宽
    const getColWidth = () => {
      columnsData.value.forEach((item: any) => {
        state.colWidth.push(item.width)
      })
    }
    // 全选或全不选事件
    const toggleSelection = (bool: boolean) => {
      // boolean=true全选，false全不选
      if (bool) {
        // 用于多选表格，切换所有行的选中状态
        state.selectedRows = [...props.data]
        // state.selectChecked = 1
      } else {
        // 用于多选表格，清空用户的选择
        state.selectedRows.splice(0, state.selectedRows.length)
        // state.selectChecked = 0
      }
    }
    // 拖动时的垂直线
    const setTableDragLine = (event: MouseEvent) => {
      nextTick(() => {
        // 当前表格偏移位置
        const tableOffset = getOffset(el.value)
        let dragLine = el.value.querySelector('.table-drag-line')
        if (dragLine) {
          dragLine.style.left = (event.pageX - tableOffset.left) + 'px'
          dragLine.style.height = tableOffset.height + 'px'
        }
      })
    }
    const setTHWidth = () => {
      if (!props.drag) {
        return
      }
      const th = el.value && el.value.querySelectorAll('th')
      //      console.log(th)
      state.colWidth = []
      th.forEach((item: HTMLElement) => {
        state.colWidth.push(item.offsetWidth + 'px')
      })
    }
    const mouseDown = (obj: AnyPropName) => {
      if (!props.drag) {
        return
      }
      if (!state.isSetThWidth) {
        // 重新设置表头的实际宽，仅在第一次点击时重置
        setTHWidth()
        state.isSetThWidth = true
      }
      state.dragHead = {
        mouseDown: true,
        oldX: obj.evt.pageX,
        oldWidth: parseInt(state.colWidth[obj.index].replace('px', '')) || 0, // 拖动前的单元格宽
        index: obj.index
      }
      setTableDragLine(obj.evt)
      // 不让选择
      obj.evt.preventDefault()
    }
    const mouseMove = (obj: AnyPropName) => {
      if (!props.drag) {
        return
      }
      const event = obj.evt
      let newWidth = state.dragHead.oldWidth + (event.pageX - state.dragHead.oldX) // 移动鼠标实现宽
      // console.log(newWidth)
      // 如果设置了最小宽或最大
      if (props.dragWidth[0] > 0 && (newWidth < props.dragWidth[0])) {
        return
      }
      if (props.dragWidth[1] > 0 && (newWidth > props.dragWidth[1])) {
        return
      }
      if (state.dragHead.mouseDown) {
        setTableDragLine(event)
        // 拖动时有可能会存在意外，这里也限制一下
        if (props.dragWidth[0] > 0 && newWidth < props.dragWidth[0]) {
          newWidth = props.dragWidth[0] // 过小时使用最小值
        }
        if (props.dragWidth[1] > 0 && newWidth > props.dragWidth[1]) {
          newWidth = props.dragWidth[1] // 超出限制时使用最大值
        }
        state.colWidth[state.dragHead.index] = newWidth + 'px'
      }
    }
    const headMouseUp = () => {
      if (props.drag && state.dragHead && state.dragHead.mouseDown) {
        emit('dragChange', state.colWidth)
      }
      state.dragHead = {
        mouseDown: false,
        oldX: '',
        oldWidth: '',
        index: ''
      }
    }
    // 表头所有事件
    const tableHeadEvent = (type: string, obj: any) => {
      switch (type) {
        case 'checkboxChange':
          toggleSelection(obj)
          emit('selectClick', state.selectedRows, obj)
          break
        case 'mouseDown':
          mouseDown(obj)
          break
        case 'mouseMove':
          mouseMove(obj)
          break
        case 'sortClick':
          emit('sortChange', obj)
          break
      }
    }
    const rowClick = (row: any, index: number) => {
      emit('rowClick', row, index)
    }
    const cellClick = (row: any, column: any, rowIndex: number, columnIndex: number) => {
      emit('cellClick', row, column, rowIndex, columnIndex)
    }
    // 用于清空排序条件
    const clearSort = () => {
      tableHeadEl.value.sortBy = {}
    }
    const keyup = (evt: KeyboardEvent) => {
      if (evt.key === 'Control') {
        // 恢复
        state.ctrlIsDown = false
        state.ctrlRowIndex = -1
      }
    }
    const keydown = (evt: KeyboardEvent) => {
      // console.log(evt)
      if (evt.key === 'Control' && !state.ctrlIsDown) {
        state.ctrlIsDown = true
      }
    }
    const scrollHandle = () => {
      const scrollTop = el.value.scrollTop
      const scrollLeft = el.value.scrollLeft
      tableHeadEl.value.scrollTop(scrollTop)
      // 左右滚动固定
      const fixedLeft = el.value.querySelectorAll('.left')
      if (fixedLeft.length > 0) {
        // left
        if (scrollLeft > 0) {
          for (let i = 0, len = fixedLeft.length; i < len; i++) {
            fixedLeft[i].style.transform = `translateX(${scrollLeft}px) translateZ(90px)`
            fixedLeft[i].style.webkitTransform = `translateX(${scrollLeft}px) translateZ(90px)`
          }
        } else {
          for (let i = 0, len = fixedLeft.length; i < len; i++) {
            fixedLeft[i].style.transform = ''
          }
        }
      }
      fixedRight(scrollLeft)
    }
    const fixedRight = (scrollLeft: number) => {
      const fixedRight = el.value.querySelectorAll('.right')
      const tableWidth = el.value.querySelector('table').offsetWidth
      // 可移动的最大宽
      // div可见宽
      let moveMaxWidth = scrollLeft - (tableWidth - el.value.clientWidth)
      if (fixedRight.length > 0) {
        for (let i = 0, len = fixedRight.length; i < len; i++) {
          fixedRight[i].style.transform = `translateX(${moveMaxWidth}px)translateZ(90px)`
          fixedRight[i].style.webkitTransform = `translateX(${moveMaxWidth}px)translateZ(90px)`
        }
      }
    }
    const fixedHead = () => {
      // 如果有高和表头，则固定表头
      if (props.height && props.showHeader && el) {
        el.value.addEventListener('scroll', scrollHandle, false)
      }
      fixedRight(0)// 初始化时横向滚动条在0位置
    }
    // 返回已勾选的行
    const getSelectAll = () => {
      return state.selectedRows
    }
    onMounted(() => {
      getColWidth()
      window.addEventListener('keydown', keydown)
      window.addEventListener('keyup', keyup)
      if (props.drag) {
        document.addEventListener('mouseup', headMouseUp)
      }
      // 固定表头和列初始
      nextTick(() => {
        fixedHead()
      })
    })
    onUnmounted(() => {
      window.removeEventListener('keydown', keydown)
      window.removeEventListener('keyup', keyup)
      // window.removeEventListener('resize', resize)
      if (props.drag) {
        document.removeEventListener('mouseup', headMouseUp)
      }
    })
    return {
      prefixCls,
      ...toRefs(state),
      tableHeadEvent,
      rowClick,
      cellClick,
      toggleSelection,
      clearSort,
      selectChecked,
      el,
      tableHeadEl,
      columnsData,
      getSelectAll,
      toggleRowSelection
    }
  }
})
</script>
