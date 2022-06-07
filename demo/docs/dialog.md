<!-- Created by 337547038 on 2018/8/31 0031. -->
<script>
export default {
  data () {
    return {
      visible1: false,
      visible2: false,
      visible3: false,
      visible4: false,
      visible5: false,
      visible6: false,
      visible7: false,
      visible8: false,
      visible9: false,
      visible10: false,
      visible11: false,
      visible12: false,
      visible13: false,
      visible14: false,
      visible15: false,
      animation: 'zoom',
      autoHeight: ''
    }
  },
  methods: {
    click1 () {
      this.$dialog(
        {title: '标题',
          content: '内容默认居中对齐',
          confirm: '确定'
        }
      )
    },
    click2 () {
      this.$dialog(
        {title: '标题',
          width: 250,
          content: '多行内容自动左对齐。仅支持纯文本内容',
          confirm: '确定'
        }
      )
    },
    click3 () {
      this.$dialog(
        {title: '恭喜您中奖了',
          content: '成功啦',
          confirm: '确定',
          icon: 1
        }
      )
    },
    click4 () {
      this.$dialog(
        {title: '失败提示',
          content: '很抱歉，你与大奖擦肩而过',
          confirm: '确定',
          icon: 2
        }
      )
    },
    click5 () {
      this.$dialog(
        {title: '警告',
          content: '还是要按照规范来操作',
          confirm: '确定',
          icon: 3,
          animation: 'rotate'
        }
      )
    },
    beforeClose (type, done) {
      if (type === 'confirm') {
        done()
        this.$dialog({
          title: '确认事件',
          content: '您点击了确认按钮',
          autoClose: 3
        })
      } else {
        alert('你点击了' + type)
        done()
      }
    },

    clickAnimation (an) {
      this.visible8 = true
      this.animation = an
    },
    setPosition (){
      this.autoHeight='600px'
      this.$refs.autoTop.setPosition()
    }
  }
}
</script>

# Dialog 弹层对话框

>目前提供两种用法，组件和插件

>适用于所有弹窗弹层、Alert提示、MessageBox弹框


## 插件

### 1、插件引用
:::demo 直接在页面使用`this.$dialog({...})`，相当于`Alert`类提示弹窗
```html
<template>
  <p>单行内容居中对齐 <a href="javascript:;" @click="click1" class="green">点击这里打开</a></p>
  <p>多行内容自动左对齐 <a href="javascript:;" @click="click2" class="green">点击这里打开</a></p>
  <p>成功提示 <a href="javascript:;" @click="click3" class="green">点击这里打开</a></p>
  <p>失败提示 <a href="javascript:;" @click="click4" class="green">点击这里打开</a></p>
  <p>警告提示 <a href="javascript:;" @click="click5" class="green">点击这里打开</a></p>
</template>
<script>
export default {
  data(){
    return {
    }
  },
  methods:{
    click1(){
      this.$dialog(
        {title:'标题',
          content:'内容默认居中对齐',
          confirm:'确定'
        }
      )
    },
    click2(){
      this.$dialog(
        {title:'标题',
          width:250,
          content:'多行内容自动左对齐。仅支持纯文本内容',
          confirm:'确定'
        }
      )
    },
    click3(){
      this.$dialog(
        {title:'恭喜您中奖了',
          content:'成功啦',
          confirm:'确定',
          icon:1
        }
      )
    },
    click4(){
      this.$dialog(
        {title:'失败提示',
          content:'很抱歉，你与大奖擦肩而过',
          confirm:'确定',
          icon:2
        }
      )
    },
    click5(){
      this.$dialog(
        {title:'警告',
          content:'还是要按照规范来操作',
          confirm:'确定',
          icon:3,
          animation:'rotate'
        }
      )
    }
  }
}
</script>
```
:::

## 组件
### 1、基本用法
:::demo 可通过两种方式弹出或隐藏窗口
```html
<template>
  <div>
    <p>使用参数visible显示隐藏 <span @click="visible1=true" class="green">试一试</span></p>
    <p>使用组件open方法打开 <span @click="$refs.openDialog.open()" class="green">试一试</span></p>
    <ak-dialog title="title" v-model="visible1">
       <p>窗口内容，可包含任何内容</p>
       <p>就是样式丑了点点</p>
    </ak-dialog>
    <ak-dialog title="title" ref="openDialog" class="test-dialog">窗口内容，可包含任何内容</ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible1: false
    }
  }
}
</script>

```
:::

### 2、标题设置
>标题可设置为空或通过slot设置，以满足各种不同的使用环境
:::demo 
```html
<template>
  <div>
    <p>slot设置的标题 <span @click="visible3=true" class="green">试一试</span></p>
    <ak-dialog v-model="visible3">
      <div slot="title">通过slot设标题</div>
      <p>这是一个通过slot设标题的 dialog 弹窗，当然也可以是不设置标题</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
      <p>这是一个通过slot设标题的 dialog 弹窗</p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible2: false,
      visible3: false
    }
  }
}
</script>

```
:::

### 3、设定宽高
:::demo 一般情况不需要设height，适用于弹窗内容区需要滚动的时候
```html
<template>
  <div>
    <span @click="visible4=true" class="green">试一试</span>
    <ak-dialog v-model="visible4" title="title" :width="400" :height="200">
      <p>设置了宽高的 dialog 弹窗，设定了高时，内容溢出将显示纵向滚动条</p>
      <p style="height: 200px"></p>
      <p>设置了宽高的 dialog 弹窗，设定了高时，内容溢出将显示纵向滚动条</p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible4: false
    }
  }
}
</script>

```
:::

### 4、添加按钮
:::demo 默认下点击按钮是关闭弹窗口的，可通过`beforeClose`取得点击事件，见下面的事件。这种按钮适用于`alert`弹窗
```html
<template>
  <div>
    <span @click="visible5=true" class="green">试一试</span>
    <ak-dialog v-model="visible5" title="title" confirm="confirm" cancel="cancel">
      <p>这是按钮的 dialog 弹窗内容</p>
      <p>默认情况下点击按钮后将关闭窗口</p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible8: false
    }
  }
}
</script>

```
:::

### 5、事件
:::demo 弹窗口的关闭或者弹窗内置的按钮点击事件，全部由`beforeClose`处理，它将会阻止窗口的关闭事件，转由手动关闭
```html
<template>
  <div>
    <p><span @click="visible6=true" class="green">试一试</span></p>
    <ak-dialog v-model="visible6" confirm="confirm" cancel="cancel" :beforeClose="beforeClose">
      <p>添加了beforeClose事件后，将阻止窗口关闭，转由手动关闭</p>
      <p></p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible6: false
    }
  },
  methods: {
    beforeClose (type, done) {
      if (type === 'confirm') {
        done()
        this.$dialog({
          title: '确认事件',
          content: '您点击了确认按钮',
          autoClose: 3
        })
      } else {
        alert('你点击了' + type)
        done()
      }
    }
  }
}
</script>
```
:::

### 6、可自动关闭
:::demo 通过设定关闭时间，可自动关闭窗
```html
<template>
  <div>
    <span @click="visible7=true" class="green">试一试</span>
    <ak-dialog v-model="visible7" title="title" :autoClose="10">
      <p>10秒后将自动关闭，如果需要显示倒计时间，可通过添加窗口样式，将隐藏的倒计时显示出来</p>
      <p>这是的 dialog 弹窗内容</p>
      <p>这是一个会自动关闭的弹窗</p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible7: false
    }
  }
}
</script>

```
:::

### 7、可自定过渡动画
:::demo 可通过设置不同的过渡动画，其它动画需要要样式中先定义。默认`animation="zoom"`，然后通过css样式`.zoom-enter-active{}`、`.zoom-leave-active{}`写不同的动画效果即可
```html
<template>
  <div>
    <p>目前设置有如下过渡动画效果，试着点击看看效果：</p>
    <p><span @click="clickAnimation('zoom')">zoom</span></p>
    <p><span @click="clickAnimation('flip')">flip</span></p>
    <p><span @click="clickAnimation('door')">door</span></p>
    <p><span @click="clickAnimation('rotate')">rotate</span></p>
    <p><span @click="clickAnimation('slideDown')">slideDown</span></p>
    <p><span @click="clickAnimation('slideUp')">slideUp</span></p>
    <p><span @click="clickAnimation('slideLeft')">slideLeft</span></p>
    <p><span @click="clickAnimation('slideRight')">slideRight</span></p>
    <p><span @click="clickAnimation('val')">val</span></p>
    <p><span @click="clickAnimation('donna')">donna</span></p>
    <p><span @click="clickAnimation('ricky')">ricky</span></p>
    <ak-dialog v-model="visible8" title="title" :animation="animation">
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible8: false,
      animation: 'zoom'
    }
  },
  methods: {
    clickAnimation (an) {
      this.visible8 = true
      this.animation = an
    }
  }
}
</script>

```
:::

### 8、可自定显示位置
:::demo 为满足各种不同的使用场景，可自定弹窗显示位置。首先通过`:center="false"`设为不居中对齐，然后再添加不同的样式实现。这里演示一个右下角出现的弹窗。
```html
<template>
  <div>
    <span @click="visible9=true" class="green">试一试</span>
    <ak-dialog v-model="visible9" :center="false" class="right-bottom" :modal="false" animation="slideUp">
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible9: false
    }
  }
}
</script>
<style>
  .right-bottom{right: 0;bottom: 0;width: 300px;height: 150px}
</style>

```
:::

### 9、嵌套弹窗
:::demo 
```html
<template>
  <div>
    <span @click="visible10=true" class="green">试一试</span>
    <ak-dialog v-model="visible10" title="title">
      <p>这是的 dialog 弹窗内容</p>
      <p>&nbsp;</p>
      <p @click="visible11=true"><a href="javascript:;" class="green">点击这里打开内层弹窗口</a></p>
      <p>&nbsp;</p>
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
    </ak-dialog>
    <ak-dialog v-model="visible11" title="title">内层弹窗</ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible10: false,
      visible11: false
    }
  }
}
</script>

```
:::

### 10、窗口改变时自动定位
:::demo 适用于窗口展开收起事件，导致窗口高度发生变化时，用于修正窗口的位置
```html
<template>
  <div>
    <span @click="visible12=true" class="green">试一试</span>
    <ak-dialog v-model="visible12" title="title" ref="autoTop">
      <p>适用于窗口展开收起事件，导致窗口高度发生变化时，用于修正窗口的位置</p>
      <p>&nbsp;</p>
      <p @click="setPosition" :style="{height:autoHeight}"><a href="javascript:;" class="green">改变当前窗口高</a></p>
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible12: false,
      autoHeight:''
    }
  },
  methods:{
    setPosition (){
      this.autoHeight='600px'
      this.$refs.autoTop.setPosition()
    }
  }
}
</script>

```
:::

### 11、使用`slot="footer"`自定义尾部
:::demo 
```html
<template>
  <div>
    <span @click="visible13=true" class="green">试一试</span>
    <ak-dialog v-model="visible13" title="title">
      <p>这是的 dialog 弹窗内容</p>
      <p></p>
      <div slot="footer">
       <ak-button>取消</ak-button>
       <ak-button>确定</ak-button>
       <ak-button>提交</ak-button>
      </div>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible13: false
    }
  },
  methods:{
  
  }
}
</script>

```
:::

### 12、全屏模式
:::demo 
```html
<template>
  <div>
    <span @click="visible14=true" class="green">试一试</span>
    <ak-dialog v-model="visible14" title="全屏模式弹窗口" :fullScreen="true">
      <p>这是的 dialog 弹窗内容</p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible13: false
    }
  },
  methods:{
  
  }
}
</script>

```
:::

### 13、显示最大最小化弹窗
:::demo 
```html
<template>
  <div>
    <span @click="visible15=true" class="green">试一试</span>
    <ak-dialog v-model="visible15" title="最大最小化弹窗" :showScreen="true">
      <p>这是的 dialog 弹窗内容</p>
    </ak-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      visible13: false
    }
  },
  methods:{
  
  }
}
</script>

```
:::

## API

### Dialog
|参数|类型|说明|
|-|-|-|
|value          | boolean/false  |v-model形式，是否显示 Dialog|
|title          | string         |Dialog 的标题，也可通过具名 slot 传入|
|content        | null           |Dialog 的内容。通过参数传进content时，则不显示slot。在组件引用模式建议使用slot形式填充内容。仅支持纯文本内容|
|width          | number         |Dialog 的宽度，单位px，建议通过css设置|
|height         | number         |Dialog 的高度，溢出时显示滚动条，一般情况下不需要设置|
|class          | string         |原生class，通过添加样式控制窗口大小等等|
|confirm        | string         |确认按钮，点击默认关闭窗口|
|cancel         | string         |取消按钮，点击默认关闭窗口|
|beforeClose    | function       |关闭前的回调，会暂停 Dialog 的关闭。function(type,done),type=close/confirm/cancel 表示点了哪里关闭，done 用于关闭 Dialog|
|callback       |function        |确定回调比较常用而添加，同beforeClose，相当于type=confirm，减少对type的判断。根据需求和beforeClose二选一使用| 
|modal          | boolean/true   |是否需要遮罩层	|
|closeModal     | boolean/true   |是否可以通过点击 modal 关闭 Dialog|
|appendToBody   | boolean/true   |Dialog 自身是否插入至 body 元素上|
|lockScroll     | boolean/true   |是否在 Dialog 出现时将 body 滚动锁定|
|showClose      | boolean/true   |是否显示关闭按钮，点击默认关闭窗口|
|move           | boolean/true   |允许拖动窗口|
|autoClose      | number/0       |自动关闭时间，单位秒。0为不自动关闭|
|animation      | string         |动画样式名，可选zoom、flip、door、rotate、slideDown、slideUp、slideLeft、slideRight|
|after          | function       |窗口加载完回调|
|center         | boolean/true   |居中对齐，false时需通过添加样式控制窗口位置|
|icon           | number/0       |仅在this.$dialog下有效，用于展示常见的alert提示显示对应的icon图标，1成功，2失败，3提示，4警告。其它的可通过添加样式控制|
|zIndex         | number         |弹层的z-index样式|
|fullScreen     | boolean/false  |是否全屏弹层|
|showScreen     | boolean/false  |是否显示最大最小化按钮|

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

[[Toc]]


