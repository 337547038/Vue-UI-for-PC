<!-- Created by 337547038 on 2021/6/22 0022. -->
<template>
  <form-item v-bind="item.formItem" ref="formItem" :rules="item.rules">
    <control-input
      v-if="item.type==='input'||item.type==='password'"
      v-model="modelValue"
      v-bind="item.control"
      :type="item.type" />
    <radio-group
      v-if="item.type==='radio'"
      v-model="modelValue"
      v-bind="item.control" />
    <checkbox-group
      v-if="item.type==='checkbox'"
      v-model="modelValue"
      v-bind="item.control" />
    <date-picker
      v-if="item.type==='datePicker'"
      v-model="modelValue"
      v-bind="item.control" />
    <Select
      v-if="item.type==='select'"
      v-model="modelValue"
      v-bind="item.control" />
    <control-switch
      v-if="item.type==='switch'"
      v-model="modelValue"
      v-bind="item.control" />
    <Textarea
      v-if="item.type==='textarea'"
      v-model="modelValue"
      v-bind="item.control" />
  </form-item>
</template>

<script lang="ts">
import pType from '../util/pType'
import {ref, defineComponent} from 'vue'
import ControlInput from '../input/index.vue'
import {RadioGroup} from '../radio/index'
import {CheckboxGroup} from '../checkbox/index'
import DatePicker from '../datePicker/index.vue'
import {Select} from '../select/index'
import ControlSwitch from '../switch/index.vue'
import Textarea from '../textarea/index.vue'
import FormItem from '../formItem/index.vue'

export default defineComponent({
  name: 'Control',
  components: {ControlInput, RadioGroup, CheckboxGroup, DatePicker, Select, ControlSwitch, Textarea, FormItem},
  props: {
    item: pType.object()
  },
  setup(props) {
    const modelValue = ref(props.item.control.value)
    /*watch(modelValue, (val: any) => {
      console.log('watch')
      //  modelValue.value = val.control.value
    })*/
    const formItem = ref()
    const validate = () => {
      return new Promise((resolve, reject) => {
        formItem.value.validate()
          .then((res: any) => {
            resolve({name: props.item.name, value: res})
          })
          .catch((res: any) => {
            reject(res)
          })
      })
    }
    const setValue = (obj: { [index: number]: any; }) => {
      /*for (let key in obj) {
        if (props.item.name === key) {
          modelValue.value = obj[key]
        }
      }*/
      if (obj[props.item.name] !== undefined) {
        modelValue.value = obj[props.item.name]
      }
    }
    const clearTips = (obj?: any) => {
      formItem.value.clearTips()
      // 恢复填写的数据
      modelValue.value = props.item.control.value
      setValue(obj)
    }
    return {
      modelValue,
      formItem,
      validate,
      setValue,
      clearTips
    }
  }
})
</script>
