<template>
  <div>
    <div>
      {{value9}}
      <ak-slider v-model="value9" :min="0" :max="70" :step="10"></ak-slider>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value9: [30, 50], // 40=57
      options: [
        {label: '全部', value: ''},
        {label: '选项2', value: '2'},
        {label: '选项3', value: '3'},
        {label: '选项4', value: '4', disabled: true},
        {label: '选项5', value: '5'},
        {value: '6'},
        {label: '选项7', value: '7'},
        {label: '选项8', value: '8'},
        {label: '选项9', value: '9'},
        {label: '选项10', value: '10'}
      ]
    }
  },
  components: {},
  methods: {},
  mounted () {
    setTimeout(() => {
      this.options = [
        {label: '全部', value: ''},
        {label: '选项2', value: '2'},
        {label: '选项3', value: '3'},
        {label: '选项4', value: '4', disabled: true},
        {label: '选项5', value: '5'},
        {value: '6'},
        {label: '选项7', value: '7'},
        {label: '选项8', value: '8'},
        {label: '选项9', value: '9'},
        {label: '选项10', value: '10'}
      ]
    }, 1000)
  }
}
</script>
