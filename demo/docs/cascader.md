<!-- Created by 337547038 on 2019/8/6 0006. -->
# Cascader 级联选择器
 > 地区数据来源：使用网上省市三级联系的地区js数据
 
<script>
 export default {
   data(){
     return {
       value1:[],
       value2:["广东", "广州市", "天河区"],
       value3:[],
       value4:[],
       value5:[],
       data:[
         {
           name:'广东',
           children:[
             {
               name:'广州',
               children:['天河', '白云', '越秀', '海珠']
             },
             {
               name:'深圳'
             },
             {
               name:'东莞'
             }
           ]
         },
         {
           name:'北京',
           children:['东城区','西城区','朝阳区','丰台区']
         }
       ]
     }
   },
   methods:{
     change(v){
       console.log(v)
     }
   }
 }
</script> 
 
### 基础用法
:::demo 
```html
<template>
  <div>
    <p>当前值：{{value1}}</p>
    <ak-cascader v-model="value1" placeholder="请选择"/>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value1:[]
     }
   }
 }
</script>
```
:::

### 初始值

:::demo 
```html
<template>
  <div>
    <p>当前值：{{value2}}</p>
    <ak-cascader v-model="value2"/>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value2:["广东", "广州市", "天河区"]
     }
   }
 }
</script>
```
:::

### disabled

:::demo 
```html
<template>
  <div>
    <p>当前值：{{value3}}</p>
    <ak-cascader v-model="value3" :disabled="true" placeholder="禁用状态"/>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value3:[]
     }
   }
 }
</script>
```
:::

### 其它

:::demo 
```html
<template>
  <div>
    <p>当前值：{{value4}}</p>
    <ak-cascader v-model="value4" placeholder="请选择" tipsText="下拉提示文字" :change="change"/>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value4:[]
     }
   },
   methods:{
     change(v){
       console.log(v)
     }
   }
 }
</script>
```
:::

### 自定义下拉数据

:::demo 
```html
<template>
  <div>
    <p>当前值：{{value5}}</p>
    <ak-cascader v-model="value5" placeholder="请选择" :data="data"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value5: [],
      data: [
        {
          name: '广东',
          children: [
            {
              name: '广州',
              children: ['天河', '白云', '越秀', '海珠']
            },
            {
              name: '深圳'
            },
            {
              name: '东莞'
            }
          ]
        },
        {
          name: '北京',
          children: ['东城区', '西城区', '朝阳区', '丰台区']
        }
      ]
    }
  }
}
</script>
```
:::

## API
### Cascader
|参数|类型|说明|
|-|-|-|
|value          | Array          |v-model双向绑定|
|placeholder    | String         |提示点位|
|disabled       | Boolean/false  |禁用|
|tipsText       | String         |下拉提示文字|
|selectText     | Array          |选择提示，默认['请选择省', '请选择市', '请选择区']|
|split          | Array/null     |显示分隔符|
|data           | Array          |自定义下拉数据|
|change         | Function       |选择回调|

### data
|参数|类型|说明|
|-|-|-|
|name           | String          |选项名称|
|children       | Array           |子级数据，见自定义数据格式|
