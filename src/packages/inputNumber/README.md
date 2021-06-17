<!-- Created by 337547038 on 2021/6/17 0017. -->
# InputNumber 计数器

### 基础用法
```vue demo
<template>
  <ak-input-number v-model="value1" />
</template>
<script>
import {ref} from 'vue'
export default {
  setup() {
    const value1 = ref(1)
    return {
      value1
    }
  }
}
</script>
```

### 禁用状态
```vue demo
<template>
  <ak-input-number v-model="value1" :disabled="true" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(1)
    return {
      value1
    }
  }
}
</script>

```

### 设置最大最小值
`max="10" min="1"`
```vue demo
<template>
  <ak-input-number v-model="value1" :max="10" :min="1" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(1)
    return {
      value1
    }
  }
}
</script>

```


### 设置步长
 `step="5"`
```vue demo
<template>
  <ak-input-number v-model="value1" :step="5" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(1)
    return {
      value1
    }
  }
}
</script>

```

## API
### InputNumber
|参数|类型|说明|
|-|-|-|
|v-model        | number       |绑定值，默认0|
|max            | number       |允许的最大值|
|min            | number       |允许的最小值|
|step           | number       |步长|
|disabled       | boolean/false|是否禁用|
|placeholder    | string       |输入框点位符|
|readOnly       | boolean/true |允许手动输入|

### InputNumber Events
|参数|说明|
|-|-|
|change          | 绑定值被改变时触发|
|blur            | 在组件 Input 失去焦点时触发|
|focus           | 在组件 Input 获得焦点时触发|
