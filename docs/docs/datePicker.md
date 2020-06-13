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
      value11:'',
      value12:'',
      value13:'',
      value14:'',
      value15:''
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
      <ak-date-picker v-model="value1" type="year"/>
    </div>
    <p>限制选择范围</p>
    <div>
      <ak-date-picker v-model="value2" type="year" :disabledDate="disabledDate2"/>
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
      <ak-date-picker v-model="value3" type="month"/>
    </div>
    <p>限制选择范围</p>
    <div>
      <ak-date-picker v-model="value4" type="month" :disabledDate="disabledDate4"/>
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
      <ak-date-picker v-model="value6" type="date" :disabledDate="disabledDate6"/>
    </div>
    <p>限制选择范围</p>
    <div>
      <ak-date-picker v-model="value7" 
      type="date" 
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
      <ak-date-picker v-model="value10" type="datetime"/>
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


### 显示不同的格式
:::demo 使用`format`指定输入显示的类型，可使用y(年)、M(月)、d(日)、h(时)、m(分)、s(秒)、w(星期)。MM表示使用两位表示月份，timestamp格式，仅在value-format可用
```html
<template>
 <div>
 <ak-date-picker v-model="value11" placeholder="请选择" type="datetime" format="y-MM-dd"></ak-date-picker>
  <p>当前值两位：{{value11}}</p>
  <p>&nbsp;</p>
  
<ak-date-picker v-model="value12" placeholder="请选择" type="datetime" format="y-M-d"></ak-date-picker>
  <p>当前值一位：{{value12}}</p>
  <p>&nbsp;</p>
   
<ak-date-picker v-model="value13" placeholder="请选择" format="y-M-d" value-format="y-MM-dd hh:mm:ss" type="datetime"></ak-date-picker>
  <p>显示值和value不一致：{{value13}}</p>
  <p>&nbsp;</p>

<ak-date-picker v-model="value14" placeholder="请选择" format="y-M-d" value-format="timestamp"></ak-date-picker>
  <p>使用timestamp：{{value14}}</p>
  <p>&nbsp;</p>

<ak-date-picker v-model="value15" placeholder="请选择" format="y年M月d日 星期w hh:mm:ss" value-format="y-MM-dd" type="datetime"></ak-date-picker>
  <p>显示星期：{{value15}}</p>
 </div>
</template>
<script>
export default {
  data () {
    return {
      value11: '',
      value112: '',
      value113: '',
      value114: '',
      value115: '',
    }
  },
  methods: {
  }
}
</script>
```
:::

## API

### datePicker
|参数|类型|说明|
|-|-|-|
|value          |                |通过v-model双向绑定|
|placeholder    | String         |输入框提示占位文本|
|showClear      | Boolean｜true   |显示清空|
|disabledDate   | Function       |禁用的时间，return true时将不能选择|
|disabled       | Boolean｜true  |是否禁用|
|type           | String         |面板日期类型，选择后将按此格式返回，年/年月/年月日/年月日时分秒。可选year,month,date,datetime|
|format         | String         |输入框显示的格式，为空时按type默认格式|
|valueFormat    | String         |绑定的值格式，即value的格式,必须要是合法的日期格式，为空则输入format的格式|
|innerHTML      | Function        |可以将特殊提示的文本插入到指定的日期里|
|appendToBody   | Boolean｜true   |是否将弹出日期面板插入到body中|
|downStyle      | Object          |下拉面板样式，快速个性化设置单个日期下拉面板|
|readonly       | Boolean｜true   |日期输入框只读模式|

### datePicker Event
|参数|说明|
|-|-|
|change       |改变事件|
