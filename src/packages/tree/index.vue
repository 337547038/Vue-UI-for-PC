<!--Created by 337547038 on 2018/1/26.-->
<template>
  <div :class="`${prefixCls}-tree`">
    <!--    <slot :row="true"></slot>-->
    <treeItem
      :data="data"
      @toggle="toggle">
      <template #default="node">
        <slot :row="node.row" :index="node.index"></slot>
      </template>
    </treeItem>
  </div>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import treeItem from './treeItem.vue'
import pType from '../util/pType'
import {ref, defineComponent, provide, toRef, toRefs, computed} from 'vue'
import {TreeList} from '../types/tree'

export default defineComponent({
  name: `${prefixCls}Tree`,
  components: {treeItem},
  props: {
    data: pType.array(),
    lazy: pType.bool(),
    showCheckbox: pType.bool(), // 显示checkbox
    modelValue: [String, Array]
  },
  emits: ['toggle', 'update:modelValue'],
  setup(props, {emit}) {
    const {modelValue} = toRefs(props)
    const mv = computed(() => {
      return props.modelValue
    })
    provide('modelValue', mv)
    const toggle = (item: TreeList) => {
      emit('toggle', item)
      if (typeof props.modelValue === 'object') {
        const temp = modelValue.value as string[]
        const index = temp.indexOf(item.id)
        if (index !== -1) {
          // 表示存在，则删除
          temp.splice(index, 1)
        } else {
          temp.push(item.id)
        }
        emit('update:modelValue', temp)
      } else {
        emit('update:modelValue', item.id)
      }
    }
    return {
      prefixCls,
      toggle
    }
  }
})
</script>
