<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      textarea1: '',
      textarea2: '不能输入',
      textarea3: '',
    }
  }
}
</script>
# Textarea 文本框

### 基本用法
:::demo 
```html
<template>
  <div>
    <ak-textarea v-model="textarea1" placeholder="placeholder"></ak-textarea>
</div>
</template>
<script>
export default {
  data () {
    return {
      textarea1: ''
    }
  }
}
</script>
```
:::


### 禁用

:::demo 
```html
<template>
  <div>
    <ak-textarea v-model="textarea2" placeholder="placeholder" disabled="disabled"></ak-textarea>
</div>
</template>
<script>
export default {
  data () {
    return {
      textarea2: '不能输入'
    }
  }
}
</script>
```
:::

### 自动高
:::demo 
```html
<template>
  <div>
    <ak-textarea v-model="textarea3" placeholder="输入些文字回车换行试试"></ak-textarea>
</div>
</template>
<script>
export default {
  data () {
    return {
      textarea3: ''
    }
  }
}
</script>
```
:::
## API

### Textarea
|参数|类型|说明|
|-|-|-|
|value          | String         |绑定的值，使用v-model双向绑定|
|autoHeight     | boolean/true   |自动高|
|width          | String         |要带单位px/%|
|height         | String         ||
|-              | -              |其他所有原生事件|

