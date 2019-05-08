<!-- Created by 337547038 on 2019/3/11 0011. -->
<template>
  <div :class="`${prefixCls}-echarts`" :style="style"></div>
</template>

<script>
import {prefixCls} from '../prefix'
import map from './map'

export default {
  name: `${prefixCls}Echarts`,
  data () {
    return {
      prefixCls: prefixCls,
      myChart: ''
    }
  },
  mixins: [map],
  props: {
    type: String,
    width: String,
    height: String,
    data: [Array, Object],
    option: {
      type: Object,
      default: () => {
        return {}
      }
    },
    xAxisAuto: {
      type: Boolean,
      default: true
    },
    event: Function,
    area: String // 地图，仅在type=map时
    /* area: {
      // 地图，仅在type=map时
      // default: 'city',
      // validator: function (value) {
      //   return ['world', 'china', 'province', 'city'].indexOf(value) !== -1
      // }
    }, */
    // areaCode: String // 省或城市的地图名，仅在area=province/city时
  },
  components: {},
  watch: {
    type () {
      // 类型改变时重新渲染
      this.__init()
    },
    // 监听data和option数据，当数据有更新时，重新渲染
    data: {
      handler () {
        this.__init()
      },
      deep: true
    },
    option: {
      handler () {
        this.__init()
      },
      deep: true
    },
    area () {
      // 地图
      this.__init()
    }
  },
  methods: {
    __init () {
      if (this.myChart) {
        this.myChart.clear()
        this.myChart.dispose()
      }
      this.myChart = echarts.init(this.$el)
      // 参数传值
      let getType = {}
      let xAxis = {}
      switch (this.type) {
        case 'line':
          getType = this._line()
          xAxis = this._getXAxis() // 自动添加x轴数据
          break
        case 'bar':
          getType = this._bar()
          xAxis = this._getXAxis()
          break
        case 'pie':
          getType = this._pie()
          break
        case 'map':
          getType = this.map(this.area, this._setOptionMap)
          break
      }
      if (this.type !== 'map') {
        // 地图要加载json，另外处理
        this._setOption(getType, xAxis)
      }
    },
    _line () {
      // 折线图基础配置
      const seriesDefault = {
        type: 'line',
        smooth: true
      }
      const series = this._getSeries(seriesDefault)
      return {
        legend: {
          bottom: 0
          /* formatter: function (name) {
            return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…')
          },
          tooltip: {
            show: true
          } */
        },
        xAxis: {},
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '10%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          // formatter方法不会被option的替换
          formatter: '{a} <br/>{b} : {c}'
          /* formatter: params => {
            return params.seriesName + '<br>' + params.marker + params.name + ' : ' + params.value
          } */
        },
        series: series
      }
    },
    _bar () {
      // 折线图基础配置
      const seriesDefault = {
        type: 'bar'
      }
      const series = this._getSeries(seriesDefault)
      return {
        legend: {
          bottom: 0
          /* formatter: function (name) {
            return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…')
          },
          tooltip: {
            show: true
          } */
        },
        xAxis: {
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '10%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        series: series
      }
    },
    _pie () {
      // 基础配置
      const seriesDefault = {
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
      const series = this._getSeries(seriesDefault)
      return {
        legend: {
          bottom: 0
          /* formatter: function (name) {
            return echarts.format.truncateText(name, 100, '14px Microsoft Yahei', '…')
          },
          tooltip: {
            show: true
          } */
        },
        grid: {
          left: '3%',
          right: '4%',
          top: '5%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: series
      }
    },
    _scatter () {
      const seriesDefault = {
        type: 'scatter'
      }
      const series = this._getSeries(seriesDefault)
      return {
        series: series
      }
    },
    _getLegend () {
      // 提取图例，this.data传值时，且数据大于1维或以上时
    },
    _setOptionMap (getType) {
      if (this.data) {
        // 直接将data放在series[0]下
        getType.series[0].data = this.data[0].data
        getType.series[0].name = this.data[0].name
      }
      this._setOption(getType, {})
    },
    _setOption (getType, xAxis) {
      const option = this._objectAssign({}, getType, xAxis, this.option)
      console.log('option')
      console.log(option)
      this.myChart.setOption(option)
      window.onresize = this.myChart.resize
      this.$emit('event', this.myChart)
      this.event && this.event(this.myChart)
    },
    _getXAxis () {
      // 通过data传数据时，提取x轴数据。
      // 前提1.this.option下没传xAxis；2.this.data有数据
      if (!this.xAxisAuto) {
        return {}
      }
      let xAxis = []
      const option = this.option
      let xAxisData = false // option.xAxis.data不存在为false
      if (option && option.xAxis && option.xAxis.data) {
        xAxisData = true // 表示通过option传了xAxis
      }
      if (this.data && this.data.length > 0 && !xAxisData) {
        // 通过data传数据时，提取x轴数据
        // 存在多维数据时，以第一组为标准提取
        const xData = this.data[0].data
        xData.forEach(item => {
          xAxis.push(item.name)
        })
      }
      // 返回option里对应的xAxis格式
      let rData = {}
      if (xAxis.length > 0) {
        rData = {data: xAxis}
      }
      return {xAxis: rData}
    },
    _getSeries (seriesDefault) {
      // 通过data传参时
      let series = []
      if (this.data) {
        // 将default的合并到data里去
        this.data.forEach(item => {
          series.push(this._objectAssign({}, seriesDefault, item))
        })
      } else {
        // 通过option传时，存在多维数据，这里将默认的分别添加到各维数据里去
        if (this.option && this.option.series) {
          this.option.series.forEach(item => {
            series.push(this._objectAssign({}, seriesDefault, item))
          })
        } else {
          series = [seriesDefault]
        }
      }
      return series
    },
    _objectAssign (target) {
      // object相同时取后面的，array会覆盖，如
      // a=[1,2,3,4] b=[a,b] => [a,b,3,4]
      function isObj (x) {
        const type = typeof x
        return x !== null && (type === 'object' || type === 'function')
      }

      const hasOwnProperty = Object.prototype.hasOwnProperty
      const propIsEnumerable = Object.prototype.propertyIsEnumerable

      function toObject (val) {
        if (val === null || val === undefined) {
          throw new TypeError('Cannot convert undefined or null to object')
        }
        return Object(val)
      }

      function assignKey (to, from, key) {
        const val = from[key]
        if (val === undefined || val === null) {
          return
        }

        if (hasOwnProperty.call(to, key)) {
          if (to[key] === undefined || to[key] === null) {
            throw new TypeError('Cannot convert undefined or null to object (' + key + ')')
          }
        }
        if (!hasOwnProperty.call(to, key) || !isObj(val)) {
          to[key] = val
        } else {
          to[key] = assign(Object(to[key]), from[key])
        }
      }

      function assign (to, from) {
        if (to === from) {
          return to
        }
        from = Object(from)
        for (let key in from) {
          if (hasOwnProperty.call(from, key)) {
            assignKey(to, from, key)
          }
        }

        if (Object.getOwnPropertySymbols) {
          const symbols = Object.getOwnPropertySymbols(from)
          for (let i = 0; i < symbols.length; i++) {
            if (propIsEnumerable.call(from, symbols[i])) {
              assignKey(to, from, symbols[i])
            }
          }
        }
        return to
      }

      // function deepAssign (target) {
      target = toObject(target)
      for (let s = 1; s < arguments.length; s++) {
        assign(target, arguments[s])
      }
      return target
      // }
    }
  },
  computed: {
    style () {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.__init()
    })
  }
}
</script>
