<!-- Created by 337547038 on 2021/6/23 0023. -->
<!--<template>
  <td>{{row[columns.props.prop]}}
    <slot :name="columns.slots"></slot>
  </td>
</template>-->

<script>
import {defineComponent, inject, renderSlot, h} from 'vue'

export default {
  name: 'Td',
  props: {
    columns: Object,
    row: Object
  },
  setup(props) {
    return () => [
      h('td', {
        class: 'sss'
      },
      /*props.columns.slots.default(props.row)*/
      props.columns.slots.default({label: '11', value: '222'})
      )
    ]
  }
}
</script>
