<!-- Created by 337547038 on 2018/8/16 0016. -->
<script>
export default {
  name: 'Table',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '1张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200330,
          trClass: 'trClass' /* 特殊参数为当前tr添加指定样式 */
        },
        {
          date: '2016-05-02',
          name: '2张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200331,
          children:[
            {
              date: '2020-02-02',
              name:'子节点1',
              province: '北京',
              city: '天河区',
              address: '广东市天河区无名路888号',
              zip: 200331,
            },
            {
              date: '2020-02-02',
              name:'子节点2',
              province: '北京',
              city: '天河区',
              address: '广东市天河区无名路888号',
              zip: 200331,
            }
          ]
        },
        {
          date: '2016-05-04',
          name: '3张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200332
        },
        {
          date: '2016-05-01',
          name: '4张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200333
        },
        {
          date: '2016-05-03',
          name: '5张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200334
        },
        {
          date: '2016-05-02',
          name: '6张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200335
        },
        {
          date: '2016-05-04',
          name: '7张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200336
        },
        {
          date: '2016-05-01',
          name: '8张三',
          province: '广东',
          city: '天河区',
          address: '广东市天河区无名路888号',
          zip: 200337
        }
      ],
      showHeader: true,
      hover: false,
      border: false,
      stripe: false,
      ellipsis: true,
      pagination: {
         current: 1,
         change: (v) => {
           console.log(v)
         }
      }
    }
  },
  components: {},
  methods: {
    selectClick (row) {
      console.log('selectClick')
      console.log(row)
    },
    getSelectAll () {
      console.log('getSelectAll')
      console.log(this.$refs.getSelectAll.getSelectAll())
    },
    toggleSelection (boolean) {
      this.$refs.getSelectAll.toggleSelection(boolean)
    },
    toggleRowSelection (bool) {
      const row = [this.tableData[1], this.tableData[2]]
      row.forEach(row => {
        this.$refs.getSelectAll.toggleRowSelection(row, bool)
      })
    },
    sortChange (prop, order) {
      console.log('sortChange')
      console.log(prop, order)
    },
    rowColSpan (rowIndex, columnIndex) {
      console.log('arraySpanMethod')
        if (rowIndex === 0 && columnIndex === 1) {
          return [2, 3]
        }
    },
    lazyLoad (row, resolve) {
      setTimeout(() => {
        const child = [
          {
            date: '2016-05-03',
            name: '懒加载1',
            province: '北京',
            city: '天河区',
            address: '北京市天河区无名路888号',
            zip: 200330,
          },
          {
            date: '2016-05-03',
            name: '懒加载1',
            province: '上海',
            city: '天河区',
            address: '北京市天河区无名路888号',
            zip: 200330,
          }
        ]
        resolve(child)
      }, 1000)
    },
    trClick (row,index) {
      console.log(row)
      console.log(index)
    }
  }
}
</script>

# Table 表格

> 表格单元格默认不换行，超出显示...

> 不指定列宽时，单元格将平分表格宽

>

## Use

### 1、基础的表格展示用法

:::demo 
```html
<template>
  <akTable :data="tableData">
    <akColumn label="日期" prop="date"></akColumn>
    <akColumn label="姓名" prop="name"></akColumn>
    <akColumn label="省份" prop="province"></akColumn>
    <akColumn label="城市" prop="city"></akColumn>
    <akColumn label="地址" prop="address"></akColumn>
    <akColumn label="邮编" prop="zip"></akColumn>
    <akColumn label="操作">
      <template slot-scope="scope">
        <a href="javascript:;">删除</a>
      </template>
    </akColumn>
  </akTable>
</template>
<script>
  export default {
    name: "Table",
    data() {
      return {
        tableData: [
          {
            date: "2016-05-03",
            name: "1张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200330,
            trClass: "trClass" // 特殊参数为当前tr添加指定样式
          },
          {
            date: "2016-05-02",
            name: "2张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200331
          },
          {
            date: "2016-05-04",
            name: "3张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200332
          },
          {
            date: "2016-05-01",
            name: "4张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200333
          },
          {
            date: "2016-05-03",
            name: "5张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200334
          },
          {
            date: "2016-05-02",
            name: "6张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200335
          },
          {
            date: "2016-05-04",
            name: "7张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200336
          },
          {
            date: "2016-05-01",
            name: "8张三",
            province: "广东",
            city: "天河区",
            address: "广东市天河区无名路888号",
            zip: 200337
          }
        ]
      };
    },
    components: {}
  };
</script>
```

:::

### 2、固定表头

:::demo 纵向内容过多时，可选择固定表头

```html
<akTable :data="tableData" height="200px">
  <akColumn label="日期" prop="date"></akColumn>
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>
```

:::

### 3、固定头和列

:::demo 横向内容过多时，可选择固定列。`table`添加 `width="600px"`；`column`添加`fixed="left"`

```html
<akTable :data="tableData" height="200px" width="600px">
  <akColumn label="日期" prop="date" fixed="left" width="100px"></akColumn>
  <akColumn label="姓名" prop="name" width="100px"></akColumn>
  <akColumn label="省份" prop="province" width="100px"></akColumn>
  <akColumn label="城市" prop="city" width="100px"></akColumn>
  <akColumn label="地址" prop="address" width="200px"></akColumn>
  <akColumn label="邮编" prop="zip" width="100px"></akColumn>
  <akColumn label="操作" fixed="right" width="100px">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>
```

:::

### 4、添加序号

:::demo `type="index"`

```html
<akTable :data="tableData">
  <akColumn type="index" label="序号" width="50px"></akColumn>
  <akColumn label="日期" prop="date"></akColumn>
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>
```

:::

### 5、添加勾选

:::demo `type="selection"`;`getSelectAll`方法可取已勾选行。支持按住`ctrl`键一次勾选或取消多个

```html
<p><ak-button @click="getSelectAll">getSelectAll</ak-button></p>
<p>&nbsp;</p>
<akTable :data="tableData" @selectClick="selectClick" ref="getSelectAll">
  <akColumn type="selection" width="50px"></akColumn>
  <akColumn label="日期" prop="date"></akColumn>
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>
<p><br /></p>
<div>
  <ak-button @click="toggleSelection(true)">选中所有行</ak-button>
  <ak-button @click="toggleRowSelection">切换第二、三行为选中状态</ak-button>
  <ak-button @click="toggleRowSelection(false)"
    >切换第二、三行为未选中状态</ak-button
  >
  <ak-button @click="toggleSelection(false)">取消选择</ak-button>
</div>
<script>
  export default {
    methods: {
      selectClick(list,row) {
        console.log("selectClick");
        console.log(row);
      },
      getSelectAll() {
        console.log("getSelectAll");
        console.log(this.$refs.getSelectAll.getSelectAll());
      },
      toggleSelection(boolean) {
        this.$refs.getSelectAll.toggleSelection(boolean);
      },
      toggleRowSelection(bool) {
        const row = [this.tableData[1], this.tableData[2]];
        row.forEach(row => {
          this.$refs.getSelectAll.toggleRowSelection(row, bool);
        });
      }
    }
  };
</script>
```

:::

### 6、排序

:::demo 

```html
<akTable :data="tableData" :sortChange="sortChange">
  <akColumn label="日期" prop="date" :sortBy="true"></akColumn>
  <akColumn label="姓名" prop="name" :sortBy="true"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>
<script>
  export default {
    methods: {
      sortChange(prop, order) {
        console.log("sortChange");
        console.log(prop, order);
      }
    }
  };
</script>
```

:::

### 7、固定列宽

:::demo 指定列宽

```html
<akTable :data="tableData">
  <akColumn type="selection" width="50px"></akColumn>
  <akColumn label="日期" prop="date" :sortBy="true"></akColumn>
  <akColumn label="姓名" prop="name" :sortBy="true"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address" width="300px"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>
```

:::

### 8、其他

:::demo 日期姓名列居中对齐；全局提示 title 设置为 false 时，地址列鼠标经这显示 title 提示语

```html
<div>
  <ak-button @click="showHeader=!showHeader"
    >showHeader：{{showHeader}}</ak-button
  >
  <ak-button @click="hover=!hover">hover：{{hover}}</ak-button>
  <ak-button @click="border=!border">border：{{border}}</ak-button>
  <ak-button @click="stripe=!stripe">stripe：{{stripe}}</ak-button>
  <ak-button @click="ellipsis=!ellipsis">ellipsis：{{ellipsis}}</ak-button>
  <br /><br />
</div>
<akTable
  :data="tableData"
  :stripe="stripe"
  :showHeader="showHeader"
  :hover="hover"
  :border="border"
  :ellipsis="ellipsis"
  :title="false"
>
  <akColumn label="日期" prop="date" align="center"></akColumn>
  <akColumn label="姓名" prop="name" align="center"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address" :title="true" width="20%"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {
        showHeader: true,
        hover: false,
        border: false,
        stripe: false,
        ellipsis: true
      };
    }
  };
</script>
```

:::

### 9、扩展列

:::demo 使用 `scope.extend()`方法可展开或收起扩展行列，`scope.toggle`返回当前展开或收起状态

```html
<akTable :data="tableData">
  <akColumn label="日期" prop="date"></akColumn>
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="地址" prop="address" width="20%"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <!--<a href="javascript:;">删除</a> -->
      <span @click="scope.extend()">{{scope.toggle?'收起':'展开'}}</span>
    </template>
  </akColumn>
  <akColumn type="extend">
    <template slot-scope="scope">
      <!--扩展行，姓名：{{scope.row.name}}，城市：{{scope.row.city}}-->
      返回当前行所有信息：{{scope}}
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {
        showHeader: true,
        hover: false,
        border: false,
        stripe: false,
        ellipsis: true
      };
    }
  };
</script>
```

:::

### 10、拖动改变列宽

:::demo 拖动改变列宽，拖动表头可改变当前单元格的宽

```html
<akTable :data="tableData" :drag="true">
  <akColumn label="日期" prop="date" width="223px"></akColumn>
  <akColumn label="姓名" prop="name" width="223px"></akColumn>
  <akColumn label="地址" prop="address" width="220px"></akColumn>
  <akColumn label="操作" width="220px">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {
      }
    }
  };
</script>
```

:::

### 11、合并行或列

:::demo 多行或多列共用一个数据时，可以合并行或列。通过给传入`rowColSpan`方法可以实现合并行或列，方法的参数(当前行号`rowIndex`,当前列号`columnIndex`,当前行`row`,当前列`column`)四个属性。该函数返回一个包含两个数字的数组，第一个`rowspan`，第二个`colspan`，即向纵向和横向合并多少个单元格。

```html
<akTable :data="tableData" :rowColSpan="rowColSpan">
  <akColumn label="日期" prop="date"></akColumn>
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {};
    },
    methods: {
      rowColSpan(rowIndex, columnIndex) {
        console.log("arraySpanMethod");
        if (rowIndex === 0 && columnIndex === 1) {
          return [2, 3]; // 表示在rowIndex=0行，columnIndex = 1列位置，向下合并两个和向右合并3个单元格
        }
      }
    }
  };
</script>
```

:::

### 12、多级表头

:::demo 

```html
<akTable :data="tableData">
  <akColumn label="日期">
    <akColumn label="年" width="80">
      <template slot-scope="scope">
        {{(scope.row.date).substr(0,4)}}
      </template>
    </akColumn>
    <akColumn label="月" width="80">
      <template slot-scope="scope">
        {{(scope.row.date).substr(5)}}
      </template>
    </akColumn>
  </akColumn>
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="收货地址">
    <akColumn label="省份" prop="province"></akColumn>
    <akColumn label="城市" prop="city"></akColumn>
    <akColumn label="地址" prop="address" width="250"></akColumn>
    <akColumn label="邮编" prop="zip"></akColumn>
  </akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {};
    },
    methods: {}
  };
</script>
```

:::

### 13、带分页

:::demo 

```html
<akTable :data="tableData" :pagination="pagination">
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address" width="250"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <a href="javascript:;">删除</a>
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {
       pagination: {
        current: 1,
        change: (v) => {
         console.log(v)
        }
       }
      }
    },
    methods: {
    }
  };
</script>
```

:::

### 14、支持子节点数据

:::demo 类似于扩展列，使用 `scope.extend()`方法展开或收起子节点，`scope.toggle`返回当前展开或收起状态。子节点scope数据除了`row`，还包含`parentRow`父级信息

```html
<akTable :data="tableData" :hasChild="true">
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address" width="250"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <!--存在子节点信息时显示状态切换-->
      <span @click="scope.extend()" v-if="scope.row.children">{{scope.toggle?'收起':'展开'}}</span>
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
    }
  };
</script>
```

:::

### 15、支持子节点懒加载数据

:::demo 类似于扩展列，使用 `scope.extend()`方法展开或收起子节点，`scope.toggle`返回当前展开或收起状态。子节点scope数据除了`row`，还包含`parentRow`父级信息

```html
<akTable :data="tableData" :hasChild="true" :lazyLoad="lazyLoad">
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address" width="250"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
  <akColumn label="操作">
    <template slot-scope="scope">
      <!--存在子节点信息时显示状态切换-->
      <span @click="scope.extend()" v-if="scope.row.children">{{scope.toggle?'收起':'展开'}}</span>
    </template>
  </akColumn>
</akTable>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
     lazyLoad (row, resolve) {
      setTimeout(() => {
        const child = [
          {
            date: '2016-05-03',
            name: '懒加载1',
            province: '北京',
            city: '天河区',
            address: '北京市天河区无名路888号',
            zip: 200330,
          },
          {
            date: '2016-05-03',
            name: '懒加载1',
            province: '上海',
            city: '天河区',
            address: '北京市天河区无名路888号',
            zip: 200330,
          }
        ]
        resolve(child)
      }, 1000)
    }
    }
  };
</script>
```

:::


### 16、当前行点击事件

:::demo 支持tr行点击事件

```html
<akTable :data="tableData" @trClick="trClick">
  <akColumn label="姓名" prop="name"></akColumn>
  <akColumn label="省份" prop="province"></akColumn>
  <akColumn label="城市" prop="city"></akColumn>
  <akColumn label="地址" prop="address" width="250"></akColumn>
  <akColumn label="邮编" prop="zip"></akColumn>
</akTable>

<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
     trClick(row,index) {
        console.log(row)
        console.log(index)
     }
    }
  };
</script>
```

:::

## API

### Table

| 参数           | 类型          | 说明|
|-|-|-|
| data           | array         | 显示的数据 |
| showHeader     | boolean/true  | 是否显示表头 |
| className      | String        | 表格类名|
| hover          | boolean/true  | 鼠标经过显示高亮|
| border         | boolean/true  | 是否显示表格纵向边框|
| stripe         | boolean/true  | 是否显示间隔斑马纹|
| height         | String        | table 的高，溢出显示滚动条，且表头固定|
| width          | String        | 表格外层 div 的宽，当单元格总和大于表格 width 时，出现横向滚动条|
| ellipsis       | boolean/true  | 表格单元格文字溢出显示...，在不指定列宽时，各列平分表格宽 |
| emptyText      | String        | 无数据时显示的文本|
| title          | Boolean/true  | 鼠标滑过单元格时显示 title 提示|
| drag           | boolean/false | 允许拖动表头改变当前单元格宽度|
| dragWidth      | array         | 允许拖动最大与最小宽度[min,max]|
| extendToggle   | boolean/false | 扩展行/子节点初始展开或收起状态|
| rowColSpan     | function      | 合并行或列方法。通过给传入 rowColSpan 方法可以实现合并行或列，方法的参数(当前行号 rowIndex,当前列号 columnIndex,当前行 row,当前列 column)四个属性。该函数返回一个包含两个数字的数组，第一个 rowspan，第二个 colspan，即向纵向和横向合并多少个单元格 |
| pagination    | object        | 有相关参数时显示分页，参数的pagination组件参数|
| hasChild      | boolean/true  | 是否包含子节点数据，为true时，当 `row` 中包含 `children` 字段时，被视为子节点数据|
| lazyLoad      | function      | 设置了`lazyLoad`时，被视为子节点使用懒加载方式，function(row,resolve) row当前行信息|

### Table Event

| 参数 | 说明 |
|-|-|- |
| selectClick    | 勾选单列事件，function(list,row, index) list所有已勾选的row集合，row当前点击行信息，index当前行序号|
| sortChange     | 排序点击事件 |
| trClick        | 当前行点击事件，即tr点击事件，function(row,index) |

### Table Methods

| 参数               | 类型        | 说明 |
|-|-|- |
| getSelectAll       | 返回所有选中的行|
| toggleRowSelection | 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） row, selected |
| toggleSelection | 用于多选表格，切换所有行的选中/清空状态,true为选中，false取消选中，默认false|
| clearSort          | 用于清空排序条件|
| resetColumn        | 用于重置表头，当通过 js 动态改变表格列时用于重置表格列及表头信息|
| setTHWidth         | 用于重新设置每个单元格的宽，仅在drag=true时有效|

### Table-column

| 参数      | 类型          | 说明 |
|-|-|-|
| prop      | String        | 对应列内容的字段名|
| label     | String        | 显示的标题|
| width     | String        | 对应列的宽度|
| className | String        | 对应列的类名|
| align     | String        | 对齐方式，可选 left/center/right|
| type      | String        | 对应列类型，可选 selection（多选）/index 序号/extend 扩展列|
| fixed     | Boolean/false | 固定列，可选 left/right
| sortBy    | Boolean/false | 当前列显示排序按钮
| title     | Boolean/false | 鼠标滑过单元格时显示 title 提示，仅当 table 的 title 为 false 时有效 |
| order     | number        | 用于排序|
| drag      | Boolean/true  | 允许当前单元格拖动，仅在table的drag=true时有效|

### Table-column Scoped Slot

| 参数       | 说明|
| -|-|
| slot-scope | 自定义列的内容，参数为 { row, index, extend } |

[[Toc]]
