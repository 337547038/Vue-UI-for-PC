<template>
  <div>
    <span class="green" @click="visible=true">试一试</span>
    <ak-dialog v-model="visible" title="title" :center="true">
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
      <template #footer>
        <ak-button>取消</ak-button>
        <ak-button type="primary">确定</ak-button>
        <ak-button type="primary">提交</ak-button>
      </template>
    </ak-dialog>
    <div style="height: 1000px">0</div>
  </div>
</template>
<script>
import {ref, onMounted, nextTick} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    onMounted(() => {
      nextTick(() => {

      })
    })
    return {
      visible
    }
  }
}
</script>
