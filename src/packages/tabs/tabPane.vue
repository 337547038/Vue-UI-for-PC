<script>
import {prefixCls} from '../prefix'
import {inject} from 'vue'
import pType from '../util/pType'

export default {
  name: `${prefixCls}TabPane`,
  props: {
    className: pType.string(),
    label: pType.string(),
    name: pType.string(),
    disabled: pType.bool()
  },
  setup(props, {slots}) {
    console.log(slots.label)
    const childrenList = inject('childrenList')
    childrenList.push({
      slots: slots,
      props: props
    })
    return {
      childrenList
    }
  },
  render() {
    return null
  }
}
</script>
