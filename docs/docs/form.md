<!-- Created by 337547038 on 2018/8/15 0015. -->
<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
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
      },
      rules: {
        name: [
          {type: 'required', msg: '请输入用户名'},
          {type: 'maxLength', len: 6, msg: '最大6个字符'},
          {type: 'minLength', len: 3, msg: '不能小于3'}
        ],
        password: [
          {type: 'required', msg: '请输入密码'}
        ],
        mobile: [
          {type: 'required', msg: '请输入手机号'},
          {type: 'mobile', msg: '手机号格式不正确'}
        ],
        mail: [
          {type: 'mail', msg: '邮箱格式不正确'}
        ],
        digits: [
          {type: 'tips', msg: '获得焦点时提示'},
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
        cascader: [
          {type: 'required', msg: '联动选择不能为空'}
        ],
        select: [
          {type: 'required', msg: '下拉不能为空'}
        ],
        checkbox: [
          {type: 'required', msg: '必须同意协议'}
        ],
        checkboxGroup: [
          {type: 'required', msg: '请选择爱好'}
        ],
        switch: [
          {type: 'required', msg: 'switch请按选择'}
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
      },
      radioData: [
        {label: '男', value: '0'},
        {label: '女', value: '1'}
      ],
      groupData: [
        {value: '美食'},
        {value: '游戏'}
      ],
      backForm: {
        password1: '',
        password2: ''
      },
      backRules: {
        password1: [
          {type: 'required', msg: '密码不能为空'}
        ],
        password2: [
          {type: 'required', msg: '密码不能为空'},
          {
            type: 'fn',
            msg: '两次输入的密码不一致',
            validator: value => {
              if (value === this.backForm.password1) {
                return true
              } else {
                return false
              }
            }

          }
        ]
      },
      userName1: '',
      password1: '',
      form4: {
        age: ''
      },
      rules4: {
        age: [
          {type: 'required', msg: '年龄不能为空'},
          {type: 'rule', msg: '年龄必须大于1岁，且不能超过120岁', rule: '/^(?:[1-9][0-9]?|1[01][0-9]|120)$/'}
        ]
      },
      options: [
        {label: '选项1', value: '1'},
        {label: '选项2', value: '2'},
        {label: '选项3', value: '3'},
        {label: '选项4', value: '4', disabled: true},
        {label: '选项5', value: '5'},
        {value: '6'},
        {label: '选项7', value: '7'},
        {label: '选项8', value: '8'},
        {label: '选项9', value: '9'},
        {label: '选项10', value: '10'}
      ],
      form5: '5',
      form6: {
        name: '',
        password: ''
      }
    }
  },
  components: {},
  mounted () {
  },
  methods: {
    submitForm () {
      this.$refs.ruleForm.validate()
        .then(res => {
          console.log('通过验证')
          console.log(res)
        })
        .catch(res => {
          console.log('不通过')
          console.log(res)
        })
    },
    submitForm2 () {
      const props = ['name', 'password']
      this.$refs.ruleForm.validate(props)
        .then(res => {
          console.log('通过验证')
          console.log(res)
        })
        .catch(res => {
          console.log('不通过')
          console.log(res)
        })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },
    submitBackForm () {
      this.$refs.backForm.validate()
        .then(res => {
          console.log('通过验证')
          console.log(res)
        })
        .catch(res => {
          console.log('不通过')
          console.log(res)
        })
    },
    submitForm3 () {
      this.$refs.setTips.setTips('tips', '输入提示')
    },
    submitForm6 () {
      this.$refs.quickForm.validate()
        .then(res => {
          console.log('通过验证')
          console.log(res)
        })
        .catch(res => {
          console.log('不通过')
          console.log(res)
        })
    }
  }
}
</script>

# Form 表单
## Use

### 1、常见表单
:::demo 
```html
<template>
  <div>
    <ak-form>
      <ak-form-item label="用户名">
        <ak-input placeholder="请输入用户名" v-model="userName1"></ak-input>
      </ak-form-item>
      <ak-form-item label="密码">
        <ak-input placeholder="请输入密码" type="password" v-model="password1"></ak-input>
      </ak-form-item>
    </ak-form>
  </div>
</template>
<script>
export default{
  data () {
    return {
      userName1: '',
      password1: ''
    }
  }
}
</script>
```
:::

### 2、表单验证
:::demo 内置常见验证类型`digits`正整数，`number`小数，`mobile`手机号，`mail`邮箱，`tel`电话，`fax`传真
```html
<template>
  <div>
    <ak-form :rules="rules" ref="ruleForm" v-model="ruleForm">
      <ak-form-item label="用户名" prop="name">
        <ak-input v-model="ruleForm.name" placeholder="请输入用户名"></ak-input>
      </ak-form-item>
      <ak-form-item label="密码" prop="password">
        <ak-input v-model="ruleForm.password" placeholder="请输入密码" type="password"></ak-input>
      </ak-form-item>
      <ak-form-item prop="mobile">
        <div slot="label">手机号</div>
        <ak-input v-model="ruleForm.mobile"></ak-input>
      </ak-form-item>
      <ak-form-item prop="mail" label="邮箱">
        <ak-input v-model="ruleForm.mail"></ak-input>
      </ak-form-item>
      <ak-form-item prop="digits" label="digits">
        <ak-input v-model="ruleForm.digits"></ak-input>
      </ak-form-item>
      <ak-form-item prop="number" label="number">
        <ak-input v-model="ruleForm.number"></ak-input>
      </ak-form-item>
      <ak-form-item prop="tel" label="tel">
        <ak-input v-model="ruleForm.tel"></ak-input>
      </ak-form-item>
      <ak-form-item label="城市" class="city-item">
        <ak-form-item prop="city">
          <ak-input v-model="ruleForm.city" class="width"></ak-input>
        </ak-form-item>
        <ak-form-item prop="area">
          <ak-input v-model="ruleForm.area" class="width"></ak-input>
        </ak-form-item>
      </ak-form-item>
      <ak-form-item label="联动选择" prop="cascader">
          <ak-cascader v-model="ruleForm.cascader" placeholder="请选择"></cascader>
      </ak-form-item>
      <ak-form-item label="radio" prop="radio">
         <ak-radio-group v-model="ruleForm.radio" :data="radioData"></ak-radio-group>
      </ak-form-item>
      <ak-form-item label="checkbox" prop="checkboxGroup">
         <ak-checkbox-group v-model="ruleForm.checkboxGroup" :data="groupData"></ak-checkbox-group>
      </ak-form-item>
      <ak-form-item prop="select" label="select">
         <ak-select :options="options" v-model="ruleForm.select" :clear="true" placeholder="请选择"></ak-select>
        </ak-form-item>
      <ak-form-item label="textarea" prop="textarea" class="auto-height">
         <ak-textarea v-model="ruleForm.textarea"></ak-textarea>
      </ak-form-item>
      <ak-form-item label="datePicker" prop="datePicker">
         <ak-date-picker v-model="ruleForm.datePicker" placeholder="请选择"></ak-date-picker>
      </ak-form-item>
      <ak-form-item label="switch" prop="switch">
         <ak-switch v-model="ruleForm.switch"></ak-switch>
      </ak-form-item>
      <ak-form-item prop="checkbox">
         <ak-checkbox v-model="ruleForm.checkbox">我已阅读并同意……</ak-checkbox>
      </ak-form-item>
    </ak-form>
    <ak-button @click="submitForm" type="primary">提交</ak-button>
    <ak-button @click="submitForm2" type="primary">仅对用户名密码验证</ak-button>
    <ak-button @click="resetForm">重置表单</ak-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        name: '',
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
        datePicker:''
      },
      rules: {
        name: [
          {type: 'required', msg: '请输入用户名'},
          {type: 'maxLength', len: 6, msg: '最大6个字符'},
          {type: 'minLength', len: 3, msg: '不能小于3'}
        ],
        password: [
          {type: 'required', msg: '请输入密码'}
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
          {type: 'required', msg: '请选择爱好'}
        ],
        switch: [
          {type: 'required', msg: 'switch请按选择'}
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
      },
      radioData: [
        {text: '男', value: '0'},
        {text: '女', value: '1'}
      ],
      groupData: [
        {value: '美食'},
        {value: '游戏'}
      ]
    }
  },
  components: {},
  methods: {
    submitForm () {
          this.$refs.ruleForm.validate()
            .then(res => {
              console.log('通过验证')
              console.log(res)
            })
            .catch(res => {
              console.log('不通过')
              console.log(res)
            })
        },
        submitForm2 () {
          const props = ['name', 'password']
          this.$refs.ruleForm.validate(props)
            .then(res => {
              console.log('通过验证')
              console.log(res)
            })
            .catch(res => {
              console.log('不通过')
              console.log(res)
            })
        },
        resetForm () {
          this.$refs.ruleForm.resetFields()
        }
  }
}
</script>

<style>
.width .ak-input-control{width: 150px;}
.city-item .ak-form-item{margin-bottom: 0}
</style>
```
:::

### 3、回调验证
:::demo 
```html
<template>
  <div>
    <ak-form :rules="backRules" v-model="backForm" ref="backForm">
      <ak-form-item prop="password1" label="密码">
        <ak-input v-model="backForm.password1"></ak-input>
      </ak-form-item>

      <ak-form-item prop="password2" label="确认密码">
        <ak-input v-model="backForm.password2"></ak-input>
      </ak-form-item>
    </ak-form>
    <ak-button @click="submitBackForm" type="primary">提交</ak-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      backForm: {
        password1: '',
        password2: ''
      },
      backRules: {
        password1: [
          {type: 'required', msg: '密码不能为空'}
        ],
        password2: [
          {type: 'required', msg: '密码不能为空'},
          {
            type: 'fn',
            msg: '两次输入的密码不一致',
            validator: value => {
              if (value === this.backForm.password1) {
                return true
              } else {
                return false
              }
            }

          }
        ]
      }
    }
  }
  methods: {
      submitBackForm () {
        this.$refs.backForm.validate()
          .then(res => {
            console.log('通过验证')
            console.log(res)
          })
          .catch(res => {
            console.log('不通过')
            console.log(res)
          })
      }
  }
}
</script>
```
:::

### 4、自定义验证规则
:::demo 
```html
<template>
  <div>
    <ak-form :rules="rules4" v-model="form4" ref="form4">
      <ak-form-item prop="age" label="年龄">
        <ak-input v-model="form4.age"></ak-input>
      </ak-form-item>
    </ak-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form4: {
        age: ''
      },
      rules4: {
        age: [
          {type: 'required', msg: '年龄不能为空'},
          {type: 'rule', msg: '年龄必须大于1岁，且不能超过120岁', rule: '/^(?:[1-9][0-9]?|1[01][0-9]|120)$/'}
        ]
      }
    }
  }
}
</script>
```
:::

### 5、单独使用formItem
:::demo 单独使用时仅用于输出结构，不能进行验证，且部分参数无效
```html
<template>
  <div>
      <ak-form-item label="年龄" ref="setTips">
        <ak-input v-model="form5"></ak-input>
      </ak-form-item>
      <ak-button @click="submitForm3" type="primary">设置验证信息</ak-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form5: '5'
    }
  },
  methods(){
    submitForm3() {
      this.$refs.setTips.setTips('tips','输入提示')
    }
  }
}
</script>
```
:::

### 6、快速验证
:::demo 对于大量的表单验证不需要精确提示时，如验证为空时统一提示为必填字段，可通过`formItem`设置`verify`，从个用逗号隔开
```html
<template>
  <div>
      <ak-form ref="quickForm">
        <ak-form-item prop="password1" label="用户名" verify="mail">
          <ak-input v-model="form6.name"></ak-input>
        </ak-form-item>
  
        <ak-form-item prop="password2" label="确认密码" verify="required,digits">
          <ak-input v-model="form6.password"></ak-input>
        </ak-form-item>
      </ak-form>
      <ak-button @click="submitForm6" type="primary">按钮提交</ak-button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      form6: {
       name:'',
       password:''
      }
    }
  },
  methods(){
    submitForm6 () {
      this.$refs.quickForm.validate()
      .then(res=>{
          console.log('通过验证')
          console.log(res)
      })
      .catch(res=>{
          console.log('不通过')
          console.log(res)
      })
    }
  }
}
</script>
```
:::

## API
### Form
|参数|类型|说明|
|-|-|-|
|rules          | object         |表单验证规则|
|value          | object         |表单数据对象，即所有表单的值。不需要验证表单时可不填|
|showMessage    | boolean/true   |是否显示校验错误信息|
|trigger        | String         |触发验证类型，change和blur两种，默认change，仅对input|
|labelWidth     | String         |表单域标签的宽度|

### Form Methods
|参数|类型|说明|
|-|-|-|
|validate       |对表单进行校验的方法，promise方法（是否通过验证，未通过时为所有未通过检验的错误提示；通过时返回value值），带参数prop时对指定字段校验|
|resetFields    |表单重置方法|

### FormItem
|参数|类型|说明|
|-|-|-|
|prop           | String         |表单域字段，在使用表单验证时必填写，对应验证规则|
|label          | String         |标签文本|
|className      | String         |class类名|
|required       | boolean/true  |是否根据验证规则自动生成必填样式名|
|verify         | String         |快速验证，支持required, mobile, tel, mail, digits, number 多个用逗号隔开|

### FormItem Rules 验证规则
|类型|说明|
|-|-|
|required       |为空|
|maxLength      |最大字符|
|minLength      |最小字符|
|mobile         |手机号格式|
|tel            |固话|
|mail           |邮箱格式|
|digits         |正整数|
|number         |数字|
|tips           |获得焦点且值为空时显示输入提示|


[[Toc]]
