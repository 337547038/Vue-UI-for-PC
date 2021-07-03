<!-- Created by 337547038 on 2021/6/28 0028. -->
<template>
  <slot></slot>
</template>

<script>
import {onMounted, getCurrentInstance} from 'vue'

export default {
  name: 'Child',
  props: {},
  setup(props, {attrs, slots}) {
    console.log('chid')
    const gInstance=getCurrentInstance()
    onMounted(() => {
      console.log(slots.default()[0])
      console.log(slots.default()[0].el)

      console.log(gInstance.proxy.$el.nextElementSibling)
      console.log(gInstance.proxy.$el.nextSibling)
    })
  },
  mounted() {
    /*console.log(this.$el)
    console.log(this.$slots.default()[0].el)
    this.$el.addEventListener('click', this.click, false)*/
  },
  methods: {
    click() {
      console.log('click')
    }
  }
}
</script>
