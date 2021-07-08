<script>
import {inject, h} from 'vue'
export default {
  name: 'NodeContent',
  props: {
    data: Object
  },
  render(ctx) {
    const treeSlots = inject('treeSlots')
    if (typeof treeSlots.default === 'function') {
      return treeSlots.default({node: ctx.data})
    }
    // return h('span', ctx.data.label)
    return null
  }
}
</script>
