# Lazy 图片延时加载（指令）

> 1.图片的src可通过v-lazy='src'和data-src='src'两种方式传入，前者优先

> 2.默认是监听window滚动，在容器内滚动时添加v-lazy:容器id

## 使用方法
```html
1.在main.js引入 import Lazy from '../packages/lazy'
2.以下各参数均可不设置，如 Vue.use(Lazy)
Vue.use(Lazy, {
    default: '/static/image/lazy-default.gif', // 初始默认显示的图片
    error: '/static/image/lazy-error.png', // 加载错误时显示的图片
    fadeIn: true, // 加载完成时图片淡入
    threshold: 0 // 图片离可视区域的距离。负值表示提前进入，正值表示延迟进入
  })
```
<script>
export default {
  data () {
    return {
      defaultLazy: '/static/image/lazy1.jpg',
      imgList: [
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
    }
  }
}
</script>
## 基础用法
:::demo  图片的src可通过v-lazy='src'和data-src='src'两种方式传入，前者优先
```html
<template>
  <div class="demo">
    <p><img v-lazy="defaultLazy"></p>
    或者
    <p><img data-src="/static/image/lazy1.jpg" v-lazy></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      defaultLazy: '/static/image/lazy1.jpg'
    }
  }
}
</script>
<style>
  .demo img{width: 100%}
  .demo p{text-align: center}
</style>
```
:::

## 单图自定义
:::demo 通过img传参数，`data-src`图片真实地址，`data-error`加载错误显示的图片地址,`src`默认初始显示图片地址
```html
<template>
  <div class="demo">
    <p><img
      data-src="http://www.33lc.com/article/UploadPic/2012-8/2012831462935573.jpg"
      data-error="error.jpg"
      src="default.jpg" v-lazy></p>
    <p><img
      data-src="http://www.33lc.com/article/UploadPic/2012-8/20128314143814136.jpg"
      data-error="error.jpg"
      src="default.jpg" v-lazy></p>
    <p><img
      data-src="http://www.33lc.com/article/UploadPic/2012-8/2012831416948898.jpg"
      data-error="error.jpg"
      src="default.jpg" v-lazy></p>    
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>
```
:::

## 在指定容器中滚动
:::demo 指令后面指定容器id`v-lazy:container='src''`
```html
<template>
  <div class="demo" id="container">
    <p v-for="item in imgList" style="min-height: 310px;">
      <img v-lazy:container="item">
    </p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgList: [
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
    }
  }
}
</script>
<style>
  #container{height: 300px;overflow-y: auto}
</style>
```
:::

## API
### Lazy
|参数|类型|说明|
|-|-|-|
|default        | String         |初始默认显示的图片，默认/static/image/lazy-default.gif|
|error          | String         |加载错误时显示的图片，默认/static/image/lazy-error.png|
|fadeIn         | boolean/true   |加载完成时图片淡入|
|threshold      | number         |图片离可视区域的距离。负值表示提前进入，正值表示延迟进入|
|src            | String         |同default，仅对单图|
|data-error     | String         |同error，仅对单图|
|data-src       | String         |图片真实地址另一种传值方式，仅对单图|
