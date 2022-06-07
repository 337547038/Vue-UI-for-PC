<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      radio1: true,
      radio2: false,
      radio3: true,
      radio4: false,
      radio5: 'a',
      radio6: '',
      radio7: 'a',
      radio8: 'a2',
      radio9: '',
      radio10: 'a3',
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
:::demo 单个使用时，v-model为true时选中状态；为false时未选状态，选中返回true。
```html
<template>
  <div>
    <p><ak-radio v-model="radio1">选项1</ak-radio>  当前值：{{radio1}}</p>
    <p><ak-radio v-model="radio2">选项2</ak-radio>  当前值：{{radio2}}</p>
    <p><ak-radio v-model="radio3" :disabled="true">禁用5</ak-radio>  当前值：{{radio3}}</p>
    <p><ak-radio v-model="radio4" :disabled="true">禁用6</ak-radio>  当前值：{{radio4}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio1: true,
      radio2: false,
      radio3: true,
      radio4: false
    }
  }
}
</script>

```
:::

### 指定选中状态的值
:::demo 使用`value`时，选中状态返回`value`的值，当`v-model=value`时为选中状态。
```html
<template>
  <div>
    <p><ak-radio v-model="radio5" value="a">选项1</ak-radio>  当前值：{{radio5}}</p>
    <p><ak-radio v-model="radio6" value="1">选项2</ak-radio>  当前值：{{radio6}}</p>
    <p><ak-radio v-model="radio7" value="ab">选项3</ak-radio>  当前值：{{radio7}}</p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      radio5: 'a',
      radio6: '',
      radio7: 'a'
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
      <p>当前值：{{radio8}}</p>
      <ak-radio-group :data="data1" v-model="radio8"></ak-radio-group>
    </div>
    <div>
      <p>当前值：{{radio9}}</p>
      <ak-radio-group :data="data1" v-model="radio9"></ak-radio-group>
    </div>
    <div><p>整个组不可选</p>
    <ak-radio-group :data="data1" v-model="radio10" :disabled="true"></ak-radio-group></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio8: 'a2',
      radio9: '',
      radio10: 'a3',
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
|v-model       | string         |Radio 的 v-model|
|vale          | string/boolean/number    |选中的值，当v-model＝value时为选中状态|
|disabled      | boolean/false  |是否禁用|
|label         | String         |显示的文本值，也可以是slot|
|class         | String         |原生 class|

### Radio Event
|参数|说明|
|-|-|
|change          |  改变事件|

### Radio Group
|参数|说明|
|-|-|
|value         | string         |Radio组 的 v-model/value|
|data            | array          |组数据|
|class           | String         |原生 class|
|disabled        | Boolean/false   |禁用组|

### Radio Group Event
|参数|说明|
|-|-|
|change          | 改变事件,function(value,item) value为当前选中的值，item为当前data中选中的项|

### Radio Group Data
|参数|类型|说明|
|-|-|-|
|label          | string         |显示的文本值|
|value          | string         |当前选项值|
|disabled       | boolean/false  |是否禁用|
