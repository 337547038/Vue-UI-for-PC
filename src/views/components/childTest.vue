<!-- Created by 337547038 on 2021/6/23. -->
<template>
  <div>
    <slot :row="row"></slot>
  </div>
</template>

<script>
import {h, renderSlot} from 'vue'

export default {
  name: 'ChildTest',
  components: {},
  props: {},
  setup() {
    const row = {label: '11', value: '2225555552'}
    return {
      row
    }
  },
  /*render() {
    return h('div', {
      class: 'sss'
    },
    /!*[renderSlot(this.$slots, 'default',{label: '11', value: '222'})]*!/
    this.$slots.default({label: '11', value: '222456'})
    )
  }*/
}
</script>
