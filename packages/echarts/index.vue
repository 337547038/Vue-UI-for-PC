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
      myChart: '' // echarts实例
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
      // 参数传值
      switch (this.type) {
        case 'line':
          this._line()
          break
        case 'bar':
          this._bar()
          break
        case 'pie':
          this._pie()
          break
        case 'map':
          this.map(this.area, this._map)
          break
        case 'scatter':
        case 'effectScatter':
          this._scatter()
          break
        default:
          this._setOption(this.option)
      }
    },
    _line () {
      // 折线图基础配置
      const seriesDefault = {
        type: 'line',
        smooth: true
      }
      const xAxis = this._getXAxis()
      const defaultOption = {
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
          // formatter: '{a} <br/>{b} : {c}'
          formatter: params => {
            return params.seriesName + '<br>' + params.marker + params.name + ' : ' + params.value
          }
        }
      }
      this._mergeOption(defaultOption, xAxis, seriesDefault)
    },
    _bar () {
      // 折线图基础配置
      const seriesDefault = {
        type: 'bar'
      }
      const xAxis = this._getXAxis()
      const defaultOption = {
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
          // trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        }
      }
      this._mergeOption(defaultOption, xAxis, seriesDefault)
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
      const xAxis = {}
      const defaultOption = {
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
        }
      }
      this._mergeOption(defaultOption, xAxis, seriesDefault)
    },
    _map (defaultOption, seriesDefault) {
      const xAxis = {}
      this._mergeOption(defaultOption, xAxis, seriesDefault)
    },
    _scatter () {
      const seriesDefault = {
        type: this.type,
        symbolSize: function (data) {
          return Math.log(data) * 5
        }
      }
      const xAxis = this._getXAxis()
      const defaultOption = {
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
          // formatter: '{a} <br/>{b} : {c}'
          formatter: params => {
            return params.seriesName + '<br>' + params.marker + params.name + ' : ' + params.value
          }
        }
      }
      this._mergeOption(defaultOption, xAxis, seriesDefault)
    },
    _mergeOption (defaultOption, xAxis, seriesDefault) {
      let newOption = {}
      if (this.type) {
        let data = [] // 传入的数据
        let dataLen = 0
        if (this.data) {
          data = this._deepClone(this.data)
          dataLen = data.length
        }
        let option = {} // 传入的option
        let seriesLen = 0
        if (this.option) {
          option = this._deepClone(this.option)
          if (option.series) {
            seriesLen = option.series.length
          }
        }
        if (data && dataLen === seriesLen) {
          // 当通用data和option.series.data同时传了data时，则以data为准，去掉option里传的data，否则两个data会叠加
          if (option && option.series) {
            let i = 0
            option.series.forEach(item => {
              if (data[i] && data[i].data) {
                item.data = []
              }
              i++
            })
          }
        }
        // 存在两个y轴时，option.yAxis为数组，合并会报错。这里直接将初始的设置为空
        if (option.yAxis && option.yAxis.length > 0) {
          defaultOption.yAxis = []
        }
        // 当在不同的图表类型这间切换时，option带有坐标轴信息时应该去掉
        if (this.type === 'pie') {
          if (option.yAxis) {
            option.yAxis = []
          }
          if (option.xAxis) {
            option.xAxis = []
          }
        }
        // 先合并内置option和传参data,传参option，及xAxis
        newOption = this._objectAssign({}, defaultOption, xAxis, option, {series: data})
        // 再将内置的series插入到对应的series项里
        // 即当同时显示两种图形时，即折线+柱状，type=bar时,只会将内置的bar series合并到type=bar或type为空的项时，不会合并到type=line项
        let i = 0
        if (newOption.series.length === 0) {
          newOption.series = [seriesDefault]
        } else {
          newOption.series.forEach(item => {
            let newItem = {}
            if (!item.type || item.type === this.type) {
              newItem = this._objectAssign({}, seriesDefault, item)
              newOption.series[i] = newItem
            }
            i++
          })
        }
        newOption = this._tryFormatData(newOption)
      } else {
        // 不合并直接使用传进的option
        newOption = this._deepClone(this.option)
      }
      this._setOption(newOption)
    },
    _tryFormatData (option) {
      // 尝试转换数据
      // 为不同数据类型在不同图表间切换，type=pie时，如果data=[0,0,0,0]，并且xAxis.data为[0,0,0,0]，尝试转为[{name:'',value:''}]这种格式
      // 为适合不同图表类型间切换，并且data的数据格式为[0,0,0,0]时，尝试转为[{name:'',value:''}]格式，并且xAxis.data为[0,0,0,0]这种格式时
      if (this.data && this.type === 'pie' && this.option.xAxis && this.option.xAxis.data) {
        if (typeof this.data[0].data[0] !== 'object' && typeof this.option.xAxis.data[0] !== 'object') {
          option.series.forEach(item => {
            let newData = []
            let i = 0
            item.data.forEach(d => {
              if (typeof d !== 'object') {
                newData.push({
                  name: this.option.xAxis.data[i],
                  value: d
                })
              } else {
                newData.push(d)
              }
              i++
            })
            item.data = newData
          })
        }
      }
      // 图表类型为地图时，数据类型为effectScatter和scatter时，尝试将[{name:'0',value:'0'}]转换为[{name:'0',value:[0,0,0]}]格式
      if (this.type === 'map') {
        option.series.forEach(item => {
          if (item.type === 'effectScatter' || item.type === 'scatter') {
            let res = []
            for (let i = 0; i < item.data.length; i++) {
              const geoCoord = this.geoCoordMap[item.data[i].name]
              if (geoCoord) {
                if (typeof item.data[i].value !== 'object') {
                  res.push({
                    name: item.data[i].name,
                    value: geoCoord.concat(item.data[i].value)
                  })
                } else {
                  res.push(item.data[i])
                }
              }
            }
            item.data = res
          }
        })
      }
      return option
    },
    _getLegend () {
      // 提取图例，this.data传值时，且数据大于1维或以上时
    },
    _setOption (option) {
      console.log('option')
      console.log(option)
      if (this.myChart) {
        this.myChart.clear()
        this.myChart.dispose()
      }
      this.myChart = echarts.init(this.$el)
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
          xAxis.push(item.name || '')
        })
      }
      // 返回option里对应的xAxis格式
      let rData = {}
      if (xAxis.length > 0) {
        rData = {data: xAxis}
      }
      return {xAxis: rData}
    },
    _objectAssign (target) {
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
    },
    _deepClone (source) {
      // 深度克隆
      if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'shallowClone')
      }
      const targetObj = source.constructor === Array ? [] : {}
      for (let keys in source) {
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = source[keys].constructor === Array ? [] : {}
            targetObj[keys] = this._deepClone(source[keys])
          } else {
            targetObj[keys] = source[keys]
          }
        }
      }
      return targetObj
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
