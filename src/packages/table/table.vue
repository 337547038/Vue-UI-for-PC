<!-- Created by 337547038 on 2021/6/22 0022. -->
<template>
  <div
    :class="{[prefixCls+'-table']:true}"
    :style="{width:width}">
    <div style="display: none">
      <slot></slot>
    </div>
    <div v-if="splitHeader" ref="thead" class="thead" :style="{overflowX:width?'hidden':'',width:width}">
      <table
        class="table-thead"
        :class="{'table-stripe':stripe,
                 'table-border':border,
                 'table-hover':hover,
                 'table-ellipsis':ellipsis,
                 [className]:className}">
        <colgroup>
          <col v-for="(col,index) in colWidth" :key="index" :width="col">
        </colgroup>
        <table-head
          :drag="drag"
          :title="title"
          :show-header="showHeader"
          :select-checked="selectChecked"
          @event="tableHeadEvent" />
      </table>
    </div>
    <div
      class="tbody"
      :style="{overflowY: height?'auto':'',height:height,width:width}">
      <table
        class="table-tbody"
        :class="{'table-stripe':stripe,
                 'table-border':border,
                 'table-hover':hover,
                 'table-ellipsis':ellipsis,
                 [className]:className}">
        <colgroup>
          <col v-for="(col,index) in colWidth" :key="index" :width="col">
        </colgroup>
        <table-head
          v-if="!splitHeader"
          :drag="drag"
          :title="title"
          :show-header="showHeader"
          :select-checked="selectChecked"
          @event="tableHeadEvent" />
        <tbody v-if="data.length===0">
        <tr>
          <td :colspan="columns.length" class="empty">
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
    </div>
    <div class="table-drag-line" v-if="drag&&dragHead.mouseDown"></div>
  </div>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'

import TableHead from './tableHead.vue'
import TableBody from './tableBody.vue'
import {reactive, provide, toRefs, onMounted, defineComponent} from 'vue'
import pType from '../util/pType'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}Table`,
  components: {TableHead, TableBody},
  props: {
    data: pType.array([]),
    height: pType.string(), // table的高，溢出显示滚动条，且表头固定
    width: pType.string(),
    splitHeader: pType.bool(false), // 是否将表头的主体部分折分成两个表格
    className: pType.string(),
    hover: pType.bool(true), // 鼠标悬停时的高亮
    border: pType.bool(true), // 表格纵向边框
    stripe: pType.bool(true),// 是否显示间隔斑马纹
    ellipsis: pType.bool(true),
    showHeader: pType.bool(true), // 是否显示表头
    drag: pType.bool(true), // 允许拖动表头
    title: pType.bool(true), //鼠标滑过单元格时显示title提示
    emptyText: pType.string('暂无数据'),
    rowColSpan: pType.func(),
    hasChild: pType.bool(false),
    lazyLoad: pType.func(),
    extendToggle: pType.bool // 默认展开扩展
  },
  emits:['selectClick'],
  setup(props,{emit}) {
    const state = reactive<AnyPropName>({
      columns: [],
      colWidth: [],
      selectChecked: 0, // 表头checkbox勾选状态0全不选，1全选，2半选
      selectedRows: [], // 已选择的行
      dragHead: {}, // 临时存放表头拖动信息
    })
    provide('getColumns', state.columns)
    provide('setSelectedRows', (bool:boolean,obj:any)=>{
      // 由单元格勾选时触发，添加或删除
      console.log(bool)
      console.log(obj)
    })
    // 获取设置列宽
    const getColWidth = () => {
      state.columns.forEach((item: any) => {
        state.colWidth.push(item.width)
      })
    }
    // 全选或全不选事件
    const toggleSelection=(bool:boolean)=>{
      // boolean=true全选，false全不选
      if (bool) {
        // 用于多选表格，切换所有行的选中状态
        state.selectedRows = [...props.data]
        state.selectChecked = 1
      } else {
        // 用于多选表格，清空用户的选择
        state.selectedRows.splice(0, state.selectedRows.length)
        state.selectChecked = 0
      }
    }
    // 表头所有事件
    const tableHeadEvent = (type: string, obj: any) => {
      switch (type) {
        case 'checkboxChange':
          toggleSelection(obj)
          emit('selectClick', state.selectedRows, obj)
          break
      }
    }
    const rowClick = () => {

    }
    const cellClick = () => {

    }
    onMounted(() => {
      getColWidth()
    })
    return {
      prefixCls,
      ...toRefs(state),
      tableHeadEvent,
      rowClick,
      cellClick,
      toggleSelection
    }
  }
})
</script>
