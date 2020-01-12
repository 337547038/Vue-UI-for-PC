<!-- Created by 337547038 on 2018/8/10 0010. -->
<template>
  <div>
    <h1 style="text-align: center;margin: 50px auto">组件doc及示例演示请运行 npm run docs</h1>
    <p style="text-align: center">
      <router-link to="/login">应用实例</router-link>
    </p>
    <div><textarea style="width: 500px;height: 200px;" v-model="textarea"></textarea></div>
    <div @click="btn">btn</div>
    <div>{{type}}
      <p @click="click(1)">type=1</p>
      <br>
      <p @click="click(2)">type=2</p>
      <br>
      <p @click="click(3)">type=3</p>
      <br>
      <akTable :data="tableData" ref="table">
        <akColumn label="日期" prop="date" :title="true"></akColumn>
        <template v-if="type===1">
          <akColumn label="姓名" prop="name"></akColumn>
        </template>
        <akColumn label="省份" prop="province" v-if="type===2"></akColumn>
        <akColumn label="城市" prop="city" v-if="type===3"></akColumn>
        <akColumn label="地址" prop="address" v-if="type===1"></akColumn>
        <akColumn label="邮编" prop="zip"></akColumn>
      </akTable>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    btn() {
      axios.get('https://translate.google.cn/translate_a/single?client=webapp&sl=en&tl=zh-CN&hl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=ss&dt=t&otf=1&ssel=0&tsel=0&kc=4&tk=946608.573767&q=what')
        .then(res => {
          console.log(res)
        })
    },
    click(type) {
      this.type = type
      this.$refs.table.resetColumn()
    }
  },
  mounted() {

  }
}
</script>
