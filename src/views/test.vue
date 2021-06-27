<template>
  <div>
    <ak-table
      :data="tableData"
      :pagination="pagination">
      <ak-column type="selection" />
      <ak-column type="index" label="序号" />
      <ak-column label="日期" prop="date" />
      <ak-column label="姓名" prop="name" />
      <ak-column label="省份" prop="province" />
      <ak-column label="城市" prop="city" />
      <ak-column label="地址" prop="address" />
      <ak-column label="邮编" prop="zip" />
    </ak-table>
  </div>
</template>
<script>
import tableData from '@/packages/table/demoJs.json'

export default {
  setup() {
    const pagination = {
      current: 1,
      pageSize: 3,
      onChange: v => {
        console.log(v)
      }
    }
    return {
      tableData,
      pagination
    }
  }
}
</script>
