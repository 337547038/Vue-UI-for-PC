<!-- Created by 337547038 on 2018/10/23 0023. -->
# AutoForm 自动表单
### 基础用法
> 基于form表单封装，方便比较有规则的表单使用。使用一组object即可快速生成带验证功能的表单
:::demo 
```html
<template>
  <div>
    <ak-auto-form :data="formData" ref="ruleForm"></ak-auto-form>
    <ak-button @click="submitForm" type="primary">提交</ak-button>
    <ak-button @click="submitForm2" type="primary">对用户名验证</ak-button>
    <ak-button @click="submitForm3" type="primary">重置</ak-button>
  </div>
</template>


<script>

export default {
  data () {
    return {
      model:{},
      formData: [
        {
          type: 'text',
          name: 'userName',
          item: {
            label: '用户名',
            className: 'item-1'
          },
          control: {
            value: '',
            placeholder: '请输入',
            change: function () {
              console.log('change')
            }
          },
          rules: [
            {type: 'required', msg: '请输入用户名'},
            {type: 'maxLength', maxLength: 6, msg: '最大6个字符'},
            {type: 'minLength', minLength: 3, msg: '不能小于3'}
          ],
          other: {
            value:'可带点击事件的提示',
            click(item){
              console.log('click')
            }
          }
        },
        {
          type: 'password',
          name: 'password',
          item: {label: '密码'},
          control: {
            value: '',
            placeholder: '请输入密码'
          },
          rules: [
            {type: 'required', msg: '请输入用户名'},
            {type: 'maxLength', maxLength: 6, msg: '最大6个字符'},
            {type: 'minLength', minLength: 3, msg: '不能小于3'}
          ]
        },
        {
          type: 'radio',
          item: {label: '单选'},
          control: {
            value: '',
            data: [
              {label: '男', value: '0'},
              {label: '女', value: '1'}
            ]
          },
          rules: [
            {type: 'required', msg: '请勾选'}
          ],
          other: {
            value:'单选使用单选组形式'
          }
        },
        {
          type: 'checkbox',
          item: {label: '多选'},
          control: {
            disabled: true,
            value: ['0'],
            data: [
              {label: '男', value: '0'},
              {label: '女', value: '1'},
              {label: '人妖', value: '3', disabled: true}
            ],
            change: function () {
              console.log('checkbox change')
            }
          },
          rules: [
            {type: 'required', msg: '请勾选'}
          ]
        },
        {
          type: 'datePicker',
          item: {label: '开始时间'},
          control: {
            value: '',
            placeholder: '请选择时间'
          },
          rules: [
            {type: 'required', msg: '请选择时间'}
          ]
        },
        {
          type: 'select',
          item: {label: '下拉选择'},
          control: {
            value: '',
            placeholder: '请选择',
            options: [
              {label: '选项1', value: '1'},
              {label: '选项2', value: '2'}
            ]
          },
          rules: [
            {type: 'required', msg: '不能为空请选择'}
          ]
        },
        {
          type: 'switch',
          item: {label: 'switch'},
          control: {
            value: true
          }
        },
        {
          type: 'textarea',
          item: {label: '文本框', className: 'auto-height'},
          control: {
            value: '',
            placeholder: '请输入'
          },
          rules: [
            {type: 'required', msg: '文本框不能为空'}
          ]
        },
        {
          type: 'txt',
          item: {
            label: '电话'
          },
          control: {
            value: '13800138000'
          }
        }
      ]
    }
  },
  components: {},
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate()
      .then(res=>{
        console.log('通过验证')
        console.log(res)
      })
      .catch(res=>{
        console.log('不通过验证')
        console.log(res)
      })
    },
    submitForm2 () {
      const props = ['userName']
      this.$refs.ruleForm.validateField(props)
      .then(res=>{
        console.log('通过验证')
        console.log(res)  
      })
      .catch(res=>{
        console.log('不通过验证')
        console.log(res)  
      })
    },
    submitForm3 () {
      this.$refs.ruleForm.resetFields()
    }
  },
  mounted () {
    setTimeout(()=>{
    console.log('--------------')
    // 模拟初始化后再对输入框进行设值
    this.$refs.ruleForm.setValue({userName:'userName'})
    },2000)
  }
}
</script>




```
:::

## API
### AutoForm
|参数|类型|说明|
|-|-|-|
|showMessage    | boolean/true   |是否显示校验错误信息|
|trigger        | String         |触发验证类型，change和blur两种，默认change，仅对input|
|data           | object         |表单数据|
|labelWidth     | String         |表单域标签的宽度|

### Form Methods
|参数|说明|
|-|-|
|setValue       |用于初始化后对表单设值|
> 其他同Form Methods ，见[formItem(点击查看)](/#/form)
### AutoForm Data
|参数|类型|说明|
|-|-|-|
|type           | String         |表单元素类型，可选text,password,radio,checkbox,datePicker,select,switch,textarea,txt|
|name           | String         |一般不需要填写，需要对指定字段验证时填写|
|item           | object         |FormItem 参数，prop无效，见[formItem(点击查看)](/#/form)|
|control        | object         |对应type类型的各表单元素参数|
|rules          | object         |见FormItem Rules 验证规则，[formItem(点击查看)](/#/form)|
|other          | String         |置于表单元素后面的提示性文字|
