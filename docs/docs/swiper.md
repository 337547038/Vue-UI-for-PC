<!-- Created by 337547038 on $. -->
# Swiper 图片轮播

### 1、基本使用
:::demo 
```html
<template>
  <div>
    <ak-swiper>
      <ak-swipe-item>000</ak-swipe-item>
      <ak-swipe-item>11</ak-swipe-item>
      <ak-swipe-item>22</ak-swipe-item>
    </ak-swiper>
  </div>
</template>
<script>
export default{
  data () {
    return {
      
    }
  }
}
</script>
```
:::

### 2、其它配置
:::demo 
```html
<template>
  <div>
    <ak-swiper animation="fade">
      <ak-swipe-item>000</ak-swipe-item>
      <ak-swipe-item>11</ak-swipe-item>
      <ak-swipe-item>22</ak-swipe-item>
    </ak-swiper>
  </div>
</template>
<script>
export default{
  data () {
    return {
      
    }
  }
}
</script>
```
:::

## API
### Swiper
|参数|类型|说明|
|-|-|-|
|active         | Number/0       |初始显示第几个|
|showTime       | Number/5000    |自动播放时停留的时间|
|autoPlay       | Boolean/true   |是否用动播放|
|slideBefore    | Function       |轮播回调|
|slideAfter     | Function       |轮播回调|
|distance       | Number/50      |触摸松开时触发距离，单位px|
|duration       | Number/500     |切换过渡时间|
|controlNav     | Boolean/true   |显示控制导航|
|directionNav   | Boolean/true   |显示前后控制导航|
|pauseOnHover   | Boolean/true   |鼠标滑动过暂停播放|
|touch          | Boolean/true   |允许触摸滑动|
|animation      | String         |切换类型，fade, slide两种|
