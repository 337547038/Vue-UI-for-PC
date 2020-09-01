<template>
  <div>
    <drag :data="data" v-model="value"></drag>
  </div>
</template>
<script>
import drag from '../../packages/drag'

export default {
  data() {
    return {
      value: '',
      data: [
        {label: '显示标题名称a', key: 'a1'},
        {label: '显示标题名称2', key: 'a2'},
        {label: '显示标题名称3', key: 'a3'},
        {label: '显示标题名称4', key: 'a4'},
        {label: '显示标题名称5', key: 'a5'},
        {label: '显示标题名称6', key: 'a6'}
      ]
    }
  },
  components: {drag},
  methods: {},
  mounted() {

  }
}
</script>
<style>
  .drag li {
    width: 100%;
    height: 40px;
    border: 1px solid #999;
    background: #EA6E59;
    margin-top: 2px;
    border-radius: 10px;
    padding-left: 10px;
    color: white;
    cursor: move;
    position: relative;
  }
  .drag p{position: absolute;left: 200px;top:0}
</style>
