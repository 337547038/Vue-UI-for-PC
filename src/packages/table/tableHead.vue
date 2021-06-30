<!-- Created by 337547038 on 2021/6/24 0024. -->
<template>
  <thead v-if="showHeader" ref="el">
    <tr v-for="thLayer in headMaxLayer" :key="thLayer" :class="{drag:drag}">
      <th
        v-for="(th,thIndex) in getColumnsFilter(thLayer)"
        :key="thIndex"
        :class="[th.fixed,th.className]"
        :style="{textAlign:th.align}"
        :title="getShowHoverTitle(th)"
        :colspan="th.colspan"
        :rowspan="th.rowspan"
        @mousemove="headMouseMove($event,thIndex)">
        <Checkbox
          v-if="th.type==='selection'"
          v-model="checkboxChecked"
          :class="{'some-select':selectChecked===2}"
          value="1"
          @change="checkboxChange" />
        <template v-else>
          {{ th.label }}
          <span v-if="th.sortBy" class="caret-wrapper">
            <i class="sort-caret asc" :class="{active:sortBy[th.prop] === 'asc'}" @click="sortClick(th.prop,'asc')"></i>
            <i
              class="sort-caret desc"
              :class="{active:sortBy[th.prop] === 'desc'}"
              @click="sortClick(th.prop,'desc')"></i>
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
import {defineComponent, reactive, toRefs, inject, watch, ref} from 'vue'
import {Checkbox} from '../checkbox/index'
import {AnyPropName} from '../types'

export default defineComponent({
  name: 'TableHead',
  components: {Checkbox},
  props: {
    showHeader: pType.bool(),
    drag: pType.bool(),
    title: pType.bool(),
    selectChecked: pType.number(), // 表头checkbox勾选状态0全不选，1全选，2半选
    sortSingle: pType.bool(),
    headMaxLayer: pType.number(1)
  },
  emits: ['event'],
  setup(props, {emit}) {
    const el = ref()
    const getColumns = inject('getColumns', []) as AnyPropName
    const state = reactive<AnyPropName>({
      checkboxChecked: props.selectChecked.toString(),
      // columns: getColumns,
      sortBy: {}
    })
    watch(() => props.selectChecked, (v: number) => {
      state.checkboxChecked = v.toString()
    })

    /*onMounted(() => {

    })*/
    /*const columnsFilter = computed(() => {
      return getColumns.value.filter((item: any) => {
        return item.type !== 'extend' && !item.children
      })
    })*/
    const getColumnsFilter = (index: number) => {
      return getColumns.value.filter((item: any) => {
        return item.type !== 'extend' && item.layer === index
      })
    }
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
    const headMouseMove = (evt: MouseEvent, index: number) => {
      emitEvent('mouseMove', {evt: evt, index: index})
    }
    const headMouseDown = (evt: MouseEvent, index: number) => {
      emitEvent('mouseDown', {evt: evt, index: index})
    }
    // checkbox勾选事件
    const checkboxChange = (val: number | boolean) => {
      emitEvent('checkboxChange', !!val)
    }
    // 排序事件
    const sortClick = (prop: string, order: string) => {
      if (props.sortSingle) {
        // 只支持单个，先清空
        state.sortBy = {}
      }
      state.sortBy[prop] = order
      emitEvent('sortClick', state.sortBy)
    }
    const emitEvent = (type: string, obj: any) => {
      emit('event', type, obj)
    }
    // 由table组件调用，固定表头滚动时
    const scrollTop = (scrollTop: number) => {
      if (scrollTop) {
        el.value.style.transform = `translateY(${scrollTop}px) translateZ(100px)`
        el.value.className = 'transform'
      } else {
        el.value.style.transform = ''
        el.value.className = ''
      }
    }
    return {
      ...toRefs(state),
      getShowHoverTitle,
      headMouseMove,
      checkboxChange,
      sortClick,
      headMouseDown,
      el,
      scrollTop,
      getColumnsFilter
    }
  }
})
</script>
