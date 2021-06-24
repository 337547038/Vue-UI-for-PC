<!-- Created by 337547038 on 2021/6/24 0024. -->
<template>
  <tbody>
    <template v-for="(row,rowIndex) in data" :key="rowIndex">
      <tr
        :class="{'warning':selectedRows.indexOf(row) !== -1,[`parent-tr-${rowIndex+1}`]:colsExtend.length,[row.trClass]:row.trClass}"
        @click="rowClick(row, rowIndex)">
        <table-td
          v-for="(column,indexTd) in colsNoExtend"
          :key="indexTd"
          :checked="selectedRows.indexOf(row) !== -1"
          :column="column"
          :row="row"
          :index="rowIndex"
          :column-index="indexTd"
          :title="title"
          :show-hide-extend="showHideExtend"
          :toggle="toggle[rowIndex]===undefined?defaultToggle:toggle[rowIndex]"
          @cellClick="cellClick" />
      </tr>
      <!--子级行-->
      <template v-if="hasChild">
        <tr
          v-for="(item,index) in row.children"
          v-show="toggle[rowIndex]===undefined?defaultToggle:toggle[rowIndex]"
          :key="'child'+index"
          :class="{[row.trClass]:row.trClass}"
          class="tr-child"
          @cllick="rowClick(item, index)">
          <TableTd
            v-for="(child,childIndex) in colsNoExtend"
            :key="'childTd'+childIndex"
            :column="child"
            :row="item"
            :index="index"
            :column-index="childIndex"
            :title="title"
            :parent-row="row"
            @cellClick="cellClick" />
        </tr>
      </template>
      <!--扩展列-->
      <tr
        v-if="colsExtend.length>0"
        v-show="toggle[rowIndex]===undefined?defaultToggle:toggle[rowIndex]"
        :key="'tr' + rowIndex"
        class="extend"
        :class="{'warning':selectedRows.indexOf(row) !== -1,[`extend-tr-${rowIndex+1}`]:true}"
        @cllick="rowClick(row, rowIndex)">
        <TableTd
          v-for="(column,indexTd) in colsExtend"
          :key="indexTd"
          :column="column"
          :row="row"
          :index="rowIndex"
          :title="title"
          :colspan="colsNoExtend.length"
          :selectedRows="selectedRows"
          @cellClick="cellClick" />
      </tr>
    </template>
  </tbody>
</template>

<script lang="ts">
import {reactive, inject, toRefs, defineComponent, computed} from 'vue'
import TableTd from './TableTd.vue'
import {AnyPropName} from '../types'
import pType from '../util/pType'

export default defineComponent({
  name: 'TableBody',
  components: {TableTd},
  props: {
    data: pType.object(),
    rowColSpan: pType.func(),
    hasChild: pType.bool(),
    lazyLoad: pType.func(),
    extendToggle: pType.bool(),
    title: pType.bool(),
    selectedRows: pType.array()
  },
  emits: ['rowClick', 'cellClick'],
  setup(props, {emit}) {
    const getColumns = inject('getColumns') as AnyPropName
    const state = reactive<any>({
      columns: getColumns,
      defaultToggle: props.extendToggle, // 默认展开或收起状态
      toggle: {}, // {1: true, 2: false, 0: false} // 对应每行展开或收起状态
      rowspanColspanList: []
    })
    const colsExtend = computed(() => {
      return state.columns.filter((item: any) => {
        return item.type === 'extend'
      })
    })
    const colsNoExtend = computed(() => {
      // 不带扩展的
      return state.columns.filter((item: any) => {
        return item.type !== 'extend'
      })
    })
    // 展开或收起扩展行
    const showHideExtend = (index: number) => {
      // 存在扩展时或有子级时
      if (colsExtend.value.length > 0 || props.hasChild) {
        if (typeof state.toggle[index] === 'undefined') {
          state.toggle[index] = !state.defaultToggle
        } else {
          state.toggle[index] = !state.toggle[index]
        }
        // 展开时，如果是懒加载
        if (state.toggle[index] && props.lazyLoad) {
          props.lazyLoad((row: any, child: any) => {
            row.children = child
          })
        }
      }
    }
    const rowClick = (row: any, index: number) => {
      emit('rowClick', row, index)
    }
    const cellClick = (row: any, column: any, rowIndex: number, columnIndex: number) => {
      emit('cellClick', row, column, rowIndex, columnIndex)
    }
    return {
      ...toRefs(state),
      colsExtend,
      colsNoExtend,
      showHideExtend,
      rowClick,
      cellClick
    }
  }
})
</script>
