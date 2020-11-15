<template>
  <div>
    ak-tree
    <ak-tree :data="data" v-model="value" @toggle="toggle" :showCheckbox="true">
    </ak-tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: ['gd', 'bj'],
      data: [
        {
          name: '广东',
          show: true,
          icon: 'arrow',
          key: 'gd',
          children: [
            {
              name: '广州市',
              key: 'gz',
              children: [
                {name: '越秀区', key: 'yx'},
                {
                  name: '天河区',
                  key: 'th',
                  children: [
                    {name: '黄石街道', key: 'hs'}
                  ]
                },
                {name: '白云区', key: 'by'},
                {name: '海珠区', key: 'hz'}
              ]
            },
            {name: '深圳市'},
            {name: '东莞市'},
            {name: '湛江市'},
            {name: '阳江市'},
            {name: '清远市'}
          ]
        },
        {name: '北京', icon: 'arrow', key: 'bj'},
        {name: '上海', icon: 'arrow'},
        {
          name: '广西',
          icon: 'arrow',
          children: [
            {name: '桂林市'},
            {name: '南宁市'}
          ]
        }
      ],
      data2: [
        {name: '广东', children: []},
        {name: '北京', children: []},
        {name: '广西', children: []}
      ]
    }
  },
  components: {},
  methods: {
    toggle(item) {
      console.log('展开收起事件')
      console.log(item.name)
      let data = []
      /* if (item.name === '广东') {
        data = [
          {name: '深圳市', children: []},
          {name: '东莞市'},
          {name: '湛江市'},
          {name: '阳江市'},
          {name: '清远市'}
        ]
      }
      if (item.name === '深圳市') {
        data = [
          {name: '深圳', children: []},
          {name: '东莞'},
          {name: '湛江'},
          {name: '阳江'},
          {name: '清远'}
        ]
      }
      setTimeout(() => {
        item.children = data
      }, 3000) */
    }
  },
  mounted() {
    /* setTimeout(() => {
      this.value = 'gd'
      console.log('ok')
    }, 5000) */
  }
}
</script>
