<!-- Created by 337547038 on 2021/7/5 0005. -->

# Loading 加载等待

自定义指令`v-loading`，只需要绑定`Boolean`即可。默认状况下，`Loading`会插入到绑定元素的子节点

### 基本用法

```vue demo

<template>
  <div>
    <div v-loading="loading" style="width: 400px;height: 200px;border: 1px solid #ddd">容器区域</div>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const loading = ref(true)
    return {
      loading
    }
  }
}
</script>

```

### 自定义

可自定义加载文案、图标和背景色。通过`ak-loading-text`设置提示文字，`ak-loading-spinner`设置图标类名，`ak-loading-background`设置背景色

```vue demo

<template>
  <div>
    <div style="width: 100%;height: 200px;border: 1px solid #ddd" v-loading="loading" ak-loading-text="玩命加载中.." ak-loading-spinner="ak-icon-loading" ak-loading-background="rgba(0, 0, 0, 0.8)">容器区域</div>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const loading = ref(true)
    return {
      loading
    }
  }
}
</script>

```

### 其他加载方式

支持`inject('Loading')`，`this.$msg()`，`getCurrentInstance().proxy.$loading()`方式引用

```vue demo

<template>
  <div>
    <ak-button v-loading.el.lock="loading" type="primary" @click="openFullScreen">加载</ak-button>
    <ak-button type="primary" @click="openFullScreen2">服务方式</ak-button>
  </div>
</template>
<script>
import {ref, inject} from 'vue'

export default {
  setup() {
    const loading = ref(false)
    const openFullScreen = () => {
      loading.value = true
      setTimeout(() => {
        loading.value = false
      }, 3000)
    }
    const Loading = inject('Loading')
    const openFullScreen2 = () => {
      const loading = Loading.loading()
      setTimeout(() => {
        loading.close()
      }, 3000)
    }
    return {
      loading,
      openFullScreen,
      openFullScreen2
    }
  }
}
</script>

```

## API

### Loading

|参数|类型|说明|
|----------|--------------|--------|
|text           | String         |显示在加载图标下方的加载文案|
|background     | String         |遮罩背景色|
|spinner        | String         |自定义加载图标类名|
|lock           | Boolean/false  |锁定滚动|
|zIndex         | Number         |层级|
|el             | 标签对象         |将内容插入到指定标签，默认为当前标签|
