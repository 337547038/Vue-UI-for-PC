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
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  props: {
    click: Function,
    showLabel: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  methods: {
    _iconClick(icon) {
      this.click && this.click(icon)
      this.$emit('click', icon)
    }
  },
  computed: {},
  mounted() {
    this.$on('iconClick', this._iconClick)
  }
}
</script>
