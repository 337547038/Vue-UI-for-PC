<template>
  <div>
    <p>{{value}}</p>
    <ak-date-picker v-model="value" placeholder="请选择时间"></ak-date-picker>
  </div>
</template>
<script>

export default {
  data() {
    return {
      value: new Date()
    }
  },
  components: {},
  methods: {},
  mounted() {
    setTimeout(() => {
      // this.value = new Date()
    }, 3000)
  }
}
</script>
