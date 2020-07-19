<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      ajaxContent: ''
    }
  },
  methods: {
    _tabChange (name, label, index) {
      console.log(name, label, index)
    },
    _ajax (name, label, index) {
      this.ajaxContent = `当前点击选项的name值：${name}；label为：${label}`
    },
    beforeLeave (name) {
      return false
    }
  }
}
</script>

# Tabs 标签页

### 基本用法
:::demo 
```html
<template>
  <ak-tabs>
    <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
    <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
  </ak-tabs>
</template>
```
:::

### 选择卡样式
:::demo 可通过添加样式实现不同的展示样式
```html
<template>
  <akTabs class="tabs-style">
    <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
    <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
  </akTabs>
</template>
<style>
.tabs-style{}
.tabs-style .tab-nav{}
.tabs-style .tabs-tab{border: 1px solid #e4e7ed;background: #fff;border-left: 0;border-bottom: 0}
.tabs-style .tabs-tab:first-child{border-left: 1px solid #e4e7ed}
.tabs-style .tabs-tab:after{display: none!important;}
.tabs-style .tabs-tab.active{line-height: 41px;color: #409eff}
</style>
```
:::

### 可设置禁用项
:::demo 可通过添加样式实现不同的展示样式
```html
<template>
  <akTabs>
    <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
    <ak-tab-pane label="配置管理" :disabled="true">配置管理</ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
  </akTabs>
</template>
```
:::

### 自定义标签页
:::demo 可以通过具名 slot 来实现自定义标签页的内容
```html
<template>
  <akTabs>
    <ak-tab-pane>
     <span slot="label"><i class="icon-user"></i> 用户管理</span>
    用户管理
    </ak-tab-pane>
    <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
  </akTabs>
</template>
```
:::

### 可自定初始显示项
:::demo 通过添加value/v-model和name指定初始显示项。也可以只设置value值(`tab-*`*从1开始按顺序生成)，name为空
```html
<template>
  <div>
  <akTabs value="tab2">
      <ak-tab-pane label="用户管理" name="tab1">用户管理</ak-tab-pane>
      <ak-tab-pane label="配置管理" name="tab2">配置管理</ak-tab-pane>
      <ak-tab-pane label="角色管理" name="tab3">角色管理</ak-tab-pane>
      <ak-tab-pane label="定时任务补偿" name="tab4">定时任务补偿</ak-tab-pane>
    </akTabs>
    <p>只设置value值</p>
    <akTabs value="tab-2">
      <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
      <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
      <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
      <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
    </akTabs>
</div>
</template>
```
:::

### 可在Tabs内加入其他内容
:::demo 可以通过具名 slot 在标题和内容间显示其它内容
```html
<template>
  <akTabs>
    <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
    <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
    <div slot="content">这里可以加其他内容</div>
  </akTabs>
</template>
```
:::

### 可不显示切换内容
:::demo 很多时候并不需要通过显示和隐藏来切换内容，而是在点击选项卡标题时去动态加载数据，这时可设置showContent:false
```html
<template>
<div>
  <akTabs :showContent="false" :change="_ajax">
    <ak-tab-pane label="用户管理"></ak-tab-pane>
    <ak-tab-pane label="配置管理"></ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理，这里不需要有内容</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
  </akTabs>
  <div class="ajax-content">ajax content
     <p>{{ajaxContent}}</p>
  </div>
</div>  
</template>
```
:::

### 事件
:::demo 
```html
<template>
  <akTabs :change="_tabChange">
    <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
    <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
  </akTabs>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    _tabChange (name, label, index) {
      console.log(name, label, index)
    }
  }
}
</script>
```
:::

### 阻止事件
:::demo 切换标签之前的钩子，若返回 false，则阻止切换
```html
<template>
 <div>
  <akTabs :beforeLeave="beforeLeave">
    <ak-tab-pane label="用户管理">用户管理</ak-tab-pane>
    <ak-tab-pane label="配置管理">配置管理</ak-tab-pane>
    <ak-tab-pane label="角色管理">角色管理</ak-tab-pane>
    <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
  </akTabs>
 </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    beforeLeave (name) {
      console.log(name)
      return false
    }
  }
}
</script>
```
:::

## API
### Tabs
|参数|类型|说明|
|-|-|-|
|value          | string         |绑定值，支持v-model。对应选项卡的 name，为空时自动生成`tab-*`，初始默认显示第一项|
|class          | string         |原生|
|change         | function       |点击改变事件,function(name, label, index)|
|beforeLeave    | function       |切换标签之前的钩子，若返回 false，则阻止切换|

### Tabs Slot
|参数|类型|说明|
|-|-|-|
|content          | 显示于标题和内容之间的其他内容信息|

### TabPane
|参数|类型|说明|
|-|-|-|
|name           | string         |对应 Tabs 的 value 值，为空时自动生成。一般可不填写|
|class          | string         |原生|
|label          | string         |标签名称|
|disabled       | boolean/false  |禁用选顶|

### TabPane Slot
|参数|类型|说明|
|-|-|-|
|label          | -              ||
