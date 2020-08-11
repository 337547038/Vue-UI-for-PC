<template>
  <div>
    <p>
      <radio v-model="radio1">男</radio>
      {{radio1}}
    </p>
    <p>
      <radio v-model="radio2">女</radio>
      {{radio2}}
    </p>
    <p>
      <radio v-model="radio3" :label="1">女</radio>
      {{radio3}}
    </p>
    <p>
      <radio v-model="radio4" label="a">女</radio>
      {{radio4}}
    </p>
    <hr>
    <p>
      <group :data="data" v-model="value" @change="change"></group>
    </p>
  </div>
</template>
<script>
import radio from '../../packages/radio/radio2'
import group from '../../packages/radio/radioGroup2'

export default {
  data() {
    return {
      radio1: true,
      radio2: false,
      radio3: 2,
      radio4: 'b',
      value: '0',
      data: [
        {label: '男', value: '1'},
        {label: '女', value: '0'}
      ]
    }
  },
  components: {radio, group},
  methods: {
    change(value, item) {
      console.log(value)
      console.log(item)
    }
  },
  mounted() {

  }
}
</script>
