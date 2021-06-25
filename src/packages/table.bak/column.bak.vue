<!-- Created by 337547038 on 2021/6/22 0022. -->
<script lang="ts">
import {prefixCls} from '../prefix'
import pType from '../util/pType'
import {defineComponent, inject, renderSlot, h} from 'vue'
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
    title: pType.bool(),// 鼠标滑过单元格时是否显示title提示语
    order: pType.number(),
    drag: pType.bool(true) // 当前单元格允许拖动，仅在table设置drag＝true时有效
  },
  setup(props, {slots}) {
    console.log('column')
    const getColumn = inject('getColumn') as AnyPropName
    getColumn && getColumn.push({
      slots: slots,
      props: props
    })
    return {}
  },
  render() {
    // return null
    return h('div', {}, this.$slots.default)
  }
})
</script>
