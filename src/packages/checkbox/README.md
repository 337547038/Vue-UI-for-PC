<!-- Created by 337547038 on 2021/6/15 0015. -->

# Checkbox 多选框

### 基础用法

单一的`checkbox`中，默认绑定变量的值会是`Boolean`，选中为`true`。如选中时需要返回指定的值，则添加`value`

```vue demo

<template>
  <p>
    <ak-checkbox v-model="checkbox1">选项1</ak-checkbox>
    {{checkbox1}}
  </p>
  <p>
    <ak-checkbox v-model="checkbox2">选项2</ak-checkbox>
    {{checkbox2}}
  </p>
  <p>
    <ak-checkbox v-model="checkbox3">选项3</ak-checkbox>
    {{checkbox3}}（v-model的值只要为true都会是勾选状态）
  </p>
  <p>选中时返回指定值（v-model=value或是value存在于v-model数组中，即选中状态）</p>
  <p>
    <ak-checkbox v-model="checkbox4" value="4">选项4</ak-checkbox>
    {{checkbox4}}
  </p>
  <p>
    <ak-checkbox v-model="checkbox5" value="5">选项5</ak-checkbox>
    {{checkbox5}}
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox1: true,
      checkbox2: false,
      checkbox3: '1',
      checkbox4: ['4'],
      checkbox5: []
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
```

### 禁用状态

多选框不可用状态

```vue demo

<template>
  <p>
    <ak-checkbox v-model="checkbox6" :disabled="true">选项1</ak-checkbox>
    {{checkbox6}}
  </p>
  <p>
    <ak-checkbox v-model="checkbox7" :disabled="true">选项2</ak-checkbox>
    {{checkbox7}}
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox6: true,
      checkbox7: false
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
```

### 多选框组

options中选项label可为空

```vue demo

<template>
  <p>已选值：{{checkbox8}}</p>
  <p>
    <ak-checkbox-group v-model="checkbox8" :options="groupData"></ak-checkbox-group>
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox8: ['a1', 'a6']
    })
    const groupData = [
      {label: '选项1', value: 'a1'},
      {label: '选项2', value: 'a2'},
      {label: '选项3', value: 'a3'},
      {value: 'a4'},
      {label: '禁用', value: 'a5', disabled: true},
      {label: '勾选禁用', value: 'a6', disabled: true}
    ]
    return {
      ...toRefs(state),
      groupData

    }
  }
}
</script>

```

### 可选项目数量的限制

例子最多可选`max=4`，最少需选`min=2`

```vue demo

<template>
  <p>已选值：{{checkbox9}}</p>
  <p>
    <ak-checkbox-group v-model="checkbox9" :options="groupData" :min="2" :max="4"></ak-checkbox-group>
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox9: ['a5']
    })
    const groupData = [
      {label: '选项1', value: 'a1'},
      {label: '选项2', value: 'a2'},
      {label: '选项3', value: 'a3'},
      {value: 'a4'},
      {label: '禁用', value: 'a5', disabled: true},
      {label: '勾选禁用', value: 'a6', disabled: true}
    ]
    return {
      ...toRefs(state),
      groupData
    }
  }
}
</script>

```

### 组全选或全不选方法

`toggleSelect(true/false)全选或取消全选`，可使用 `getValue` 取方法取得已勾选的项集合

```vue demo

<template>
  <p>已选值：{{ checkbox11 }}</p>
  <p>
    <ak-checkbox-group ref="checkGroup" v-model="checkbox11" :options="groupData" />
  </p>
  <p>
    <ak-button @click="$refs.checkGroup.toggleSelect(true)">全选</ak-button>
    <ak-button @click="$refs.checkGroup.toggleSelect(false)">全不选</ak-button>
    <ak-button @click="getValue">获取值</ak-button>
  </p>
</template>
<script>
import {reactive, toRefs, ref} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox11: ['a1']
    })
    const groupData = [
      {label: '选项1', value: 'a1'},
      {label: '选项2', value: 'a2'},
      {label: '选项3', value: 'a3'},
      {value: 'a4'},
      {label: '禁用', value: 'a5', disabled: true},
      {label: '勾选禁用', value: 'a6', disabled: true}
    ]
    const checkGroup=ref()
    const getValue=()=>{
      const value=checkGroup.value.getValue()
      console.log(value)
    }
    return {
      ...toRefs(state),
      groupData,
      checkGroup,
      getValue
    }
  }
}
</script>

```

### 多个单一组成的组

组group有一定的局限性，组内的`checkbox`是紧密相连的。由多个单一`checkbox`自由组成可实现灵活布局。同时也很方便的实现全选或全不选

```vue demo

<template>
  <p>当前选中值：{{checkbox10}}</p>
  <p>
    <ak-checkbox v-model="checkbox10" value="a1">选项1</ak-checkbox>
  </p>
  <p>
    <ak-checkbox v-model="checkbox10" value="a2">选项2</ak-checkbox>
  </p>
  <p>
    <ak-checkbox v-model="checkbox10" value="a3">选项3</ak-checkbox>
  </p>
  <p>
    <ak-checkbox v-model="checkbox10" value="a4">选项4</ak-checkbox>
  </p>
  <p>
    <ak-button @click="checkbox10=['a1','a2','a3','a4']">全选</ak-button>
    <ak-button @click="checkbox10=[]">全不选</ak-button>
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox10: ['a1']
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>
```

### 阻止改变事件

使用`beforeChange`可阻止事件改变

```vue demo

<template>
  <p>
    <ak-checkbox v-model="checkbox" value="a1" :beforeChange="beforeChange">选项1</ak-checkbox>
  </p>
  <p>
    <ak-checkbox-group v-model="checkbox2" :options="groupData" :beforeChange="beforeChange"></ak-checkbox-group>
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox: '',
      checkbox2: ['a1'],
    })
    const groupData = [
      {label: '选项1', value: 'a1'},
      {label: '选项2', value: 'a2'}
    ]
    const beforeChange = () => {
    console.log('return false 阻止勾选')
      return false
    }
    return {
      ...toRefs(state),
      groupData,
      beforeChange
    }
  }
}
</script>
```

## API

### Checkbox

|参数|类型|说明|
|----------|--------------|--------|
|v-model        | String, Boolean, Array         |选中值|
|label          | String         |显示的文本值，也可以是slot形式|
|disabled       | Boolean/false  |禁用|
|beforeChange   | Function       |点击改变前的事件，返回false阻止事件|

### Checkbox Event

|参数|说明|
|----------|--------|
|change         | 改变事件|

### CheckboxGroup

> options

|参数|类型|说明|
|----------|--------------|--------|
|v-model        | Array           |当前选中的值|
|options        | Array           |选项数据|
|max            | number          |可被勾选的 checkbox 的最大数量|
|min            | number          |可被勾选的 checkbox 的最小数量|
|disabled       | Boolean/false   |禁用组|
|beforeChange   | Function       |点击改变前的事件，返回false阻止事件|

### CheckboxGroup Methods

|参数|类型|
|----------|--------|
|toggleSelect         | 全选true/取消false当前组所有选项 |
|getValue             | 获取当前所有勾选项的集合 |

### CheckboxGroup Event

|参数|说明|
|----------|--------|
|change         |改变事件|

