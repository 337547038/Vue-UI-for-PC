<template>
  <div>
    <!--    {{value}}-->
    <ak-tree :data="data" :show-checkbox="true" @click="click">
      <!--      <template #default="row">
              {{ row }}
            </template>-->
    </ak-tree>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  components: {},
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
              },
              {
                id: 'ccc2',
                label: 'ccc'
              },
              {
                id: 'ccc3',
                label: 'ccc'
              },
              {
                id: 'ccc4',
                label: 'ccc'
              }
            ]
          },
          {
            id: 'ac',
            label: 'ac'
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
    const click = (item, lazy) => {
      console.log(item)
      if (item.open && !item.lazy) {
        const data = [
          {id: 'dd', label: 'dd'}
        ]
        setTimeout(() => {
          lazy && lazy(data)
        }, 500)
      }
    }
    return {
      data,
      value,
      click
    }
  }
}
</script>
