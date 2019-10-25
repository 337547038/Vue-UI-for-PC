<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      radio1: 'a',
      radio2: true,
      radio3: false,
      radio4: '',
      radio5: false,
      radio6: true,
      radio7: 'a2',
      radio8: '',
      radio9: '',
      data1: [
        {label: '选项1', value: 'a1'},
        {label: '选项2', value: 'a2'},
        {label: '选项3', value: 'a3'},
        {label: '选项4', value: 'a4'},
        {label: '禁用', value: 'a5', disabled: true}
      ]
    }
  }
}
</script>

# Radio 单选框
> 美观样式可根据需要参考checkbox

### 基础用法
:::demo 单个使用时，v-model为true时选中状态；为false时未选状态，选中返回true
```html
<template>
  <div>
    <p><ak-radio v-model="radio1">选项1</ak-radio>  当前值：{{radio1}}</p>
    <p><ak-radio v-model="radio2">选项2</ak-radio>  当前值：{{radio2}}</p>
    <p><ak-radio v-model="radio3">选项3</ak-radio>  当前值：{{radio3}}</p>
    <p><ak-radio v-model="radio4">选项4</ak-radio>  当前值：{{radio4}}</p>
    <p><ak-radio v-model="radio5" :disabled="true">禁用5</ak-radio>  当前值：{{radio5}}</p>
    <p><ak-radio v-model="radio6" :disabled="true">禁用6</ak-radio>  当前值：{{radio6}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio1: 'a',
      radio2: true,
      radio3: false,
      radio4: '',
      radio5: false,
      radio6: true
    }
  }
}
</script>

```
:::

### 单选组
:::demo 
```html
<template>
  <div>
    <div>
      <p>当前值：{{radio7}}</p>
      <ak-radio-group :data="data1" v-model="radio7"></ak-radio-group>
    </div>
    <div>
      <p>当前值：{{radio8}}</p>
      <ak-radio-group :data="data1" v-model="radio8"></ak-radio-group>
    </div>
    <div><p>整个组不可选</p>
    <ak-radio-group :data="data1" v-model="radio9" :disabled="true"></ak-radio-group></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio7: 'a2',
      radio8: '',
      radio9: '',
      data1: [
        {label: '选项1', value: 'a1'},
        {label: '选项2', value: 'a2'},
        {label: '选项3', value: 'a3'},
        {label: '选项4', value: 'a4'},
        {label: '禁用', value: 'a5', disabled: true}
      ]
    }
  }
}
</script>

```
:::

## API
### Radio
|参数|类型|说明|
|-|-|-|
|value           | string         |Radio 的 value|
|change          | function       |事件|
|disabled        | boolean/false  |是否禁用|
|class          | String         |原生 class|

### Radio Group
|参数|类型|说明|
|-|-|-|
|value           | string         |Radio组 的 value|
|change          | function       |事件|
|data            | array          |组数据|
|class           | String         |原生 class|
|disabled        | Boolean/false   |禁用组|

### Radio Group Data
|参数|类型|说明|
|-|-|-|
|label          | string         |显示的文本值|
|value          | string         |当前选项值|
|disabled       | boolean/false  |是否禁用|
