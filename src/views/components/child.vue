<!-- Created by 337547038 on 2021/5/18 0018. -->
<!--<template>
  <ul class="textaa">
&lt;!&ndash;    <li v-for="( item, index ) in items">
      <slot :row="item" :index="index"></slot>
    </li>&ndash;&gt;
    <slot :row="items[0]"></slot>
  </ul>
</template>-->

<script lang="ts">
import {inject, defineComponent, ref,h,renderSlot} from 'vue'

export default defineComponent({

  setup(props, context) {
    const items = [
      {label: '11', value: '1111'},
      {label: '22', value: '2222'},
      {label: '33', value: '333'},
      {label: '44', value: '444'},
      {label: '55', value: '555'}
    ]
    return {
      items
    }
  },
  /*render(){
    return h('div', {

      },
      [renderSlot(this.$slots, 'default',{aa:'00'})])
  }*/
  render() {
    return h('div', {},
      this.$slots.default)
  }
})
</script>
