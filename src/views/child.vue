<!-- Created by 337547038 on 2021/6/28 0028. -->
<template>
  <div>child</div>
</template>

<script>
export default {
  name: 'Child',
  props: {},
  setup(props,{attrs}){
    console.log('chid')
    console.log(attrs.onChange)
  },
  data() {
    return {}
  }
}
</script>
