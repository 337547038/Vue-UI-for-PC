<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
     page1:1,
     page2:1,
     page3:1
    }
  },
  methods: {
    change(page){
      this.page3 = page
    },
    changePageSizes(pages){
      console.log(pages)
      // 这里是更新pageSize的值，然后重新加数据
    }
  }
}
</script>
# Pagination 分页


### 基础用法
:::demo 
```html
<template>
  <div>
    <ak-pagination :total="50" :current="page1"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      page1:1
    }
  }
}
</script>
```
:::

### 可使用.sync双向绑定当前值
:::demo 
```html
<template>
  <div>
    <p>当前页：{{page2}}</p>
    <ak-pagination :total="50" :current.sync="page2"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
      page2:1
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
<ak-pagination :total="1050" :current="1" :showJumper="true" :pageSizes="[10,20,30,50]" :showTotal="true" :changePageSizes="changePageSizes"/>
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
  <div>
     <p>当前页：{{page3}}</p>
     <ak-pagination :total="50" :current="page3" :change="change" :pageSize="10"/>
  </div>
</template>
<script>
export default {
  data () {
    return {
     page3:1
    }
  },
  methods: {
    change(page){
      this.page3 = page
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
|changePageSizes| function       |每页显示条数改变事件|
|hideSinglePage | boolean/false  |当小于或只有一页时是否隐藏显示|
|format         | boolean/false  |数值转千分制显示|

