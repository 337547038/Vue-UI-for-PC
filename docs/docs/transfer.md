<!-- Created by 337547038 on 2019/8/6 0006. -->
# Transfer 穿梭框
<script>
export default {
  data () {
    return {
      value: [],
      data: [
        {
          value: 1,
          name: '选项1'
        },
        {
          value: '2',
          name: '选项2'
        }
      ],
      value2: [1],
      data2: [
        {
          value: 1,
          name: '选项1'
        },
        {
          value: 2,
          name: '选项2'
        }
      ],
      data3: [
        {
          value: 1,
          name: '默认选中',
          checked: true
        },
        {
          value: 2,
          name: '禁用项',
          disabled: true
        },
        {
          value: 3,
          name: '禁用且选中项',
          disabled: true,
          checked: true
        },
        {
          value: 4,
          name: '正常项'
        },
        {
          value: 5,
          name: '正常项2'
        }
      ]
    }
  },
  methods: {
    getValue () {
      const v = this.$refs.transfer.getValue()
      console.log(v)
    }
  }
}
</script>

### 基础用法
:::demo 
```html
<template>
  <div>
    <p>右边选项的值：{{value}}</p>
    <p><ak-transfer :data="data" v-model="value"/></p>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value:[],
       data:[
         {
           value: 1,
           name: '选项1'
         },
         {
            value: 2,
            name: '选项2'
         }
       ],
     }
   }
 }
</script>
```
:::

### 使用v-model设置初始选项
:::demo 
```html
<template>
  <div>
    <p>右边选项的值：{{value2}}</p>
    <p><ak-transfer :data="data2" v-model="value2"/></p>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       value2:[1],
       data2:[
         {
           value: 1,
           name: '选项1'
         },
         {
            value: 2,
            name: '选项2'
         }
       ]
     }
   }
 }
</script>
```
:::

### 使用getValue取值
:::demo 不使用v-model，可在`data`项中添加`checked:true`属性表示已选择；`disabled:true`表示禁用项
```html
<template>
  <div>
    <p><ak-transfer :data="data3" ref="transfer" :titles="['候选项','已选项']" :btnText="['向右','向左']"/></p>
    <ak-button @click="getValue">取值（控制面板输出）</ak-button>
  </div>
</template>
<script>
 export default {
   data(){
     return {
       data3:[
         {
           value: 1,
           name: '默认选中',
           checked:true
         },
         {
            value: 2,
            name: '禁用项',
            disabled:true
         },
         {
                     value: 3,
                     name: '禁用且选中项',
                     disabled:true,
                     checked:true
                  },
         {
                     value: 4,
                     name: '正常项'
                  },
       ],
     }
   }
 }
</script>
```
:::

### Transfer Methods
|参数|类型|说明|
|-|-|-|
|data           | Array           |列表数据|
|value          | Array           |右边项的value集合|
|titles         | Array           |列表标题文本|
|btnText        | Array           |方向控制文本|
|change         | Function        |切换事件，带3个参数（方向,leftValue,rightValue）|

### Transfer data
|参数|类型|说明|
|-|-|-|
|name           | String          |显示的名称|
|value          | String          |选项对应唯一值|
|disabled       | Boolean         |禁用|
|checked        | Boolean         |已选择，如果使用了v-model时，此项无效|

### Transfer Methods
|参数|类型|
|-|-|-|
|getValue        |返回左右两边项的集合`[左边,右边]`|
