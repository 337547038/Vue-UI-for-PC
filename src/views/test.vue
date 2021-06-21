<template>
  <p>
    <ak-checkbox v-model="checkbox1">选项1</ak-checkbox>
    {{ checkbox1 }}
  </p>
  <!--  <p>
      <ak-checkbox v-model="checkbox2">选项2</ak-checkbox>
      {{checkbox2}}
    </p>
    <p>
      <ak-checkbox v-model="checkbox3">选项3</ak-checkbox>
      {{checkbox3}}（v-model的值只要为true都会是勾选状态）
    </p>
    <p>选中时返回指定值（v-model=value或是value存在于v-model数组中，即选中状态）</p>
    <p>
      <ak-checkbox v-model="checkbox4" value="4">选项4</ak-checkbox>
      {{checkbox4}}
    </p>
    <p>
      <ak-checkbox v-model="checkbox5" value="5">选项5</ak-checkbox>
      {{checkbox5}}
    </p>-->
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox1: true,
      checkbox2: false,
      checkbox3: '1',
      checkbox4: ['4'],
      checkbox5: []
    })
    const beforeChange = () => {
     return 'aa'
    }
    return {
      ...toRefs(state),
      beforeChange
    }
  }
}
</script>
