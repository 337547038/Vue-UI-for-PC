<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Option`,
  data() {
    return {
      prefixCls: prefixCls,
      timer: ''
    }
  },
  props: {
    value: String,
    label: String,
    disabled: {
      type: Boolean,
      default: false
    },
    className: String
  },
  mounted() {
    this.$parent.filterOption.push({
      label: this.label,
      value: this.value,
      disabled: this.disabled,
      className: this.className
    })
  },
  render() {
    return null
  }
}
</script>
