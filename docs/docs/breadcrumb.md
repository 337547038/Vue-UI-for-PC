<!-- Created by 337547038 on 2019/8/6 0006. -->
# Breadcrumb 面包屑
### 用法
:::demo 
```html
<template>
   <ak-breadcrumb :data="data" separator=">"></Breadcrumb>
</template>
<script>
 export default {
   data(){
     return {
       data:[
         {title:'首页',href:'/'},
         {title:'组件演示1',href:'/'},
         {title:'组件演示2',href:'/breadcrumb'},
         {title:'面包屑'}
       ]
     }
   }
 }
</script>
```
:::

## API
### BackTop
|参数|类型|说明|
|-|-|-|
|data           | Array          |数据|
|separator      | String         |分隔字符|

### data
|参数|类型|说明|
|-|-|-|
|title           | String          |显示的名称|
|href            | String          |链接地址|
