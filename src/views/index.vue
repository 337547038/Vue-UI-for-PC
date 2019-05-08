<!-- Created by 337547038 on 2018/8/10 0010. -->
<template>
  <div>
    <h1 style="text-align: center;margin: 50px auto">示例演示请运行 npm run docs</h1>{{abc}}
    <p>登录原理：1.首次登录时保存相关信息；2.添加动态路由；3.页面刷新时在App处添加动态路由</p>
    <p @click="userLogIn" class="login">login</p>
    <p>
      <router-link to="/page1">白名单</router-link>
    </p>
    <p v-permission="`/page2`">
      <router-link to="/page2">需要登录</router-link>
    </p>
    <p v-permission="`/page4`">
      <router-link to="/page4">登录账号没权限</router-link>
    </p>
  </div>
</template>

<script>
import {setStorage, setToken} from '../utils/utils'
import {logIn} from '../api/user'
import addRoutes from '../router/permission'
import md5 from 'js-md5'

export default {
  data () {
    return {
      abc: 'abcd'
    }
  },
  methods: {
    userLogIn () {
      const data = {
        userName: 'admin',
        password: '123'
      }
      logIn(data)
        .then(res => {
          console.log(res)
          const result = res.data.data
          if (result) {
            setToken(result.token)
            setStorage('id', result.user.id)
            setStorage('_menu', result.menu)
            // 按照这种登录机制，_menu保存在本地，如果伪造一个最高权限_menu列表，即可使普通用户变超级管理用户
            // 1.最安全的方式应该是每到一个页面请求权限作判断
            // 2.将_menu和token转一个md5，同时存起来。可增加伪造难度，除非清楚算法，同时伪造_menu和md5
            setStorage('md5', md5(JSON.stringify(result.menu) + result.token))
            // 登录成功后根据菜单权限添加动态路由
            addRoutes(this.$router)
            // 跳转页面
            // this.$router.push('/page2')
          }
        })
        .catch(res => {
          console.log(res)
        })
    }
  },
  mounted () {
    console.log('mouted')
    console.log(md5('abc'))
  }
}
</script>
