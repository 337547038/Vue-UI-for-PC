<!-- Created by 337547038 on $. -->
<template>
  <div class="login-box">
    <ak-auto-form :data="form" ref="form"></ak-auto-form>
    <div class="button-group">
      <ak-button type="primary" @click="_login">登录</ak-button>
    </div>
    <p>用户名:admin/user，密码大于6位即可</p>
  </div>
</template>

<script>
import {logIn} from '@/api/admin'
import {setStorage, setToken} from '@/utils/utils'
import md5 from 'js-md5'

export default {
  name: 'login',
  data() {
    return {
      form: [
        {
          type: 'text',
          name: 'userName',
          item: {
            label: '用户名'
          },
          control: {
            value: 'admin',
            placeholder: '请输入用户名'
          },
          rules: [
            {type: 'required', msg: '请输入用户名'}
          ]
        },
        {
          type: 'password',
          name: 'password',
          item: {
            label: '密码'
          },
          control: {
            value: '123456',
            placeholder: '请输入密码'
          },
          rules: [
            {type: 'required', msg: '请输入密码'},
            {type: 'minLength', minLength: 6, msg: '密码不能小于6位'}
          ]
        }
      ]
    }
  },
  components: {},
  methods: {
    _login() {
      this.$refs.form.validate((result, object) => {
        console.log(result)
        console.log(object)
        if (result) {
          logIn(object)
            .then(res => {
              console.log(res)
              const result = res.data.data
              if (result) {
                // 登录成功，模拟接口，根据不同用户名取不同菜单
                let menu = []
                if (object.userName === 'admin') {
                  menu = result.menuAdmin
                } else {
                  menu = result.menuUser
                }
                console.log('12')
                setToken(result.token)
                setStorage('id', result.user.id, 0)
                setStorage('loginName', object.userName, 0)
                setStorage('_menu', menu, 0)
                // 按照这种登录机制，_menu保存在本地，如果伪造一个最高权限_menu列表，即可使普通用户变超级管理用户
                // 1.最安全的方式应该是每到一个页面请求权限作判断
                // 2.将_menu和token转一个md5，同时存起来。可增加伪造难度，除非清楚算法，同时伪造_menu和md5
                setStorage('md5', md5(JSON.stringify(menu) + result.token), 0)
                // 跳转页面
                this.$router.push('/admin/main')
              }
            })
            .catch(res => {
              console.log(res)
            })
        }
      })
    }
  },
  mounted() {
  }
}
</script>
