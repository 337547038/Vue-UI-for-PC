<template>
  <div class="aaa">
    <ak-carousel :loop="true" :autoPlay="false" :showNumber="3">
      <ak-carousel-item v-for="item in 6" :key="item">
        {{item}}
      </ak-carousel-item>
      <ak-carousel-item className="tee">afsf</ak-carousel-item>
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
