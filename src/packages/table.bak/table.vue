<!-- Created by 337547038 on 2021/6/22 0022. -->
<template>
  <div :class="`${prefixCls}-tabs`">
    <slot></slot>
    <!--    <div class="tabs-nav">
          <div v-for="(item,index) in children" :key="index" class="tabs-tab">{{ item }}</div>
        </div>
        <slot name="content"></slot>
        <div class="tabs-content">
          <div class="tab-pane"></div>
        </div>-->
    <li v-for="(item,index) in children">
      <tttest :data="item" />
    </li>
  </div>
</template>


<script>
import tttest from './tttest.vue'
import {reactive,provide,toRefs} from 'vue'
export default {
  name: 'AkTabs',
  components: {tttest},
  props: {},
  setup(){
    const state = reactive({
      children: []
    })
    provide('getColumn', state.children)
    return {
      ...toRefs(state)
    }
  }
}
</script>
