# Vue Components For PC
基于Vue2.x的一套PC端UI组件库，包含了 AutoForm 自动表单、BackTop 返回顶部、Breadcrumb 面包屑、 Button 按钮、Cascader 级联选择器、Checkbox 多选框、Collapse 折叠面板、ColorPicker 颜色选择器、DataPicker 时间选择器、Dialog 弹层对话框、Alert 弹框、Echarts 图形图表、Form 表单、Input 输入框、Lazy 图片延时加载、Loading 加载等待、Menu 菜单、Pagination 分页、Progress 进度条、Radio 单选框、Select 选择器、Steps 步骤条、Swiper 图片轮播、Switch 开关、Table 表格、Tabs 标签页、Textarea 文本框、Tooltip 提示、Transfer 穿梭框、Tree 树形、Upload 上传等组件

使用简单方便，可用于学习研究，欢迎交流~~



## 示例演示地址

包含了每个组件的使用方法及所有参数配置说明

https://337547038.github.io/akvue/

或

https://q337547038.gitee.io/ak-vue

## 组件说明
- dist-buildDocs 打包生成的示例演示文件
- docs 下为示例演示页面，同时为了方便样式维护，全部独立为scss文件；
- packages 组件资源包

 > 所有组件css样式大部分都是用于组件示例演示，让页面看起来舒服点而已，并不是必需的。实际应用中应根据项目主题重构组件样式

## 实现组件
- [x] AutoForm 自动表单
- [x] BackTop 返回顶部
- [x] Breadcrumb 面包屑
- [x] Button 按钮
- [x] Cascader 级联选择器
- [x] Checkbox 多选框
- [x] Collapse 折叠面板
- [x] ColorPicker 颜色选择器
- [x] DataPicker 时间选择器
- [x] Dialog 弹层对话框
- [x] Alert 弹框
- [x] Echarts 图形图表
- [x] Form 表单
- [x] Input 输入框
- [x] Lazy 图片延时加载
- [x] Loading 加载等待
- [x] Menu 菜单
- [x] Pagination 分页
- [x] Progress 进度条
- [x] Radio 单选框
- [x] Select 选择器
- [x] Steps 步骤条
- [x] Swiper 图片轮播
- [x] Switch 开关
- [x] Table 表格
- [x] Tabs 标签页
- [x] Textarea 文本框
- [x] Tooltip 提示
- [x] Transfer 穿梭框
- [x] Tree 树形
- [x] Upload 上传


## vue-cli3配置说明

- [x] 配置多环境变量
 通过修改`VUE_APP_BASE_URL`来选择不同的环境API接口，而不需要针对不同环境新建一个`.env.xxx`文件
 
- [x] 自动生成雪碧图 
 `src/assets/icons`中存放需要生成雪碧图的`png`文件。每次运行`npm run serve/build`会生成雪碧图。生成的图片存放位置`src/assets/images/sprites.png`；样式生成位置`src/assets/scss/sprites.scss`
 
- [x] 利用splitChunks单独打包第三方模块

- [x] 配置externals引入cdn资源

- [x] 添加 IE 兼容

- [x] 复制静态资源

- [x] 组件单独打包

- [x] 将script插入html

## 组件使用
``` bash
# install dependencies
npm install

# docs serve with hot reload at localhost:8080
npm run docs

# docs for production with minification
npm run buildDocs

# serve with hot reload at localhost:8080
npm run serve

# build for production with minification
npm run build

# build for all components
npm run buildComponents

# build for production and view the bundle analyzer report
npm run build --report
