<template>
  <div>
    <p>
      <img
        v-lazy
        data-src="http://www.33lc.com/article/UploadPic/2012-8/2012831462935573.jpg"
        data-error="error.jpg"
        src="default.jpg">
    </p>
    <p>
      <img
        v-lazy
        data-src="http://www.33lc.com/article/UploadPic/2012-8/20128314143814136.jpg"
        data-error="error.jpg"
        src="default.jpg">
    </p>
    <p>
      <img
        v-lazy
        data-src="http://www.33lc.com/article/UploadPic/2012-8/2012831416948898.jpg"
        data-error="error.jpg"
        src="default.jpg">
    </p>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const defaultLazy = ref('https://337547038.github.io/static/img/lazy1.jpg')
    return {
      defaultLazy
    }
  }
}
</script>
