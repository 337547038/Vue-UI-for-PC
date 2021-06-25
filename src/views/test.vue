<template>
  <div>
    <ak-tabs :show-content="false" @change="change">
      <ak-tab-pane label="用户管理" />
      <ak-tab-pane label="配置管理" />
      <ak-tab-pane label="角色管理">角色管理，这里不需要有内容</ak-tab-pane>
      <ak-tab-pane label="定时任务补偿">定时任务补偿</ak-tab-pane>
    </ak-tabs>
    <div class="ajax-content">
      ajax content
      <p>{{ content }}</p>
    </div>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const content = ref('')
    const change = (obj, index) => {
      console.log(obj)
      content.value = `当前点击选项的name值：${obj.name}；label为：${obj.label}`
    }
    return {
      change,
      content
    }
  }
}
</script>
