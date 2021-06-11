<script>
import pType from '../util/pType'
import {h, renderSlot} from 'vue'

export default {
  name: 'ItemList',
  props: {
    childItem: pType.object(),
    styleCls: pType.object(),
    className: pType.string()
  },
  render() {
    let cls = ['carousel-slide']
    const itemCls = this.childItem.className
    itemCls && cls.push(itemCls)
    this.className && cls.push(this.className)
    return h('div', {
      class: cls.join(' '),
      style: this.styleCls
    },
    [renderSlot(this.childItem.slots, 'default')])
  }
}
</script>
