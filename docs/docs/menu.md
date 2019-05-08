# Menu 菜单
<script>
export default {
  data () {
    return {
      menuData: [
        {title: '首页', href: '/'},
        {title: '产品中心'},
        {title: '关于我们', href: ''},
        {title: '联系我们', href: '/contact'}
      ],
      menuData2: [
        {title: '首页', href: '/', name: 'a1'},
        {title: '产品中心',
          href: '/product',
          name: 'a2',
          children: [
            {title: '下拉1', name: 'a22'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '关于我们',
          href: '',
          name: 'a3',
          children: [
            {title: '下拉1'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '联系我们', href: '/contact', name: 'a4'}
      ],
      menuData3: [
        {title: '首页', href: '/', name: 'a1'},
        {title: '产品中心',
          href: '/product',
          name: 'a2',
          open: true,
          children: [
            {title: '下拉1', name: 'a22'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '关于我们',
          href: '',
          name: 'a3',
          children: [
            {title: '下拉1'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '联系我们', href: '/contact', name: 'a4'}
      ]
    }
  },
  methods: {
    _click (item) {
      console.log(item)
    }
  }
}
</script>
## 基础用法
:::demo 
```html
<template>
  <div>
    <ak-menu :data="menuData" value="a2"></ak-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuData: [
        {title: '首页', href: '/'},
        {title: '产品中心'},
        {title: '关于我们', href: ''},
        {title: '联系我们', href: '/contact'}
      ]
    }
  }
}
</script>


```
:::

## 子导航下拉
:::demo 
```html
<template>
  <div>
    <ak-menu :data="menuData2" value="a22"></ak-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuData2: [
        {title: '首页', href: '/', name: 'a1'},
        {title: '产品中心',
          href: '/product',
          name: 'a2',
          children: [
            {title: '下拉1', name: 'a22'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '关于我们',
          href: '',
          name: 'a3',
          children: [
            {title: '下拉1'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '联系我们', href: '/contact', name: 'a4'}
      ]
    }
  }
}
</script>


```
:::

## 垂直方向
:::demo 可展开默认项
```html
<template>
  <div>
    <ak-menu :data="menuData3" value="a22" type="v" @click="_click"></ak-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuData3: [
        {title: '首页', href: '/', name: 'a1'},
        {title: '产品中心',
          href: '/product',
          name: 'a2',
          open: true,
          children: [
            {title: '下拉1', name: 'a22'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '关于我们',
          href: '',
          name: 'a3',
          children: [
            {title: '下拉1'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '联系我们', href: '/contact', name: 'a4'}
      ]
    }
  },
  methods: {
    _click (item) {
      console.log(item)
    }
  }
}
</script>


```
:::
## API
### Menu
|参数|类型|说明|
|-|-|-|
|data           | Array          |菜单数组|
|type           | String/h       |菜单类型，可选值为 h（horizontal水平，默认） 和 v（vertical垂直）|
|value          | String         |用于表示当前菜单位置，对应data中的name|
|router         | Boolean/true   |使用路由地址|
|accordion      | Boolean/false  |是否开启手风琴模式，开启后每次至多展开一个子菜单，type=v有效|
|showTitle      | Boolean/false  |鼠标滑过时显示title提示|
|liHeight       | Number         |二级菜单li的高度，用来计算设置父元素的高度，方便设置css动画。点击展开收起时|

### Menu Data
|参数|类型|说明|
|-|-|-|
|title          | String         |菜单名称|
|href           | String         |url地址，为空时会添加javascript:;空链接|
|target         | String         |打开类型|
|name           | String         |菜单项的唯一标识|
|open           | Boolean/false  |展开子菜单|
|children       | Array          |子菜单数据|

### Menu Event
|参数|类型|说明|
|-|-|-|
|toggle         | Function       |点击时用于控制展开或收缩，一级菜单的控制标签|
|click          | Function       |菜单点击事件，href为空时有效，否则发生页面跳转|
