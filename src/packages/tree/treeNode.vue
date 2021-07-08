<!--Created by 337547038 on 2018/1/26.-->
<template>
  <v-transition>
    <ul>
      <li v-for="item in dataTree" :key="item.id">
        <span
          class="tree-box"
          :class="{'has-child':item.hasChild||lazy,'selected':selected(item)}"
          @click.stop="slideToggle(item)">
          <i
            :class="{'open-child':item.open,[`${prefixCls}-icon`]:true}"
            class="icon-down"></i>
          <Checkbox
            v-if="showCheckbox"
            v-model="item.checked"
            :class="{'some-select':item.someChecked}"
            @click.stop=""
            @change="checkboxChange(item,$event)" />
          <span class="tree-label">{{ item.label }}</span>
          <span v-if="lazy" class="lazy-loading">
            <Loading ref="loadingEl" :key="item.id" />
          </span>
          <node-content :data="item" />
        </span>
        <tree-li
          v-if="item.hasChild"
          v-show="item.open"
          :key="item.id"
          :tid="item.id"
          @toggle="slideToggleChild" />
      </li>
    </ul>
  </v-transition>
</template>
<script lang="ts">
import {prefixCls} from '../prefix'
import {defineComponent, ref, inject, getCurrentInstance, computed, reactive, toRefs, nextTick} from 'vue'
import pType from '../util/pType'
import vTransition from '../transition/index.vue'
import {TreeList} from '../types/tree'
import {AnyPropName} from '../types'
import NodeContent from './nodeContent.vue'
import Loading from '../loading/loading.vue'
import Checkbox from '../checkbox/checkbox.vue'

export default defineComponent({
  name: 'TreeLi',
  components: {vTransition, NodeContent, Loading, Checkbox},
  props: {
    tid: pType.string()
  },
  emits: ['toggle'],
  setup(props, {emit, slots}) {
    // const instance = getCurrentInstance()
    // const childList = instance.props.data
    const propsData = inject('propsData') as AnyPropName
    const state = reactive({
      lazy: propsData.lazy,
      showCheckbox: propsData.showCheckbox
      // lazyLoading: false
    })
    const loadingEl = ref()
    const dataTree = computed(() => {
      return propsData.dataList.filter((item: any) => {
        return item.tid === props.tid
      })
    })
    const slideToggle = (item: TreeList) => {
      item.open = !item.open
      propsData.lazy && loadingEl.value.open()
      emit('toggle', item, () => {
        propsData.lazy && loadingEl.value.close()
      })
    }
    const selected = (item: TreeList) => {
      if (typeof propsData.modelValue === 'object') {
        return propsData.modelValue.indexOf(item.id) !== -1
      } else {
        return propsData.modelValue === item.id
      }
    }
    const slideToggleChild = (item: TreeList) => {
      emit('toggle', item)
    }
    const change = inject('checkboxChange') as (item: TreeList) => void
    const checkboxChange = (item: TreeList) => {
      nextTick(() => {
        change && change(item)
      })
    }
    return {
      slideToggle,
      dataTree,
      selected,
      slideToggleChild,
      prefixCls,
      ...toRefs(state),
      loadingEl,
      checkboxChange
    }
  }
})
</script>
