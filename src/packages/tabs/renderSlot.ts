import {defineComponent, h, ref} from 'vue'
import pType from '../util/pType'

export default defineComponent({
  props: {
    slots: pType.object(),
    label: pType.string(),
    type: pType.number(0)
  },
  setup(props) {
    let renderSlot = ''
    if (props.type === 0) {
      if (props.slots.label) {
        // 使用slots
        renderSlot = props.slots.label()
      } else {
        renderSlot = ref(props.label).value
      }
    } else if (props.type === 1) {
      // 面板
      renderSlot = props.slots.default()
    }
    return () => [
      h('div', {}, renderSlot)
    ]
  }
})
