# Menu 菜单
<script>
export default {
  data () {
    return {
      menuData: [
        {title: '首页', href: '/'},
        {
          title: '产品中心'
        },
        {title: '关于我们'},
        {title: '联系我们'}
      ],
      menuData2: [
        {title: '首页', href: '/'},
        {
          title: '产品中心',
          href: '/product',
          children: [
            {title: '下拉1'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]
        },
        {
          title: '关于我们',
          href: '',
          children: [
            {title: '下拉11'},
            {title: '下拉22'},
            {title: '下拉33'},
            {title: '下拉44'}
          ]
        },
        {title: '联系我们', href: '/contact'}
      ],
      menuData3: [
        {title: '首页', href: '/', key: 'a', target: '_blank', icon: 'icon-user'},
        {
          title: '关于我们',
          key: 'b',
          children: [
            {title: '关于01', key: 'b1'}
          ]
        },
        {
          title: '产品中心',
          key: 'active',
          children: [
            {
              title: '产品1',
              href: '/',
              key: 'd'
            },
            {
              title: '产品2',
              key: 'e',
              children: [
                {
                  title: '产品2-1', key: 'f'
                },
                {
                  title: '产品2-2', key: 'g'
                },
                {
                  title: '产品2-3', key: 'h'
                }
              ]
            },
            {
              title: '产品3', key: 'i'
            },
            {
              title: '产品4', key: 'j'
            }
          ]
        },
        {title: '联系我们', key: 'c'}
      ]
    }
  },
  methods: {
    _click (item) {
      console.log(item)
    }
  }
}
</script>
## 基础用法
:::demo 
```html
<template>
  <div>
    <ak-menu :data="menuData"></ak-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuData: [
        {title: '首页', href: '/'},
        {title: '产品中心'},
        {title: '关于我们'},
        {title: '联系我们'}
      ]
    }
  }
}
</script>


```
:::

## 子导航下拉
:::demo 
```html
<template>
  <div>
    <ak-menu :data="menuData2" value="下拉22"></ak-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuData2: [
        {title: '首页', href: '/'},
        {title: '产品中心',
          href: '/product',
          children: [
            {title: '下拉1'},
            {title: '下拉2'},
            {title: '下拉3'},
            {title: '下拉4'}
          ]},
        {title: '关于我们',
          href: '',
          children: [
            {title: '下拉11'},
            {title: '下拉22'},
            {title: '下拉33'},
            {title: '下拉44'}
          ]},
        {title: '联系我们', href: '/contact'}
      ]
    }
  }
}
</script>


```
:::

## 垂直方向
:::demo 可展开默认项
```html
<template>
  <div>
    <ak-menu :data="menuData3" value="g" type="v" @click="_click"></ak-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menuData3: [
        {title: '首页', href: '/', key: 'a', target: '_blank', icon: 'icon-user'},
        {
          title: '关于我们',
          key: 'b',
          children: [
            {title: '关于01', key: 'b1'}
          ]
        },
        {
          title: '产品中心',
          key: 'active',
          children: [
            {
              title: '产品1',
              href: '/',
              key: 'd'
            },
            {
              title: '产品2',
              key: 'e',
              children: [
                {
                  title: '产品2-1', key: 'f'
                },
                {
                  title: '产品2-2', key: 'g'
                },
                {
                  title: '产品2-3', key: 'h'
                }
              ]
            },
            {
              title: '产品3', key: 'i'
            },
            {
              title: '产品4', key: 'j'
            }
          ]
        },
        {title: '联系我们', key: 'c'}
      ]
    }
  },
  methods: {
    _click (item) {
      console.log(item)
    }
  }
}
</script>


```
:::
## API
### Menu
|参数|类型|说明|
|-|-|-|
|data           | Array          |菜单数组|
|type           | String/h       |菜单类型，可选值为 h（horizontal水平，默认） 和 v（vertical垂直）|
|value          | String         |用于表示当前菜单key的值，对应data中的key|
|accordion      | Boolean/false  |是否开启手风琴模式，开启后每次至多展开一个子菜单，type=v有效|
|showTitle      | Boolean/false  |鼠标滑过时显示title提示|
|isOpen         | Boolean/true   |将当前激活菜单展开，仅在type=v时有效|
|click          | Function       |点击事件|

### Menu Data
|参数|类型|说明|
|-|-|-|
|title          | String         |菜单名称|
|href           | String         |url地址|
|target         | String         |打开类型|
|key            | String         |菜单项的唯一标识，不存在时会使用title的值|
|open           | Boolean/false  |展开子菜单|
|icon           | String         |icon图标类名|
|children       | Array          |子菜单数据|

### Menu Event
|参数|类型|说明|
|-|-|-|
|click          | Function       |菜单点击事件，href为空时有效，否则发生页面跳转|
