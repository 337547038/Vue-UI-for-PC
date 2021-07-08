<!-- Created by 337547038 on 2021/6/18 0018. -->

# AutoForm 表单

通过json数据快速创建表单，支持格栅和tabs布局

### 基本使用

```vue demo
<template>
  <div>
    <ak-auto-form :data="data" ref="autoFormEl" />
    <ak-button @click="submit">submit</ak-button>
    <ak-button @click="setValue">setValue</ak-button>
    <ak-button @click="reset">reset</ak-button>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const data = [
      {
        type: 'input',
        name: 'test',
        formItem: {
          label: 'test'
        },
        control: {
          value: ''
        }
      },
      {
        type: 'input',
        name: 'userName',
        formItem: {
          label: 'userName'
        },
        control: {
          value: ''
        },
        rules: [
          {type: 'required', msg: '请输入用户名'}
        ]
      },
      {
        type: 'password',
        name: 'password',
        formItem: {
          label: 'password'
        },
        control: {
          value: '123'
        },
        rules: [
          {type: 'required', msg: '请输入用户名'}
        ]
      },
      {
        type: 'grid',
        columns: [
          {
            span: 12,
            controlList: [
              {
                type: 'input',
                name: 'userName2',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: ''
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          },
          {
            span: 6,
            controlList: []
          },
          {
            span: 6,
            controlList: []
          }
        ]
      }
    ]
    const autoFormEl = ref()
    const submit = () => {
      autoFormEl.value.validate()
        .then(res => {
          console.log(res)
        })
        .catch(res => {
          console.log(res)
        })
    }
    const setValue = () => {
      autoFormEl.value.setValue({userName: '12345'})
    }
    const reset=()=>{
      autoFormEl.value.resetForm()
    }
    return {
      data,
      submit,
      autoFormEl,
      setValue,
      reset
    }
  }
}
</script>

```

### 格栅布局

```vue demo
<template>
  <div>
    <ak-auto-form :data="data" />
  </div>
</template>
<script>
export default {
  setup() {
    const data = [
      {
        type: 'input',
        name: 'test',
        formItem: {
          label: 'test'
        },
        control: {
          value: ''
        }
      },
      {
        type: 'grid',
        columns: [
          {
            span: 6,
            controlList: [
              {
                type: 'input',
                name: 'userName2',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: ''
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          },
          {
            span: 6,
            controlList: [
              {
                type: 'select',
                name: 'userName2',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: '',
                  placeholder: '请选择',
                  options: [
                    {label: '选项', value: 1}
                  ]
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          },
          {
            span: 12,
            controlList: [
              {
                type: 'radio',
                name: 'userName3',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: '',
                  placeholder: '请选择',
                  options: [
                    {label: '选项1', value: 'a1'}
                  ]
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          }
        ]
      }
    ]
    return {
      data
    }
  }
}
</script>

```

### Tabs布局

```vue demo

<template>
  <div>
    <ak-auto-form :data="data" />
  </div>
</template>
<script>
export default {
  setup() {
    const data = [
      {
        type: 'input',
        name: 'test',
        formItem: {
          label: 'test'
        },
        control: {
          value: ''
        }
      },
      {
        type: 'grid',
        columns: [
          {
            span: 6,
            controlList: [
              {
                type: 'input',
                name: 'userName2',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: ''
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          },
          {
            span: 6,
            controlList: [
              {
                type: 'select',
                name: 'userName2',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: '',
                  placeholder: '请选择',
                  options: [
                    {label: '选项', value: 1}
                  ]
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          },
          {
            span: 12,
            controlList: [
              {
                type: 'radio',
                name: 'userName3',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: '',
                  placeholder: '请选择',
                  options: [
                    {label: '选项1', value: 'a1'}
                  ]
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          }
        ]
      },
      {
        type: 'tabs',
        columns: [
          {
            tabs: {
              label: '选项1'
            },
            controlList: [
              {
                type: 'input',
                name: 'userName2',
                formItem: {
                  label: 'userName'
                },
                control: {
                  value: ''
                },
                rules: [
                  {type: 'required', msg: '请输入用户名'}
                ]
              }
            ]
          },
          {
            tabs: {
              label: '选项2'
            },
            controlList: [
              {
                type: 'input',
                name: 'userName2',
                formItem: {
                  label: 'userName1'
                },
                control: {
                  value: ''
                }
              },
              {
                type: 'input',
                name: 'userName5',
                formItem: {
                  label: 'userName2'
                },
                control: {
                  value: ''
                }
              }
            ]
          }
        ]
      }
    ]
    return {
      data
    }
  }
}
</script>
```

## API

### AutoForm Props

|参数|类型|说明|
|----------|--------------|--------|
|data           | object         |表单数据|
|showMessage    | boolean/true   |显示错误提示|
|trigger        | string/change  |表单控件校验触发类型，change和blur两种|
|labelWidth     | string         |label的宽度|
|required       | boolean/true   |是否根据验证规则自动生成必填样式名|

### AutoForm Methods

|参数|说明|
|----------|--------|
|validate       |对单个表单项进行校验的方法，Promise返回验证结果|
|resetForm      |重置表单|
|setValue       |使用resetForm功能时，当表单数据发生改变，需使用setValue设置|

### AutoForm Data

|参数|类型|说明|
|----------|--------------|--------|
|type           | string         |组件类型，支持input,radio,checkbox,datePicker,select,switch,textarea,grid,tabs|
|name           | string   | 用单字段名，唯一性|  
|formItem       | object   |组件formItem的props|
|control        | object   |对应类type型的props|
|columns        | array    |type=grid/tabs时有效，用于布局，表多分多少列/有多少tabs|
|columns.span   | number   |type=grid时有效，当前栏的宽度比例|
|columns.tabs   | object   |type=tabs时有效，tabs的相关props|
|columns.controlList | array   |type=grid/tabs时有效，当前列下所有组件|
