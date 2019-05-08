<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    change(page){
      console.log(page)
    }
  }
}
</script>
# Pagination 分页


### 基础用法
:::demo 
```html
<template>
<ak-pagination :total="50" :current="1"/>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
```
:::

### 附加功能
:::demo 
```html
<template>
<ak-pagination :total="150" :current="1" :showJumper="true" :pageSizes="[10,20,30,50]" :showTotal="true"/>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
```
:::

### 事件
:::demo 
```html
<template>
<ak-pagination :total="50" :current="1" :change="change" :pageSize="10"/>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    change(page){
      console.log(page)
    }
  }
}
</script>
```
:::

### Pagination
|参数|类型|说明|
|-|-|-|
|current        | number         |当前页数，支持 .sync 修饰符|
|total          | number         |总条目数|
|pageSize       | number         |每页显示条数|
|pagerCount     | number/5       |页码按钮的数量，当总页数超过该值时会折叠|
|change         | function       |页码改变事件|
|showJumper     | boolean/false  |快速跳转|
|pageSizes      | number[]       |每页显示个数选择器的选项设置|
|showTotal      | boolean/false  |显示总记录条数|

