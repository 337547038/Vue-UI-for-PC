<!-- Created by 337547038 on 2021/7/3. -->

# Tooltip 提示
注意：内容必须要包含一层标签用作事件触发区域，不能是纯文字
### 基本用法

```vue demo
<template>
  <div>
    <div class="tooltip-demo">
       <ak-tooltip content="这是提示内容这是提示内容"><span>上左</span></ak-tooltip>
       <ak-tooltip content="这是提示内容这是提示内容，direction＝'top'" direction="top"><span>上边</span></ak-tooltip>
       <ak-tooltip content="这是提示内容direction='top-right'" direction="top-right"><span>上右</span></ak-tooltip>
    </div>
    <div class="tooltip-demo">
       <ak-tooltip direction="left" content="这是提示内容direction=left">
          <span>左边</span>
       </ak-tooltip>
       <span></span>
       <ak-tooltip direction="right" content="这是提示内容direction=right"><span>右边</span></ak-tooltip>
    </div>
    <div class="tooltip-demo">
       <ak-tooltip direction="bottom-left" content="这是提示内容direction=bottom-left"><span>下左</span></ak-tooltip>
       <ak-tooltip direction="bottom" content="这是提示内容direction=bottom"><span>下边</span></ak-tooltip>
       <ak-tooltip direction="bottom-right" content="这是提示内容direction=bottom-right"><span>下右</span></ak-tooltip>
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

### 支持多种效果

可自定样式

```vue demo
<template>
  <div>
    <ak-tooltip content="这里是提示文字，因为icon比较小，可使用x微调" :x="-10">
    <i class="tooltip-icon">?</i>
    </ak-tooltip>
    <ak-tooltip content="这里是提示文字。使用x轴微调将箭头和icon对齐" :x="-10"><i class="tooltip-icon">?</i></ak-tooltip>
  </div>
</template>

```

### 固定显示

```vue demo
<template>
  <div class="tooltip-demo">
    <ak-tooltip content="一直都显示的" :always="true" direction="top">
       <span>always</span>
    </ak-tooltip>
  </div>
</template>

```

### 内容参数可使用slots形式

```vue demo
<template>
  <div class="tooltip-demo">
    <ak-tooltip direction="top">
       <ak-button>内容为slot</ak-button>
       <template #content>
        这里是提示内容
       </template>
    </ak-tooltip>
  </div>
</template>

```

### 设置延时关闭
通过`delay`设置延时关闭，可将鼠标移至提示语上，例如实现提示语上的点击事件
```vue demo
<template>
  <div class="tooltip-demo">
    <ak-tooltip direction="top" :delay="300">
       <ak-button>设置延时关闭</ak-button>
       <template #content>
        这里是提示内容，鼠标可以移动到上面，提示内容不会消失，可实现从这里点击跳转链接等
       </template>
    </ak-tooltip>
  </div>
</template>

```
## API
### Tooltip Props
|参数|类型|说明|
|-|-|-|
|content        | String         |显示的内容，也可以是slot|
|direction      | String         |显示方向。有top-left、top、top-right、left、right、bottom-left、bottom、bottom-right共8个方向，默认top-left|
|maxWidth       | Number/500     |最大显示宽|
|delay          | Number/0       |延时关闭时间，单位毫秒。主要是为了能让鼠标移到提示文字上面，实现点链接等|
|always         |Boolean/false    |是否总是可见|
|x              |Number           |弹出窗距离触发点x轴方向的距离，可用于微调距离|
|y              |Number           |弹出窗距离触发点y轴方向的距离，可用于微调距离|
|transition     |String           |自定义显示隐藏过渡动画名称，需要手动添加相应的css样式|
|appendToBody   |Boolean/true     |提示内容是否插入到body|
|className      |String           |自定样式类名|
