<template>
  <div>
    <!--    <ak-tooltip content="这是提示内容这是提示内容"><ak-button>上左</ak-button></ak-tooltip>-->
    <ak-tooltip content="这是提示内容这是提示内容">
      <div class="a">
        <span>上左</span>
      </div>
    </ak-tooltip>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(50)
    return {
      value1
    }
  }
}
</script>
