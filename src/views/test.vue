<template>
  <div style="margin: 20px">
    <ak-table :data="tableData" ref="tableEl">
      <ak-column type="selection" width="50px" />
      <ak-column type="index" label="序号" width="100px"  />
      <ak-column label="日期" prop="date" width="100px" />
      <ak-column label="姓名" prop="name" width="200px" />
      <ak-column label="省份" prop="province" width="100px" />
      <ak-column label="城市" prop="city" width="100px" />
      <ak-column label="地址" prop="address" width="100px" />
      <ak-column label="邮编" prop="zip" width="100px" />
      <ak-column label="操作" width="100px">
        <template #default="scope">
          <a @click="delClick(scope)">删除</a>
          <span @click="scope.extend()">{{scope.toggle?'收起':'展开'}}</span>
          {{scope}}
        </template>
      </ak-column>
      <ak-column type="extend">
        <template #default="scope">
          返回当前行所有信息：{{scope}}
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
import tableData from '@/packages/table/demoJs.json'
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
    const modelValue=ref(false)
    setTimeout(()=>{
      modelValue.value=true
    },1500)
    return {
      tableData,
      delClick,
      allSelect,
      unSelect,
      tableEl,
      modelValue
    }
  }
}
</script>
