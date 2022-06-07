<!-- Created by 337547038 on 2018/8/27 0027. -->
<script>
export default {
  data () {
    return {
      value:'',
      value1:'有默认值',
      value2:'',
      value3:'',
      value4:'',
      value5:'',
      value6:'',
      value7:'',
      value8:'',
      value9:'',
      value10:''
    }
  },
  components: {},
  methods: {
    keyup(){
     console.log('fff')
    },
    input(e){
    console.log(e)
    }
  }
}
</script>

# Input 输入框

## 基础用法
:::demo 
```html
<template>
  <div>
    <ak-input placeholder="请输入内容" v-model="value"></ak-input>
    <ak-input placeholder="请输入内容" v-model="value1"></ak-input>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value: '',
      value1: '有默认值'
    }
  }
}
</script>

```
:::

## 禁用状态

:::demo 
```html
<template>
 <ak-input placeholder="请输入内容" v-model="value2" :disabled="true"></ak-input>
</template>
<script>
export default {
  data () {
    return {
      value2: '',
    }
  }
}
</script>
```
:::

## 可清空

:::demo 
```html
<template>
 <ak-input placeholder="试着输入些什么看看" v-model="value3" :clear="true"></ak-input>
</template>
<script>
export default {
  data () {
    return {
     value3: '',
    }
  }
}
</script>
```
:::

## 可显示密码明文

:::demo 
```html
<template>
 <ak-input placeholder="请输入内容" v-model="value4" :show-eye="true" type="password"></ak-input>
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
:::

## 原生事件可通过.native修饰符绑定

:::demo 如`@keyup.native="keyup"`
```html
<template>
   <ak-input placeholder="请输入内容" v-model="value5" @keyup.native="keyup"></ak-input>
</template>
<script>
export default {
  data () {
    return {
     value5: '',
    }
  }
}
</script>
```
:::

## 事件

:::demo 
```html
<template>
   <ak-input placeholder="请输入内容" v-model="value6" @input="input"></ak-input>
</template>
<script>
export default {
  data () {
    return {
     value6: '',
    }
  },
  methods: {
    input(e){
      console.log(e)
    }
  }
}
</script>
```
:::


## 带 icon 输入框

:::demo 可以通过 `prefix-icon` 和 `suffix-icon` 属性在 input 组件首部和尾部增加显示图标，也可以通过 slot `prefix` 和 `suffix` 来放置图标。
```html
<template>
  <div>
   <p><ak-input 
      placeholder="请输入内容" 
      v-model="value7" 
      @input="input"
      prefix-icon="icon-user">
   </ak-input>
   </p>
   <p>&nbsp;</p>
   <ak-input 
      placeholder="请输入内容" 
      v-model="value8"
      @input="input"
      suffix-icon="icon-search">
   </ak-input>
  </div>
</template>
<script>
export default {
  data () {
    return {
     value7: ''
    }
  }
}
</script>
```
:::

## API
### Input
|参数|类型|说明|
|-|-|-|
|value          | String         |v-model绑定|
|type           | String         |原生属性|
|clear          | boolean/false  |显示清空按钮|
|showEye        | boolean/false  |密码框显示明文切换|
|-              |                |其它原生所有属性|
### Input Events
|参数|类型|说明|
|-|-|-|
|focus          |               |在 Input 失去焦点时触发|
|change         |               |在 Input 值改变时触发|
|blur           |               |在 Input 失去焦点时触发|
