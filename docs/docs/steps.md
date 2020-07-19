<!-- Created by 337547038 on 2018/8/31 0031. -->
# Steps 步骤条
 
> 其它外观可通过自定附加样式实现

<script>
export default {
  data () {
    return {
      stepsData1: [
        {
          title: '步骤1',
          description: '已完成状态添加样式completed'
        },
        {
          title: '步骤2',
          description: '当前状态添加样式active'
        },
        {
          title: '步骤3',
          description: '描述'
        }
      ],
      stepsData2: [
        {
          title: '步骤1',
          desc: '描述',
          icon: 'icon-correct'
        },
        {
          title: '步骤2',
          desc: '描述',
          icon: 'icon-error'
        },
        {
          title: '步骤3',
          desc: '描述',
          icon: 'icon-warn'
        },
        {
          title: '步骤4',
          desc: '描述',
          icon: 'icon-refresh'
        }
      ],
      active: 1,
      active2: 0
    }
  },
  methods: {
    _click () {
      console.log('click')
    },
    changeStep () {
      if (this.active >= 2) {
        this.active = 0
      } else {
        this.active++
      }
    },
    changeStep2 () {
      if (this.active2 >= 3) {
        this.active2 = 0
      } else {
        this.active2++
      }
    }
  }
}
</script>


### 基础用法
:::demo 
```html
<template>
  <div>
    <ak-steps :data="stepsData1" :active="active"></ak-steps>
    <div>
      <br>
      <ak-button @click="changeStep">下一步</ak-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      stepsData1: [
        {
          title: '步骤1',
          description: '已完成状态添加样式completed',
          icon: ''
        },
        {
          title: '步骤2',
          description: '当前状态添加样式active',
          icon: ''
        },
        {
          title: '步骤3',
          description: '描述',
          icon: ''
        }
      ],
      active: 1
    }
  },
  methods: {
    changeStep () {
      if (this.active >= 2) {
        this.active = 0
      } else {
        this.active++
      }
    }
  }
}
</script>

```
:::

### 自定图标
:::demo 
```html
<template>
  <div>
    <ak-steps :data="stepsData2" :active="active2" @click="_click"></ak-steps>
    <div>
      <br>
      <ak-button @click="changeStep2">下一步</ak-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      stepsData2: [
        {
          title: '步骤1',
          desc: '描述',
          icon: 'icon-correct'
        },
        {
          title: '步骤2',
          desc: '描述',
          icon: 'icon-error'
        },
        {
          title: '步骤3',
          desc: '描述',
          icon: 'icon-warn'
        },
        {
          title: '步骤4',
          desc: '描述',
          icon: 'icon-refresh'
        }
      ],
      active2: 0
    }
  },
  methods: {
    _click () {
      console.log('click')
    },
    changeStep2 () {
      if (this.active2 >= 3) {
        this.active2 = 0
      } else {
        this.active2++
      }
    }
  }
}
</script>

```
:::

## API
### Steps
|参数|类型|说明|
|-|-|-|
|data           | Array          |步骤数据|
|active         | Number         |当前位置，从0开始|
|click          | Function       |事件|

### Steps Data
|参数|类型|说明|
|-|-|-|
|icon           | Array          |icon图标样式名|
|title          | String         |标题|
|desc           | String         |描述|
