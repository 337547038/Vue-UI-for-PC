<template>
  <div class="aaa">
    <ak-carousel :showNumber="5" :move="2" :itemHeight="100" :loop="true">
      <ak-carousel-item v-for="item in 15" :key="item">
        <div>{{item}}</div>
      </ak-carousel-item>
    </ak-carousel>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {}
  },
  props: {},
  components: {},
  methods: {},
  computed: {},
  mounted () {
  }
}
</script>
<style>
  .carousel-slide{background: #f0f0f0}
</style>
