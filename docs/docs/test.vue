<template>
  <div>
    <akTable :data="tableData" :drag="true">
      <akColumn label="日期" prop="date" width="230px"></akColumn>
      <akColumn label="姓名" prop="name" width="100px"></akColumn>
      <akColumn label="地址" prop="address" width="250px"></akColumn>
      <akColumn label="操作" prop="city" width="100px"></akColumn>
    </akTable>
  </div>
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
          trClass: 'trClass' // 特殊参数为当前tr添加指定样式
        },
        {
          date: '2016-05-02',
          name: '2张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200331
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
          date: '2016-05-01',
          name: '4张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '5张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200334
        },
        {
          date: '2016-05-02',
          name: '6张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200335
        },
        {
          date: '2016-05-04',
          name: '7张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200336
        },
        {
          date: '2016-05-01',
          name: '8张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200337
        }
      ]
    }
  },
  components: {},
  methods: {
    change(value, item) {
      console.log(value)
      console.log(item)
    }
  },
  mounted() {

  }
}
</script>
