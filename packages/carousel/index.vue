<!-- Created by 337547038 on -->
<template>
  <div :class="{[prefixCls+'-carousel']:true}">
    <div class="carousel-container" :style="style">
      <slot></slot>
    </div>
    <div class="direction-nav">
      <a class="carousel-prev" @click="_directionNavClick(-1)"></a>
      <a class="carousel-next" @click="_directionNavClick(1)"></a>
    </div>
  </div>
</template>

<script>
import {prefixCls} from '../prefix'

export default {
  name: `${prefixCls}Carousel`,
  data () {
    return {}
  },
  props: {
    active: Number // 当前
  },
  components: {},
  methods: {},
  computed: {
    style () {
      return {}
    }
  },
  mounted () {
  }
}
</script>
