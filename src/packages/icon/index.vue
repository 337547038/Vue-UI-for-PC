<!-- Created by 337547038 on 2020/4/22 0022. -->
<template>
  <i
    :class="[prefixCls+'-icon','icon-'+icon]"
    @click="iconClick">
  </i>
</template>

<script lang="ts">
import {prefixCls} from '../prefix'
import {defineComponent} from 'vue'
import pType from '../util/pType'

export default defineComponent({
  name: `${prefixCls}Icon`,
  props: {
    icon: pType.string()
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
  }
})
</script>
