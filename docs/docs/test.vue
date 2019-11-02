<template>
  <div>
    <tree :data="data" @toggle="_toggle" :showCheckbox="true" ref="tree"></tree>
    <p @click="setValue">设值</p>
    <p @click="getValue">取值</p>
  </div>
</template>

<script>
import tree from '../../packages/tree/index2'

export default {
  name: 'test',
  data () {
    return {
      data: []
    }
  },
  components: {tree},
  methods: {
    _click (item) {
      console.log(item)
    },
    // 展开或收起事件
    _toggle (item, type) {
      // console.log(item)
      // console.log(type)
    }
  },
  mounted() {
    this.data = [{
      show: true,
      name: '广东',
      key: 't1',
      children: [
        {
          key: 't2',
          name: '广州市',
          children: [
            {name: '天河区', key: 't3'},
            {name: '越秀区', key: 't4'},
            {name: '白云区', key: 't5'},
            {name: '海珠区', key: 't6'}
          ]
        },
        {name: '深圳市', key: 't7'},
        {name: '东莞市', checked: true, key: 't8'},
        {name: '湛江市', key: 't9'},
        {name: '阳江市', key: 't10'},
        {name: '清远市', key: 't11'}
      ]
    },
    {name: '北京', key: 't12'},
    {name: '上海', key: 't3'},
    {
      name: '广西',
      key: 't14'
    },
    {
      name: '广西2',
      key: 't15'
    }]
  }
}
</script>
