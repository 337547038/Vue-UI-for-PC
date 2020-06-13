<template>
  <div>
    <ak-date-picker v-model="value" placeholder="请选择时间" type="date" value-format="timestamp"></ak-date-picker>
    <p>{{value}}</p>
  </div>
</template>
<script>

export default {
  data() {
    return {
      value: 1593532800000
    }
  },
  components: {},
  methods: {},
  mounted() {
    setTimeout(() => {
      // this.value = '2020-9'
    }, 3000)
  }
}
</script>
