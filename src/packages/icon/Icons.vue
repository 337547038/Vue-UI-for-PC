<!-- Created by 337547038 on 2020/4/22 0022. -->
<template>
  <div :class="[prefixCls+'-icons']">
    <slot></slot>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Icons`,
  componentName: `${prefixCls}Icon`,
  components: {},
  props: {
    click: Function,
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  computed: {},
  mounted() {
    this.$on('iconClick', this._iconClick)
  },
  methods: {
    _iconClick(icon) {
      this.click && this.click(icon)
      this.$emit('click', icon)
    }
  }
}
</script>
