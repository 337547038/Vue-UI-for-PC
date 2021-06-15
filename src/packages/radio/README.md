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
