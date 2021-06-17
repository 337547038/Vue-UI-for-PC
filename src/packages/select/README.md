<!-- Created by 337547038 on 2021/6/15 0015. -->

# select 下拉选择

### 基础用法

```vue demo
<template>
  <p>
    <ak-select v-model="value1" placeholder="请选择" :options="options" />
  </p>
  <p>
    <ak-select v-model="value2" placeholder="请选择" :options="options" />
  </p>
  <p>
    <ak-select v-model="value3" placeholder="禁用状态不能选择" :options="options" :disabled="true" />
  </p>
  <p>
    <ak-select v-model="value4" placeholder="设置最大下拉高度" :options="options" :downHeight="100" />
  </p>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const options = ref([
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'},
      {label: '选项4', value: '4', disabled: true},
      {label: '选项5', value: '5'},
      {value: '6'},
      {label: '选项7', value: '7'},
      {label: '选项8', value: '8'},
      {label: '选项9', value: '9'},
      {label: '选项10', value: '10', class: 'red'}
    ])
    const value1 = ref('')
    const value2 = ref('2')
    const value3 = ref()
    const value4 = ref()
    return {
      options,
      value1,
      value2,
      value3,
      value4
    }
  }
}
</script>
```

### 可清空选项

`clear=true`

```vue demo
<template>
  <ak-select placeholder="请选择" :options="options" v-model="value1" :clear="true" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const options = ref([
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'},
      {label: '选项4', value: '4', disabled: true},
      {label: '选项5', value: '5'},
      {value: '6'},
      {label: '选项7', value: '7'},
      {label: '选项8', value: '8'},
      {label: '选项9', value: '9'},
      {label: '选项10', value: '10', class: 'red'}
    ])
    const value1 = ref('')
    return {
      options,
      value1
    }
  }
}
</script>
```

### 可搜索

`filterable=true`

```vue demo
<template>
  <ak-select placeholder="请选择" :options="options" v-model="value1" :filterable="true" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const options = ref([
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'},
      {label: '选项4', value: '4', disabled: true},
      {label: '选项5', value: '5'},
      {value: '6'},
      {label: '选项7', value: '7'},
      {label: '选项8', value: '8'},
      {label: '选项9', value: '9'},
      {label: '选项10', value: '10', class: 'red'}
    ])
    const value1 = ref('')
    return {
      options,
      value1
    }
  }
}
</script>
```

### 可多选

`multiple=true`。多选时`v-model`必须是数组，同时可设置`multiple-limit`最多选择的个数及提示信息

```vue demo
<template>
  <ak-select
    v-model="value1"
    placeholder="请选择"
    :options="options"
    :multiple="true"
    :multiple-limit="3"
    @limitChange="limitChange" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const options = ref([
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'},
      {label: '选项4', value: '4', disabled: true},
      {label: '选项5', value: '5'},
      {value: '6'},
      {label: '选项7', value: '7'},
      {label: '选项8', value: '8'},
      {label: '选项9', value: '9'},
      {label: '选项10', value: '10', class: 'red'}
    ])
    const value1 = ref([])
    const limitChange = () => {
      alert('最多选择3项')
    }
    return {
      options,
      value1,
      limitChange
    }
  }
}
</script>


```

### 自定下拉模板

options及其他部分参数将无效，选择后可通过`slideUp`方法收起下拉

```vue demo
<template>
  <div>
    当前值：{{ value1 }}<br>
    <ak-select ref="select9" v-model="value1" placeholder="请选择">
      <template #template>
        <div
          v-for="item in options"
          :key="item.value"
          @click.stop="click(item)">
          {{ item.label }}
        </div>
      </template>
    </ak-select>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const options = ref([
      {label: '自定模板选项1', value: '1'},
      {label: '自定模板选项2', value: '2'},
      {label: '自定模板选项3', value: '3'}
    ])
    const value1 = ref('')
    const select9 = ref()
    const click = item => {
      select9.value.slideUp()
      value1.value = item.label
    }
    return {
      options,
      value1,
      click,
      select9
    }
  }
}
</script>
```

### 改变前拉截事件

```vue demo
<template>
  <ak-select placeholder="请选择" :options="options" v-model="value1" @change="change" :beforeChange="beforeChange" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const options = ref([
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'},
      {label: '选项4', value: '4', disabled: true},
      {label: '选项5', value: '5'},
      {value: '6'},
      {label: '选项7', value: '7'},
      {label: '选项8', value: '8'},
      {label: '选项9', value: '9'},
      {label: '选项10', value: '10', class: 'red'}
    ])
    const value1 = ref([])
    const change = (value, item) => {
      console.log('change')
      console.log(value, item)
    }
    const beforeChange = (item) => {
      console.log(item)
      alert('不能选择')
      return false
    }
    return {
      options,
      value1,
      change,
      beforeChange
    }
  }
}
</script>

```

### 使用`Option`组件，参数和`select`的`option`一致

```vue demo
<template>
  <ak-select placeholder="请选择" v-model="value1">
    <ak-option value="11" label="选择一" />
  </ak-select>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const options = ref([
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'},
      {label: '选项4', value: '4', disabled: true},
      {label: '选项5', value: '5'},
      {value: '6'},
      {label: '选项7', value: '7'},
      {label: '选项8', value: '8'},
      {label: '选项9', value: '9'},
      {label: '选项10', value: '10', class: 'red'}
    ])
    const value1 = ref('')
    return {
      options,
      value1
    }
  }
}
</script>

```

## API
### Select
|参数|类型|说明|
|-|-|-|
|v-model           | string,array          |通过v-model绑定，multiple时为array|
|multiple          | boolean/false         |是否多选|
|multipleLimit     | boolean/false         |多选时用户最多可以选择的项目数，为 0 则不限制|
|disabled          | boolean/false         |是否禁用|
|placeholder       | string                |占位符,value为空时显示。占位符为空时显示options第一项|
|filterable        | boolean/false         |是否可搜索，对当前下拉数据筛选|
|options           | array                 |下拉选项数据|
|clear             | boolean/false         |是否可以清空选项|
|downHeight        | Number                |最大下拉高度|
|downStyle         | object                |下拉面板样式，方便对单个select个性化设置，也可通过css控制|
|downClass         | string                |下拉面板类名|
|appendToBody      | boolean/false         |将下拉面板插入到body|
|direction         | Number/0              |下拉弹出方向，0自动，1向上，2向下|
|width             | string                |宽度|
|beforeChange      | Function              |选项改变前事件,return false阻止选择|

### Options Attributes
|参数|类型|说明|
|-|-|-|
|value            | string                |选项的值|
|label            | string                |选项的标签，若不设置则默认与 value 相同|
|disabled         | boolean/false         |是否禁用该选项|
|class            | string                |对当前项添加样式|

### Select Events
|参数|类型|说明|
|-|-|-|
|change            | function              |选中值发生变化时触发|
|beforeChange      | function              |选择前事件|
|limitChange       | function              |超出最大选择数时事件，仅`multiple=true`和设定了`multipleLimit`时有效|

### Select Method
|参数|类型|
|-|-|
|slideUp            |用于收起下拉|

### Select Slots
|参数|说明|
|-|-|
|template       |自定义下拉内容|
