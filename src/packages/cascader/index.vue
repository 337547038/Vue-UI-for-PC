<!--Created by 337547038 on 2021.6.-->
<template>
  <div ref="el" :class="{[`${prefixCls}-cascader`]:true,'disabled':disabled}" :style="{width:width}">
    <div
      :class="{[prefixCls+'-input-control']:true,
               'focus':show,
               'placeholder':showPlaceholder,
               'disabled':disabled}"
      v-text="showValue"></div>
    <span class="group-icon">
      <i v-if="clear&&modelValue.length>0" class="icon-close clear" title="清空" @click="clearClick"></i>
      <i class="icon-arrow" :class="{'is-down':show}"></i>
    </span>
    <span v-show="show" class="mask"></span>
    <transition name="slide-toggle">
      <div v-show="show" class="cascader-down" @click="stopPropagation">
        <p v-if="tipsText" class="tips" v-text="tipsText"></p>
        <div class="cascader-tab">
          <ul class="clearfix">
            <li
              v-for="(item,index) in selectValue"
              :key="index"
              :class="{'active':index===activeLayer}"
              @click="activeLayer=index"
              v-text="item.name"></li>
          </ul>
        </div>
        <div class="cascader-area">
          <ul class="clearfix">
            <li v-for="(item,index) in children" :key="index" :title="item.name">
              <a @click="childrenClick(item)" v-text="item.name"></a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import cityData from './cityData.json'
import {prefixCls} from '../prefix'
import {defineComponent, computed, reactive, toRefs, ref, onMounted, nextTick, onUnmounted, watch, inject} from 'vue'
import pType from '../util/pType'

type cityProps = {
  name: string
  children: any
}
export default defineComponent({
  name: `${prefixCls}Cascader`,
  props: {
    modelValue: pType.array([]),
    placeholder: pType.string(),
    disabled: pType.bool(),
    tipsText: pType.string(), // 下拉框下面的提示文字
    selectText: pType.array(['请选择省', '请选择市', '请选择区']),
    data: pType.array<cityProps>(cityData),// 下拉选项数据
    clear: pType.bool(false), // 显示清空按钮
    width: pType.string()
  },
  emits: ['update:modelValue', 'change'],
  setup(props, {emit}) {
    const state = reactive({
      show: false,
      activeLayer: 0, // 当前第几级
      showValue: props.placeholder, // 用于展示的值，格式化后显示于输入框的值
      showPlaceholder: !!props.placeholder
    })
    // [index: string]: any;
    const selectValue = ref<any>([])// 暂存的值，加工后的数组，同时保存了当前值所在数组的位置
    const el = ref()
    const init = () => {
      let length = props.modelValue.length
      // 有值
      if (length > 0 && length <= 3) {
        // 有值时要默认在最后一级，根据当前和取当前位置拼成数组
        let data
        for (let i = 0; i < length; i++) {
          if (i === 0) {
            data = props.data
          } else if (i === 1) {
            const index = selectValue.value[0].index
            data = props.data[index].children
          } else if (i === 2) {
            const index = selectValue.value[0].index
            const data1 = props.data[index].children
            const index2 = selectValue.value[1].index
            data = data1[index2].children
          }
          setDefaultValue(data, i)
        }
        state.activeLayer = length - 1
        state.showValue = formatValue()
      } else {
        selectValue.value.push({
          name: props.selectText[0],
          index: 0
        })
      }
    }
    const children = computed(() => {
      // 根据selectValue和当前的级数
      let array: Array<any> = []
      let data = props.data
      if (state.activeLayer === 0) {

      } else if (state.activeLayer === 1) {
        // 根据索引直接找到当前的子级，省去一级级的遍历
        const index = selectValue.value[0].index
        data = props.data[index].children
      } else if (state.activeLayer === 2) {
        const index = selectValue.value[0].index
        const data1 = props.data[index].children
        const index2 = selectValue.value[1].index
        data = data1[index2].children
      }
      for (let i in data) {
        array.push({
          name: data[i].name || data[i],
          index: i,
          hasChild: !!data[i].children
        })
      }
      return array
    })
    const showHide = (e: MouseEvent) => {
      if (el.value.contains(e.target)) {
        if (props.disabled === true) {
          return
        }
        state.show = !state.show
      } else {
        state.show = false
      }
    }
    const setDefaultValue = (data: Array<any>, index: number) => {
      for (let i in data) {
        // 最后一个比较特别，是数组不是对象，没有name
        if ((data[i].name || data[i]) === props.modelValue[index]) {
          selectValue.value.push({
            name: data[i].name || data[i],
            index: i
          })
          break
        }
      }
    }
    const childrenClick = (item: any) => {
      if (item.hasChild) {
        if (state.activeLayer === 0) {
          selectValue.value.splice(0, selectValue.value.length)// 清空
          // 写入当前项
          selectValue.value.push({
            name: item.name,
            index: item.index// 当前值在数据组中的位置，for时就可以直接找到当前项
          })
          // 写入第二项
          selectValue.value.push({
            name: props.selectText[1]
          })
        } else if (state.activeLayer === 1) {
          // 将请选择修改为当前选择
          selectValue.value[1] = {
            name: item.name,
            index: item.index
          }
          // 将第三级设为请选择
          selectValue.value[2] = {name: props.selectText[2]}
        }
        state.activeLayer++// 跳到下一级
      } else {
        // 关闭下拉，将值给输入框，这里有可能是第二级
        selectValue.value[state.activeLayer] = {
          name: item.name,
          index: item.index
        }
        // 如果只有二级时，这里清除下第三级，保证不出错
        if (state.activeLayer === 1) {
          selectValue.value.splice(2, 1)
        }
        state.showValue = formatValue()
        state.show = false
        state.showPlaceholder = false
      }
    }
    const formatValue = (type?: boolean): any => {
      // 将数组转为文本显示出来
      let val = ''
      let array=[]
      for (let i in selectValue.value) {
        if (type) {
          // 为真返回数组
          array.push(selectValue.value[i].name)
        } else {
          val += selectValue.value[i].name
        }
      }
      return type ? array : val
    }
    const stopPropagation = (e: MouseEvent) => {
      e.stopPropagation()
    }
    const clearClick = () => {
      state.showValue = ''
      selectValue.value = []
      state.activeLayer = 0
      nextTick(() => {
        selectValue.value.push({
          name: props.selectText[0],
          index: 0
        })
      })
    }
    watch(
      () => state.showValue,
      () => {
        const value = formatValue(true)
        // console.log(typeof value)
        emit('update:modelValue', value)
        emit('change', value)
        const controlChange: any = inject('controlChange', '')
        controlChange && controlChange(value)
      }
    )
    onMounted(() => {
      document.addEventListener('click', showHide)
      init()
      controlChangeEvent(props.modelValue, 'mounted')
    })
    onUnmounted(() => {
      document.addEventListener('click', showHide)
    })
    watch(() => props.modelValue, (v: any) => {
      controlChangeEvent(v, 'mounted')
    })
    // formItem
    const controlChange: any = inject('controlChange', '')
    const controlChangeEvent = (val: any, type?: string) => {
      controlChange && controlChange(val, type)
    }
    return {
      prefixCls,
      ...toRefs(state),
      selectValue,
      children,
      el,
      clearClick,
      stopPropagation,
      childrenClick
    }
  }
})
</script>
