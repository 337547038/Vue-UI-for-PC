<script>
import {prefixCls} from '../prefix'
import {inject} from 'vue'

export default {
  name: `${prefixCls}CarouselItem`,
  componentName: 'CarouselItem',
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
}
</script>
