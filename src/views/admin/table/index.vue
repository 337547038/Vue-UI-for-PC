<!-- Created by 337547038 on 2019/11/8 0008. -->
<template>
  <div class="table-demo">
    <div class="table-search">
      <ak-form>
        <ak-form-item label="用户名">
          <ak-input placeholder="请输入用户名" v-model="searchForm.name"></ak-input>
        </ak-form-item>
        <ak-form-item label="手机">
          <ak-input placeholder="请输入手机" v-model="searchForm.tel"></ak-input>
        </ak-form-item>
        <ak-form-item label="性别">
          <ak-select placeholder="请选择" :options="sexOption" v-model="searchForm.sex"></ak-select>
        </ak-form-item>
        <ak-button @click="search">搜索</ak-button>
      </ak-form>
    </div>
    <div v-loading="loading">
      <ak-table :data="tableData">
        <ak-column type="selection" width="50px"></ak-column>
        <ak-column type="index" label="序号" width="50px"></ak-column>
        <ak-column label="姓名" prop="name"></ak-column>
        <ak-column label="手机" prop="tel"></ak-column>
        <ak-column label="性别" prop="sex"></ak-column>
        <ak-column label="地址" prop="address"></ak-column>
        <ak-column label="微信" prop="qq"></ak-column>
        <ak-column label="操作" width="80px">
          <template slot-scope="scope">
            <a href="javascript:;" @click="del(scope)">删除</a>
          </template>
        </ak-column>
      </ak-table>
      <ak-pagination :total="total" :current="pageIndex"></ak-pagination>
    </div>
  </div>
</template>

<script>
import {getTable} from '@/api/admin'

export default {
  name: 'tableDemo',
  data () {
    return {
      loading: false,
      total: 0,
      pageSize: 20,
      pageIndex: 1,
      searchForm: {
        name1: '',
        tel: '',
        sex: ''
      },
      sexOption: [
        {label: '男', value: '1'},
        {label: '女', value: '2'}
      ],
      tableData: []
    }
  },
  props: {},
  components: {},
  methods: {
    loadData () {
      this.loading = true
      const data = {}
      getTable(data)
        .then(res => {
          console.log(res)
          const result = res.data.data
          if (result) {
            this.tableData = result.list
            this.total = result.total
          }
          this.loading = false
        })
        .catch(res => {
          console.log(res)
        })
    },
    search () {
      this.loadData()
    },
    del () {
    }
  },
  computed: {},
  mounted () {
    this.loadData()
  }
}
</script>
