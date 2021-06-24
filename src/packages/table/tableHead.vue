<!-- Created by 337547038 on 2021/6/24 0024. -->
<template>
  <thead v-if="showHeader">
  <tr>
    <th
      v-for="(th,thIndex) in columns"
      :key="thIndex"
      :class="[th.fixed,th.className]"
      :style="{textAlign:th.align}"
      :title="getShowHoverTitle(th)"
      @mousemove="headMouseMove($event,thIndex)">
      <Checkbox
        v-if="th.type==='selection'"
        v-model="checkboxChecked"
        :class="{'un-select':selectChecked===2}"
        value="1"
        @change="checkboxChange" />
      <template v-else>
        {{ th.label }}
        <span v-if="th.sortBy" class="caret-wrapper">
            <i class="sort-caret asc" @click="sortClick(th.prop,'asc',$event)"></i>
            <i class="sort-caret desc" @click="sortClick(th.prop,'desc',$event)"></i>
          </span>
      </template>
      <a
        v-if="drag&&th.drag"
        class="drag-line"
        @mousedown="headMouseDown($event,thIndex)"></a>
    </th>
  </tr>
  </thead>
</template>

<script lang="ts">
import pType from '../util/pType'
import {defineComponent, reactive, toRefs, inject, watch} from 'vue'
import {Checkbox} from '../checkbox/index'
import {AnyPropName} from '../types'

export default defineComponent({
  name: 'TableHead',
  components: {Checkbox},
  props: {
    showHeader: pType.bool(),
    drag: pType.bool(),
    title: pType.bool(),
    selectChecked: pType.number() // 表头checkbox勾选状态0全不选，1全选，2半选
  },
  emits: ['event'],
  setup(props, {emit}) {
    const getColumns = inject('getColumns') as AnyPropName
    const state = reactive({
      checkboxChecked: props.selectChecked.toString(),
      columns: getColumns
    })
    watch(() => props.selectChecked, (v: number) => {
      state.checkboxChecked = v.toString()
    })
    // 鼠标滑过单元格时显示title提示，当设置为false时不显示，否则使用父级table的设置
    const getShowHoverTitle = (item: any) => {
      if (!item.title) {
        return null // 当前设置了false不显示
      } else {
        if (props.title) {
          return item.label
        }
      }
      return null
    }
    // 表头拖动
    const headMouseMove = () => {

    }
    const headMouseDown = () => {
    }
    // checkbox勾选事件
    const checkboxChange = (val: number | boolean) => {
      emitEvent('checkboxChange', !!val)
    }
    // 排序事件
    const sortClick = () => {

    }
    const emitEvent = (type: string, obj: any) => {
      emit('event', type, obj)
    }
    return {
      ...toRefs(state),
      getShowHoverTitle,
      headMouseMove,
      checkboxChange,
      sortClick,
      headMouseDown
    }
  }
})
</script>
