<!-- Created by 337547038 on 2021/5/17 0017. -->
<template>
  <div>
    <p>当前值：{{ value1 }}</p>
    <ak-radio v-model="value1" label="选项1" />
    <ak-radio v-model="value2">选项1</ak-radio>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(true)
    const value2 = ref(false)
    setTimeout(() => {
      value2.value = true
    }, 2000)
    return {
      value1,
      value2
    }
  }
}
</script>
