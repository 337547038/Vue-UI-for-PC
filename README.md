# Vue UI For PC
基于Vue2.5的一套PC端UI组件，包括了Carousel 跑马灯、Cascader 级联、Checkbox 多选框、Collapse 折叠面板、DatePicker 日期选择、Dialog 对话框、Form 表单、Input 输入框、InputNumber 数字输入框、Layer 弹窗层、Loading 加载、Menu 菜单、Page 分页、Progress 进度条、Radio 单选框、SelectDropDown 仿select、Switch 开关、Table 表格、Tabs 标签页、Textarea 文本框、Tooltip 文字提示、BackTop 返回顶部、steps 步骤条、Transfer 穿梭框、Tree 树形、Upload 文件上传、Lazy 图片懒加载、Loading 加载、Pagination 分页等等

## 示例演示地址
https://337547038.github.io/akvue/

## 组件说明
docs下为示例演示页面，同时为了方便样式维护，全部独立为scss文件；

## vue-cli3配置说明

###- √ 配置多环境变量
 通过修改`VUE_APP_BASE_URL`来选择不同的环境API接口
 
### - √ 自动生成雪碧图 
 `src/assets/icons`中存放需要生成雪碧图的`png`文件。每次运行`npm run serve/build`会生成雪碧图。生成的图片存放位置`src/assets/images/sprites.png`；样式生成位置`src/assets/scss/sprites.scss`
 
### - √ 利用splitChunks单独打包第三方模块

### - √ 配置externals引入cdn资源

### - √ 添加 IE 兼容

### - √ 复制静态资源

### - √ 组件单独打包

### - √ 将script插入html

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
