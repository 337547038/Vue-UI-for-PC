# InputNumber 计数器

<script>
export default {
  data () {
    return {
      value:1,
      value2:1,
      value3:1,
      value4:1
     }
  },
  components: {},
  methods: {
  },
  mounted () {
  }
}
</script>

### 基础用法
:::demo 
```html
<template>
  <div>
   <ak-input-number v-model="value"></ak-input-number>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value:1
     }
  },
  components: {},
  methods: {
  },
  mounted () {
  }
}
</script>

```
:::

### 禁用状态
:::demo 
```html
<template>
  <div>
   <ak-input-number v-model="value2" :disabled="true"></ak-input-number>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value2:1
     }
  },
  components: {},
  methods: {
  },
  mounted () {
  }
}
</script>

```
:::

### 设置最大最小值
:::demo `max="10" min="1"`
```html
<template>
  <div>
   <ak-input-number v-model="value3" :max="10" :min="1"></ak-input-number>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value3:1
     }
  },
  components: {},
  methods: {
  },
  mounted () {
  }
}
</script>

```
:::


### 设置步长
:::demo `step="5"`
```html
<template>
  <div>
   <ak-input-number v-model="value4" :step="5"></ak-input-number>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value4:1
     }
  },
  components: {},
  methods: {
  },
  mounted () {
  }
}
</script>

```
:::

## API
### InputNumber
|参数|类型|说明|
|-|-|-|
|value          | number       |绑定值，默认0|
|max            | number       |允许的最大值|
|min            | number       |允许的最小值|
|step           | number       |步长|
|disabled       | boolean/false|是否禁用|
|placeholder    | string       |输入框点位符|

### InputNumber Events
|参数|说明|
|-|-|
|change          | 绑定值被改变时触发|
|blur            | 在组件 Input 失去焦点时触发|
|focus           | 在组件 Input 获得焦点时触发|
