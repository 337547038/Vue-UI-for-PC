<script lang="ts">
import {h, defineComponent, ref, computed, inject, watch} from 'vue'
import pType from '../util/pType'
import {Checkbox} from '../checkbox/index'
import checkbox from '../checkbox/checkbox.vue'

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
    colspan: pType.number()
  },
  emits: ['cellClick', 'toggleExtend'],
  setup(props, {emit}) {
    const setSelectedRows = inject('setSelectedRows') as any
    const extendToggle = () => {
      // console.log('extendToggle')
      // props.showHideExtend(props.index,props.row)
      emit('toggleExtend')
    }
    let classNameTd = ref(props.column.fixed)
    const pcl = ref(props.column.className)
    if (pcl.value && props.column.fixed) {
      classNameTd.value += ' ' + pcl.value
    } else if (pcl.value) {
      classNameTd.value = pcl.value
    }
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
    const onCellClick = () => {
      emit('cellClick', props.row, props.column, props.index, props.columnIndex)
    }
    let defaultSlots = ref(props.row[props.column.prop]).value
    const checkValue = ref(props.checked)
    watch(() => props.checked, (val: boolean) => {
      checkValue.value = val
    })
    if (Object.keys(props.column.slots).length > 0) {
      defaultSlots = props.column.slots.default({
        row: props.row,
        index: props.index,
        extend: extendToggle,
        toggle: props.toggle,
        parentRow: props.parentRow
      })
    } else if (props.column.type === 'selection') {
      // 很奇怪，放这里点击全选会有问题
      /*defaultSlots = h(checkbox, {
        class: mv.value ? 'a' : 'b',
        modelValue: mv.value,
        onChange: (val: boolean) => {
          // 这里使用modelValue值点击要后动更新值
          //_this.$forceUpdate()
          console.log('change65')
          // setSelectedRows(val,props.row)
          mv.value = val
          console.log(mv.value)
        }
      })*/
    } else if (props.column.type === 'index') {
      defaultSlots = props.index + 1
    }
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
        props.column.type === 'selection' ?
          h(checkbox, {
            modelValue: checkValue.value,
            onChange: (val: boolean) => {
              setSelectedRows(val, props.row, props.index)
              checkValue.value = val // 这里要手动更新，暂不清楚原因
            }
          }) : defaultSlots
      )
    ]
  }
})
</script>
