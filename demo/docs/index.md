<!-- Created by 337547038 on 2018/8/22 0022. -->

# 使用

## 说明
> 注意：因vue页面不支持多个`script`，因此将所有方法写在第一个`script`里，后面所有`script`只作演示，并不会执行

## 直接引入
> 通过将组件打包为单独js，在页面上引入 js 和 css 文件即可开始使用：
```html
<!-- import Vue.js -->
<script src="/js/vue.min.js"></script>
<!-- import stylesheet -->
<link rel="stylesheet" href="/dist/style/ak.css">
<!-- import ak.js -->
<script src="/dist/ak.min.js"></script>
```

## 全局引入（推荐）
> 一般在 webpack 入口页面 main.js 中如下配置：
```javascript
import Component from '../packages/index'
// 全局注册基础组件
Vue.use(Component)
```
## 按需引用
> 在当前页面import所需组件
```javascript
import Button from '../packages/button'
```
