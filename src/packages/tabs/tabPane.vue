<script lang="ts">
import {prefixCls} from '../prefix'
import {inject, defineComponent} from 'vue'
import pType from '../util/pType'
import {AnyPropName} from '../types'

export default defineComponent({
  name: `${prefixCls}TabPane`,
  props: {
    className: pType.string(),
    label: pType.string(),
    name: pType.string(),
    disabled: pType.bool()
  },
  setup(props, {slots}) {
    // console.log(slots.label)
    const childrenList = inject('childrenList') as AnyPropName
    childrenList.push(Object.assign({}, props, {slots: slots}))
    return {
      childrenList
    }
  },
  render() {
    return null
  }
})
</script>
