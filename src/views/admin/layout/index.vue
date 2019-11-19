<!-- Created by 337547038 on $. -->
<template>
  <div class="app-container" :class="{collapse:collapse}">
    <Sidebar :collapse.sync="collapse"></Sidebar>
    <div class="main-layout">
      <div class="header">
        <div class="header-bar clearfix">
          <div class="left">这里显示其它一些信息</div>
          <div class="right">
            <router-link to="/signOut">{{userName}},退出<i class="fa fa-sign-out"></i></router-link>
          </div>
        </div>
        <TabsView :data="keepAlive" @click="_tabsViewClick"></TabsView>
      </div>
      <div class="main-view">
        <keep-alive :include="include">
          <router-view/>
        </keep-alive>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import Sidebar from './components/sidebar'
import TabsView from './components/tabsView'
import {setStorage, getStorage} from '@/utils/utils'

export default {
  name: 'layout',
  data () {
    return {
      userName: getStorage('loginName', 1),
      keepAlive: [],
      collapse: false // 用于控制侧栏收起或展开样式
    }
  },
  watch: {
    '$route' () {
      // 监听路由变化，将需要缓存的写进tabsView里显示
      // 默认全部缓存，当meta.keepAlive===false时不缓存
      console.log(this.$route)
      this._tabsView()
    },
    keepAlive () {
      // 存session 刷新可用
      console.log('keepAlive')
      setStorage('keepAlive', this.keepAlive)
    }
  },
  created () {
    this._tabsView()
  },
  computed: {
    include () {
      // 返回需要被缓存的名称，这个是组件的名称，而不是路由的name。为方便取值，因此需要被缓存的组件的name必须和路由的name一致
      let temp = []
      this.keepAlive.forEach(item => {
        temp.push(item.name)
      })
      return temp
    }
  },
  components: {Sidebar, TabsView},
  methods: {
    // 移除
    _tabsViewClick (index) {
      console.log('del' + index)
      // 第一个不能删除
      if (index > 0) {
        if (this.keepAlive[index].active) {
          // 删除的为当前状态，路由跳到前面一个
          this.$router.push({path: this.keepAlive[index - 1].path})
        }
        this.keepAlive.splice(index, 1)
      } else {
        // 回到首页，删除全部
        this.$router.push({path: this.keepAlive[0].path})
        this.keepAlive = []
      }
      // index有值时删除指定，没有时删除全部
      /* if (index > -1) {
        // 如果删除的刚好是当前，则路由要跳转
        if (index === 0) {
          // 删除第一个，跳首页
          this.$router.push({path: path})
        } else if (this.keepAlive[index].active) {
          // 非第一个并且为当前状态时，跳到前面一个
          this.$router.push({path: this.keepAlive[index - 1].path})
        }
        this.keepAlive.splice(index, 1)
      } else {
        this.keepAlive = []
        // 删除了全部，路由跳转到首页
        this.$router.push({path: path})
      } */
    },
    // 页面加载或路由变化时
    _tabsView () {
      this.keepAlive = getStorage('keepAlive') || [] // 初始
      const fullPath = this.$route.path
      const name = this.$route.name
      const meta = this.$route.meta
      if (this.$route.meta && this.$route.meta.keepAlive !== false) {
        if (this.include.indexOf(name) === -1) {
          // 没有时添加到数组
          this.keepAlive.push({
            path: fullPath,
            name: name,
            meta: meta,
            active: true // 设为当前
          })
          // 如果个数过多，当最后新增的被遮着，还应该要移动ul，这里先不处理
        }
      }
      // 重新设置当前激活状态
      this.keepAlive.forEach(item => {
        item.active = fullPath === item.path
      })
      // 存session 刷新可用
      setStorage('keepAlive', this.keepAlive)
    }
  }
}
</script>
