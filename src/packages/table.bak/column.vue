<!-- Created by 337547038 on 2021/6/22 0022. -->

<script>
import {defineComponent, inject, renderSlot, h} from 'vue'

export default {
  name: 'AkTabPane',
  components: {},
  props: {},
  setup(props, {slots}) {
    const getChild = inject('getColumn')
    getChild.push({
      props: '',
      slots: slots
    })
  },
  render() {
    return h('div', {}, this.$slots.default)
  }
}
</script>
