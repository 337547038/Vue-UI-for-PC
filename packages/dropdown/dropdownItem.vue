<template>
  <li :class="{'disabled':disabled,className}" @click="itemClick">
    <slot></slot>
  </li>
</template>
<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}DropdownItem`,
  data () {
    return {}
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    className: String
  },
  components: {},
  methods: {
    itemClick () {
      if (!this.disabled) {
        this.$parent.itemClick('click', this)
      }
    }
  },
  computed: {},
  mounted () {
  }
}
</script>
