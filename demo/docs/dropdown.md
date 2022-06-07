<!-- Created by 337547038 on 2019/8/6 0006. -->
<script>
export default {
  methods:{
   click(){
     alert('菜单选项')
   } 
  }
}
</script>
# Dropdown 下拉菜单
### 用法
:::demo 通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单
```html
<template>
  <ak-dropdown>
    下拉菜单
    <ul slot="dropdown">
       <ak-dropdown-item v-for="item in 5" :key="item">菜单选项{{item}}</ak-dropdown-item>
    </ul>
  </ak-dropdown>
</template>
<script>

</script>
```
:::

### 触发对象
:::demo 通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单
```html
<template>
 <div>
   <ak-dropdown>
     <ak-button>下拉菜单<i class="icon-arrow"></i></ak-button>
     <ul slot="dropdown">
       <ak-dropdown-item v-for="item in 5" :key="item">菜单选项{{item}}</ak-dropdown-item>
     </ul>
   </ak-dropdown>
   <ak-dropdown style="border: 1px solid #ddd;padding:8px 12px ">
     <span>文字无触发事件</span>
     <i class="icon-arrow" slot="trigger" style="margin-left: 15px;"></i>
     <ul slot="dropdown">
        <ak-dropdown-item v-for="item in 5" :key="item">菜单选项{{item}}</ak-dropdown-item>
     </ul>
   </ak-dropdown>
   <ak-dropdown trigger="click">
     <ak-button>点击下拉<i class="icon-arrow"></i></ak-button>
      <ul slot="dropdown">
        <ak-dropdown-item v-for="item in 5" :key="item">菜单选项{{item}}</ak-dropdown-item>
      </ul>
   </ak-dropdown>
   <ak-dropdown trigger="click" style="border: 1px solid #ddd;padding:8px 12px">
        <span>点击箭头下拉</span>
        <i class="icon-arrow" slot="trigger" style="margin-left: 30px;"></i>
        <ul slot="dropdown">
           <ak-dropdown-item v-for="item in 5" :key="item">菜单选项{{item}}</ak-dropdown-item>
        </ul>
   </ak-dropdown>
 </div>
</template>
<script>

</script>
<style>
.ak-dropdown{margin-right: 15px;}
</style>

```
:::

### 事件
:::demo 
```html
<template>
  <ak-dropdown ref="dropdown">
    下拉菜单
    <ul slot="dropdown">
       <ak-dropdown-item v-for="item in 5" @click="click" :key="item">菜单选项{{item}}</ak-dropdown-item>
    </ul>
  </ak-dropdown>
</template>
<script>
export default {
  methods:{
   click(){
     alert('菜单选项')
   } 
  }
}
</script>
```
:::

## API
### Dropdown
|参数|类型|说明|
|-|-|-|
|trigger        | String/hover   |触发下拉的行为,hover和click|
|appendToBody   | Boolean/false  |插入到body|
|maxHeight      | Number          |距离浏览底部高度，当小于这个高度时将向上弹出|

### DropdownItem
|参数|类型|说明|
|-|-|-|
|disabled       | Boolean/false  |禁用状态|
|className      | String         |类名|

### Dropdown Event
|参数|说明|
|-|-|
|click      |点击事件|

### Dropdown Methods
|参数|说明|
|-|-|
|hide      |用于收起下拉|
