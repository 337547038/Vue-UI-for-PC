<!-- Created by 337547038 on 2021/7/4. -->

# Message 信息弹窗

为方便使用，定义了`Alert`,`Confirm`,`Msg`三种以适应不同场景，如果需要弹出较为复杂的内容，请使用 `Dialog`。

### Alert

使用`inject`注入方式调用

```vue demo

<template>
  <div>
    <p>模拟Alert 成功 <span class="green" @click="alertOpen(1)">试一试</span></p>
    <p>模拟Alert 失败 <span class="green" @click="alertOpen(2)">试一试</span></p>
    <p>模拟Alert 警告 <span class="green" @click="alertOpen(3)">试一试</span></p>
  </div>
</template>
<script>
import {inject} from 'vue'

export default {
  setup() {
    const message = inject('Message')
    const alertOpen = type => {
      message.alert('这是alert的内容', {icon: type})
    }
    return {
      alertOpen
    }
  }
}
</script>

```

### Confirm

使用`getCurrentInstance`方式打开

```vue demo

<template>
  <div>
    <p>模拟Confirm <span class="green" @click="alertOpen">试一试</span></p>
  </div>
</template>
<script>
import {getCurrentInstance} from 'vue'

export default {
  setup() {
    const instance = getCurrentInstance()
    const alertOpen = () => {
      instance.proxy.$alert('这是alert的内容', {
        icon: 2, callback: close => {
          alert('确认回调事件')
          close()
        }
      })
    }
    return {
      alertOpen
    }
  }
}
</script>

```

### Msg

`Vue2`选项卡的方式，使用`this.$msg()`打开

```vue demo

<template>
  <div>
    <p>消息提示 成功 <span class="green" @click="alertOpen(1)">试一试</span></p>
    <p>消息提示 失败 <span class="green" @click="alertOpen(2)">试一试</span></p>
    <p>消息提示 提示 <span class="green" @click="alertOpen(3)">试一试</span></p>
    <p>消息提示 警告 <span class="green" @click="alertOpen(4)">试一试</span></p>
  </div>
</template>
<script>

export default {
  data() {
    return {}
  },
  methods: {
    alertOpen(type) {
      this.$msg('删除成功', {
        icon: type
      })
    }
  }
}
</script>

```

## API

所有参数详见[Dialog](/#/dialog)
