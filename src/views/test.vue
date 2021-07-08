<template>
  <div>
    <!--    {{value}}-->
    <!--    <ak-tree :data="data" v-model="value">
          <template #default="row">
            {{row}}
          </template>
        </ak-tree>-->
    <p>
      <ak-icon icon="arrow" title="方向" />
    </p>
    <p>
      <ak-icon icon="arrow" title="方向" label="方向">是佳作</ak-icon>
    </p>
    <p>
      <ak-button icon="arrow" type="primary" name="a1" size="mini">方向</ak-button>
      <ak-button-group @click="btnClick" size="mini" :disabled="true" width="200px">
        <ak-button icon="arrow" type="primary" name="a1">方向</ak-button>
        <ak-button icon="arrow" type="primary">方向2</ak-button>
        <ak-button icon="arrow" type="primary">方向3</ak-button>
        <ak-button icon="arrow" type="primary" nativeType="button">方向3</ak-button>
      </ak-button-group>
    </p>
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
    const btnClick = (evt, name) => {
      console.log(evt)
      console.log(name)
    }
    return {
      data,
      value,
      btnClick
    }
  }
}
</script>
