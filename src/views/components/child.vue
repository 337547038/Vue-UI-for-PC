<!-- Created by 337547038 on 2021/5/18 0018. -->
<template>
  <div>child</div>
  <p @click="clickEmit">children click emit</p>
  <p>props:{{text}}</p>
</template>

<script lang="ts">
import {inject, defineComponent, ref} from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  emits: {
    'click': (payload: any) => {
      return payload.type === 'close'
    }
  },
  setup(props, context) {
    // console.log(props)
    const text = ref(null) // 会覆盖props里的
    // const userLocation = inject('location')
    const controlChange = inject('controlChange')
    console.log('controlChange')
    controlChange && controlChange('1')
    const controlChange2 = inject('controlChange2') || ''
    console.log(controlChange2)
    const clickEmit = () => {
      context.emit('click', {type: 'close'})
    }
    const init = () => {
      console.log('init')
    }
    return {
      clickEmit,
      init
    }
  }
})
</script>
