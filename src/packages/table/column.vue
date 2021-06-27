<!-- Created by 337547038 on 2021/6/22 0022. -->

<script lang="ts">
import {defineComponent, inject, onMounted} from 'vue'
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}Column`,
  props: {
    prop: pType.string(), // 参数
    label: pType.string(), // 显示的th名称
    width: pType.string(),
    className: pType.string(),
    align: pType.oneOfString(['left', 'center', 'right']),  // 对齐方式，可选left/center/right
    type: pType.oneOfString(['selection', 'index', 'extend']), // 可选selection（多选）/index序号
    fixed: pType.oneOfString(['left', 'right']), // 固定当前列，可选left/right
    sortBy: pType.bool(), // 当前列显示排序按钮
    title: pType.bool(true),// 鼠标滑过单元格时是否显示title提示语
    drag: pType.bool(true) // 当前单元格允许拖动，仅在table设置drag＝true时有效
  },
  setup(props, {slots}) {
    onMounted(() => {
      const columnsType: boolean = inject('columnsType', false)
      if (!columnsType) {
        // 没有通过表头参数传参时
        const getColumns = inject('getColumns') as AnyPropName
        const columns = getColumns.value
        // 判断下不重复添加
        let has = false
        const addData = Object.assign({}, props, {slots: slots, layer: 1})
        columns && columns.forEach((item: any) => {
          if (JSON.stringify(item) === JSON.stringify(addData)) {
            // 表示有
            has = true
          }
        })
        if (!has) {
          columns && columns.push(addData)
        }
      }
    })
  },
  render() {
    return null
    // return h('div', {}, this.$slots.default)
  }
})
</script>
