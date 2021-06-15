<!-- Created by 337547038 on 2021/5/17 0017. -->
<template>
  <p>已选值：{{checkbox9}}</p>
  <p>
    <ak-checkbox-group v-model="checkbox9" :options="groupData" :min="2" :max="4" />
  </p>
</template>
<script>
import {reactive, toRefs} from 'vue'

export default {
  setup() {
    const state = reactive({
      checkbox9: ['a5']
    })
    const groupData = [
      {label: '选项1', value: 'a1'},
      {label: '选项2', value: 'a2'},
      {label: '选项3', value: 'a3'},
      {value: 'a4'},
      {label: '选项5', value: 'a5'},
      {label: '选项6', value: 'a6'}
    ]
    return {
      ...toRefs(state),
      groupData
    }
  }
}
</script>
<style>
.checked{color: #9a6e3a}
</style>
