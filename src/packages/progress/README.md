<!-- Created by 337547038 on 2021/6/30. -->

# Progress 进度条

### 基础用法

```vue demo

<template>
  <div>
    <p>
      <ak-progress v-model="value1" />
    </p>
    <p>
      <ak-progress :modelValue="30" />
    </p>
    <p>
      <ak-progress :modelValue="100" />
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value1: 0,
    }
  }
}
</script>
```


### 其他用法


```vue demo

<template>
  <div>
    <p>设置宽高</p>
    <p>
      <ak-progress :modelValue="50" :radius="300" :border="10" />
    </p>
    <p>设置背景和进度颜色</p>
    <p>
      <ak-progress :modelValue="30" color="#ddd" borderColor="#f60" />
    </p>
    <p>进度文字固定位置</p>
    <p>
      <ak-progress :modelValue="80" :followText="false" />
    </p>
  </div>
</template>
<script>
export default {
}
</script>
```

### 环形进度条

```vue demo

<template>
  <div>

    <ak-progress :modelValue="0" :radius="50" :border="8" type="circle"></ak-progress>

    <ak-progress :modelValue="30" :radius="50" :border="8" type="circle"></ak-progress>

    <ak-progress :modelValue="50" :radius="50" :border="8" type="circle"></ak-progress>

    <ak-progress :modelValue="80" :radius="50" :border="8" color="#ddd" borderColor="#f60" type="circle"></ak-progress>

    <ak-progress :modelValue="100" :radius="50" :border="8" type="circle"></ak-progress>

    <ak-progress :modelValue="80" :radius="50" :border="8" type="circle" :showText="false">自定义显示内容</ak-progress>

  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
```


## API
### Progress
|参数|类型|说明|
|-|-|-|
|v-model        | Number         |进度值|
|type           | String         |进度条类型，支持两种line直线、circle圆环|
|radius         | Number         |圆环半径，单位px。line时为宽|
|border         | Number         |进度条宽，单位px。line时为高|
|color          | String         |背景颜色|
|borderColor    | String         |进度颜色|
|duration       | Number/1000    |持续时间，单位毫秒|
|showText       | Boolean/true   |显示进度文字|
|followText     | Boolean/true   |进度文字跟随进度的位置,type=line时有效|

