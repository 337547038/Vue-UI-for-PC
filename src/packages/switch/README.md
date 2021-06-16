<!-- Created by 337547038 on 2021/6/15 0015. -->

# Switch 开关

### 基本用法

```vue demo

<template>
  <p>
    <ak-switch v-model="switch1" />
  </p>
  <p>
    <ak-switch v-model="switch2" />
  </p>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const switch1 = ref(false)
    const switch2 = ref(true)
    return {
      switch1,
      switch2
    }
  }
}
</script>
```

### 自定显示文本

```vue deom
<template>
  <ak-switch v-model="switch3">
    <template #open>开</template>
    <template #close>关</template>
  </ak-switch>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const switch3 = ref(false)
    return {
      switch3
    }
  }
}
</script>
```

### 禁用

```vue demo

<template>
  <p>
    <ak-switch v-model="switch4" :disabled="true" />
  </p>
  <p>
    <ak-switch v-model="switch5" :disabled="true" />
  </p>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const switch4 = ref(false)
    const switch5 = ref(true)
    return {
      switch4,
      switch5
    }
  }
}
</script>

```

### 设置开关状态时的颜色

`closeColor`设置关闭状态颜色，`activeColor`设置打开状态颜色

```vue demo

<template>
  <p>
    <ak-switch v-model="switch6" close-color="#999" active-color="red" />
  </p>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const switch6 = ref(true)
    return {
      switch6
    }
  }
}
</script>

```

### 设置开关状态时的值

`closeValue`设置关闭状态时的值，`activeValue`设置打开状态的值，当`v-model=activeValue`时选中状态

```vue demo
<template>
  <p>
    <ak-switch v-model="switch7" close-value="a" active-value="b" />
  </p>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const switch7 = ref('a')
    return {
      switch7
    }
  }
}
</script>
```

## API
### Switch
|参数|类型|说明|
|-|-|-|
|v-model        | boolean/false  |指定当前是否选中|
|disabled       | boolean/false  |是否禁用状态|
|closeColor     | String         |设置关闭时颜色值|
|activeColor    | String         |设置打开时颜色值|
|closeValue     | String         |设置关闭状态时的值|
|activeValue    | String         |设置打开状态时的值|
### Switch Event
|参数|说明|
|-|-|
|change           | 改变事件|
### Switch Slot
|参数|说明|
|-|-|
|open           | 自定义显示打开时的内容|
|close          | 自定义显示关闭时的内容|
