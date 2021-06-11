<!-- Created by 337547038 on 2021/5/17 0017. -->
<template>
  <div>
    <ak-button>button</ak-button>
    <children />
    <!--    <ak-carousel>
          <ak-carousel-item v-for="item in 6" :key="item">
            <p>{{ item }}</p>
          </ak-carousel-item>
        </ak-carousel>-->
  </div>
  <!--  <ak-cascader v-model="value" placeholder="请选择" />-->
</template>

<script lang="ts">
import {provide, reactive, ref, defineComponent, toRefs, computed, nextTick, getCurrentInstance, toRef} from 'vue'
import children from './components/child.vue'
import {useRoute, useRouter} from 'vue-router'
import vptypes from 'vptypes'
import pType from '@/components/packages/util/pType'
//import vptypes2 from '@/components/packages/util/vptypes.js'

/*declare module 'vue/types/vue' {
  interface Vue {
    [key: string]: any
  }
}*/
import cityData from '@/components/packages/cascader/cityData.json'

type OptionType = {
  value: any
  label?: string
}

interface optionType2 {
  value: any
  label?: string
}

export default defineComponent({
  components: {children},
  props: {
    // selectText: pType.array(['请选择省', '请选择市', '请选择区']),
    // split: pType.array(), // 分隔符
    // data: pType.array(cityData),// 下拉选项数据
    //options2: vptypes.array<OptionType>().def(['1']),
    // opt3: pType.array2<OptionType[]>(),
    // opt: pType.array2<optionType2[]>()
  },
  setup(props, {attrs, slots, emit}) {

    //console.log(vptypes.array<OptionType>().def(['1']))
    /* const value = ref<any>([])
     console.log('112')
     console.log(pType.array2<optionType2[]>())
     console.log(pType.array2())*/
    // console.log(array<optionType2[]>('1'))
    // console.log('=========')
    const controlChange = () => {
      console.log('ok')
    }
    provide('controlChange', controlChange)

    return {
      // value
    }
    // console.log(pType.string1().def())
    /*enum color {
      b = 'black',
      w = 'white',
      g = 'green'
    }
    let style= {
      bg:'b'
    }
    const background = color[style.bg as keyof typeof color]
    console.log(background)
    return {
      name
    }*/

  },
  render(h, {children}) {
    console.log('1111')
    console.log(h)
    console.log(children)
    return h('div')
  }

})
</script>
