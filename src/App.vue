<template>
  <div v-if="visible" class="container">
    <div class="sidebar">
      <div class="logo"><img src="./assets/logo.jpg">AK-Docs</div>
      <ul>
        <li v-for="item in routesListFilter" :key="item.name">
          <router-link :to="item.path">
            {{ getName(item.name) }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="main-">
      <!--      <transition name="left-fade">
        <router-view />
      </transition>-->
      <router-view v-slot="{ Component }">
        <transition name="left-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <router-view v-else />
</template>
<script lang="ts">
import routesList from 'virtual:generated-pages'
import {defineComponent, ref} from 'vue'
// import {useRouter, useRoute} from 'vue-router'

export default defineComponent({
  setup() {
    let visible = false
    const getName = (name: string) => {
      return name.substring(0, 1).toUpperCase() + name.substring(1)
    }
    let routesListFilter = ref<any>([])
    routesList.forEach((item: any) => {
      if (item.name.indexOf('-README') !== -1) {
        routesListFilter.value.push({
          name: item.name.replace('-README', ''),
          path: item.path.replace('/readme', '')
        })
      }
    })
    const sortBy = (sortValue: string) => {
      // 添加排序
      return function (a: { name: string; }, b: { name: string; }) {
        let val1 = a[sortValue]
        let val2 = b[sortValue]
        if (val1 < val2) {
          return -1 // 顺序，倒序1
        } else if (val1 > val2) {
          return 1
        }
      }
    }
    routesListFilter.value.sort(sortBy('name'))
    return {
      routesListFilter,
      visible,
      getName
    }
  }
})
</script>
