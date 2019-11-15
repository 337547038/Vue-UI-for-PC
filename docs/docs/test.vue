<template>
  <div>
    <p><br><br><br><br></p>
    <p>{{value}}</p>
    <Slider v-model="value" :min="0" :max="100" :marks="marks"></Slider>
  </div>
</template>
<script>
import Slider from '../../packages/slider'

export default {
  data () {
    return {
      value: [25, 80],
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
  methods: {}
}
</script>
