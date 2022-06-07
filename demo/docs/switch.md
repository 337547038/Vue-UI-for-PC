<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      switch1: false,
      switch2: true,
      switch3: false,
      switch4: true,
      switch5: false,
      switch6: false,
      switch7: 'b'
    }
  }
}
</script>
# Switch 开关

### 基本用法
:::demo 
```html
<template>
  <div>
     <p><ak-switch v-model="switch1"></sk-switch></p>
     <p><br></p>
     <p><ak-switch v-model="switch2"></sk-switch></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      switch1: false,
      switch2: true
    }
  }
}
</script>
```
:::

### 自定显示文本
:::demo 
```html
<template>
  <div>
    <ak-switch v-model="switch3">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </sk-switch>
  </div>
</template>
<script>
export default {
  data () {
    return {
      switch3: false
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
     <p><ak-switch v-model="switch4" :disabled="true"></sk-switch></p>
     <p><br></p>
     <p><ak-switch v-model="switch5" :disabled="true"></sk-switch></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      switch4: true,
      switch5: false
    }
  }
}
</script>
```
:::

### 设置开关状态时的颜色
:::demo `close-color`设置关闭状态颜色，`active-color`设置打开状态颜色
```html
<template>
  <div>
     <p><ak-switch v-model="switch6" close-color="#999" active-color="red"></sk-switch></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      switch6: false
    }
  }
}
</script>
```
:::

### 设置开关状态时的值
:::demo `close-value`设置关闭状态时的值，`active-value`设置打开状态的值
```html
<template>
  <div>
     <p>{{switch7}}</p>
     <p><ak-switch v-model="switch7" close-value="a" active-value="b"></sk-switch></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      switch67: 'b'
    }
  }
}
</script>
```
:::

## API
### Switch
|参数|类型|说明|
|-|-|-|
|value          | boolean/false  |指定当前是否选中，使用 v-model 双向绑定数据|
|disabled       | boolean/false  |是否禁用状态|
|change         | function       |触发事件|
|class          | String         |原生 class|
|closeColor     | String         |设置关闭时颜色，默认通过css设置|
|activeColor    | String         |设置打开时颜色，默认通过css设置|

### Switch Slot
|参数|说明|
|-|-|
|open           | 自定义显示打开时的内容|
|close          | 自定义显示关闭时的内容|
