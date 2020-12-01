<!-- Created by 337547038 on 2018/8/10 0010. -->
<template>
  <div>
    <h1 style="text-align: center;margin: 50px auto">组件doc及示例演示请运行 npm run docs</h1>
    <p style="text-align: center">
      <router-link to="/login">应用实例</router-link>
    </p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      textarea: '00',
      type: 1,
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
        }
      ]
    }
  },
  methods: {
  },
  mounted() {

  }
}
</script>
