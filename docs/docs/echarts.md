<!-- Created by 337547038 on 2019/3/11 0011. -->
# Echarts 图形图表

> echarts.js通过html页引入

> 将data作为单独参数，1.是为了统一数据格式，方便在不同的图表间切换；2.可从数据里自动提取x轴所需数据；3.提取图例

> 当没使用data参数时，只是简单的将option和组件初始的值合并

> 实际使用可在组件里修改公共配置，通过data传值就即

<script>
function random () {
  return Math.floor(Math.random() * 100)
}

const data1 = [
  {
    name: '数据格式1',
    data: [
      {name: 'Mon', value: random()},
      {name: 'Tue', value: random()},
      {name: 'Wed', value: random()},
      {name: 'Thu', value: random()},
      {name: 'Fri', value: random()},
      {name: 'Sat', value: random()},
      {name: 'Sun', value: random()}
    ]
  }
]
const data2 = [
  {
    name: '数据格式2-1',
    data: [
      {name: 'Mon', value: random()},
      {name: 'Tue', value: random()},
      {name: 'Wed', value: random()},
      {name: 'Thu', value: random()},
      {name: 'Fri', value: random()},
      {name: 'Sat', value: random()},
      {name: 'Sun', value: random()}
    ]
  },
  {
    name: '数据格式2-2',
    data: [
      {name: 'Mon', value: random()},
      {name: 'Tue', value: random()},
      {name: 'Wed', value: random()},
      {name: 'Thu', value: random()},
      {name: 'Fri', value: random()},
      {name: 'Sat', value: random()},
      {name: 'Sun', value: random()}
    ]
  }
]
const data3 = [
  {
    name: '数据格式3',
    data: [random(), random(), random(), random(), random(), random(), random()]
  }
]
const data4 = [
  {
    name: '数据格式4-1',
    data: [random(), random(), random(), random(), random(), random(), random()]
  },
  {
    name: '数据格式4-2',
    data: [random(), random(), random(), random(), random(), random(), random()]
  }
]
const data5 = [
  {
    name: 'name0',
    data: [0.0, 54.7, 26.38, 23.32, 8.88, -17.92, -11.48, -15.1, -4.83, -30.99, -88.84]
    // type:'line' // 这个设为折线，也可写在series里
    // yAxisIndex:1 使用右边y轴，也可写在series里
  },
  {
    name: 'name1',
    data: [691, 1069, 1351, 1666, 1814, 1489, 1318, 1119, 1065, 735, 82],
    barMaxWidth: '6'
  },
  {
    name: 'name2',
    data: [385, 598, 699, 918, 1051, 940, 906, 798, 843, 597, 73],
    barMaxWidth: '30%', // 也可写在series里
    stack: 'stack' // 也可写在series里
  },
  {
    name: 'name3',
    data: [208, 327, 430, 511, 596, 408, 251, 105, 21, 2, 0],
    barMaxWidth: '30%',
    stack: 'stack'
  },
  {
    name: 'name4',
    data: [87, 124, 206, 215, 162, 123, 142, 198, 162, 124, 0],
    barMaxWidth: '30%',
    stack: 'stack'
  },
  {
    name: 'name5',
    data: [11, 20, 16, 22, 5, 14, 16, 15, 21, 6, 0],
    barMaxWidth: '30%',
    stack: 'stack'
  }
]
export default {
  data () {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      },
      option2: {
        color: ['blue'],
        yAxis: {
          name: '统计图表',
          axisTick: {
            show: false
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [{
          type: 'line',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }],
        tooltip: {
          formatter: '{a} <br/>{b} : {c}'
        }
      },
      data1: data1,
      data2: data2,
      data3: data3,
      data4: data4,
      data5: data5,
      option5: {
        xAxis: {
          data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
        },
        yAxis: [
          {type: 'value'},
          {
            type: 'value',
            name: '增长率',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {type: 'line', yAxisIndex: 1}
        ]
      },
      dataMap: [],
      optionMap: {},
      type: 'line',
      dataType: 'data1',
      area: 'world',
      scatter: [
        {
          data: [
            {name: '2009', value: 163},
            {name: '2010', value: 1013},
            {name: '2011', value: 1284},
            {name: '2012', value: 1585},
            {name: '2013', value: 1694},
            {name: '2014', value: 1384},
            {name: '2015', value: 1217},
            {name: '2016', value: 992},
            {name: '2017', value: 947},
            {name: '2018', value: 656},
            {name: '2019', value: 74}
          ],
          name: '数据格式1'
        },
        {
          data: ['479', '754', '968', '1149', '1334', '1064', '932', '692', '650', '427', '39'],
          name: '数据格式2'
        },
        {
          data: ['464', '736', '920', '1085', '1279', '1003', '854', '646', '625', '407', '38'],
          name: '名称3'
        },
        {
          data: [random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random()],
          name: '数量随机'
        }
      ],
      optionScatter: {
        xAxis: {
          data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
        }
      }
    }
  },
  methods: {
    event (charts) {
      charts.on('click', params => {
        console.log('click')
        console.log(params)
      })
    },
    changeData (num) {
      this.data1 = eval('data' + num)
      this.dataType = 'data' + num
    },
    changeMap (city) {
      this.area = city
      if (city === 'world') {
        this.dataMap = [
          {
            name: 'world map',
            data: [
              {name: 'China', value: 100}
            ]
          }
        ]
        this.optionMap = {}
      } else if (city === 'china') {
        // 中国地图演示数据
        this.dataMap = [
          {
            name: '地图散点',
            data: [
              {name: '广东', value: 10}
            ]
          },
          {
            name: 'china map',
            data: [
              {name: '新疆', value: '100'},
              {name: '黑龙江', value: '50'},
              {name: '广东', value: '30'},
              {name: '四川', value: '80'}
            ]
          }
        ]
        this.optionMap = {
          visualMap: {
            show: true,
            seriesIndex: 1
          },
          geo: {
            map: 'china',
            roam: true,
            label: {
              normal: {
                show: true // 地图名称
              }
            }
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              rippleEffect: {
                period: 5,
                scale: 6,
                brushType: 'fill'
              },
              symbolSize: 5
            },
            {
              type: 'map',
              geoIndex: 0
            }
          ]
        }
      } else if (city === 'guangdong') {
        // 广东
        this.dataMap = [
          {
            name: '广东地图',
            data: [
              {name: '广州市', value: 100},
              {name: '湛江市', value: 50}
            ]
          }
        ]
        this.optionMap = {}
      } else if (city === '440100') {
        // 广州
        this.dataMap = [
          {
            name: '广州市地图',
            data: [
              {name: '天河区', value: 100},
              {name: '白云区', value: 50}
            ]
          }
        ]
        this.optionMap = {}
      }
    }
  }
}
</script>

<style>
.ak-echarts{width:100%;height:350px;}
</style>

## 基础用法
:::demo 传图表类型type和数据data即可
```html
<template>
  <div>
    <div>
      <p>数据切换时要注意数据格式，示例数据data3,data4没传x坐标轴，显示为空，转为饼图时数据格式也不正确</p>
      <p>&nbsp;</p>
      <p>切换数据格式：{{dataType}}</p>
      <ak-button @click="changeData(1)" :type="dataType==='data1'?'primary':''">data1</ak-button>
      <ak-button @click="changeData(2)" :type="dataType==='data2'?'primary':''">data2</ak-button>
      <ak-button @click="changeData(3)" :type="dataType==='data3'?'primary':''">data3</ak-button>
      <ak-button @click="changeData(4)" :type="dataType==='data4'?'primary':''">data4</ak-button>
    </div>
    <p>&nbsp;</p>
    <p>切换图表类型：{{type}}</p>
    <ak-button @click="type='line'" :type="type==='line'?'primary':''">line</ak-button>
    <ak-button @click="type='bar'" :type="type==='bar'?'primary':''">bar</ak-button>
    <ak-button @click="type='pie'" :type="type==='pie'?'primary':''">pie</ak-button>
    <ak-button @click="type='scatter'" :type="type==='scatter'?'primary':''">scatter</ak-button>
    <ak-echarts :data="data1" :type="type" :event="event"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data1: data1,
      type: 'line',
      dataType: 'data1',
    }
  },
  methods: {
    event (charts) {
      charts.on('click', params => {
        console.log('click')
        console.log(params)
      })
    },
    changeData (num) {
      this.data1 = eval('data' + num)
      this.dataType = 'data' + num
    }
  }
}
</script>
```
:::

## 使用option
:::demo 使用option，data和type可不传
```html
<template>
  <div>
    <ak-echarts :option="option2" :event="event"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      option2: {
        color: ['blue'],
        yAxis: {
          name: '统计图表',
          axisTick: {
            show: false
          }
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [{
          type: 'line',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }],
        tooltip: {
          formatter: '{a} <br/>{b} : {c}'
        }
      }
    }
  }
}
</script>

```
:::

## 折线柱状图混合使用
:::demo 
```html
<template>
  <div>
    <ak-echarts type="bar" :data="data5" :option="option5"  :event="event"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data5: [
        {
          name: 'name0',
          data: [0.0, 54.7, 26.38, 23.32, 8.88, -17.92, -11.48, -15.1, -4.83, -30.99, -88.84]
          // type:'line' // 这个设为折线，也可写在series里
          // yAxisIndex:1 使用右边y轴，也可写在series里
        },
        {
          name: 'name1',
          data: [691, 1069, 1351, 1666, 1814, 1489, 1318, 1119, 1065, 735, 82],
          barMaxWidth: '6'
        },
        {
          name: 'name2',
          data: [385, 598, 699, 918, 1051, 940, 906, 798, 843, 597, 73],
          barMaxWidth: '30%', // 也可写在series里
          stack: 'stack' // 也可写在series里
        },
        {
          name: 'name3',
          data: [208, 327, 430, 511, 596, 408, 251, 105, 21, 2, 0],
          barMaxWidth: '30%',
          stack: 'stack'
        },
        {
          name: 'name4',
          data: [87, 124, 206, 215, 162, 123, 142, 198, 162, 124, 0],
          barMaxWidth: '30%',
          stack: 'stack'
        },
        {
          name: 'name5',
          data: [11, 20, 16, 22, 5, 14, 16, 15, 21, 6, 0],
          barMaxWidth: '30%',
          stack: 'stack'
        }
      ],
      option5: {
        xAxis: {
          data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
        },
        yAxis: [
          {type: 'value'},
          {
            type: 'value',
            name: '增长率',
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: [
          {type: 'line', yAxisIndex: 1}
        ]
      }
    }
  }
}
</script>
```
:::


## 地图
:::demo 
```html
<template>
  <div>
    <p>地图：{{area}}</p>
    <ak-button @click="changeMap('world')" :type="area==='world'?'primary':''">世界</ak-button>
    <ak-button @click="changeMap('china')" :type="area==='china'?'primary':''">中国</ak-button>
    <ak-button @click="changeMap('guangdong')" :type="area==='guangdong'?'primary':''">广东</ak-button>
    <ak-button @click="changeMap('440100')" :type="area==='440100'?'primary':''">广州</ak-button>
    <ak-echarts type="map" :data="dataMap" :option="optionMap" :area="area" :event="event"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataMap: [],
      optionMap: {},
      area: 'world'
    }
  },
  methods: {
    changeMap (city) {
      this.area = city
      if (city === 'world') {
        this.dataMap = [
          {
            name: 'world map',
            data: [
              {name: 'China', value: 100}
            ]
          }
        ]
        this.optionMap = {}
      } else if (city === 'china') {
        // 中国地图演示数据
        this.dataMap = [
          {
            name: '地图散点',
            data: [
              {name: '广东', value: 10}
            ]
          },
          {
            name: 'china map',
            data: [
              {name: '新疆', value: '100'},
              {name: '黑龙江', value: '50'},
              {name: '广东', value: '30'},
              {name: '四川', value: '80'}
            ]
          }
        ]
        this.optionMap = {
          visualMap: {
            show: true,
            seriesIndex: 1
          },
          geo: {
            map: 'china',
            roam: true,
            label: {
              normal: {
                show: true // 地图名称
              }
            }
          },
          series: [
            {
              type: 'effectScatter',
              coordinateSystem: 'geo',
              rippleEffect: {
                period: 5,
                scale: 6,
                brushType: 'fill'
              },
              symbolSize: 5
            },
            {
              type: 'map',
              geoIndex: 0
            }
          ]
        }
      } else if (city === 'guangdong') {
        // 广东
        this.dataMap = [
          {
            name: '广东地图',
            data: [
              {name: '广州市', value: 100},
              {name: '湛江市', value: 50}
            ]
          }
        ]
        this.optionMap = {}
      } else if (city === '440100') {
        // 广州
        this.dataMap = [
          {
            name: '广州市地图',
            data: [
              {name: '天河区', value: 100},
              {name: '白云区', value: 50}
            ]
          }
        ]
        this.optionMap = {}
      }
    }
  }
}
</script>

```
:::

## 散点图
:::demo 
```html
<template>
  <div>
    <ak-echarts type="scatter" :data="scatter" :option="optionScatter" :event="event"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      scatter: [
        {
          data: [
            {name: '2009', value: 163},
            {name: '2010', value: 1013},
            {name: '2011', value: 1284},
            {name: '2012', value: 1585},
            {name: '2013', value: 1694},
            {name: '2014', value: 1384},
            {name: '2015', value: 1217},
            {name: '2016', value: 992},
            {name: '2017', value: 947},
            {name: '2018', value: 656},
            {name: '2019', value: 74}
          ]
          name: '数据格式1'
        },
        {
          data: ['479', '754', '968', '1149', '1334', '1064', '932', '692', '650', '427', '39'],
          name: '数据格式2'
        },
        {
          data: ['464', '736', '920', '1085', '1279', '1003', '854', '646', '625', '407', '38'],
          name: '名称3'
        },
        {
          data: [random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random()],
          name: '数量随机'
        }
      ],
      optionScatter: {
        xAxis: {
          data: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
        }
      }
    }
  },
  methods: {}
}
</script>


```
:::

## API
### ECharts
|参数|类型|说明|
|-|-|-|
|type           | String         |图表类型，合并组件内部对应的option。不需合并不传即可，使用option参数的。暂支持line,bar,pie,map,scatter,effectScatter，其它类型可直接使用option|
|width          | String         |图表显示的宽，一般可通过样式设置|
|height         | String         |图表显示的高，一般可通过样式设置|
|data           | Array          |图表数据，格式请查看下面的演示数据。相当于series，同时可以有其它参数，也可结合option一起传值，仅type不为空时有效|
|option         | Object         |图表配置，图表数据也可通过option传，跟data选其中一种方式即可|
|xAxisAuto      | Boolean/true   |是否自动提取x轴字段，仅data为真时|
|event          | Function       |返回实例|
|area           | String         |地图区域。仅当type=map时有效，世界(world)，中国(china)，省市时对应json的名称，即对应地图文件名，详见/static/plugins/echarts/map/|

## 演示数据
```html
<script>
function random () {
  return Math.floor(Math.random() * 100)
}
// 一维数据
const data1 = [
  {
    name: '数据格式1',
    data: [
      {name: 'Mon', value: random()},
      {name: 'Tue', value: random()},
      {name: 'Wed', value: random()},
      {name: 'Thu', value: random()},
      {name: 'Fri', value: random()},
      {name: 'Sat', value: random()},
      {name: 'Sun', value: random()}
    ]
  }
]

const data2 = [
  {
    name: '数据格式2-1',
    data: [
      {name: 'Mon', value: random()},
      {name: 'Tue', value: random()},
      {name: 'Wed', value: random()},
      {name: 'Thu', value: random()},
      {name: 'Fri', value: random()},
      {name: 'Sat', value: random()},
      {name: 'Sun', value: random()}
    ]
  },
  {
    name: '数据格式2-2',
    data: [
      {name: 'Mon', value: random()},
      {name: 'Tue', value: random()},
      {name: 'Wed', value: random()},
      {name: 'Thu', value: random()},
      {name: 'Fri', value: random()},
      {name: 'Sat', value: random()},
      {name: 'Sun', value: random()}
    ]
  }
]

const data3 = [
  {
    name: '数据格式3',
    data: [random(), random(), random(), random(), random(), random(), random()]
  }
]

const data4 = [
  {
    name: '数据格式4-1',
    data: [random(), random(), random(), random(), random(), random(), random()]
  },
  {
    name: '数据格式4-2',
    data: [random(), random(), random(), random(), random(), random(), random()]
  }
]
</script>
```
