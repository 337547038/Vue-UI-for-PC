<script lang="ts">
import {prefixCls} from '../prefix'
import {inject, defineComponent} from 'vue'
import {AnyPropName} from '../types'
export default defineComponent({
  name: `${prefixCls}CarouselItem`,
  props: {
    className: String
  },
  setup(props, {slots}) {
    const childrenList = inject('childrenList') as AnyPropName
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
})
</script>
