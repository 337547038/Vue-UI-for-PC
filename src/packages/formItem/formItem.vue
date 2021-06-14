<!-- Created by 337547038 on 2021/6/14. -->
<template>
  <div></div>
</template>

<script>
import {ref, provide} from 'vue'
export default {
  name: 'FormItem',
  setup(){
    provide('controlChange', val => {
      console.log(val)
    })
  }
}
</script>
