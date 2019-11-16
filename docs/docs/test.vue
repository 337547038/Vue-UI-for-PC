<template>
  <div>
    <p><br><br><br><br></p>
    <p>{{value}}</p>
    <Slider v-model="value"></Slider>
  </div>
</template>
<script>
import Slider from '../../packages/slider'

export default {
  data() {
    return {
      value: 0,
      marks: {
        0: 'start',
        25: '25%',
        50: 'center',
        75: '75%',
        100: '<i style="color:red">end</i>'
      }
    }
  },
  components: {Slider},
  methods: {},
  mounted() {
    // this.value = [30, 60]
  }
}
</script>
