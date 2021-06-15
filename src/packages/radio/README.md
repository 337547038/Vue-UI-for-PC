<!-- Created by 337547038 on 2021/6/14. -->

# Radio 单选框

### 基础用法

单个使用时，`v-model`为true时选中状态

```vue demo

<template>
  <p>
    <ak-radio v-model="radio1">选项1</ak-radio>
    当前值：{{radio1}}
  </p>
  <p>
    <ak-radio v-model="radio2">选项2</ak-radio>
    当前值：{{radio2}}
  </p>
  <p>
    <ak-radio v-model="radio3" :disabled="true">禁用5</ak-radio>
    当前值：{{radio3}}
  </p>
  <p>
    <ak-radio v-model="radio4" :disabled="true">禁用6</ak-radio>
    当前值：{{radio4}}
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      radio1: true,
      radio2: false,
      radio3: true,
      radio4: false
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

```

### 指定选中状态的值

使用`value`时，选中状态返回`value`的值，当`v-model=value`时为选中状态。

```vue demo

<template>
  <div>
    <p>
      <ak-radio v-model="radio5" value="a">选项1</ak-radio>
      当前值：{{radio5}}
    </p>
    <p>
      <ak-radio v-model="radio6" :value="1">选项2</ak-radio>
      当前值：{{radio6}}
    </p>
    <p>
      <ak-radio v-model="radio7" :value="true">选项3</ak-radio>
      当前值：{{radio7}}
    </p>
    <p>
      <ak-radio v-model="radio8" :value="ab">选项4</ak-radio>
      当前值：{{radio8}}
    </p>
  </div>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      radio5: '',
      radio6: '',
      radio7: '',
      radio8: 'ab'
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

```

### 单选组

```vue demo

<template>
  <p>
  <div>当前值：{{radio8}}</div>
  <ak-radio-group :options="data1" v-model="radio8" @change="changeGroup"></ak-radio-group>
  </p>
  <p>
  <div>整个组不可选，当前值：{{radio10}}</div>
  <ak-radio-group :options="data1" v-model="radio10" :disabled="true"></ak-radio-group>
  </p>
</template>

<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      radio8: 'a2',
      radio10: 'a3',
      data1: [
        {label: '选项1', value: 'a1'},
        {label: '选项2', value: 'a2'},
        {label: '选项3', value: 'a3'},
        {label: '选项4', value: 'a4'},
        {label: '禁用', value: 'a5', disabled: true}
      ]
    })
    const changeGroup = (value,item)=>{
      console.log(value)
      console.log(item)
    }
    return {
      ...toRefs(state),
      changeGroup
    }
  }
}
</script>

```
## API
### Radio
|参数|类型|说明|
|-|-|-|
|v-model       | string         |Radio 的 v-model|
|value          | string/boolean/number    |选中的值，当v-model＝value时为选中状态|
|disabled      | boolean/false  |是否禁用|
|label         | String         |显示的文本值，也可以是slot|

### Radio Event
|参数|说明|
|-|-|
|change          |  改变事件|

### Radio Group
|参数|说明|
|-|-|
|v-model         | string         |Radio组 的 v-model|
|options         | array          |组数据|
|disabled        | Boolean/false   |禁用组|

### Radio Group Event
|参数|说明|
|-|-|
|change          | 改变事件,返回(value,item) value为当前选中的值，item为当前data中选中的项|

### Radio Group options
|参数|类型|说明|
|-|-|-|
|label          | string         |显示的文本值|
|value          | string         |当前选项值|
|disabled       | boolean/false  |是否禁用|
