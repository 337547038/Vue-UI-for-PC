<template>
  <div class="aaa">
    <ak-carousel :showNumber="3" :itemHeight="100" class="card" :itemWidth="400">
      <ak-carousel-item v-for="item in 6" :key="item">
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
