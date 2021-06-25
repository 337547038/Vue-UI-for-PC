<!-- Created by 337547038 on 2021/6/24 0016. -->

# Table 表格

### 基本用法

```vue demo
<template>
  <ak-table :data="tableData">
    <ak-column label="日期" prop="date" />
    <ak-column label="姓名" prop="name" />
    <ak-column label="省份" prop="province" />
    <ak-column label="城市" prop="city" />
    <ak-column label="地址" prop="address" />
    <ak-column label="邮编" prop="zip" />
    <ak-column label="操作">
      <template #default="scope">
        <a @click="delClick(scope)">删除</a>
      </template>
    </ak-column>
  </ak-table>
</template>
<script>
import tableData from './demoJs.json'
export default {
  setup() {
    const delClick = item => {
      alert(JSON.stringify(item))
    }
    return {
      tableData,
      delClick
    }
  }
}
</script>

```
### 勾选
```vue demo
<template>
  <div>
    <ak-table :data="tableData" ref="tableEl">
      <ak-column type="selection" width="50px" />
      <ak-column type="index" label="序号" width="50px" />
      <ak-column label="日期" prop="date" />
      <ak-column label="姓名" prop="name" />
      <ak-column label="省份" prop="province" />
      <ak-column label="城市" prop="city" />
      <ak-column label="地址" prop="address" />
      <ak-column label="邮编" prop="zip" />
      <ak-column label="操作">
        <template #default="scope">
          <a @click="delClick(scope)">删除</a>
        </template>
      </ak-column>
    </ak-table>
    <p>
      <ak-button @click="allSelect">全选</ak-button>
      <ak-button @click="unSelect">取消全选</ak-button>
    </p>
  </div>
</template>
<script>
import {ref} from 'vue'
import tableData from './demoJs.json'
export default {
  setup() {
    const tableEl = ref()
    const delClick = item => {
      alert(JSON.stringify(item))
    }
    const allSelect = () => {
      tableEl.value.toggleSelection(true)
    }
    const unSelect = () => {
      tableEl.value.toggleSelection(false)
    }
    return {
      tableData,
      delClick,
      allSelect,
      unSelect,
      tableEl
    }
  }
}
</script>

```
