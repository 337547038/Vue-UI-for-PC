<!-- Created by 337547038 on 2021/6/16 0016. -->

# Textarea 文本框

### 基本用法

```vue demo
<template>
  <div>
    <ak-textarea v-model="textarea1" placeholder="placeholder" />
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const textarea1 = ref('')
    return {
      textarea1
    }
  }
}
</script>
```

### 禁用

```vue demo
<template>
  <div>
    <ak-textarea v-model="textarea1" placeholder="placeholder" disabled="disabled" />
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const textarea1 = ref('不能输入')
    return {
      textarea1
    }
  }
}
</script>
```

### 自动高

```vue demo

<template>
  <ak-textarea v-model="textarea1" placeholder="placeholder" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const textarea1 = ref('输入些文字回车换行试试')
    return {
      textarea1
    }
  }
}
</script>

```

## API

### Textarea

|参数|类型|说明|
|----------|--------------|--------|
|v-model        | String         |绑定的值|
|autoHeight     | boolean/true   |自动高|
|width          | String         |要带单位px/%|
|height         | String         ||
