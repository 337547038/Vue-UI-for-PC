<!--Created by 337547038 on 2018/9/5.-->
<template>
  <transition name="slide-toggle">
    <div :class="`${prefixCls}-date-picker clearfix`" v-if="showHide" :style="pickerStyle" @click="_stopPropagation">
      <div class="calendar">
        <div class="calendar-head">
          <a class="calendar-prev-year" @click="_yearClick(0)">«</a>
          <a class="calendar-prev-month" @click="_monthClick(0)" v-if="showMonthControl&&activePanel!='Year'">‹</a>
          <a class="calendar-year-select" @click="activePanel='Year'">{{year}}年</a>
          <a class="calendar-year-month" @click="activePanel='Month'" v-if="showMonth">{{month}}月</a>
          <a class="calendar-next-month" @click="_monthClick(1)" v-if="showMonthControl&&activePanel!='Year'">›</a>
          <a class="calendar-next-year" @click="_yearClick(1)">»</a>
        </div>
        <div class="calendar-body">
          <component
            v-model="activeValue"
            :is="activePanel"
            :bodyValue="bodyValue"
            :type="type"
            @click="_click">
          </component>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Year from './year'
import Month from './month'
import Day from './day'
import {prefixCls} from '../prefix'

export default {
  name: 'datePicker',
  data () {
    return {
      prefixCls: prefixCls,
      activeValue: '', // 当前显示的值，即日历表头显示的日间值。在选择了年或月时改变
      bodyValue: '', // 用于在下拉面板内容区展示的值，根据上下年月点击而改变
      showHide: true,
      activePanel: '' // 当前显示的面板
    }
  },
  watch: {},
  props: {
    value: [Date, String],
    disabledDate: {
      type: Function,
      default: function () {
        return false
      }
    },
    type: {
      type: String,
      default: 'y',
      validator: function (value) {
        // 四种类型，年/年月/年月日/年月日时分秒
        return ['y', 'ym', 'ymd', 'ymdHms'].indexOf(value) !== -1
      }
    },
    offset: Object, // 坐标信息
    input: Function, // 选择回调
    innerHTML: Function
  },
  components: {Year, Month, Day},
  created () {
    this.activeValue = this._getTime(this.value) // 判断检查日期合法，并设置初始默认值
    this.bodyValue = this._getTime(this.value)
    this._setActivePanel() // 根据参数展开默认面板
  },
  methods: {
    _yearClick (type) {
      // 前后年切换点击
      // type=0表示减，1表示加
      // 仅在年面板时，+－10，其它时间+-1
      let num = 1
      if (this.activePanel === 'Year') {
        num = 10
      }
      if (type === 0) {
        num = -num
      }
      // 在年面板选择时，点击上下年时，不需要更新头部显示，其他面板时实时更新
      if (this.activePanel === 'Year') {
        this.bodyValue = new Date(this.bodyValue.setYear(this.bodyValue.getFullYear() + num))
      } else {
        this.activeValue = new Date(this.activeValue.setYear(this.activeValue.getFullYear() + num))
      }
    },
    _monthClick (type) {
      // 前后月切换点击，只有在日期面板时显示，年或年月面板不显示
      // type=0表示减，1表示加
      let num = 1
      if (type === 0) {
        num = -num
      }
      this.activeValue = new Date(this.activeValue.setMonth(this.activeValue.getMonth() + num))
    },
    _getTime (date) {
      // 判断初始日期转为标准格式
      let time
      if (date) {
        time = new Date(date.toString())
        if (time.toString() === 'Invalid Date') {
          // 日期不合法
          time = new Date()
        }
      } else {
        // 空
        time = new Date()
      }
      return time
    },
    close () {
      this.showHide = false
    },
    _stopPropagation (e) {
      e.stopPropagation()
    },
    _click (value) {
      // 下拉日期时间点击回调事件
      console.log('click')
      console.log(value)
      if (this.activePanel === 'Year') {
        // value为string 如 2019
        // 年面板点击时
        if (this.type === 'y') {
          // 如果当前类型为年选择，则直接关闭下拉，返回当前选中值
          this.input(value)
          this.close()
        } else {
          // 其它情况下跳转到月选择面板
          // 更新activeValue的当前选中年，并显示月选择面板
          this.activeValue = new Date(this.activeValue.setYear(value))
          this.activePanel = 'Month'
        }
      } else if (this.activePanel === 'Month') {
        // value为 string Wed May 01 2019
        // 月面板点击时
        // 当前类型为年月时，则关闭下拉，返回当前值
        if (this.type === 'ym') {
          this.input(value)
          this.close()
        } else {
          // 转到日期选择面板
          const month = new Date(value).getMonth()
          this.activeValue = new Date(this.activeValue.setMonth(month))
          this.activePanel = 'Day'
        }
      } else {
        // 日期面板
        this.input(value)
        this.close()
      }
    },
    _setActivePanel () {
      // 根据参数展开默认面板
      if (this.type === 'y') {
        // 年或年月选择时，默认显示年
        this.activePanel = 'Year'
      } else if (this.type === 'ym') {
        this.activePanel = 'Month'
      } else {
        this.activePanel = 'Day'
      }
    }
  },
  computed: {
    year () {
      return new Date(this.activeValue).getFullYear()
    },
    month () {
      return new Date(this.activeValue).getMonth() + 1
    },
    pickerStyle () {
      // 下拉日期位置
      if (this.offset) {
        return {
          left: this.offset.left + 'px',
          top: this.offset.top + this.offset.height + 'px'
        }
      } else {
        return null
      }
    },
    showMonthControl () {
      // 显示月份上下切换。只有年月日类型时才显示
      return this.type.length > 2
    },
    showMonth () {
      // 头部显示月份，仅在type='y'时不显示
      return this.type !== 'y'
    }
    /* bodyValue () {
      // 用于在下拉面板内容区展示的值，根据上下年月点击而改变
      return this._getTime(this.value)
    } */
    /* days () {
      let days = []
      const year = this.year
      const month = this.month
      const time = new Date(year, month, 1)
      // 计算上个月剩多少天
      time.setDate(0)// 切换到上个月的最后一天
      let lastDay = time.getDate()// 当月天数
      const week = time.getDay()// 星期几，前面已切换为上月最后一天，这里表示上个月最后一天是星期几
      let count = week + 1// 星期天开始
      while (count > 0) {
        days.push({
          d: lastDay - count + 1,
          y: month > 0 ? year : year - 1, // 0为1月，即上一年
          m: month > 0 ? month - 1 : 11,
          p: true
        })
        count--
      }
      // 当前月
      time.setMonth(time.getMonth() + 2, 0)// 切换到当前月份的最后一天，+2是个月了，0再切换到上个月，即当前月
      lastDay = time.getDate()// 当月天数
      for (let i = 1; i <= lastDay; i++) {
        days.push({
          d: i,
          y: year,
          m: month
        })
      }
      // 下个月
      for (let i = 1; days.length < 42; i++) {
        days.push({
          d: i,
          y: month < 11 ? year : year + 1,
          m: month < 11 ? month + 1 : 0,
          n: true
        })
      }
      /// ///////////////////////////////////////////
      // 双日历时，右边日历
      if (this.type === 'range') {
        let count = time.getDay() + 1// 右边日历的上一个月，即左边的当前月
        while (count > 0) {
          days.push({
            d: lastDay - count + 1,
            y: year,
            m: month,
            p: true
          })
          count--
        }
        time.setMonth(time.getMonth() + 2, 0)// 切换到下月的最后一天
        for (let i = 1; i <= time.getDate(); i++) {
          days.push({
            d: i,
            y: time.getFullYear(),
            m: time.getMonth()
          })
        }
        for (let i = 1; days.length < 84; i++) {
          days.push({
            d: i,
            y: time.getMonth() < 11 ? time.getFullYear() : time.getFullYear() + 1,
            m: time.getMonth() < 11 ? time.getMonth() + 1 : 0,
            n: true
          })
        }
      }
      return days
    }
     filterDaysLeft () {
      return this.days.slice(0, 42)
    },
    filterDaysRight () {
      return this.days.slice(42)
    },
    rightYear () {
      // 双日历时右边表头
      const time = new Date(this.year, this.month)// 这里直接转时间
      time.setMonth(time.getMonth() + 1)// 切换到下月
      return time.getFullYear()
    },
    rightMonth () {
      // 双日历时右边表头
      const time = new Date(this.year, this.month)// 这里直接转时间
      time.setMonth(time.getMonth() + 1)// 切换到下月
      return time.getMonth() + 1
    } */
  },
  mounted () {
    // document.body.appendChild(this.$el)
  },
  destroyed () {
    // this.$el.parentNode.removeChild(this.$el)
  },
  filters: {}
}
</script>
