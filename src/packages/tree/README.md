<!-- Created by 337547038 on 2021/7/8. -->

# Tree 树

### 基本用法

```vue demo

<template>
  <ak-tree :data="data" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const data = [
      {
        label: '广东', children: [
          {
            label: '广州', children: [
              {label: '天河区'},
              {label: '白云区'},
              {label: '越秀区'},
              {label: '海珠区'}
            ]
          },
          {label: '深圳'},
          {label: '东莞'},
          {label: '佛山'},
        ]
      },
      {label: '广西'},
      {label: '北京'},
    ]
    return {
      data
    }
  }
}
</script>
```

### 默认展开指定项

在列表数据`data`里使用`open="true"`可默认展开

```vue demo

<template>
  <ak-tree :data="data" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const data = [
      {
        label: '广东', open: true, children: [
          {
            label: '广州', children: [
              {label: '天河区'},
              {label: '白云区'},
              {label: '越秀区'},
              {label: '海珠区'}
            ]
          },
          {label: '深圳'},
          {label: '东莞'},
          {label: '佛山'},
        ]
      },
      {label: '广西'},
      {label: '北京'},
    ]
    return {
      data
    }
  }
}
</script>
```

### 点击可选中值

使用`v-model="string/array"`，为`string`时单选，`array`时可多选，对应数据列表`data`的`id`值

```vue demo

<template>
  <p>当前选中值：{{value}}
    <ak-tree :data="data" v-model="value" />
  </p>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value = ref('gd')
    const data = [
      {
        id: 'gd', label: '广东', children: [
          {
            id: 'gz', label: '广州', children: [
              {id: 'th', label: '天河区'},
              {id: 'by', label: '白云区'},
              {id: 'yx', label: '越秀区'},
              {id: 'hz', label: '海珠区'}
            ]
          },
          {id: 'sz', label: '深圳'},
          {id: 'dg', label: '东莞'},
          {id: 'fs', label: '佛山'},
        ]
      },
      {id: 'gx', label: '广西'},
      {id: 'bj', label: '北京'},
    ]
    return {
      data,
      value
    }
  }
}
</script>
```

## API

### Tree Props

|参数|类型|说明|
|----------|--------------|--------|
|data           | Array         |列表数据|
|showCheckbox   | Boolean/false |显示勾选|
|lazy           | Boolean/false |是否异步加载|
|v-model        | Array/string  |选中的值，array时为多选|

### Tree Data

|参数|类型|说明|
|----------|--------------|--------|
|id             | string        |唯一值|
|checked        | Boolean/false |当前项为勾选状态，仅当showCheckbox=true时有效|
|open           |Boolean/false  |是否展开当前项|
