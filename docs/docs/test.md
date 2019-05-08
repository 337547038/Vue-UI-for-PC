:::demo 
````html
<template>
  <akTable :data="tableData">
   <akColumn label="日期" prop="date"></akColumn>
   <akColumn label="姓名" prop="name">
     <template slot-scope="scope">
            姓名：{{scope.row.name}}
         </template>
   </akColumn>
   <akColumn type="extend">
      <template slot-scope="scope">
         {{scope}}
      </template>
   </akColumn>
  </akTable>
<template>
<script>
export default {
  name: 'Table',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '1王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200330
        },
        {
          date: '2016-05-02',
          name: '2王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200331
        }
      ]
    }
  },
  components: {}
}
</script>
````
:::
