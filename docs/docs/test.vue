<template>
  <!--<div style="padding-top: 200px">
    <ak-dropdown>
      <p style="border: 1px solid #ddd">121312</p>
      <p><br></p>
      <div slot="trigger" style="border: 1px solid #ddd">下拉菜单</div>
      <ul slot="dropdown">
        <ak-dropdown-item @click="click">1</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item className="c22">2</ak-dropdown-item>
        <ak-dropdown-item>
          <div>333<i class="icon"></i></div>
        </ak-dropdown-item>
      </ul>
    </ak-dropdown>
  </div>-->
  <div>
    <ak-select placeholder="请选择" :options="options" v-model="value1" :maxHeight="0"></ak-select>
  </div>
</template>
<script>

export default {
  data () {
    return {
      value1: '1',
      options: [
        {label: '选项1', value: '1'},
        {label: '选项2', value: '2'},
        {label: '选项3', value: '3'},
        {label: '选项4', value: '4', disabled: true},
        {label: '选项5', value: '5'},
        {value: '6'},
        {label: '选项7', value: '7'},
        {label: '选项8', value: '8'},
        {label: '选项9', value: '9'},
        {label: '选项10', value: '10'}
      ]
    }
  },
  components: {},
  methods: {
    click () {
      console.log('21313')
    },
    click2 (obj) {
      console.log(obj)
    }
  },
  mounted () {

  },
  computed: {}
}
</script>
