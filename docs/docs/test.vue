<template>
  <div>
    <akTable :data="tableData" :hasChild="true" :lazyLoad="lazyLoad" :extendToggle="false">
      <akColumn label="日期" prop="date"></akColumn>
      <akColumn label="姓名" prop="name"></akColumn>
      <akColumn label="操作" width="800px">
        <template slot-scope="scope">
          <!--{{scope}}-->
          <span @click="scope.extend()" v-if="scope.row.children">{{scope.toggle?'收起':'展开'}}</span>
        </template>
      </akColumn>
    </akTable>
  </div>
</template>
<script>

export default {
  data() {
    return {
      value: '',
      tableData: [
        {
          date: '2016-05-03',
          name: '1张三',
          trClass: 'trClass' /* 特殊参数为当前tr添加指定样式 */
        },
        {
          date: '2016-05-02',
          name: '2张三',
          children: [
            {
              date: '2016-05-02',
              name: '子级'
            },
            {
              date: '2016-05-02',
              name: '子级2'
            }
          ]
        }
      ]
    }
  },
  components: {},
  methods: {
    lazyLoad(row, resolve) {
      setTimeout(() => {
        const child = [
          {
            date: '2016-05-02',
            name: '懒加载子级'
          },
          {
            date: '2016-05-02',
            name: '懒加载子级2'
          }
        ]
        resolve(child)
      }, 3000)
    }
  },
  mounted() {

  }
}
</script>
