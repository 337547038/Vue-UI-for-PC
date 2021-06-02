<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}CarouselItem`,
  componentName: 'CarouselItem',
  data () {
    return {
      renderCell: {}
    }
  },
  props: {
    className: String
  },
  created () {
    this.renderCell = (h) => {
      const data = {}
      return this.$scopedSlots.default(data)
    }
  },
  mounted () {
  },
  render () {
    return null
  }
}
</script>
