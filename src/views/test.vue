<template>
  <div>
    <p></p>
    <p><img v-lazy="defaultLazy" width="60"></p>
    或者
<!--    <p><img data-src="http://www.33lc.com/article/UploadPic/2012-8/2012831462935573.jpg" v-lazy></p>
    <p style="height: 1500px;"></p>-->
  </div>
</template>
<script>
import img from '../../public/static/img/lazy1.jpg'
import {ref, inject} from 'vue'

export default {
  setup() {
    const defaultLazy = ref('/static/img/lazy10.jpg')
    return {
      defaultLazy
    }
  }
}
</script>
