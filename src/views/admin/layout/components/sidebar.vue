<!-- Created by 337547038 on $. -->
<template>
  <div class="sidebar">
    <div class="side-logo">logo</div>
    <div class="side-content">
      <ul>
        <li>
          <router-link to="/list01">list01</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {asyncRoutes} from '@/router'
import {getStorage} from '@/utils/utils'
export default {
  name: 'sidebar',
  data () {
    return {
      navList:[]
    }
  },
  methods: {}
}
</script>
