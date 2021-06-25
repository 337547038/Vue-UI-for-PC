<!-- Created by 337547038 on 2021/6/13. -->
<!--<template>
  <div>index</div>
</template>-->

<script>
import {h, defineComponent, ref, computed, inject, watch, getCurrentInstance} from 'vue'
import checkbox from '../packages/checkbox/checkbox.vue'

export default {
  name: 'Index',
  props: {},
  setup() {
    const cv = ref(false)
    const cv2 = ref(false)
    const mv = ref(false)
    return () => [
      h('div', {
        class: cv.value ? 'a' : 'b',
        modelValue: cv.value,
        onChange: (val) => {
          // 这里使用modelValue值点击要后动更新值
          //_this.$forceUpdate()
          console.log('change65')
          console.log(val)
          // setSelectedRows(val,props.row)
        },
        onClick: () => {
          console.log('click')
          cv.value = true
        }
      }, '22222'),
      h(checkbox, {
        modelValue: mv.value,
        onChange: val => {
          // 这里使用modelValue值点击要后动更新值
          //_this.$forceUpdate()
          console.log('change65')
          console.log(val)
          // setSelectedRows(val,props.row)
         /* mv.value = val*/
        }
      })
    ]
  }
}
</script>
