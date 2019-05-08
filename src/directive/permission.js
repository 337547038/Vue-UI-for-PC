/**
 *
 * 自定义指令 `v-permission` , 实现 menu 菜单控制
 *
 * 1. 暂定 持久化的 字段为 【_menu】 存放在 localStorage 中
 * 2. 当需要控制权限的菜单, 使用 v-permission = '', 只有用户的菜单列表包含该项时，才可以显示该菜单
 * 3. 通过 item.href 进行匹配
 *
 */
import {getStorage} from '../utils/utils'
var omPermission = {}
const install = function (Vue) {
  // 简写 - bind update
  Vue.directive('permission', {
    inserted: function (el, binding) {
      let controledMenu = binding.value
      let menuList = getStorage('_menu') || '[]'
      // menuList = JSON.parse(menuList)
      // controledMenu有可能为数组, 数组中满足任何一条数据, 即可认为拥有权限
      function isPermission (controledMenu, menuList) {
        let hasPermission = false
        if (Array.isArray(menuList)) {
          // 如果是数组,则满足其中任何一条数据则可以
          if (Array.isArray(controledMenu)) {
            for (let index = 0; index < controledMenu.length; index++) {
              const cMenu = controledMenu[index]
              // 务必注意这里取的属性为 href
              if (menuList.some(menu => menu.href === cMenu)) {
                hasPermission = true
              }
            }
          } else {
            hasPermission = menuList.some(menu => menu.href === controledMenu)
          }
        }
        return hasPermission
      }

      // 当 menuList 匹配不到该path时, 移除当前DOM
      if (!isPermission(controledMenu, menuList)) {
        el.parentNode.removeChild(el)
      }
    },
    update: function (el, binding, vnod, oldVnode) {
    }
  })
}

if (window.Vue) {
  window.omPermission = omPermission
  Vue.use(install) // eslint-disable-line
}

omPermission.install = install

export default omPermission
