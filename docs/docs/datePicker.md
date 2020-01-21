<!-- Created by 337547038 on 2018/8/31 0031. -->
# DataPicker
<script>
export default {
  data () {
    return {
      value: '2019-10-5 12:10:13',
      value1: '',
      value2: '2019',
      value3: '',
      value4: '2019-1',
      value5: '',
      value6: '2019-1-8',
      value7: '',
      value8: '2019-10',
      value9: '',
      value10:'',
      value11:''
    }
  },
  methods: {
    disabledDate2 (time) {
      // console.log(time)
      const day = time.getFullYear()
      return day < 2018 || day > 2023
      /* const min = new Date(2018,2)
      const max = new Date(2019,10)
      return time <min || time > max */
    },
    disabledDate4 (time) {
      const min = new Date(2019, 2)
      const max = new Date(2019, 10)
      return time < min || time > max
    },
    disabledDate6 (time) {
      const min = new Date(2019, 0, 1)
      const max = new Date(2019, 11, 31)
      return time < min || time > max
    },
    disabledDate7 (time) {
      const day = time.getDay()
      return day === 0 || day === 6
    },
    innerHTML (time) {
      let start = new Date(2019, 9, 1)
      let end = new Date(2019, 9, 7)
      if (time >= start && time <= end) {
        return '休'
      }
      const o = new Date(2019, 8, 29)
      if (time.toString() === o.toString()) {
        return '班'
      }
    },
    change (value) {
      alert(value)
    }
  }
}
</script>
### 基础用法
:::demo 
```html
<template>
  <div>
    <ak-date-picker v-model="value" placeholder="请选择时间"></ak-date-picker>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>
```
:::

### 年选择
:::demo 
```html
<template>
  <div>
    <div>
      <ak-date-picker v-model="value1" type="y"/>
    </div>
    <p>限制选择范围</p>
    <div>
      <ak-date-picker v-model="value2" type="y" :disabledDate="disabledDate2"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value1: '',
      value2: '2019'
    }
  },
  methods: {
    disabledDate2 (time) {
      // console.log(time)
      const day = time.getFullYear()
      return day < 2018 || day > 2023
      /* const min = new Date(2018,2)
      const max = new Date(2019,10)
      return time <min || time > max */
    }
  }
}
</script>
```
:::

### 年月选择
:::demo 
```html
<template>
  <div>
    <div>
      <ak-date-picker v-model="value3" type="ym"/>
    </div>
    <p>限制选择范围</p>
    <div>
      <ak-date-picker v-model="value4" type="ym" :disabledDate="disabledDate4"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value3: '',
      value4: '2019-1'
    }
  },
  methods: {
    disabledDate4 (time) {
      const min = new Date(2019, 2)
      const max = new Date(2019, 10)
      return time < min || time > max
    }
  }
}
</script>
```
:::

### 年月日选择
:::demo 
```html
<template>
  <div>
    <div>
      <ak-date-picker v-model="value5" placeholder="请选择"/>
    </div>
    <p>限制选择范围，只能选择2019年</p>
    <div>
      <ak-date-picker v-model="value6" type="ymd" :disabledDate="disabledDate6"/>
    </div>
    <p>限制选择范围</p>
    <div>
      <ak-date-picker v-model="value7" 
      type="ymd" 
      :disabledDate="disabledDate7"
       placeholder="只能选择周-到周五"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value5: '',
      value6: '2019-1-8',
      value7: ''
    }
  },
  methods: {
    disabledDate6 (time) {
      const min = new Date(2019, 0, 1)
      const max = new Date(2019, 11, 31)
      return time < min || time > max
    },
    disabledDate7 (time) {
      const day = time.getDay()
      return day === 0 || day === 6
    }
  }
}
</script>
```
:::

### 年月日时分秒选择
:::demo 
```html
<template>
  <div>
    <div>
      <ak-date-picker v-model="value10" type="ymdHms"/>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      value10: '',
    }
  },
  methods: {
    disabledDate4 (time) {
      const min = new Date(2019, 2)
      const max = new Date(2019, 10)
      return time < min || time > max
    }
  }
}
</script>
```
:::

### 其它
:::demo 在指定的日期里，插入自定义文本，如假期提示
```html
<template>
 <div>
 <ak-date-picker v-model="value8" placeholder="请选择" :innerHTML="innerHTML"/>
 </div>
</template>
<script>
export default {
  data () {
    return {
      value8: '2019-10'
    }
  },
  methods: {
    innerHTML (time) {
      let start = new Date(2019, 9, 1)
      let end = new Date(2019, 9, 7)
      if (time >= start && time <= end) {
        return '休'
      }
      const o = new Date(2019, 8, 29)
      if (time.toString() === o.toString()) {
        return '班'
      }
    }
  }
}
</script>
```
:::

### 事件
:::demo 在指定的日期里，插入自定义文本，如假期提示
```html
<template>
 <div>
 <ak-date-picker v-model="value9" placeholder="请选择" :change="change"/>
 </div>
</template>
<script>
export default {
  data () {
    return {
      value9: ''
    }
  },
  methods: {
    change (value) {
      alert(value)
    }
  }
}
</script>
```
:::


### 对返回值再进行格式化
:::demo 格式化为时间
```html
<template>
 <div>
 <ak-date-picker v-model="value11" placeholder="请选择" type="ymdHms" format="Hms"/>
 </div>
</template>
<script>
export default {
  data () {
    return {
      value11: ''
    }
  },
  methods: {
  }
}
</script>
```
:::

## API
|参数|类型|说明|
|-|-|-|
|value          |                |通过v-model双向绑定|
|placeholder    | String         |输入框提示占位文本|
|showClear      | Boolean｜true   |显示清空|
|disabledDate   | Function       |禁用的时间，return true时将不能选择|
|disabled       | Boolean｜true  |是否禁用|
|type           | String         |面板日期类型，选择后将按此格式返回，年/年月/年月日/年月日时分秒。可选y, ym, ymd, ymdHms|
|format         | String         |对返回的日期格式进行格式化，即对type返回再格式化|
|innerHTML      | Function        |可以将特殊提示的文本插入到指定的日期里|
|change         | Function        |改变回调事件|
|appendToBody   | Boolean｜true   |是否将弹出日期面板插入到body中|
|downStyle      | Object          |下拉面板样式，快速个性化设置单个日期下拉面板|
|readonly       | Boolean｜true   |日期输入框只读模式|
