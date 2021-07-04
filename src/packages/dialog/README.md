<!-- Created by 337547038 on 2021/7/4. -->

# Dialog 弹层对话框

### 基本用法

```vue demo

<template>
  <div>
    <p>使用参数visible显示隐藏 <span @click="visible1=true" class="green">试一试</span></p>
    <ak-dialog title="title" v-model="visible1">
      <p>窗口内容，可包含任何内容</p>
      <p>就是样式丑了点点</p>
    </ak-dialog>
    <p>使用组件open方法打开 <span @click="$refs.openDialog.open()" class="green">试一试</span></p>
    <ak-dialog title="title" ref="openDialog" class="test-dialog">窗口内容，可包含任何内容</ak-dialog>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible1 = ref(false)
    return {
      visible1
    }
  }
}
</script>
```

### 标题设置

标题可设置为空或通过slot设置，以满足各种不同的使用环境

```vue demo

<template>
  <div>
    <p>slot设置的标题 <span @click="visible=true" class="green">试一试</span></p>
    <ak-dialog v-model="visible">
      <template #title>通过slot设标题</template>
      <p>这是一个通过slot设标题的 dialog 弹窗，当然也可以是不设置标题</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
    </ak-dialog>
    <p>没有标题的弹窗<span @click="visible1=true" class="green">试一试</span></p>
    <ak-dialog v-model="visible1">
      <p>这是一个通过slot设标题的 dialog 弹窗，当然也可以是不设置标题</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
    </ak-dialog>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    const visible1 = ref(false)
    return {
      visible,
      visible1
    }
  }
}
</script>
```

### 设定窗宽高

一般情况不需要设`height`，这个高是指弹窗主体内容的高，适用于弹窗内容区需要滚动的时候

```vue demo

<template>
  <span @click="visible=true" class="green">试一试</span>
  <ak-dialog v-model="visible" title="title" width="400px" height="200px">
    <p>设置了宽高的 dialog 弹窗，设定了高时，内容溢出将显示纵向滚动条</p>
    <p style="height: 200px"></p>
    <p>设置了宽高的 dialog 弹窗，设定了高时，内容溢出将显示纵向滚动条</p>
  </ak-dialog>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    return {
      visible
    }
  }
}
</script>
```

### 按钮事件

默认下点击按钮是关闭弹窗口的，可通过`beforeClose`接收点击事件，根据实现按需关闭。`callback`同`beforeClose`，`callback`只针对确认事件。`beforeClose
`它将会阻止窗口的关闭事件，需手动关闭

```vue demo
<template>
  <div>
    <p>添加确认和取消按钮<span class="green" @click="visible=true">试一试</span></p>
    <ak-dialog v-model="visible" title="title" confirm="confirm" cancel="cancel">
      <p>这是按钮的 dialog 弹窗内容</p>
      <p>默认情况下点击按钮后将关闭窗口</p>
    </ak-dialog>
    <p>绑定callback方法<span class="green" @click="visible1=true">试一试</span></p>
    <ak-dialog v-model="visible1" title="title" confirm="confirm" cancel="cancel" :callback="callback">
      <p>绑定callback方法后，点击确定不会关闭弹窗，可使用回调方法手动关闭</p>
    </ak-dialog>
    <p>绑定beforeClose方法<span class="green" @click="visible2=true">试一试</span></p>
    <ak-dialog v-model="visible2" title="title" confirm="confirm" cancel="cancel" :before-close="beforeClose">
      <p>绑定callback方法后，点击确定不会关闭弹窗，可使用回调方法手动关闭</p>
    </ak-dialog>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    const visible1 = ref(false)
    const visible2 = ref(false)
    const callback = close => {
      alert('确认关闭')
      close()
    }
    const beforeClose = (type, close) => {
      alert('你点击了' + type + '，可使用return true或使用close方法可关闭')
      // return true
      // close()
    }
    return {
      visible,
      visible1,
      visible2,
      callback,
      beforeClose
    }
  }
}
</script>

```

### 自动关闭

通过设定`auto-close`设置关闭时间，可自动关闭窗。同时可使用`closeTips`修改倒计时提示语

```vue demo

<template>
  <div>
    <span class="green" @click="visible=true">试一试</span>
    <ak-dialog v-model="visible" title="title" :auto-close="10">
      <p>这是的 dialog 弹窗内容</p>
      <p>这是一个会自动关闭的弹窗</p>
    </ak-dialog>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    return {
      visible
    }
  }
}
</script>

```

### 嵌套弹窗

```vue demo

<template>
  <div>
    <span class="green" @click="visible=true">试一试</span>
    <ak-dialog v-model="visible" title="title">
      <p>这是的 dialog 弹窗内容</p>
      <p>&nbsp;</p>
      <p @click="visible1=true"><a href="javascript:;" class="green">点击这里打开内层弹窗口</a></p>
      <p>&nbsp;</p>
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
    </ak-dialog>
    <ak-dialog v-model="visible1" title="title" width="300px">内层弹窗</ak-dialog>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    const visible1 = ref(false)
    return {
      visible,
      visible1
    }
  }
}
</script>

```

### 使用slot="footer"自定按钮

```vue demo

<template>
  <div>
    <span class="green" @click="visible=true">试一试</span>
    <ak-dialog v-model="visible" title="title">
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
      <template #footer>
        <ak-button>取消</ak-button>
        <ak-button type="primary">确定</ak-button>
        <ak-button type="primary">提交</ak-button>
      </template>
    </ak-dialog>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const visible = ref(false)
    return {
      visible
    }
  }
}
</script>

```
