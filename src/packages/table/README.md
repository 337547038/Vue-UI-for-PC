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

export default {
  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: '1张222',
        province: '广东',
        city: '天河区',
        address: '广东市天河区无名路888号',
        zip: 200330
      },
      {
        date: '2016-05-02',
        name: '2张三',
        province: '广东',
        city: '天河区',
        address: '广东市天河区无名路888号',
        zip: 200331
      }
    ]
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

export default {
  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: '1张222',
        province: '广东',
        city: '天河区',
        address: '广东市天河区无名路888号',
        zip: 200330
      },
      {
        date: '2016-05-02',
        name: '2张三',
        province: '广东',
        city: '天河区',
        address: '广东市天河区无名路888号',
        zip: 200331
      }
    ]
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
