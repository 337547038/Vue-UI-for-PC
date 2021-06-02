<!-- Created by 337547038 on 2019/11/15 0015. -->
# Slider 滑块
<script>
 export default {
   data(){
     return {
       value1:0,
       value2:50,
       value3:25,
       value4:25,
       value5:30,
       value6:30,
       value7:30,
       value8:[30,60],
       value9:[30,50],
       value10:80,
       marks: {
          0: 'start',
          25: '25%',
          50: 'center',
          75: '75%',
          100: '<i style="color:red">end</i>'
        }
     }
   },
   methods:{
     formatTooltip(value){
       return value+'%'
     }
   }
 }
</script>
### 基础用法
:::demo 
```html
<template>
  <div>
  
    <p>基础用法：{{value1}}</p>
    <div><ak-slider v-model="value1"></ak-slider></div>
    
    <p>隐藏提示：{{value2}}</p>
    <div><ak-slider v-model="value2" :showTooltip="false"></ak-slider></div>
    
    <p>格式化提示：{{value3}}</p>
    <div><ak-slider v-model="value3" :formatTooltip="formatTooltip"></ak-slider></div>
    
    <p>禁用状态：{{value4}}</p>
    <div><ak-slider v-model="value4" :disabled="true"></ak-slider></div>
    
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value1:0,
       value2:50,
       value3:25,
       value4:25
     }
   },
   methods:{
     formatTooltip(value){
       return value+'%'
     }
   }
 }
</script>
```
:::

### 指定滑动步长
:::demo 步长`step=10`
```html
<template>
  <div>
  
    <p>指定滑动步长：{{value5}}</p>
    <div><ak-slider v-model="value5" :step="10"></ak-slider></div>
    
    <p>显示间断点：{{value6}}</p>
    <div><ak-slider v-model="value6" :step="10" :showStops="true"></ak-slider></div>
    
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value5:30,
       value6:30
     }
   }
 }
</script>
```
:::

### 设置最小值和最大值
:::demo `min`最小值10，`max`最大值80
```html
<template>
  <div>
  
    <p>指定最大值和最小值：{{value7}}</p>
    <div><ak-slider v-model="value7" :min="10" :max="80"></ak-slider></div>
    
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value7:30,
     }
 }
</script>
```
:::

### 设定选择范围
:::demo 通用`value`传入两个值即可
```html
<template>
  <div>
  
    <p>选择范围{{value8}}</p>
    <div><ak-slider v-model="value8"></ak-slider></div>
    
    <p>选择范围，并指定最大最小值{{value9}}</p>
    <div><ak-slider v-model="value9" :min="10" :max="80"></ak-slider></div>
    
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value8:[30,60],
       value9:[30,50]
     }
   }
 }
</script>
```
:::

### 展示标记
:::demo key表示当前所占百分比位置
```html
<template>
  <div>
  
    <p>展示标记{{value10}}</p>
    <div><ak-slider v-model="value10" :marks="marks"></ak-slider></div>
    
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value10:80,
       marks: {
          0: 'start',
          25: '25%',
          50: 'center',
          75: '75%',
          100: '<i style="color:red">end</i>'
        }
     }
   }
 }
</script>
```
:::

## API
### Slider
|参数|类型|说明|
|-|-|-|
|value          | Number,Array   |当前值，默认为0。Array时为范围选择|
|min      　　　 | Number/0       |最小值|
|max      　　　 | Number/100     |最大值|
|step      　　　| Number/1       |步长|
|disabled       | Boolean/false  |是否禁用|
|showStops      | Boolean/false  |是否显示间断点|
|showTooltip　　 | Boolean/false  |是否显示 tooltip|
|formatTooltip  | Function       |格式化 tooltip message，仅当showTooltip为true时|
|marks      　　 | Function　　　  |标记， key 的类型必须为number，表示当前位置 |
|trigger      　 | String 　　　   |触发改变事件，默认为鼠标弹起时触发，其他值时为鼠标移动时触发|

### Slider Event
|参数|说明|
|-|-|
|change        |值改变时触发|
