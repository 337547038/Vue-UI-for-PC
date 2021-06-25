<script lang="ts">
import {prefixCls} from '../prefix'
import {inject, defineComponent} from 'vue'

export default defineComponent({
  name: `${prefixCls}CarouselItem`,
  props: {
    className: String
  },
  setup(props, {slots}) {
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
})
</script>
