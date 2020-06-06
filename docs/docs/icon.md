<!-- Created by 337547038 on 2018/9/7 0007. -->
# Icon 图标
> 字体图标引用iconfont
> 演示没有引入iconfont，这里不显示

## 基础用法
:::demo `showLabel=false`不显示名称

```html
<template>
  <div>
    <ak-icon icon="name" label="名称"></ak-icon>
    <ak-icon icon="name" label="不显示名称" :showLabel="false"></ak-icon>
  </div>
</template>
```

:::

## 多个一起使用
:::demo 多个一起使用时，统一接管点击事件

```html
<template>
   <div>
      <ak-icons @click="click">
        <ak-icon icon="name" label="名称"></ak-icon>
        <ak-icon icon="name2" label="名称2"></ak-icon>
        <ak-icon icon="name3" label="名称3"></ak-icon>
        <ak-icon icon="name4" label="不显示标签名" :showLabel="false"></ak-icon>
      </ak-icons>
   </div>
</template>
<script>
export default {
  methods:{
    click(name){
      console.log(name)
    }
  }
}
</script>
```

:::

## API
### Icon
|参数|类型|说明|
|-|-|-|
|icon           | String         |图标名称|
|name           | String         |唯一标识，在Icons事件里可用于识别当前图标|
|showLabel      | boolean/false  |显示label名称|
|label          | String         |显示的名称|

### Icons
|参数|类型|说明|
|-|-|-|
|showLabel      | boolean/false  |设置false所有子icon都不显示label|

### Icon/Icons Event
|参数|说明|
|-|-|
|click           |点击事件|
