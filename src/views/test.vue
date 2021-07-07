<template>
  <div>
<!--    {{value}}-->
    <ak-tree :data="data" v-model="value">
      <template #default="row">
        {{row}}
      </template>
    </ak-tree>
  </div>
</template>
<script>
import {ref} from 'vue'


export default {
  setup() {
    const data = [
      {
        id: 'a',
        label: 'a',
        children: [
          {
            id: 'aa',
            label: 'aa'
          },
          {
            id: 'ab',
            label: 'ab',
            children: [
              {
                id: 'ccc',
                label: 'ccc'
              }
            ]
          }
        ]
      },
      {
        id: 'b',
        label: 'b'
      },
      {
        id: 'c',
        label: 'c'
      }
    ]
    const value = ref('b')
    return {
      data,
      value
    }
  }
}
</script>
