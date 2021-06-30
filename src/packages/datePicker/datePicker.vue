<!--Created by 337547038 on 2018/9/5.-->
<template>
  <div class="calendar">
    <div class="calendar-head">
      <a class="calendar-prev-year" @click="yearClick(0)">«</a>
      <a v-if="showMonthControl&&activePanel!=='Year'" class="calendar-prev-month" @click="monthClick(0)">‹</a>
      <a class="calendar-year-select" @click="activePanel='Year'">{{ year }}年</a>
      <a v-if="showMonth" class="calendar-year-month" @click="activePanel='Month'">{{ month }}月</a>
      <a v-if="showMonthControl&&activePanel!=='Year'" class="calendar-next-month" @click="monthClick(1)">›</a>
      <a class="calendar-next-year" @click="yearClick(1)">»</a>
    </div>
    <div class="calendar-body">
      <component
        :is="activePanel"
        v-model="activeValue"
        :body-value="bodyValue"
        :type="type"
        @click="paneClick" />
    </div>
  </div>
</template>
<script lang="ts">
import {defineComponent, computed, reactive, toRefs, watch} from 'vue'
import Year from './year.vue'
import Month from './month.vue'
import Day from './day.vue'
import pType from '../util/pType'

export default defineComponent({
  name: 'DatePicker',
  components: {Year, Month, Day},
  props: {
    value: pType.date(),
    type: pType.oneOfString(['year', 'month', 'date', 'datetime'], 'date')// // 四种类型，年/年月/年月日/年月日时分秒
  },
  emits: ['change'],
  setup(props, {emit}) {
    const state = reactive({
      activeValue: props.value, // 当前显示的值，即日历表头显示的日间值。在选择了年或月时改变
      bodyValue: props.value, // 用于在下拉面板内容区展示的值，根据上下年月点击而改变
      activePanel: '', // 当前显示的面板
      showMonthControl: props.type === 'date' || props.type === 'datetime',
      showMonth: props.type !== 'year'
    })
    watch(() => props.value, (val: Date) => {
      state.activeValue = val
      state.bodyValue = val
    })
    // 根据参数展开默认面板
    if (props.type === 'year') {
      // 年或年月选择时，默认显示年
      state.activePanel = 'Year'
    } else if (props.type === 'month') {
      state.activePanel = 'Month'
    } else {
      state.activePanel = 'Day'
    }
    const year = computed(() => {
      return state.activeValue.getFullYear()
    })
    const month = computed(() => {
      return state.activeValue.getMonth() + 1
    })
    const yearClick = (type: number) => {
      // 前后年切换点击
      // type=0表示减，1表示加
      // 仅在年面板时，+－10，其它时间+-1
      let num = 1
      if (state.activePanel === 'Year') {
        num = 10
      }
      if (type === 0) {
        num = -num
      }
      // 在年面板选择时，点击上下年时，不需要更新头部显示，其他面板时实时更新
      if (state.activePanel === 'Year') {
        state.bodyValue = new Date(state.bodyValue.setFullYear(state.bodyValue.getFullYear() + num))
      } else {
        state.activeValue = new Date(state.activeValue.setFullYear(state.activeValue.getFullYear() + num))
      }
    }
    const monthClick = (type: number) => {
      // 前后月切换点击，只有在日期面板时显示，年或年月面板不显示
      // type=0表示减，1表示加
      let num = 1
      if (type === 0) {
        num = -num
      }
      state.activeValue = new Date(state.activeValue.setMonth(state.activeValue.getMonth() + num))
    }
    const paneClick = (date: Date|string) => {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      if (state.activePanel === 'Year') {
        // value为string 如 2019
        // 年面板点击时
        if (props.type === 'year') {
          // 如果当前类型为年选择，则直接关闭下拉，返回当前选中值
          emit('change', date)
        } else {
          // 其它情况下跳转到月选择面板
          // 更新activeValue的当前选中年，并显示月选择面板
          const year = new Date(date).getFullYear()
          state.activeValue = new Date(state.activeValue.setFullYear(year))
          state.activePanel = 'Month'
        }
      } else if (state.activePanel === 'Month') {
        // value为 string Wed May 01 2019
        // 月面板点击时
        // 当前类型为年月时，则关闭下拉，返回当前值
        if (props.type === 'month') {
          emit('change', date)
        } else {
          // 转到日期选择面板
          const month = new Date(date).getMonth()
          state.activeValue = new Date(state.activeValue.setMonth(month))
          state.activePanel = 'Day'
        }
      } else {
        // 日期面板
        emit('change', date)
      }
    }
    return {
      ...toRefs(state),
      year,
      month,
      paneClick,
      yearClick,
      monthClick
    }
  }
})
</script>
