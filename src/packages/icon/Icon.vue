<!-- Created by 337547038 on 2020/4/22 0022. -->
<template>
  <span v-if="hasLabel" :class="[prefixCls+'-icon']" @click="iconClick">
    <i :class="['icon-'+icon]"></i>
    {{ label }}
    <slot></slot>
  </span>
  <i
    v-else
    :class="[prefixCls+'-icon','icon-'+icon]"
    @click="iconClick">
  </i>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import {defineComponent, computed} from 'vue'
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
  setup(props, {emit, slots}) {
    const hasLabel = computed(() => {
      return !!props.label || !!slots.default
    })
    const iconClick = () => {
      emit('click')
    }
    return {
      prefixCls,
      hasLabel,
      iconClick
    }
  }
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
