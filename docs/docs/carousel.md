# Carousel 走马灯
### 1、基本使用
:::demo 
```html
<template>
   <ak-carousel>
       <ak-carousel-item v-for="item in 6" :key="item">
          {{item}}
       </ak-carousel-item>
   </ak-carousel>
</template>
<script>

</script>
```
:::

### 2、循环轮播
:::demo 循环轮播`loop=true`
```html
<template>
   <ak-carousel :loop="true">
       <ak-carousel-item v-for="item in 6" :key="item">
          {{item}}
       </ak-carousel-item>
   </ak-carousel>
</template>
<script>

</script>
```
:::

### 3、方向
:::demo 默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。需设置高度`itemHeight`
```html
<template>
   <ak-carousel direction="v" :itemHeight="100">
       <ak-carousel-item v-for="item in 6" :key="item">
          {{item}}
       </ak-carousel-item>
   </ak-carousel>
</template>
<script>

</script>
```
:::

### 4、卡片
:::demo 通过设置每屏可视数量，配合自定义样式展示卡片化切换
```html
<template>
   <ak-carousel :showNumber="3" class="card">
       <ak-carousel-item v-for="item in 6" :key="item">
          <div>{{item}}</div>
       </ak-carousel-item>
   </ak-carousel>
</template>
<script>

</script>

```
:::

### 5、一次显示多个slides
:::demo 同时可使用`move`指定每次移动的个数
```html
<template>
   <ak-carousel :showNumber="5" :move="2">
       <ak-carousel-item v-for="item in 15" :key="item">
          {{item}}
       </ak-carousel-item>
   </ak-carousel>
</template>
<script>

</script>
<style>
.carousel-slide{height: 100px;text-align: center;line-height: 100px}
.carousel-slide:nth-child(odd){background:#ddd}
.carousel-slide:nth-child(even){background:#ccc}
</style>

```
:::
## API
### Carousel
|参数|类型|说明|
|-|-|-|
|controlNav     | Boolean/true    |显示控制导航|
|directionNav   | Boolean/true    |显示前后控制导航|
|direction      | string/h        |走马灯展示的方向，horizontal/vertical两种，简写h/v|
|showNumber     | Number/1        |可视个数|
|loop           | Boolean/true    |是否循环|
|move           | Number/1        |每次移动单位个数|
|itemWidth      | Number          |单位移动宽度|
|active         | Number/0        |初始显示第几个，从0开始|
|duration       | Number/500      |切换过渡时间|
|showTime       | Number/3000     |自动播放时停留的时间|
|autoPlay       | Boolean/false   |是否用动播放|
|pauseOnHover   | Boolean/true    |鼠标滑动过暂停播放|
|slice          | Boolean/true    |强制截取数据以符合循环展示最佳效果，当loop=true时有效|
### Carousel Event
|参数|说明|
|-|-|
|slideBefore          | -|
|slideAfter          | -|
### Carousel Methods
|参数|说明|
|-|-|
|init          | -|
