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
    name: '名称',
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
    name: '名称1',
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
    name: '名称2',
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
export default {
  data () {
    return {
      option2: {
      color:['blue'],
      legend:{show:false},
        yAxis: {
          name: '统计图表',
          axisTick: {
            show: false
          }
        },
        xAxis: {}
      },
      data1: data1,
      data2: data2,
      option3:{
      color:['orange'],
      xAxis:{
       data:['Mon','Tue','Web','Thu','Fri','Sta','Sun']
      },
      yAxis:{name:'统计图表option'},
      series:[{
         data: [820, 932, 901, 934, 1290, 1330, 1320]
      }]
      },
      type:'bar',
      area:'world'
    }
  },
  methods: {
    event (charts) {
      charts.on('click', params => {
        console.log('click')
        console.log(params)
      })
    },
    changeData(){
    console.log('changeData')
    this.data1=[
    {
        name: '名称change',
        data: [
          {name: 'Mon1', value: random()},
          {name: 'Tue2', value: random()},
          {name: 'Wed3', value: random()},
          {name: 'Thu4', value: random()},
          {name: 'Fri5', value: random()},
          {name: 'Sat6', value: random()},
          {name: 'Sun7', value: random()}
        ]
      }
    ]
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
    <div><ak-button @click="changeData">change data</ak-button></div>
    <ak-echarts :data="data1" type="line"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
     data1: data1
    }
  }
}
</script>

```
:::

## 修改个性配置
:::demo 配合option传配置
```html
<template>
  <div>
    <ak-echarts :data="data1" type="line" :option="option2"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      option2: {
            color:['blue'],
            legend:{show:false},
              yAxis: {
                name: '统计图表',
                axisTick: {
                  show: false
                }
              },
              xAxis: {},
              grid: {left: '50px'}
            },
     data1: data1
    }
  }
}
</script>

```
:::

## 通过option传data
:::demo 只传option时，图表数据格式是echarts支持即可，不一定要是data的格式，如这里的`data: [820, 932, 901, 934, 1290, 1330, 1320]`
```html
<template>
  <div>
    <ak-echarts type="line" :option="option3"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      option3:{
            color:['orange'],
            xAxis:{
             data:['Mon','Tue','Web','Thu','Fri','Sta','Sun']
            },
            yAxis:{name:'统计图表option'},
            series:[{
               data: [820, 932, 901, 934, 1290, 1330, 1320]
            }]
            }
    }
  }
}
</script>

```
:::

## 多维数据
:::demo 
```html
<template>
  <div>
    <ak-echarts type="line" :data="data2"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data2:data2
    }
  }
}
</script>

```
:::

## 其它
:::demo 
```html
<template>
  <div>
  <div>
  <ak-button @click="type='line'">line</ak-button>
  <ak-button @click="type='bar'">bar</ak-button>
  <ak-button @click="type='pie'">pie</ak-button>
  {{type}}
  </div>
    <ak-echarts :type="type" :data="data1"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type:'bar',
      data2:data1
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
  <div>
  <ak-button @click="area='world'">世界</ak-button>
  <ak-button @click="area='china'">中国</ak-button>
  <ak-button @click="area='guangdong'">广东</ak-button>
  <ak-button @click="area='440100'">广州</ak-button>
  </div>
    <ak-echarts type="map" :area="area"></ak-echarts>
  </div>
</template>
<script>
export default {
  data () {
    return {
      type:'bar',
      data2:data1
    }
  }
}
</script>

```
:::


## API
### ECharts
|参数|类型|说明|
|-|-|-|
|type           | String         |图表类型|
|width          | String         |图表显示的宽，一般可通过样式设置|
|height         | String         |图表显示的高，一般可通过样式设置|
|data           | Array          |图表数据，格式请查看下面的演示数据|
|option         | Object         |图表配置，图表数据也可通过option传，跟data选其中一种方式即可|
|xAxisAuto      | Boolean/true   |是否自动提取x轴字段，且data为真时|
|event          | Function       |返回实例|
|area           | String         |地图区域。仅当type=map时有效，世界(world)，中国(china)，省市时对应json的名称，即对应地图文件名|

## 演示数据
```html
<script>
function random () {
  return Math.floor(Math.random() * 100)
}
// 一维数据
const data1 = [
  {
    name: '名称',
    data: [
      {name: 'Mon', value: '80'},
      {name: 'Tue', value: '932'},
      {name: 'Wed', value: '901'},
      {name: 'Thu', value: '934'},
      {name: 'Fri', value: '1290'},
      {name: 'Sat', value: '1330'},
      {name: 'Sun', value: '990'}
    ]
  }
]
// 多维数据
const data2 = [
  {
    name: '名称1',
    data: [
      {name: 'Mon', value: '80'},
      {name: 'Tue', value: '932'},
      {name: 'Wed', value: '901'},
      {name: 'Thu', value: '934'},
      {name: 'Fri', value: '1290'},
      {name: 'Sat', value: '1330'},
      {name: 'Sun', value: '990'}
    ]
  },
  {
    name: '名称2',
    data: [
      {name: 'Mon', value: '80'},
      {name: 'Tue', value: '932'},
      {name: 'Wed', value: '901'},
      {name: 'Thu', value: '934'},
      {name: 'Fri', value: '1290'},
      {name: 'Sat', value: '1330'},
      {name: 'Sun', value: '990'}
    ]
  }
]
</script>
```
