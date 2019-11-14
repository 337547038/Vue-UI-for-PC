# CollapseTransition 折叠动画

### 基础用法

:::demo 
```html
<template>
<div>
<p @click="isActive=!isActive">展开或收起</p>
   <ak-transition>
      <div v-show="isActive">
        <div style="background: #f0f0f0;height: 100px">这里是内容</div>
      </div>
   </ak-transition>
</template>
</div>
<script>
export default {
  data() {
    return {
      isActive: false
    }
  }
}
</script>
```
:::
