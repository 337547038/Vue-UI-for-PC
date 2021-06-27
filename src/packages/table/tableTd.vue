<script lang="ts">
import {h, defineComponent, ref, computed, inject, watch} from 'vue'
import pType from '../util/pType'
import {Checkbox} from '../checkbox/index'
import checkbox from '../checkbox/checkbox.vue'
import {AnyPropName} from '../types'

export default defineComponent({
  name: 'TableTd',
  components: {Checkbox},
  props: {
    column: pType.object(),
    columnIndex: pType.number(),//当前列号
    row: pType.object(),
    index: pType.number(),// 当前行号
    toggle: pType.bool(), // 扩展或子级展开收起状态
    parentRow: pType.object(), //子级下拉时，包含的父级信息
    title: pType.bool(),
    checked: pType.bool(),
    colspan: pType.number(), // 扩展列时才有传
    rowColSpan: pType.func(),
    rowspanColspanList: pType.array([])
  },
  emits: ['cellClick', 'toggleExtend'],
  setup(props, {emit}) {
    /*onMounted(() => {
    })*/
    const setSelectedRows = inject('setSelectedRows') as any

    let classNameTd = ref(props.column.fixed)
    const pcl = ref(props.column.className)
    if (pcl.value && props.column.fixed) {
      classNameTd.value += ' ' + pcl.value
    } else if (pcl.value) {
      classNameTd.value = pcl.value
    }
    let display = false
    let rowspan = 0
    let colspan = ref(props.colspan).value
    // 鼠标滑过单元格时显示title提示，当设置为false时不显示，否则使用父级table的设置
    const hoverTitle = computed(() => {
      if (!props.column.title) {
        return null // 当前设置了false不显示
      } else {
        if (props.title) {
          return props.row[props.column.prop]
        }
      }
      return null
    })
    const onCellClick = (evt: MouseEvent) => {
      emit('cellClick', props.row, props.column, props.index, props.columnIndex)
      // 单元格点击
      // evt.stopPropagation()
    }
    const checkValue = ref(props.checked)
    watch(() => props.checked, (val: boolean) => {
      checkValue.value = val
    })
    const extendToggle = () => {
      emit('toggleExtend')
    }
    const defaultSlots = () => {
      if (props.column.slots && Object.keys(props.column.slots).length > 0) {
        return props.column.slots.default({
          row: props.row,
          index: props.index,
          extend: extendToggle,
          toggle: props.toggle,
          parentRow: props.parentRow
        })
      } else if (props.column.type === 'selection') {
        return h(checkbox, {
          modelValue: checkValue.value,
          onChange: (val: boolean) => {
            setSelectedRows(val, props.row, props.index)
            checkValue.value = val // 这里要手动更新，暂不清楚原因
          }
        })
      } else if (props.column.type === 'index') {
        return props.index + 1
      } else {
        return props.row[props.column.prop]
      }
    }
    const rowspanColspanList = (val: string) => {
      const list = props.rowspanColspanList
      if (list.indexOf(val) === -1) {
        // 没有才添加
        list.push(val)
      }
    }
    if (props.rowColSpan) {
      // 有合并方法
      const merge = props.rowColSpan(props.index, props.columnIndex, props.row, props.column)
      if (merge) {
        // 合并方法有返回值的单元格
        // 大于1时
        colspan = merge[1] > 1 ? merge[1] : 1
        rowspan = merge[0] > 1 ? merge[0] : 1
        // 计算出合并后不显示的单元格，如1和2合并=>显示1不显示2
        // 这里处理同一行
        for (let i = 1; i < colspan; i++) {
          const col = props.columnIndex + i
          rowspanColspanList(`${props.index}:${col}`)
        }
        // 这里处理不同行时，即纵向合并
        for (let j = 1; j < rowspan; j++) {
          for (let i = 0; i < colspan; i++) {
            const col = props.columnIndex + i
            const rol = props.index + j
            rowspanColspanList(`${rol}:${col}`)
          }
        }
      }
      const activeRowCol = `${props.index}:${props.columnIndex}`
      const displayArr = ref(props.rowspanColspanList).value
      if (displayArr) {
        if (displayArr.indexOf(activeRowCol) !== -1) {
          display = true
        }
      }
    }
    if (!display) {
      return () => [
        h('td',
          {
            class: classNameTd.value,
            rowspan: rowspan > 1 ? rowspan : null,
            colspan: colspan > 1 ? colspan : null,
            style: 'text-align:' + props.column.align,
            title: hoverTitle.value,
            onClick: onCellClick
          },
          defaultSlots()
        )
      ]
    } else {
      return () => []
    }
  }
})
</script>
