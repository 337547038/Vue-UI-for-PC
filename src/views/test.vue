<template>
  <ak-input-number v-model="value1" :step="5" :readOnly="true" />
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const value1 = ref(1)
    return {
      value1
    }
  }
}
</script>
