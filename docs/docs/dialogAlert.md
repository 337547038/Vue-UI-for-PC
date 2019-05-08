<!-- Created by 337547038 on 2018/10/23 0023. -->
<script>
export default {
  data () {
    return {}
  },
  methods: {
    alertOpen () {
      this.$alert('这是内容', {
        title: '警告',
        confirm: '确定'
      })
      // 等价于下面代码
      /* this.$dialog({
      title:'警告',
      content:'这是内容',
      confirm:'确定',
      type:3, // 默认为警告类
      className: 'dialog-alert', // 添加一个样式
      showClose: false, // 不显示右上角关闭按钮
      closeModal: false // 点击遮罩层不关闭
      }) */
    },
    alertOpen2 () {
      this.$alert('确定删除', {
        title: '警告',
        confirm: '确定',
        cancel: '取消',
        callback (done) {
          alert('回调事件')
          done()
        }
      })
      // 等价于
      /* this.$dialog({
        title: '警告',
        content: '确定删除',
        confirm: '确定',
        cancel: '取消',
        callback (done) {
          alert('回调事件')
          done()
        },
        type: 3, // 默认为警告类
        className: 'dialog-alert', // 添加一个样式
        showClose: false, // 不显示右上角关闭按钮
        closeModal: false // 点击遮罩层不关闭
      }) */
    },
    alertOpen3 () {
      this.$msg('删除成功', {
        type: 1
      })
      // 等价于
      /* this.$dialog({
        content: '删除成功',
        type: 1,
        autoClose: 3, // 自动关闭
        className: 'dialog-msg', // 添加一个样式
        showClose: false, // 不显示右上角关闭按钮
        closeModal: false, // 点击遮罩层不关闭
        modal: false // 不显示遮罩层
      }) */
    },
    alertOpen4(){
    this.$dialogClear()
    }
  }
}
</script>
# Alert 弹框
> 为方便使用，在`dialog`的基础扩展`Alert`,`Confirm`,`Msg`
>从场景上说，`DialogAlert` 的作用是美化系统自带的 `alert`、`confirm`，因此适合展示较为简单的内容。如果需要弹出较为复杂的内容，请使用 `Dialog`。

### 1、Alert
:::demo `Alert`类使用，在页面直接使用 `this.$alert()`
```html
<template>
  <div>
  <p>模拟Alert <span class="green" @click="alertOpen">试一试</span></p>
  <!--<p>清空 <span class="green" @click="alertOpen4">试一试</span></p>-->
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    alertOpen () {
      this.$alert('这是内容', {
        title: '警告',
        confirm: '确定'
      })
      // 等价于下面代码
      /* this.$dialog({
      title:'警告',
      content:'这是内容',
      confirm:'确定',
      type:3, // 默认为警告类
      className: 'dialog-alert', // 添加一个样式
      showClose: false, // 不显示右上角关闭按钮
      closeModal: false // 点击遮罩层不关闭
      }) */
    }
  }
}
</script>

```
:::

### 2、Confirm
:::demo `Confirm`类使用，在页面直接使用 `this.$alert()`。同`alert`，这里使用了回调
```html
<template>
  <div>
  <p>模拟Confirm <span class="green" @click="alertOpen2">试一试</span></p>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    alertOpen2 () {
      this.$alert('确定删除', {
        title: '警告',
        confirm: '确定',
        cancel: '取消',
        callback (done) {
          alert('回调事件')
          done()
        }
      })
      // 等价于
      /* this.$dialog({
        title: '警告',
        content: '确定删除',
        confirm: '确定',
        cancel: '取消',
        callback (done) {
          alert('回调事件')
          done()
        },
        type: 3, // 默认为警告类
        className: 'dialog-alert', // 添加一个样式
        showClose: false, // 不显示右上角关闭按钮
        closeModal: false // 点击遮罩层不关闭
      }) */
    }
  }
}
</script>

```
:::

### 3、Msg
:::demo `Msg`类使用，在页面直接使用 `this.$msg()`
```html
<template>
  <div>
  <p>消息提示 <span class="green" @click="alertOpen3">试一试</span></p>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    alertOpen3 () {
      this.$msg('删除成功', {
        type: 1
      })
      // 等价于
      /* this.$dialog({
        content: '删除成功',
        type: 1,
        autoClose: 3, // 自动关闭
        className: 'dialog-msg', // 添加一个样式
        showClose: false, // 不显示右上角关闭按钮
        closeModal: false, // 点击遮罩层不关闭
        modal: false // 不显示遮罩层
      }) */
    }
  }
}
</script>

```
:::


## API
> 可传两个参数，参数1为消息正文内容；参数2其它信息
### Alert
|参数|类型|说明|
|-|-|-|
|title          | string         |标题|
|confirm        | string         |确认按钮，点击默认关闭窗口|
|cancel         | string         |取消按钮，点击默认关闭窗口|
|callback       |function        |回调事件| 
|type           | number/0       |用于展示常见的alert提示，1成功，2失败，3警告。其它的可通过添加样式控制|
|width          | number         |Dialog 的宽度，单位px|
|animation      | string         |动画样式名，可选zoom、flip、door、rotate、slideDown、slideUp、slideLeft、slideRight|


### Msg
|参数|类型|说明|
|-|-|-|
|type           | number/0       |用于展示常见的alert提示，1成功，2失败，3警告。其它的可通过添加样式控制|
|width          | number         |Dialog 的宽度，单位px|
|animation      | string         |动画样式名，可选zoom、flip、door、rotate、slideDown、slideUp、slideLeft、slideRight|


