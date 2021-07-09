<!-- Created by 337547038 on 2021/7/6 0006. -->

# Lazy 图片懒加载（指令）

### 基本用法

图片的`src`可通过`v-lazy='src'`或`data-src='src'`两种方式传入

```vue demo

<template>
  <div class="lazy-demo">
    <p><img v-lazy="defaultLazy"></p>
    或者
    <p><img data-src="http://www.33lc.com/article/UploadPic/2012-8/2012831462935573.jpg" v-lazy></p>
    <p>图片不存在时</p>
    <p><img data-src="lazy1.jpg" v-lazy>
    </p>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const defaultLazy = ref('https://337547038.github.io/static/img/lazy1.jpg')
    return {
      defaultLazy
    }
  }
}
</script>

```

### 自定默认和错误时的图片

`data-src`图片真实地址，`data-error`加载错误显示的图片地址,`src`默认初始显示图片地址

```vue demo

<template>
  <div class="lazy-demo">
    <p><img
      data-src="http://www.33lc.com/article/UploadPic/2012-8/2012831462935573.jpg"
      data-error="error.jpg"
      :src="src" v-lazy></p>
  </div>
</template>
<script>
export default {
  setup() {
    const src = 'default.jpg'
    return {
      src
    }
  }
}
</script>
```

### 在指定容器中滚动

指令后面指定容器`id` `v-lazy:container='src''`

```vue demo

<template>
  <div id="container" style="height: 300px;overflow-y: auto" class="lazy-demo">
    <p v-for="item in imgList" style="min-height: 310px;">
      <img v-lazy:container="item">
    </p>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const imgList = [
      'http://www.33lc.com/article/UploadPic/2012-8/2012831493534705.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/2012831495398936.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/2012831411282914.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/2012831411736193.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/20128314114848605.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/2012831412430262.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/2012831413277067.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/2012831413873333.jpg',
      'http://www.33lc.com/article/UploadPic/2012-8/20128314135357731.jpg'
    ]
    return {
      imgList
    }
  }
}
</script>
```

## API

### 全局设置

```javascript
Vue.use(Lazy, {
  loading: '/static/img/lazy-default.gif', // 初始默认显示的图片
  error: '/static/img/lazy-error.png', // 加载错误时显示的图片
  fadeIn: true, // 加载完成时图片淡入
  threshold: 0 // 图片离可视区域的距离。负值表示提前进入，正值表示延迟进入
})
```

### Lazy Props

|参数|类型|说明|
|----------|--------------|--------|
|v-lazy         | String         |图片真实地址，也可使用`data-src`|
|src            | String         |初始默认显示的图片，一般不需要单独设置|
|data-error     | String         |加载错误时显示的图片，一般不需要单独设置|
|data-src       | String         |图片真实地址|
