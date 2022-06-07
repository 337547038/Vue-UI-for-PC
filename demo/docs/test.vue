<template>
  <akTable :data="tableData" :rowColSpan="rowColSpan">
    <akColumn label="日期" prop="date"></akColumn>
    <akColumn label="姓名" prop="name"></akColumn>
    <akColumn label="省份" prop="province"></akColumn>
    <akColumn label="城市" prop="city"></akColumn>
    <akColumn label="地址" prop="address"></akColumn>
    <akColumn label="邮编" prop="zip"></akColumn>
    <akColumn label="操作">
      <template slot-scope="scope">
        <a href="javascript:;">删除</a>
      </template>
    </akColumn>
  </akTable>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '1张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200330,
          trClass: 'trClass' /* 特殊参数为当前tr添加指定样式 */
        },
        {
          date: '2016-05-04',
          name: '3张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200332
        },
        {
          date: '2016-05-04',
          name: '3张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200332
        },]
    }
  },
  methods: {
    rowColSpan(rowIndex, columnIndex) {
      console.log('arraySpanMethod')
      if (rowIndex === 0 && columnIndex === 1) {
        return [2, 3] // 表示在rowIndex=0行，columnIndex = 1列位置，向下合并两个和向右合并3个单元格
      }
    }
  }
}
</script>
