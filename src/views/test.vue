<!-- Created by 337547038 on 2021/5/17 0017. -->
<template>
  <div>
    <!--    <p><ak-checkbox v-model="value3" value="1" label="String">String value1:{{value1}}</ak-checkbox></p>
        <p><ak-checkbox v-model="value3" value="2" label="Boolean">value2:{{value2}}</ak-checkbox></p>
        <p><ak-checkbox v-model="value3" value="3" label="Array">value3:{{value3}}</ak-checkbox></p>-->
    <p>
      <ak-checkbox-group v-model="value3" :data="groupData" :max="2"></ak-checkbox-group>
    </p>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref('1')
    const value2 = ref(false)
    const value3 = ref(['a1'])
    const groupData = [
      {label: '选项1', value: 'a1'},
      {label: '选项2', value: 'a2'},
      {label: '选项3', value: 'a3'},
      {value: 'a4'},
      {label: '禁用', value: 'a5', disabled: true},
      {label: '勾选禁用', value: 'a6', disabled: true}
    ]
    return {
      value1,
      value2,
      value3,
      groupData
    }
  }
}
</script>
<style>
.checked{color: #9a6e3a}
</style>
