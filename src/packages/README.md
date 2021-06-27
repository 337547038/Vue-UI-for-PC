<!-- Created by 337547038 on 2021/6/27. -->

# 使用

基于 Vue3 + Typescript + Vite，用于学习研究，欢迎交流，QQ/微信:337547038

[Vue2 版本的请点击这里](https://337547038.github.io/akvue/)

## 全局引入（推荐）

在入口页面 main.js 中如下配置：

```javascript
import Component from '../packages/index'
// 全局注册基础组件
Vue.use(Component)
```

## 按需引用

在当前页面import所需组件

```javascript
import Button from '../packages/button.vue'
```
