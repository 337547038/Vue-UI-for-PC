<script>
import {h} from 'vue'

export default {
  name: 'Tttt',
  props: {
    data: Object
  },
  setup(props) {
    return {}
  },
  render() {
    return h('div', {
      class: 'sss'
    },
    /*[renderSlot(this.$slots, 'default',{label: '11', value: '222'})]*/
    /*this.$slots.default({label: '11', value: '222'})*/
    this.data.slots.default()
    )
  }
}
</script>
