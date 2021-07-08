<!-- Created by 337547038 on 2021/6/22. -->

# Pagination 分页

### 基础用法

```vue demo

<template>
  <div>
    <ak-pagination :total="50" :current="page1" />
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const page1 = ref(1)
    return {
      page1
    }
  }
}
</script>
```

### 其他选项参数

```vue demo

<template>
  <ak-pagination
    :total="1050"
    :current="page1"
    :showJumper="true"
    :pageSizes="pageSizes"
    :pageSize="10"
    :showTotal="true"
    @changePageSizes="changePageSizes" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const page1 = ref(1)
    const pageSizes = ref([10,20,30,50])
    const changePageSizes = (page) => {
      alert(page)
    }
    return {
      page1,
      pageSizes,
      changePageSizes
    }
  }
}
</script>
```

### 事件

```vue demo

<template>
  <div>
    <p>当前页：{{page}}</p>
    <ak-pagination :total="50" v-model:current="page" @change="change" :pageSize="10" />
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
  const page=ref(1)
    const change = (page) => {
      alert(page)
    }
    return {
      page,
      change
    }
  }
}
</script>
```

## API

### Pagination

|参数|类型|说明|
|----------|--------------|--------|
|current        | number         |当前页数，支持v-model|
|total          | number         |总条目数|
|pageSize       | number         |每页显示条数|
|pagerCount     | number/5       |页码按钮的数量，当总页数超过该值时会折叠|
|showJumper     | boolean/false  |快速跳转|
|pageSizes      | number[]       |每页显示个数选择器的选项设置|
|showTotal      | boolean/false  |显示总记录条数|
|hideSinglePage | boolean/false  |当小于或只有一页时是否隐藏显示|
|format         | boolean/false  |数值转千分制显示|

### Pagination Methods

|参数|说明|
|----------|--------------|
|changePageSizes    |每页显示条数改变事件|
|change             |页码点击改变事件|
