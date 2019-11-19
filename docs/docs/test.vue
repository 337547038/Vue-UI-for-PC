<template>
  <div>
    <p><br><br><br><br></p>
    <p>{{value}}</p>
    <Slider v-model="value"></Slider>
    <Menu :data="nav" :value="navValue"></Menu>
  </div>
</template>
<script>
import Slider from '../../packages/slider'
import Menu from '../../packages/menu'

export default {
  data () {
    return {
      value: 0,
      marks: {
        0: 'start',
        25: '25%',
        50: 'center',
        75: '75%',
        100: '<i style="color:red">end</i>'
      },
      navValue: '',
      nav: []
    }
  },
  components: {Slider, Menu},
  methods: {},
  mounted () {
    this.nav=[
      {
        title: '主页',
        href: null,
        children: [
          {title: '后台首页', href: '/admin/main'}]
      },
      {
        'title': '组件',
        'href': null,
        'children': [{'title': '表格', 'href': '/admin/table'},
          {'title': '图形图表', 'href': '/admin/echarts'}]
      }, {
        'title': '用户',
        'href': null,
        'children': [{'title': '用户列表', 'href': '/admin/user'}, {'title': '新增用户', 'href': '/admin/addUser'}]
      }]
    this.navValue = '后台首页'
    // this.value = [30, 60]
  }
}
</script>
