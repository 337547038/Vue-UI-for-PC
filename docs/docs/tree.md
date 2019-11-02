<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data() {
    return {
      data: [
        {
          name: '广东',
          value: '',
          children: [
            {
              name: '广州市',
              children: [
                {name: '天河区'},
                {name: '越秀区'},
                {name: '白云区'},
                {name: '海珠区'}
              ]
            },
            {name: '深圳市'},
            {name: '东莞市'},
            {name: '湛江市'},
            {name: '阳江市'},
            {name: '清远市'}
          ]
        },
        {name: '北京'},
        {name: '上海'},
        {
          name: '广西',
          children: [
            {name: '桂林市'},
            {name: '南宁市'}
          ]
        }
      ],
      data2: [
        {
          name: '广东',
          show: true,
          children: [
            {
              name: '广州市',
              show: true,
              children: [
                {name: '天河'}
              ]
            },
            {name: '深圳市'}
          ]
        },
        {name: '北京'},
        {name: '广西'},
        {name: '福建'},
        {name: '湖南'}
      ],
      data3: [
        {name: '广东', value: 1},
        {name: '北京', value: 2}
      ],
      data4: [
        {name: '广东', children: []},
        {name: '北京', children: []},
        {name: '广西', children: []}
      ],
      data5: [
        {
          show: true,
          name: '广东',
          key: 't1',
          children: [
            {
              key: 't2',
              name: '广州市',
              children: [
                {name: '天河区', key: 't3'},
                {name: '越秀区', key: 't4'},
                {name: '白云区', key: 't5'},
                {name: '海珠区', key: 't6'}
              ]
            },
            {name: '深圳市', key: 't7'},
            {name: '东莞市', checked: true, key: 't8'},
            {name: '湛江市', key: 't9'},
            {name: '阳江市', key: 't10'},
            {name: '清远市', key: 't11'}
          ]
        },
        {name: '北京', key: 't12'},
        {name: '上海', key: 't3'},
        {
          name: '广西',
          key: 't14'
        },
        {
          name: '广西2',
          key: 't15'
        }
      ]
    }
  },
  methods: {
    _toggle(item) {
      // 这里可根据需求限制每次点击都请求加载数据
      // item.show=true为展开,false收起
      console.log(item)
      if (!item.show || item.children.length > 0) {
        return
      }

      let data = []
      if (item.name === '广东') {
        data = [
          {name: '深圳市'},
          {name: '东莞市'},
          {name: '湛江市'},
          {name: '阳江市'},
          {name: '清远市'}
        ]
      }
      if (item.name === '北京') {
        data = [
          {name: '海淀区'}
        ]
      }
      if (item.name === '广西') {
        data = ['广西地区暂无数据']
      }
      // 延时模拟请求加载
      setTimeout(() => {
        item.children = data
      }, 3000)
    },
    getValue() {
      const val = this.$refs.checkboxTree.getValue()
      console.log(val)
    },
    setValue() {
      const key = ['t1', 't2', 't7', 't12']
      this.$refs.checkboxTree.setValue(key)
    }
  }
}
</script>


# Tree

### 1、基本用法
:::demo 
```html
<template>
  <div>
    <ak-tree :data="data"></ak-tree>
</div>
</template>
<script>
export default {
  data () {
    return {
      data: [
        {
          name: '广东',
          children: [
            {
              name: '广州市',
              children: [
                {name: '天河区'},
                {name: '越秀区'},
                {name: '白云区'},
                {name: '海珠区'}
              ]
            },
            {name: '深圳市'},
            {name: '东莞市'},
            {name: '湛江市'},
            {name: '阳江市'},
            {name: '清远市'}
          ]
        },
        {name: '北京'},
        {name: '上海'},
        {
          name: '广西',
          children: [
            {name: '桂林市'},
            {name: '南宁市'}
          ]
        }
      ]
    }
  }
}
</script>


```
:::

### 2、展开指定项
:::demo 
```html
<template>
  <div>
    <ak-tree :data="data2"></ak-tree>
</div>
</template>
<script>
export default {
  data () {
    return {
      data2: [
        {
          name: '广东',
          show: true,
          children: [
            {name: '广州市'},
            {name: '深圳市'}
          ]
        },
        {name: '北京', children: []},
        {name: '广西'},
        {name: '福建'},
        {name: '湖南'}
      ]
    }
  }
}
</script>

```
:::

### 3、显示对应值
:::demo 
```html
<template>
  <div>
    <ak-tree :data="data3" :showValue="true"></ak-tree>
</div>
</template>
<script>
export default {
  data () {
    return {
      data3: [
        {name: '广东', value: 1},
        {name: '北京', value: 2}
      ]
    }
  }
}
</script>

```
:::

### 4、异步加载
:::demo 
```html
<template>
  <div>
    <ak-tree :data="data4" :toggle="_toggle" :lazy="true"></ak-tree>
</div>
</template>
<script>
export default {
  data () {
    return {
      data4: [
        {name: '广东', children: []},
        {name: '北京', children: []},
        {name: '广西', children: []}
      ]
    }
  },
  methods: {
    _toggle (item, type) {
      // 这里可根据需求限制每次点击都请求加载数据
      // type=true为展开,false收起
      if (!type || item.children.length > 0) {
        return
      }
      let data = []
      if (item.name === '广东') {
        data = [
          {name: '深圳市'},
          {name: '东莞市'},
          {name: '湛江市'},
          {name: '阳江市'},
          {name: '清远市'}
        ]
      }
      if (item.name === '北京') {
        data = [
          {name: '海淀区'}
        ]
      }
      if (item.name === '广西') {
        data = ['广西地区暂无数据']
      }
      // 延时模拟请求加载
      setTimeout(() => {
        item.children = data
      }, 3000)
    }
  }
}
</script>

```
:::


### 5、可勾选
:::demo 可勾选时，必须要带key值
```html
<template>
  <div>
    <ak-tree :data="data5" :showCheckbox="true" ref="checkboxTree"></ak-tree>
    <div style="padding-top: 30px">
    <p>对数组设值，1、当仅对父节点设值时，并不会全选子节点；<br>2、节点设值时父节点会受子节点的影响，被设为全选或部分选择状态，当同时对父节点设值时，最终会根据子节点重置；<br>
    3、设值后最终结果，广东受子节点影响被重置为部分选择状态，广州却被勾上</p>
    <p><ak-button @click="setValue">对广东，广州，深圳，北京设值</ak-button> </p>
    <p>&nbsp;</p>
    <p><ak-button @click="getValue">取值（终端输出）</ak-button></p>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      data5: [
        {
          show: true,
          name: '广东',
          key: 't1',
          children: [
            {
              key: 't2',
              name: '广州市',
              children: [
                {name: '天河区', key: 't3'},
                {name: '越秀区', key: 't4'},
                {name: '白云区', key: 't5'},
                {name: '海珠区', key: 't6'}
              ]
            },
            {name: '深圳市', key: 't7'},
            {name: '东莞市', checked: true, key: 't8'},
            {name: '湛江市', key: 't9'},
            {name: '阳江市', key: 't10'},
            {name: '清远市', key: 't11'}
          ]
        },
        {name: '北京', key: 't12'},
        {name: '上海', key: 't3'},
        {
          name: '广西',
          key: 't14'
        },
        {
          name: '广西2',
          key: 't15'
        }
      ]
    }
  },
  methods: {
    getValue() {
      const val = this.$refs.checkboxTree.getValue()
      console.log(val)
    },
    setValue() {
      const key = ['t1', 't2', 't7', 't12']
      this.$refs.checkboxTree.setValue(key)
    }
  }
}
</script>

```
:::

## API
### Tree
|参数|类型|说明|
|-|-|-|
|data           | Array          |树数据|
|showValue      | Boolean/false  |是否在名称后面显示对应的value值|
|showCheckbox   | Boolean/false  |显示勾选|
|toggle         | Function       |展开或收起点击事件，回调两个参数。当前项和当事点击事件（展开/收起）|
|lazy           | Boolean/false  |表单数据|

### Tree Data
|参数|类型|说明|
|-|-|-|
|name           | String          |显示的名称|
|value          | String          |showValue为true时显示的值|
|show           | Boolean/false   |是否展开当前项|
|key            | String  　　　　　|唯一值，当showCheckbox=true时取值和赋值根据key值|
|checked        | Boolean/false   |当前项为勾选状态，仅当showCheckbox=true时有效|
|disabled       | Boolean/false   |当前项禁用勾选，仅当showCheckbox=true时有效|

