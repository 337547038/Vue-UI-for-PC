<!-- Created by 337547038 on $. -->
<template>
  <div class="sidebar">
    <div class="side-logo">logo</div>
    <div class="side-content">
      <ak-menu :data="navList" type="v" :value="currentNav" @click="click"></ak-menu>
    </div>
    <div class="control-btn"
         @click="collapseClick">
      <i class="fa" :class="{'fa-angle-double-left':!collapse,'fa-angle-double-right':collapse}"></i>
      <span v-if="!collapse">收起侧边栏</span></div>
  </div>
</template>

<script>
import {asyncRoutes} from '@/router'
import {getStorage} from '@/utils/utils'

export default {
  name: 'sidebar',
  data () {
    return {
      navList: [],
      currentNav: '',
      menu: []
    }
  },
  props: ['collapse'],
  methods: {
    // 从路由提供菜单，主要是提供meta里的title和path
    // 同时根据菜单判断权限
    getNav (data, child = []) {
      let temp = {}
      data.forEach(item => {
        let hasPermission = true
        if (item.meta && item.meta.permission) {
          // 表示需要权限
          hasPermission = this.menu.some(m => m.href === item.path)
        }
        if (hasPermission) {
          temp = {
            title: item.meta.title,
            to: item.path,
            icon: item.meta.icon
          }
          if (item.children) {
            temp.children = this.getNav(item.children)
          }
          child.push(temp)
        }
      })
      return child
    },
    click (item) {
      if (item.to && !item.children) {
        this.$router.push({path: item.to})
      }
      this.$emit('update:collapse', false)
    },
    collapseClick () {
      this.$emit('update:collapse', !this.collapse)
    }
  },
  mounted () {
    this.menu = getStorage('_menu', 1) || []
    this.navList = this.getNav(asyncRoutes)
    this.currentNav = '后台首页'
    // console.log('asyncRoutesasyncRoutes')
    // console.log(asyncRoutes)
  }
}
</script>
