<!--Created by 337547038 on 2018/1/26.-->
<template>
  <v-transition>
    <ul>
      <li v-for="(item,index) in dataTree" :key="item.id">
        <span
          class="tree-box"
          :class="{'has-child':item.children&&item.children.length>0,'selected':selected(item)}"
          @click.stop="slideToggle(item)">
          <i
            :class="{'open-child':item.open}"
            class="icon-down"></i>
          <span class="tree-label">{{ item.label }}</span>
          <slot :row="item" :index="index"></slot>
        </span>
        <tree-li
          v-if="item.children&&item.children.length>0"
          v-show="item.open"
          :key="`${item.id}`"
          :data="item.children"
          @toggle="slideToggleChild">
          <slot :row="item.children"></slot>
        </tree-li>
      </li>
    </ul>
  </v-transition>
</template>
<script lang="ts">
import {computed, defineComponent, ref, inject} from 'vue'
import pType from '../util/pType'
import vTransition from '../transition/index.vue'
import {TreeList} from '../types/tree'
import {AnyPropName} from '../types'

export default defineComponent({
  name: 'TreeLi',
  components: {vTransition},
  props: {
    data: pType.array()
  },
  emits: ['toggle'],
  setup(props, {emit}) {
    const dataTree = ref(props.data)
    const modelValue = inject('modelValue') as AnyPropName
    const slideToggle = (item: TreeList) => {
      item.open = !item.open
      emit('toggle', item)
    }
    const selected = (item: TreeList) => {
      if (typeof modelValue.value === 'object') {
        return modelValue.value.indexOf(item.id) !== -1
      } else {
        return modelValue.value === item.id
      }
    }
    const slideToggleChild = (item: TreeList) => {
      emit('toggle', item)
    }
    return {
      slideToggle,
      dataTree,
      selected,
      slideToggleChild
    }
  }
})
</script>
