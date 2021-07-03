<!-- Created by 337547038 on 2021/6/28. -->
# ColorPicker 颜色选择器

### 基础用法

```vue demo
<template>
   <ak-color-picker v-model="color">选择颜色{{color}}</ak-color-picker>
</template>
<script>
export default {
  data(){
    return {
      color:"#479ba6"
    }
  }
}
</script>
```

## API
### ColorPicker
|参数|类型|说明|
|-|-|-|
|v-model        | String         |选择的颜色|
|format         | String/hex     |格式化类型，hex和rgb两种|
|change         | Function       |确认点击事件|
|text           | String         |确认文本|

### ColorPicker Event
|参数|说明|
|-|-|
|change         |确认点击事件|
