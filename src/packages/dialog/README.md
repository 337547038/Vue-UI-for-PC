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

### 可拖动

通过设置`move="true"`可拖动改变窗口位置

```vue demo

<template>
  <div>
    <span class="green" @click="visible=true">试一试</span>
    <ak-dialog v-model="visible" title="title" :move="true">
      <p>这是的 dialog 弹窗内容</p>
      <p>可通过点击标题栏移动窗口位置</p>
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

## API

### Dialog
|参数|类型|说明|
|-|-|-|
|v-model        | boolean/false  |显示隐藏 Dialog|
|title          | string         |Dialog 的标题，也可通过具名 slot 方式|
|content        | null           |Dialog 的内容，建议使用slot方式|
|width          | string         |Dialog 的宽度|
|height         | string         |Dialog 的高度，这里是指弹窗内容区域的高度，溢出时显示滚动条，一般情况下不需要设置|
|top            | string         |Dialog 距离浏览器顶部的距离，设置了`center`后样式会被覆盖|
|className      | string         |Dialog 样式名|
|confirm        | string         |确认按钮，点击默认关闭窗口|
|cancel         | string         |取消按钮，点击默认关闭窗口|
|beforeClose    | function       |关闭前的回调，会阻止 Dialog 的关闭。function(type,close),type=close/confirm/cancel/modal 表示点了哪里关闭，close 方法用于关闭 Dialog|
|callback       |function        |确定回调比较常用而添加，同`beforeClose`，相当于type=confirm，减少对type的判断。根据需求和`beforeClose`二选一使用|
|modal          | boolean/true   |是否需要遮罩层	|
|closeModal     | boolean/true   |是否可以通过点击 modal 关闭 Dialog|
|appendToBody   | boolean/true   |Dialog 自身是否插入至 body 元素上|
|lockScroll     | boolean/true   |是否在 Dialog 出现时将 body 滚动锁定|
|showClose      | boolean/true   |是否显示关闭按钮，点击默认关闭窗口|
|move           | boolean/false  |允许拖动窗口|
|autoClose      | number/0       |自动关闭时间，单位秒。0为不自动关闭|
|closeTips      | string         |自动关闭倒计时提示语，默认`S秒后自动关闭`大写S会被替换成实际时间|
|animation      | string         |动画样式名，可选`zoom`,`fade`|
|center         | boolean/true   |居中对齐|
|icon           | number/0       |用于展示常见的alert提示显示对应的icon图标，1成功，2失败，3提示，4警告。其它的可通过添加样式控制|
|zIndex         | number         |弹层的z-index样式|


### Dialog Slot
|参数|说明|
|-|-|
|title           |标题|
|footer          |尾部内容|

### Dialog Methods
|参数|说明|
|-|-|
|open           |打开窗口，使用此方法打开时不支持v-model双向绑定|
|close          |关闭窗口|
|setPosition    |设置窗口top位置，适用于窗口展开收起事件，导致窗口高度发生变化时，用于修正窗口的位置|
