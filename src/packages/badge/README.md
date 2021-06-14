# Badge 标记

### 基础用法

```vue demo
<template>
  <div>
   <ak-badge :value="12">
     <ak-button>评论</ak-button>
   </ak-badge>
   <ak-badge :value="2">
     <ak-button>回复</ak-button>
   </ak-badge>
  </div>
</template>
```

### 最大值

可自定义最大值，当value为Number时

```vue demo
<template>
   <div>
     <ak-badge :value="220" :max="99">
        <ak-button>回复</ak-button>
     </ak-badge>
     <ak-badge :value="220" :max="9">
        回复
     </ak-badge> 
   </div>
</template>
<script>
export default {
  methods:{
    click(name){
      console.log(name)
    }
  }
}
</script>
```

### 小圆点

以红点的形式标注需要关注的内容

```vue demo
<template>
   <div>
     <ak-badge :value="220" :dot="true">
        <ak-button>回复</ak-button>
     </ak-badge> 
     <ak-badge :value="220" :dot="true">
        评论
     </ak-badge> 
   </div>
</template>
<script>
export default {
  methods:{
    click(name){
      console.log(name)
    }
  }
}
</script>
```

### 自定义内容

自定义显示内容

```vue demo
<template>
   <div>
     <ak-badge value="hot" :dot="true">
        <ak-button>回复</ak-button>
     </ak-badge>
     <ak-badge value="new" :dot="true">
        回复
     </ak-badge>  
   </div>
</template>
<script>
export default {
  methods:{
    click(name){
      console.log(name)
    }
  }
}
</script>
```

## API

### Badge
|参数|类型|说明|
|-|-|-|
|value          | String/Number  |显示值|
|max            | Number         |最大值，value为Number有效|
|dot            | boolean/false  |显示小圆点|
