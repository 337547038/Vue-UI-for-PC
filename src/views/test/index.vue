<template>
  <div class="aaa">
    <ak-carousel :showNumber="5" :move="2">
      <ak-carousel-item v-for="item in 15" :key="item">
        {{item}}
      </ak-carousel-item>
    </ak-carousel>
    <!--<div class="test" :style="style">
      <p v-for="item in list" :key="item.name">{{item.name}}</p>
    </div>
    <p style="clear: both"></p>
    <p @click="prev">prev</p>
    <p @click="next">next</p>-->
  </div>
</template>
<style>
  .test{}
  .test p{float: left;width: 100px;height: 50px;}
</style>
<script>
export default {
  name: 'index',
  data () {
    return {
      index: 0,
      duration: 200,
      move: 2,
      list: [
        {name: '1'},
        {name: '2'},
        {name: '3'},
        {name: '4'},
        {name: '5'}
      ]
    }
  },
  props: {},
  components: {},
  methods: {
    next () {
      this.duration = 200
      this.index = 1
      this.setTime('next')
    },
    prev () {
      /* this.duration = 0
      this.index = -1 */
      const next = this.list.slice(this.list.length - this.move)
      this.list.splice(this.list.length - this.move)
      for (let i = next.length; i > 0; i--) {
        this.list.unshift(next[i - 1])
      }
      // this.setTime('prev')
    },
    setTime (type) {
      setTimeout(() => {
        this.index = 0
        this.duration = 0
        if (type === 'next') {
          // 删除第1个，追加到最后
          const pre = this.list.slice(0, this.move)
          this.list.splice(0, this.move)
          pre.forEach(item => {
            this.list.push(item)
          })
        }
      }, 200)
    }
  },
  computed: {
    style () {
      let x = -this.index * this.move * 100
      return {
        width: this.list.length * 100 + 'px',
        transform: `translateX(${x}px)`,
        transition: `transform ${this.duration}ms`
      }
    }
  },
  mounted () {
  }
}
</script>
<style>
  .carousel-slide{background: #F9F9F9}
</style>
