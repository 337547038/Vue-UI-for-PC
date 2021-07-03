<!-- Created by 337547038 on 2021/7/3. -->
# Tooltip 提示

### 基本用法
```vue demo
<template>
  <div>
    <div class="tooltip-demo">
       <ak-tooltip content="这是提示内容这是提示内容"><span>上左</span></ak-tooltip>
       <ak-tooltip content="这是提示内容这是提示内容" direction="top"><span>上边</span></ak-tooltip>
       <ak-tooltip content="这是提示内容" direction="top-right"><span>上右</span></ak-tooltip>
    </div>
    <div class="tooltip-demo">
       <ak-tooltip direction="left" content="这是提示内容">
          <span>左边</span>
       </ak-tooltip>
       <span></span>
       <ak-tooltip direction="right" content="这是提示内容"><span>右边</span></ak-tooltip>
    </div>
    <div class="tooltip-demo">
       <ak-tooltip direction="bottom-left" content="这是提示内容"><span>下左</span></ak-tooltip>
       <ak-tooltip direction="bottom" content="这是提示内容"><span>下边</span></ak-tooltip>
       <ak-tooltip direction="bottom-right" content="这是提示内容"><span>下右</span></ak-tooltip>
    </div>
</div>
</template>


```

### 多文字自动换行
可通过设置最大宽度自动换行
```vue demo
<template>
  <div>
    <div class="tooltip-demo">
       <ak-tooltip content="提示语的左边位置跟当前标签对齐，如提示语X轴位置到浏览器右边的距离小于最大宽，将以最小宽显示并换行"><span>上左</span></ak-tooltip>
       <ak-tooltip content="上边提示是根据是根据当前标签中间位置，向左偏移50%实现居中，如果当前标签到浏览器右边的距离小于最大宽时，实际显示宽为到边浏览器右边的距离，并不是最大宽" direction="top"><span>上边</span></ak-tooltip>
       <ak-tooltip content="这里跟上左类型，计算的是到浏览器左边的距离" direction="top-right" :maxWidth="200"><span>上右</span></ak-tooltip>
    </div>
    <div class="tooltip-demo">
       <ak-tooltip direction="left" content="受当前标签到浏览器左边的距离影响">
          <span>左边</span>
       </ak-tooltip>
       <span></span>
       <ak-tooltip direction="right" content="受当前标签到浏览器左边的距离影响" :maxWidth="200"><span>右边</span></ak-tooltip>
    </div>
    <div class="tooltip-demo">
       <ak-tooltip direction="bottom-left" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。"><span>下左</span></ak-tooltip>
       <ak-tooltip direction="bottom" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。如果内容超过设定的最大宽时则自动换行"><span>下边</span></ak-tooltip>
       <ak-tooltip direction="bottom-right" content="这是提示内容，如果内容超过设定的最大宽时则自动换行。这是提示内容，如果内容超过设定的最大宽时则自动换行。"><span>下右</span></ak-tooltip>
    </div>
</div>
</template>

```
:::

### 支持多种效果
:::demo 可自定样式
```html
<template>
  <div>
    <ak-tooltip content="这里是提示文字，因为icon比较小，这个方向箭头明显是没有对齐的">
    <i class="tooltip-icon">?</i>
    </ak-tooltip>
    <ak-tooltip content="这里是提示文字。解决的办法就是添类名，修改样式。这里顺便把外观也给改下" className="tooltip-align"><i class="tooltip-icon">?</i></ak-tooltip>
  </div>
</template>

```
:::

### 固定显示
:::demo
```html
<template>
  <div class="tooltip-demo">
    <ak-tooltip content="一直都显示的" :always="true" direction="top">
       <span>always</span>
    </ak-tooltip>
  </div>
</template>

```
:::

### Tooltip
|参数|类型|说明|
|-|-|-|
|content        | String         |显示的内容|
|className      | String         |添加的类名|
|direction      | String         |显示方向。分top-left、top、top-right、left、right、bottom-left、bottom、bottom-right共8个方向|
|maxWidth       | Number/500     |最大显示宽|
|delay          | Number/200     |延时关闭时间，单位毫秒。主要是为了能让鼠标移到提示文字上面，实现点链接等|
|always         |Boolean/false    |是否总是可见|
