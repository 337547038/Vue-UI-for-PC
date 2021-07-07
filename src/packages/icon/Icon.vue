<!-- Created by 337547038 on 2020/4/22 0022. -->
<template>
  <i
    :class="[prefixCls+'-icon','icon-'+icon]"
    :title="label"
    @click="iconClick">
    {{ showLabel2 ? label : '' }}
    <slot></slot>
  </i>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import {defineComponent} from 'vue'
import pType from '../util/pType'

export default defineComponent({
  name: `${prefixCls}Icon`,
  props: {
    icon: pType.string(),
    name: pType.string(),
    showLabel: pType.bool(true),
    label: pType.string()
  },
  emits: ['click'],
  setup(props, {emit}) {
    const iconClick = () => {
      emit('click')
    }
    return {
      prefixCls,
      iconClick
    }
  },
  /*computed: {
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
  },*/
})
</script>
