<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      loading1: true,
      loading2: true,
      fullScreenLoading: false
    }
  },
  methods: {
    openFullScreen () {
      this.fullScreenLoading = true
      setTimeout(() => {
        this.fullScreenLoading = false
      }, 2000)
    },
    openFullScreen2 () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'ak-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
  }
}
</script>
# Loading

> 自定义指令v-loading，只需要绑定Boolean即可。默认状况下，Loading 遮罩会插入到绑定元素的子节点，通过添加body修饰符，可以使遮罩插入至 DOM 中的 body 上。

### 区域加载

:::demo 在表格等容器中加载数据时显示。
```html
<template>
<div>
  <div style="width: 400px;height: 200px;border: 1px solid #ddd" v-loading="loading1">容器区域</div>
</div>
</template>
<script>
export default {
  data () {
    return {
      loading1: true
    }
  }
}
</script>

```
:::

### 自定义
:::demo 可自定义加载文案、图标和背景色。通过`ak-loading-text`设置提示文字，`ak-loading-spinner`设置图标类名，`ak-loading-background`设置背景色
```html
<template>
  <div style="width: 100%;height: 200px;border: 1px solid #ddd" v-loading="loading2" ak-loading-text="玩命加载中.." ak-loading-spinner="ak-icon-loading" ak-loading-background="rgba(0, 0, 0, 0.8)">容器区域</div>
</template>
<script>
export default {
  data () {
    return {
      loading2: true
    }
  }
}
</script>

```
:::

### 整页加载
:::demo 通过服务方式只能是插入至body
```html
<template>
  <div>
  <ak-button type="primary" @click="openFullScreen" v-loading.body.lock="fullScreenLoading">加载</ak-button>
  <ak-button type="primary" @click="openFullScreen2">服务方式</ak-button>
</div>
</template>
<script>
export default {
  data () {
    return {
      fullScreenLoading: false
    }
  },
  methods: {
    openFullScreen () {
      this.fullScreenLoading = true
      setTimeout(() => {
        this.fullScreenLoading = false
      }, 2000)
    },
    openFullScreen2 () {
       const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'ak-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
          })
       setTimeout(() => {
          loading.close()
       }, 2000)
    }
  }
}
</script>
```
:::

## API
### Loading
|参数|类型|说明|
|-|-|-|
|text           | String         |显示在加载图标下方的加载文案|
|background     | String         |遮罩背景色|
|spinner        | String         |自定义加载图标类名|
|lock           | Boolean/false  |锁定滚动|
|body           | Boolean/false  |将遮罩层插入到body|
