<template>
  <div>
    <ak-date-picker v-model="value" placeholder="请选择时间"></ak-date-picker>
  </div>
</template>
<script>

export default {
  data() {
    return {
      value: ''
    }
  },
  components: {},
  methods: {},
  mounted() {
    setTimeout(() => {
      this.value = '2019-04-01'
    }, 3000)
  }
}
</script>
