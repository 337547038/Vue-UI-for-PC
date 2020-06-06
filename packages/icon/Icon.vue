<!-- Created by 337547038 on 2020/4/22 0022. -->
<template>
  <i :class="[prefixCls+'-icon','icon-'+icon]"
     :title="label"
     @click="iconClick">
    {{showLabel2?label:''}}
    <slot></slot>
  </i>
</template>

<script>
import {prefixCls} from '../prefix'
import emitter from '../mixins/emitter'

export default {
  name: `${prefixCls}Icon`,
  data() {
    return {
      prefixCls: prefixCls
    }
  },
  mixins: [emitter],
  props: {
    icon: String,
    name: String,
    showLabel: {
      type: Boolean,
      default: true
    },
    label: String,
    click: Function
  },
  components: {},
  methods: {
    iconClick() {
      this.click && this.click()
      this.$emit('click')
      this.dispatch(`${prefixCls}Icon`, 'iconClick', this.name || this.icon)
    }
  },
  computed: {
    ab() {
      return this.$parent.showLabel
    },
    showLabel2() {
      if (this.$parent.showLabel === false) {
        // 父级设置了false时，则所有都不显示
        return false
      } else {
        return this.showLabel
      }
    }
  },
  mounted() {
  }
}
</script>
