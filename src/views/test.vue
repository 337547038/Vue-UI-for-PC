<template>
  <ak-form-item label="123" :rules="rules" verify="required">
    <ak-input v-model="value1" />
  </ak-form-item>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref('66')
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
