<script lang="ts">
import {prefixCls} from '../prefix'
import {inject, defineComponent, onMounted} from 'vue'
import pType from '../util/pType'
import {VoidFun} from '../types'

export default defineComponent({
  name: `${prefixCls}Option`,
  props: {
    value: pType.string(),
    label: pType.string(),
    disabled: pType.bool(),
    className: pType.string()
  },
  setup(props) {
    const getChildOption = inject('getChildOption', '') as VoidFun
    onMounted(() => {
      getChildOption && getChildOption({
        label: props.label,
        value: props.value,
        disabled: props.disabled,
        className: props.className
      })
    })
    return {
      prefixCls
    }
  },
  render() {
    return null
  }
})
</script>
