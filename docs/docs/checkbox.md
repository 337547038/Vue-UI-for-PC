<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      checkbox1: true,
      checkbox2: false,
      checkbox3: '1',
      checkbox4: ['4'],
      checkbox5: [],
      checkbox6: true,
      checkbox7: false,
      checkbox8: ['a1', 'a6'],
      checkbox9: ['a2', 'a5'],
      checkbox10: [],
      checkbox11: ['a2','a6'],
      groupData: [
        {label: '选项1', value: 'a1'},
        {label: '选项2', value: 'a2' , class: 'cla'},
        {label: '选项3', value: 'a3'},
        {value: 'a4'},
        {label: '禁用', value: 'a5', disabled: true},
        {label: '勾选禁用', value: 'a6', disabled: true}
      ]
    }
  },
  methods: {
  _chagen11(){
  console.log('ff')
  }
  }
}
</script>

# Checkbox 多选框

### 基础用法
:::demo 单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。如选中时需要返回指定的值，则添加`value`，并且v-model的值为数组
```html
<template>
  <div>  
    <p><ak-checkbox v-model="checkbox1">选项1</ak-checkbox> {{checkbox1}} </p>
    <p><ak-checkbox v-model="checkbox2">选项2</ak-checkbox> {{checkbox2}}</p>
    <p><ak-checkbox v-model="checkbox3">选项3</ak-checkbox> {{checkbox3}}（v-model的值只要为true都会是勾选状态）</p>
    <p>&nbsp;</p>
    <p>选中时返回指定值（v-model=value或是value存在于v-model数组中，即选中状态）</p>
    <p><ak-checkbox v-model="checkbox4" value="4">选项4</ak-checkbox> {{checkbox4}}</p>
    <p><ak-checkbox v-model="checkbox5" value="5">选项5</ak-checkbox> {{checkbox5}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      checkbox1:true
      checkbox2:false,
      checkbox3:'1',
      checkbox4: ['4'],
      checkbox5: [],
    }
  }
}
</script>
```
:::

### 禁用状态
:::demo 多选框不可用状态
```html
<template>
  <div>
    <p><ak-checkbox v-model="checkbox6" :disabled="true">选项1</ak-checkbox> {{checkbox6}}</p>
    <p><ak-checkbox v-model="checkbox7" :disabled="true">选项2</ak-checkbox> {{checkbox7}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      checkbox6:true,
      checkbox7:false
    }
  }
}
</script>
```
:::

### 多选框组
>data中选项text可为空

:::demo 
```html
<template>
  <div>
    <p>已选值：{{checkbox8}}</p>
    <p><ak-checkbox-group v-model="checkbox8" :data="groupData">选项1</ak-checkbox-group></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkbox6: ['a1', 'a6'],
      groupData: [
        {label: '选项1', value: 'a1'},
        {label: '选项2', value: 'a2'},
        {label: '选项3', value: 'a3'},
        {value: 'a4'},
        {label: '禁用', value: 'a5', disabled: true},
        {label: '勾选禁用', value: 'a6', disabled: true}
      ]
    }
  }
}
</script>

```
:::

### 可选项目数量的限制

:::demo 例子最多可选`max=4`，最少需选`min=2`
```html
<template>
  <div>
    <p>已选值：{{checkbox9}}</p>
    <p><ak-checkbox-group v-model="checkbox9" :data="groupData" :min="2" :max="4" >选项1</ak-checkbox-group></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkbox7: ['a2', 'a5'],
      groupData: [
        {label: '选项1', value: 'a1'},
        {label: '选项2', value: 'a2'},
        {label: '选项3', value: 'a3'},
        {value: 'a4'},
        {label: '禁用', value: 'a5', disabled: true},
        {label: '勾选禁用', value: 'a6', disabled: true}
      ]
    }
  }
}
</script>

```
:::

### 组全选或全不选方法

:::demo 
```html
<template>
  <div>
    <p>已选值：{{checkbox11}}</p>
    <p><ak-checkbox-group v-model="checkbox11" :data="groupData" ref="checkGroup">选项1</ak-checkbox-group></p>
    <p><ak-button @click="$refs.checkGroup.select()">全选</ak-button> 
    <ak-button @click="$refs.checkGroup.clear()">全不选</ak-button></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checkbox11: [],
      groupData: [
        {label: '选项1', value: 'a1'},
        {label: '选项2', value: 'a2'},
        {label: '选项3', value: 'a3'},
        {value: 'a4'},
        {label: '禁用', value: 'a5', disabled: true},
        {label: '勾选禁用', value: 'a6', disabled: true}
      ]
    }
  }
}
</script>

```
:::


### 多个单一组成的组
:::demo 组group有一定的局限性，组内的`checkbox`是紧密相连的。由多个单一`checkbox`自由组成可实现灵活布局。同时也很方便的实现全选或全不选
```html
<template>
  <div>
    <p>当前选中值：{{checkbox10}}</p>
    <p><ak-checkbox v-model="checkbox10" value="a1">选项1</ak-checkbox></p>
    <p><ak-checkbox v-model="checkbox10" value="a2">选项2</ak-checkbox></p>
    <p><ak-checkbox v-model="checkbox10" value="a3">选项3</ak-checkbox></p>
    <p><ak-checkbox v-model="checkbox10" value="a4">选项4</ak-checkbox></p>
    <p><ak-button @click="checkbox10=['a1','a2','a3','a4']">全选</ak-button> 
    <ak-button @click="checkbox10=[]">全不选</ak-button></p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      checkbox10: [],
    }
  }
}
</script>
```
:::

## API

### Checkbox

|参数|类型|说明|
|-|-|-|
|value          | String         |通过v-model绑定，选中返回true，否则false|
|label           | String         |显示的文本值，也可以是slot形式|
|disabled       | Boolean/false  |禁用|

### Checkbox Event
|参数|类型|说明|
|-|-|-|
|change         |                |改变事件|

### CheckboxGroup
> data的参数同Checkbox

|参数|类型|说明|
|-|-|-|
|value          | Array           |当前选中的值。通过v-model绑定|
|data           | Array           |选项数据|
|change         |                 |改变事件|
|max            | number          |可被勾选的 checkbox 的最大数量|
|min            | number          |可被勾选的 checkbox 的最小数量|
|disabled       | Boolean/false   |禁用组|

### CheckboxGroup Methods
|参数|类型|
|-|-|-|
|select         | 全选当前组所有选项 |
|clear          | 取消选择当前组所有选项 |
