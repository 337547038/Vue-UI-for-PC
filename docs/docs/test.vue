<template>
  <div>
    <!--<p>
      <radio v-model="radio1">男</radio>
      {{radio1}}
    </p>
    <p>
      <radio v-model="radio2" @change="change">女</radio>
      {{radio2}}
    </p>
    <p>
      <radio v-model="radio3" :value="1">女</radio>
      {{radio3}}
    </p>
    <p>
      <radio v-model="radio4" value="a">女</radio>
      {{radio4}}
    </p>
    <hr>
    <p>
      <group :data="data" v-model="value" @change="change"></group>
    </p>-->
    <checkbox v-model="radio1" value="b">000</checkbox>{{radio1}}
    <!--<checkbox v-model="radio1" value="a">aaa</checkbox>{{radio1}}-->
    <!--<checkbox v-model="radio4" value="a">1111</checkbox>
    <checkboxGroup v-model="radio4" :data="data"></checkboxGroup>-->
  </div>
</template>
<script>
import radio from '../../packages/radio/radio'
import group from '../../packages/radio/radioGroup'
import checkbox from '../../packages/checkbox/checkbox'
import checkboxGroup from '../../packages/checkbox/group'

export default {
  data () {
    return {
      radio1: 'b',
      radio2: false,
      radio3: 2,
      radio4: '',
      value: '0',
      data: [
        {label: '男', value: '1'},
        {label: '女', value: '0'}
      ]
    }
  },
  components: {radio, group, checkbox, checkboxGroup},
  methods: {
    change (value, item) {
      console.log(value)
      console.log(item)
    }
  },
  mounted () {

  }
}
</script>
