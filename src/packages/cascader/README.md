<!-- Created by 337547038 on 2021/6 0028. -->

# Cascader 级联选择器

地区数据来源：使用网上省市三级联系的地区js数据

### 基础用法

```vue demo
<template>
  <div>
    <p>当前值：{{ value1 }}</p>
    <ak-cascader v-model="value1" placeholder="请选择"/>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref([])
    return {
      value1
    }
  }
}
</script>
```

### 初始值

```vue demo
<template>
  <div>
    <p>当前值：{{ value1 }}</p>
    <ak-cascader v-model="value1" placeholder="请选择" />
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(["广东", "广州市", "天河区"])
    return {
      value1
    }
  }
}
</script>
```

### 自定义下拉数据

```vue demo
<template>
  <div>
    <p>当前值：{{value5}}</p>
    <ak-cascader v-model="value5" placeholder="请选择" :data="data"/>
  </div>
</template>
<script>
import {ref} from 'vue'
export default {
  setup () {
  const value5 = ref([])
  const data= [
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
  return {
     value5,
     data
  }
  }
}
</script>
```

## API

### Cascader

|参数|类型|说明|
|----------|--------------|--------|
|v-model        | Array          |当前值|
|placeholder    | String         |提示点位|
|disabled       | Boolean/false  |禁用|
|tipsText       | String         |下拉提示文字|
|selectText     | Array          |选择提示，默认['请选择省', '请选择市', '请选择区']|
|data           | Array          |自定义下拉数据|

### Cascader Event

|参数| 说明|
|----------|--------|
|change      |选择回调|

### data

|参数|类型|说明|
|----------|--------------|--------|
|name           | String          |选项名称|
|children       | Array           |子级数据，见自定义数据格式|
