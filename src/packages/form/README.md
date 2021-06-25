<!-- Created by 337547038 on 2021/6/18 0018. -->

# Form 表单

### 基本使用

```vue demo
<template>
  <div>
    <ak-form v-model="formValue" :rules="formRules" ref="formEl">
      <ak-form-item label="userName" prop="userName">
        <ak-input v-model="formValue.userName" placeholder="请输入用户名" />
      </ak-form-item>
      <ak-form-item label="password" prop="password">
        <ak-input v-model="formValue.password" placeholder="请输入密码" />
      </ak-form-item>
      <ak-form-item label="password2" prop="password2">
        <ak-input v-model="formValue.password2" placeholder="请再次输入密码" />
      </ak-form-item>
    </ak-form>
    <ak-button @click="submit" type="primary">submit</ak-button>
    <ak-button @click="resetForm">reset</ak-button>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const formValue = ref({
      password: '',
      password2: '',
      userName: ''
    })
    const formRules = {
      password: [
        {type: 'required', msg: '密码不能为空'},
        {type: 'minLength', len: 6, msg: '密码不能小于6位'}
      ],
      password2: [
        {type: 'required', msg: '密码2不能为空'},
        {
          type: 'fn',
          msg: '两次输入的密码不一致',
          validator: val => {
            return val === formValue.value.password
          }
        }
      ],
      userName: [
        {type: 'required', msg: '用户名不能为空'}
      ]
    }
    const formEl = ref()
    // 重置
    const resetForm = () => {
      formEl.value.resetForm()
    }
    // 表单提交
    const submit = () => {
      formEl.value.validate()
        .then(res => {
          console.log(res)
        })
        .catch(res => {
          console.log(res)
        })
    }
    return {
      formValue,
      formRules,
      submit,
      resetForm,
      formEl
    }
  }
}
</script>

```
### 表单校验
```vue demo
<template>
  <div>
    <ak-form ref="formEl" v-model="formValue" :rules="formRules">
      <ak-form-item label="用户名" prop="userName">
        <ak-input v-model="formValue.userName" placeholder="请输入用户名" />
      </ak-form-item>
      <ak-form-item label="密码" prop="password">
        <ak-input v-model="formValue.password" placeholder="请输入密码" type="password" />
      </ak-form-item>
      <ak-form-item prop="mobile">
        <template #label>手机号</template>
        <ak-input v-model="formValue.mobile" placeholder="请输入手机号" />
      </ak-form-item>
      <ak-form-item prop="mail" label="邮箱">
        <ak-input v-model="formValue.mail" placeholder="请输入邮箱地址" />
      </ak-form-item>
      <ak-form-item prop="digits" label="digits">
        <ak-input v-model="formValue.digits" />
      </ak-form-item>
      <ak-form-item prop="number" label="number">
        <ak-input v-model="formValue.number" />
      </ak-form-item>
      <ak-form-item prop="tel" label="tel">
        <ak-input v-model="formValue.tel" placeholder="请输入电话号码" />
      </ak-form-item>
      <ak-form-item label="城市">
        <ak-form-item prop="city">
          <ak-input v-model="formValue.city" />
        </ak-form-item>
        <ak-form-item prop="area">
          <ak-input v-model="formValue.area" />
        </ak-form-item>
      </ak-form-item>
      <ak-form-item label="地区选择" verify="required">
        <ak-cascader v-model="formValue.cascader" placeholder="请选择" />
      </ak-form-item>
      <ak-form-item label="radio" prop="radio">
        <ak-radio-group v-model="formValue.radio" :options="options" />
      </ak-form-item>
      <ak-form-item label="checkbox" prop="checkboxGroup">
        <ak-checkbox-group v-model="formValue.checkboxGroup" :options="options" />
      </ak-form-item>
      <ak-form-item prop="select" label="select">
        <ak-select v-model="formValue.select" :options="options" :clear="true" placeholder="请选择" />
      </ak-form-item>
      <ak-form-item label="textarea" prop="textarea">
        <ak-textarea v-model="formValue.textarea" />
      </ak-form-item>
      <ak-form-item label="datePicker" prop="datePicker">
         <ak-date-picker v-model="formValue.datePicker" placeholder="请选择" />
      </ak-form-item>
      <ak-form-item label="switch">
        <ak-switch v-model="formValue.switch" />
      </ak-form-item>
      <ak-form-item prop="checkbox">
        <ak-checkbox v-model="formValue.checkbox">我已阅读并同意……</ak-checkbox>
      </ak-form-item>
    </ak-form>
    <ak-button type="primary" @click="submit">提交</ak-button>
    <ak-button type="primary" @click="submit2">仅对用户名密码验证</ak-button>
    <ak-button @click="resetForm">重置表单</ak-button>
  </div>
</template>
<script>
import {ref} from 'vue'

export default {
  setup() {
    const formValue = ref({
      userName: '',
      password: '',
      mobile: '',
      mail: '',
      digits: '',
      number: '100.00',
      tel: '',
      city: '',
      area: '',
      cascader: [],
      select: '',
      checkbox: false,
      checkboxGroup: [],
      switch: false,
      textarea: '',
      radio: '',
      datePicker: ''
    })
    const options = [
      {label: '选项1', value: '1'},
      {label: '选项2', value: '2'},
      {label: '选项3', value: '3'}
    ]
    const formRules = {
      password: [
        {type: 'required', msg: '密码不能为空'},
        {type: 'minLength', len: 6, msg: '密码不能小于6位'}
      ],
      password2: [
        {type: 'required', msg: '密码2不能为空'},
        {
          type: 'fn',
          msg: '两次输入的密码不一致',
          validator: val => {
            return val === formValue.value.password
          }
        }
      ],
      userName: [
        {type: 'required', msg: '用户名不能为空'}
      ],
      mobile: [
        {type: 'required', msg: '请输入手机号'},
        {type: 'mobile', msg: '手机号格式不正确'}
      ],
      mail: [
        {type: 'mail', msg: '邮箱格式不正确'}
      ],
      digits: [
        {type: 'digits', msg: '只能输入正整数'}
      ],
      number: [
        {type: 'number', msg: '只能输入数字'}
      ],
      tel: [
        {type: 'tel', msg: '电话号码格式不正确'}
      ],
      city: [
        {type: 'required', msg: '城市不能为空'}
      ],
      area: [
        {type: 'required', msg: '地区不能为空'}
      ],
      select: [
        {type: 'required', msg: '下拉不能为空'}
      ],
      checkbox: [
        {type: 'required', msg: '必须同意协议'}
      ],
      checkboxGroup: [
        {type: 'required', msg: '不能为空'}
      ],
      textarea: [
        {type: 'required', msg: 'textarea不能为空'}
      ],
      radio: [
        {type: 'required', msg: 'radio不能为空'}
      ],
      datePicker: [
        {type: 'required', msg: '请选择日期'}
      ]
    }
    const formEl = ref()
    // 重置
    const resetForm = () => {
      formEl.value.resetForm()
    }
    // 表单提交
    const submit = () => {
      formEl.value.validate()
        .then(res => {
          console.log(res)
        })
        .catch(res => {
          console.log(res)
        })
    }
    const submit2 = () => {
      formEl.value.validate(['userName', 'password'])
        .then(res => {
          alert('验证通过')
          console.log(res)
        })
        .catch(res => {
          alert(res)
          console.log(res)
        })
    }
    return {
      formValue,
      formRules,
      submit,
      resetForm,
      formEl,
      submit2,
      options
    }
  }
}
</script>

```

## API

### Form Props
|参数|类型|说明|
|-|-|-|
|v-model        | object          |表单值|
|rules          | object          |校验规则|
|showMessage    | boolean/true   |显示错误提示|
|trigger        | string/change  |表单控件校验触发类型，change和blur两种|
|labelWidth     | string         |label的宽度|
|required       | boolean/true   |是否根据验证规则自动生成必填样式名|


### Form Methods
|参数|说明|
|-|-|
|validate       |对单个表单项进行校验的方法，Promise返回验证结果|
|resetForm      |重置表单|
|setValue       |使用resetForm功能时，当表单数据发生改变，需使用setValue设置|
