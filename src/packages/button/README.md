## Button 按钮

默认情况下输入a标签

### 基础用法

使用`type`,`round`,`border`区分不同的按钮颜色

```vue demo
<template>
  <div class="row">
   <ak-button>默认按钮</ak-button>
   <ak-button type="primary">确认按钮</ak-button>
   <ak-button type="cancel">取消按钮</ak-button>
   <ak-button type="text">文字按钮</ak-button>
  </div>
  <div class="row">
   <ak-button :round="true">默认圆角按钮</ak-button>
   <ak-button :round="true" type="primary">确认圆角按钮</ak-button>
   <ak-button :round="true" type="cancel">取消圆角按钮</ak-button>
  </div>
  <div class="row">
   <p>使用type="border"只显示边框不显示背景</p>
   <ak-button type="primary border">默认按钮</ak-button>
   <ak-button type="cancel border">取消圆角按钮</ak-button>
  </div> 
</template>
```

### 禁用状态

使用`disabled="true"`禁用

```vue demo
<template>
  <div>
   <ak-button :disabled="true">默认按钮</ak-button>
   <ak-button :disabled="true" type="primary">确认按钮</ak-button>
   <ak-button :disabled="true" type="cancel">取消按钮</ak-button>
   <ak-button :disabled="true" type="text">文字按钮</ak-button>
  </div>
</template>
```

### 按钮尺寸

使用`size="medium/small/mini"`设置按钮大小

```vue demo
<template>
  <div class="row">
   <p>1.size="medium"</p>
   <ak-button size="medium">默认按钮</ak-button>
   <ak-button size="medium" type="primary">确认按钮</ak-button>
   <ak-button size="medium" type="cancel">取消按钮</ak-button>
   <ak-button size="medium" type="text">文字按钮</ak-button>
  </div>
  <div>
   <p>2.size="small"</p>
   <ak-button size="small">默认按钮</ak-button>
   <ak-button size="small" type="primary">确认按钮</ak-button>
   <ak-button size="small" type="cancel">取消按钮</ak-button>
   <ak-button size="small" type="text">文字按钮</ak-button>
  </div>
  <div>
   <p>3.size="mini"</p>
   <ak-button size="mini">默认按钮</ak-button>
   <ak-button size="mini" type="primary">确认按钮</ak-button>
   <ak-button size="mini" type="cancel">取消按钮</ak-button>
   <ak-button size="mini" type="text">文字按钮</ak-button>
  </div>  
</template>
```

### 带Icon图标

```vue demo
<template>
  <div>
   <ak-button icon="search">默认按钮</ak-button>
   <ak-button icon="search" type="primary">确认按钮</ak-button>
   <ak-button icon="search" type="cancel">取消按钮</ak-button>
   <ak-button icon="search" type="text">文字按钮</ak-button>
  </div> 
</template>
```

### 带路由或链接地址

使用`routerTo`添加路由地址

```vue demo
<template>
  <div>
   <ak-button routerTo="/button">默认按钮</ak-button>
   <ak-button routerTo="/button" type="primary">确认按钮</ak-button>
   <ak-button routerTo="/button" type="cancel">取消按钮</ak-button>
   <ak-button routerTo="/button" type="text">文字按钮</ak-button>
  </div>
  <div>
   <p>直接添加标签属性</p>
   <ak-button href="/button">默认按钮</ak-button>
   <ak-button href="/button" type="primary">确认按钮</ak-button>
   <ak-button href="/button" type="cancel">取消按钮</ak-button>
   <ak-button href="/button" type="text">文字按钮</ak-button>
  </div>    
</template>
```

### 输出原始按钮

使用`nativeType="button/submit/reset"`输出button

```vue demo
<template>
  <div>
   <ak-button nativeType="button">Button</ak-button>
   <ak-button nativeType="submit" type="primary">Submit</ak-button>
   <ak-button nativeType="reset" type="cancel">Reset</ak-button>
  </div> 
</template>
```

### 按钮组

可统一设置组内按钮`size`,`disabled`,`width`,`round`属性和`click`点击事件

```vue demo

<template>
  <p>
    <ak-button-group size="mini" @click="btnGroupClick">
      <ak-button name="btn1">默认按钮</ak-button>
      <ak-button type="primary" name="btn2">确认按钮</ak-button>
      <ak-button type="cancel" name="btn3">取消按钮</ak-button>
      <ak-button type="text" name="btn4">文字按钮</ak-button>
    </ak-button-group>
  </p>
  <p>
    <ak-button-group :disabled="true">
      <ak-button>默认按钮</ak-button>
      <ak-button type="primary">确认按钮</ak-button>
      <ak-button type="cancel">取消按钮</ak-button>
      <ak-button type="text">文字按钮</ak-button>
    </ak-button-group>
  </p>
</template>
<script>
export default {
  setup(){
    const btnGroupClick=(evt,name)=>{
      console.log(name) // 用于区分点击了哪个按钮
	}
  }
}
</script>
```

## API

### Button Props

| 参数      | 类型          | 说明   |
|----------|--------------|--------|
|type      |String        |类型，实际是给按钮添加类名，primary/text等|
|size      |String        |大小尺寸，可选medium / small / mini |
|width     |String        |按钮宽|
|round     |boolean/false |是否圆角按钮|
|routerTo  |String        |路由url，输入为a标签时|
|href      |String        |a标签链接地址|
|disabled  |boolean/false |是否禁用状态|
|icon      |String        |前缀icon|
|nativeType|String        |原生 type 属性，button / submit / reset|
|name      |String        |按钮组时有效，按钮组点击事件时返回当前按钮唯一标识|
|-         | -            |其它原生属性|

### Button Event

|参数|说明| 
|-------|-------| 
|click | -|

### Button Group

| 参数      | 类型          | 说明   |
|----------|--------------|--------|
|size      |String        |大小尺寸，可选medium / small / mini |
|width     |String        |按钮宽|
|round     |boolean/false |是否圆角按钮|
|disabled  |boolean/false |是否禁用状态|

### Button Group Event

|参数|说明| 
|-------|-------| 
|click | -|
