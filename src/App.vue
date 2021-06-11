<template>
  <div v-if="visible" class="container">
    <div class="sidebar">
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
          <components :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
  <router-view v-else />
</template>
<script lang="ts">
import routesList from 'virtual:generated-pages'
import {defineComponent, ref} from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(true)
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
    return {
      routesListFilter,
      visible,
      getName
    }
  }
})
</script>
