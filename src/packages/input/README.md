# Input 输入框

### 1、基本使用

```vue demo
<template>
   <div><ak-input></ak-input></div>
   <p>&nbsp;</p>
   <div><ak-input placeholder="请输入内容"></ak-input></div>
   <p>&nbsp;</p>
   <div><ak-input placeholder="请输入内容" v-model="defaultValue"></ak-input></div>
   <p>&nbsp;</p>
   <div><ak-input placeholder="禁用状态" :disabled="true"></ak-input></div>
</template>
<script>
import {ref} from 'vue'
export default {
  setup(){
  const defaultValue = ref('初始默认值')
   return {
    defaultValue
   }
  }
}
</script>
```

### 显示清空按钮

设置`clear="true"`，在输入框不为空时显示清空按钮

```vue demo
<template>
 <ak-input placeholder="试着输入些什么看看" v-model="valueClear" :clear="true"></ak-input>
</template>
<script>
export default {
  data () {
    return {
      valueClear: '',
    }
  }
}
</script>
```

### 可显示密码明文

`type="password`时设置`showEye="true"`可显示密码明文

```vue demo
<template>
 <ak-input placeholder="请输入内容" v-model="value4" :showEye="true" type="password"></ak-input>
</template>
<script>
export default {
  data () {
    return {
     value4: '',
    }
  }
}
</script>
```

### 添加前后缀Icon

可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot `prefix` 和 `suffix` 来放置图标。

```vue demo
<template>
   <ak-input 
      placeholder="请输入内容" 
      prefix-icon="icon-user">
   </ak-input>
   <p>&nbsp;</p>
   <ak-input 
      placeholder="请输入内容" 
      suffix-icon="icon-search">
   </ak-input>
</template>
```

### 设置大小

使用`size="medium/small/mini"`设置按钮大小

```vue demo
<template>
   <div><ak-input placeholder="默认尺寸"></ak-input></div>
   <p>&nbsp;</p>
   <div><ak-input placeholder="sixe=medium" size="medium"></ak-input></div>
   <p>&nbsp;</p>
   <div><ak-input placeholder="sixe=small" size="small"></ak-input></div>
   <p>&nbsp;</p>
   <div><ak-input placeholder="sixe=mini" size="mini"></ak-input></div>
</template>
<script>
import {ref} from 'vue'
export default {
  setup(){
  const defaultValue = ref('初始默认值')
   return {
    defaultValue
   }
  }
}
</script>
```

## API

### Input Props
|参数|类型|说明|
|-|-|-|
|v-model        | any            |输入框的值|
|clear          | boolean/false  |显示清空按钮|
|showEye        | boolean/false  |密码框显示明文切换|
|width          | string         |设置宽度属性|
|size           | string         |添加的大小尺寸样式|
|prefixIcon     | string         |前缀icon图标|
|suffixIcon     | string         |后缀icon图标|
|-              |                |其它原生所有属性|
