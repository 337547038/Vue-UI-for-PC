<template>
  <div>
    <!--<table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td rowspan="3">日期</td>
        <td colspan="4">配送信息</td>
      </tr>
      <tr>
        <td rowspan="2">姓名</td>
        <td colspan="3">地址</td>
      </tr>
      <tr>
        <td>联系人</td>
        <td>电话</td>
        <td>街道</td>
      </tr>
    </table>-->
    <akTable :data="tableData">
      <akColumn label="日期" prop="date"></akColumn>
      <akColumn label="姓名" prop="name"></akColumn>
      <akColumn label="省份" prop="province"></akColumn>
      <akColumn label="城市" prop="city"></akColumn>
      <akColumn label="地址" prop="address"></akColumn>
      <akColumn label="邮编" prop="zip"></akColumn>
      <akColumn label="操作">
        <template>
          <a href="javascript:;">删除</a>
        </template>
      </akColumn>
      <akColumn type="extend">
        <template slot-scope="scope">
          返回当前行所有信息：{{scope}}
        </template>
      </akColumn>
    </akTable>
    <!--<ak-table
      :data="tableData"
      style="width: 100%">
      <ak-column
        prop="date"
        label="日期"
        width="150">
      </ak-column>
      <ak-column label="配送信息">
        <ak-column
          prop="name"
          label="姓名"
          width="120">
        </ak-column>
        <ak-column label="地址">
          <ak-column
            prop="province"
            label="省份"
            width="120">
          </ak-column>
          <ak-column
            prop="city"
            label="市区"
            width="120">
          </ak-column>
          <ak-column
            prop="address"
            label="地址"
            width="300">
          </ak-column>
          <ak-column
            prop="zip"
            label="邮编"
            width="120">
          </ak-column>
        </ak-column>
      </ak-column>
    </ak-table>-->
  </div>
</template>

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
          zip: 200330,
          trClass: 'trClass' // 特殊参数为当前tr添加指定样式
        },
        {
          date: '2016-05-02',
          name: '2王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200331
        },
        {
          date: '2016-05-04',
          name: '3王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200332
        },
        {
          date: '2016-05-01',
          name: '4王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '5王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200334
        },
        {
          date: '2016-05-02',
          name: '6王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200335
        },
        {
          date: '2016-05-04',
          name: '7王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200336
        },
        {
          date: '2016-05-01',
          name: '8王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200337
        }
      ]
    }
  },
  components: {},
  methods: {
    arraySpanMethod (rowIndex, columnIndex) {
      console.log('arraySpanMethod')
      if (rowIndex === 0 && columnIndex === 1) {
        return [2, 2]
      }
    }
  }
}
</script>
