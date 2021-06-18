<template>
  <ak-date-picker v-model="value1" placeholder="请选择时间"></ak-date-picker>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref('')
    const rules = [
      {type: 'tips', msg: 'tips输入提示'},
      {type: 'required', msg: '不能为空'},
      {type: 'maxLength', len: 6, msg: '最大6个字符'},
      {type: 'minLength', len: 3, msg: '不能小于3'}
    ]
    /*setTimeout(() => {
      value1.value = '598'
    }, 500)*/
    return {
      value1,
      rules
    }
  }
}
</script>
