<!-- Created by 337547038 on 2018/12/24 0024. -->
<!--月面板-->
<template>
  <div class="calendar-months">
    <a
      v-for="(item,index) in monthList"
      :key="index"
      :class="[getClass(index)]"
      @click="selectMonth(index)"
      v-text="item"></a>
  </div>
</template>

<script lang="ts">
import {defineComponent, inject} from 'vue'
import pType from '../util/pType'

export default defineComponent({
  name: 'Month',
  props: {
    modelValue: pType.date(),
    bodyValue: pType.date()
  },
  emits: ['click'],
  setup(props, {emit}) {
    const monthList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    const setDisabledDate: any = inject('setDisabledDate', '')
    const getClass = (index: number) => {
      const time = new Date(props.modelValue.getFullYear(), props.modelValue.getMonth()).toDateString()
      const timeSelect = new Date(props.bodyValue.getFullYear(), index).toDateString()
      const disableDate = new Date(props.modelValue.getFullYear(), index)
      return {
        'calendar-date-select': time === timeSelect,
        'calendar-date-disabled': setDisabledDate && setDisabledDate(disableDate, 'month')// 不能选择的
      }
    }
    const selectMonth = (index: number) => {
      let disabledCls = getClass(index)
      if (!disabledCls['calendar-date-disabled']) {
        const date = new Date(props.modelValue.getFullYear(), index).toDateString()
        emit('click', date)
      }
    }
    return {
      monthList,
      getClass,
      selectMonth
    }
  }
})
</script>
