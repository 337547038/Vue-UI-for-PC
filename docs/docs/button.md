
# Button 按钮
> button只是为了统一样式

>默认下输出的是a标签，而不是button


### 基础用法
基础的按钮用法。实际应用中存在着多种宽高，可通过添加样式进行控制
>

:::demo 通过使用`type`、`round`和来给`Button`添加不同的样式。常见的`确认`和`取消`两种

```html
<template>
  <div>
    <div style="margin-bottom: 20px">
      <ak-button>默认按钮</ak-button>
      <ak-button type="primary" href="http://www.baidu.com" target="_blank">确认按钮</ak-button>
    </div>
    <div>
      <ak-button :round="true">圆角按钮</ak-button>
      <ak-button type="primary" :round="true">圆角按钮</ak-button>
    </div>
  </div>
</template>
```

:::

### 输出真正的button
:::demo 通过指定`nativeType`类型时，可输出`button`按钮

```html
<template>
  <div>
    <div style="margin-bottom: 20px">
      <ak-button nativeType="button">默认按钮</ak-button>
      <ak-button type="primary" nativeType="button">确认按钮</ak-button>
    </div>
  </div>
</template>
```

:::

### 禁用按钮
:::demo 禁用按钮
```html
<template>
  <div>
    <div style="margin-bottom: 20px">
      <ak-button :disabled="true">默认按钮</ak-button>
      <ak-button type="primary" :disabled="true">确认按钮</ak-button>
    </div>
    <div>
      <ak-button :plain="true" :round="true" :disabled="true">朴素按钮</ak-button>
      <ak-button type="primary" :round="true" :disabled="true">确认按钮</ak-button>
    </div>
  </div>
</template>

```
:::

### 可解释路由地址
:::demo 有时候我们可能需要在新窗口打开页面，解决使用路由地址`<router-link :to="/button">`无法在新窗口打开的问题。
```html
<template>
  <div>
    <ak-button type="text" routerTo="/button" target="_blank">新窗口打开</ak-button>
  </div>
</template>
```
:::

## API
### Button
|参数|类型|说明|
|-|-|-|
|type           | String         |类型，实际是给按钮添加类名|
|round          | boolean/false  |是否圆角按钮|
|routerTo       | String         |路由url|
|disabled       | boolean/false  |是否禁用状态|
|nativeType     | String         |原生 type 属性，button / submit / reset|
|-              | -              |其它原生属性|

### Button Event
|参数|说明|
|-|-|
|click          | -|
