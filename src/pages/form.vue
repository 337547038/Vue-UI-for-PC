<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="demo">
        <comHeader name="form"/>
        <h1>Form Demo</h1>
        <h2>Use</h2>
        <pre>import gForm from '../components/form/form'</pre>
        <pre>&lt;gForm :data="data">&lt;/gForm></pre>
        <pre>
        {
            type: 'input',
            name: 'userName',
            value: this.userName,
            item: {label: "userName："},
            control: {placeholder: 'please enter your name'}
        }
        </pre>
        <h3>1、常见各种类型演示</h3>
        <gForm :data="_formData()" @input="_input" ref="form" @getValue="_getValue">
            <div slot="slotName" class="con">这里是纯文本slot</div>
            <div slot="slotForm">
                <p>测试个是通过slot进来的，验证方法需要单独处理，处理完将相关参数传给formItem显示即可</p>
                <p>通过slot引用表单元素时需要引入formItem和对应的表单控件，如input</p>
                <pre>import FormItem from '../components/form/formItem'
    import gInput from '../components/input/index'
     &lt;FormItem label="测试：" labelClass="icon-user">
        &lt;gInput v-model="v1" placeholder="这是通过slot加载进来的，不能像其它那些一样添加验证方法">&lt;/gInput>
     &lt;/FormItem></pre>
                <FormItem label="测试：" labelClass="icon-user">
                    <gInput v-model="v1" placeholder="这是通过slot加载进来的，不能像其它那些一样添加验证方法"></gInput>
                </FormItem>
            </div>
        </gForm>
        <button @click="_buttonClick" class="btn-confirm btn" >button</button>
        <pre>
         表单：
         &lt;gForm :data="_formData()" @input="_input" ref="form" @getValue="_getValue">&lt;/gForm>
         按钮：
         &lt;button @click="_buttonClick" class="btn-confirm btn" >button&lt;/button>
         事件：
         _buttonClick(){
                //触发表单提交事件
                this.$refs.form.submit();
            },
         _getValue(valueArray, tipArray){
                console.log(valueArray);
                console.log(tipArray);
            }</pre>
        <h2>API</h2>
        <h3>Form</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td></td>
                <td>原生样式</td>
            </tr>
            <tr>
                <td>data</td>
                <td>Array</td>
                <td>表单数据</td>
            </tr>
            <tr>
                <td>input</td>
                <td>Function</td>
                <td>表单事件，返回当前控件的name和value值</td>
            </tr>
            <tr>
                <td>inputBlur</td>
                <td>Boolean|true</td>
                <td>input失焦时触发验证，仅对type='input'</td>
            </tr>
            <tr>
                <td>verification</td>
                <td>Boolean|true</td>
                <td>是否对表单数据验证，方便调试</td>
            </tr>
            <tr>
                <td>submit</td>
                <td></td>
                <td>表单提交事件，通过this.$refs.form.submit()，在getValue处返回结果</td>
            </tr>
            <tr>
                <td>getValue</td>
                <td>Function</td>
                <td>
                    表单事件，返回两个值，表单数据和验证结果；表单数组为name和value对应的数组，验证结果包含了所有验证错误提示，验证结果为空时表示所有通过验证。getValue通过给表单添加ref来触发验证返回结果，如this.$refs.form.submit()
                </td>
            </tr>
        </table>
        <h3>data</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>type</td>
                <td>String</td>
                <td>
                    有以下类型：input、radio、checkbox、select、textarea、datePicker、cascader、text、slot(slot的name，此时仅有name属性，对应页面中的slot='name')、btnCode、imgCode
                </td>
            </tr>
            <tr>
                <td>name</td>
                <td>String</td>
                <td>item项的标识，表单元素改变后回调name和value，用于更新当前value的值</td>
            </tr>
            <tr>
                <td>value</td>
                <td></td>
                <td>当前项的表单元素值。type="text"，value为所要显示的文本；type="slot"时没value值</td>
            </tr>
            <tr>
                <td>item</td>
                <td>Array</td>
                <td>formItem组件参数，见formItem</td>
            </tr>
            <tr>
                <td>control</td>
                <td>Array</td>
                <td>表单元素属性，见各表单元素</td>
            </tr>
            <tr>
                <td>validate</td>
                <td>Array</td>
                <td>验证规则，详见validate验证规则</td>
            </tr>
            <tr>
                <td>other</td>
                <td>null</td>
                <td>在控件的后面添加一些说明提示文字</td>
            </tr>
            <tr>
                <td>code</td>
                <td>Array</td>
                <td>验证码相关，class和click两个参数，type='btnCode'时：text：默认显示的文本,text2:
                    点击后显示的倒计时文本，字母x会替换成剩余时间,text3:倒计时完成后显示的文本,time:倒计时间；type='imgCode'时：src为图片路径
                </td>
            </tr>
        </table>
        <h3>validate</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>type</td>
                <td>验证类型，包括required、digits、number、mobile、mail、tel、fax、rule、fn、maxLength、minLength</td>
            </tr>
            <tr>
                <td>msg</td>
                <td>验证不通过时的提示信息</td>
            </tr>
            <tr>
                <td>maxLength</td>
                <td>允许输入的最大长度，仅type=maxLength时有效</td>
            </tr>
            <tr>
                <td>minLength</td>
                <td>允许输入的最小长度，仅type=minLength时有效</td>
            </tr>
        </table>
        <h3>formItem</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td></td>
                <td>原生样式</td>
            </tr>
            <tr>
                <td>label</td>
                <td>String</td>
                <td>显示的表单字段名的label标签</td>
            </tr>
            <tr>
                <td>labelClass</td>
                <td>String</td>
                <td>label标签的样式</td>
            </tr>
            <tr>
                <td>showTip</td>
                <td>Boolean｜false</td>
                <td>是否显示验证提示</td>
            </tr>
            <tr>
                <td>tipType</td>
                <td>String｜failure</td>
                <td>验证提示类型，success和failure两种</td>
            </tr>
            <tr>
                <td>tipText</td>
                <td>String</td>
                <td>验证提示语</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import gForm from '../components/form/form'
    import FormItem from '../components/form/formItem'
    import gInput from '../components/input/index'
    export default {
        name: 'form',
        path: "/form",
        data () {
            return {
                v1: "",
                /*validate: [
                 {type: "required", msg: "用户名不能为空"},
                 {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                 {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                 ],*/
                userName: 'userName0',
                password: ''
            }
        },
        props: {},
        components: {gForm, FormItem, gInput},
        methods: {
            _formData(){
                let th = this;
                return [
                    [
                        {
                            type: 'input',
                            name: 'userName',//这个name值要等于value在data中的值，更新时是更新data中的name的值
                            value: this.userName,
                            item: {label: "userName："},
                            control: {placeholder: 'please enter your name'}
                        },
                        {
                            type: 'input',
                            name: 'userName2',
                            value: '',
                            item: {label: "userName：", class: 'auto-height'},
                            control: {placeholder: '不能为空，大于3小于10个字符'},
                            validate: [
                                {type: "required", msg: "用户名不能为空"},
                                {type: "maxLength", msg: "用户名不能超过10位", maxLength: 10},
                                {type: "minLength", msg: "用户名不能小于3个字符", minLength: 3}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'password',
                            value: this.password,
                            item: {label: 'password：'},
                            control: {type: 'password', placeholder: '请输入密码', showEye: true, clearIcon: true},
                            validate: [
                                {type: "required", msg: "密码不能为空"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'password2',
                            value: '',
                            item: {label: 'password2：'},
                            control: {type: 'password', placeholder: '请再次输入密码'},
                            validate: [
                                {type: "required", msg: "密码不能为空"},
                                {
                                    type: 'fn', msg: '两次输入密码不一致', validator(v) {
                                    if (v == th.password) {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                                }
                            ]
                        },
                        {
                            type: 'input',
                            name: 'digits',
                            value: '',
                            item: {label: 'digits：'},
                            control: {placeholder: '只能输入正整数'},
                            validate: [
                                {type: "digits", msg: "只能输入正整数"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'number',
                            value: '',
                            item: {label: 'number：'},
                            control: {placeholder: '只能输出数字和小数点'},
                            validate: [
                                {type: "number", msg: "只能输出数字和小数点"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'mobile',
                            value: '',
                            item: {label: 'mobile：'},
                            control: {placeholder: '请输入手机号码'},
                            validate: [
                                {type: "mobile", msg: "请输入手机号码"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'mail',
                            value: '',
                            item: {label: 'mail：'},
                            control: {placeholder: '请输入邮箱地址'},
                            validate: [
                                {type: "mail", msg: "请输入邮箱地址"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'tel',
                            value: '',
                            item: {label: 'tel：'},
                            control: {placeholder: '请输入电话号码'},
                            validate: [
                                {type: "tel", msg: "请输入电话号码"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'fax',
                            value: '',
                            item: {label: 'fax：'},
                            control: {placeholder: '请输入传真号码'},
                            validate: [
                                {type: "fax", msg: "请输入传真号码"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'rules',
                            value: '',
                            item: {label: 'rules：'},
                            control: {placeholder: '自定义验证规则，如年龄大小1小于120'},
                            validate: [
                                {type: "required", msg: "自定验证不能为空"},
                                {type: 'rule', msg: "年龄必须大于1岁，且不能超过120岁", rule: "/^(?:[1-9][0-9]?|1[01][0-9]|120)$/"}
                            ]
                        },
                        {
                            type: 'input',
                            name: 'fn',
                            value: '',
                            item: {label: 'fn：'},
                            control: {placeholder: '通过回调验证，输入123通过'},
                            validate: [
                                {
                                    type: "fn", msg: "其它验证", validator: function (v) {
                                    if (v == '123') {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                                }
                            ]
                        },
                        {
                            type: 'input',
                            name: 'other',
                            value: '',
                            item: {label: 'other：'},
                            control: {placeholder: 'other会添加在input后面，常见于单位或其它提示'},
                            other: '单位（kg）'
                        },
                        {
                            type: 'btnCode',
                            name: 'btnCode',
                            value: '',
                            item: {label: "inputCode："},
                            control: {placeholder: '请输入验证码'},
                            code: {
                                text: '获取验证码',
                                text2: 'x秒后重新获取',
                                text3: '重新获取',
                                time: '30',
                                class: 'btn-class',
                                click: this._inputCodeClick
                            }
                        },
                        {
                            type: 'imgCode',
                            name: 'imgCode',
                            value: '',
                            item: {label: "imgCode："},
                            control: {placeholder: '请输入验证码'},
                            code: {src: '../static/images/code.jpg', class: 'btn-class', click: this._imgCodeClick}
                        }
                    ],
                    [
                        {
                            type: 'radio',
                            name: 'sex',
                            value: '1',
                            item: {label: 'sex：'},
                            control: {
                                data: [
                                    {text: '男', value: '1'},
                                    {text: '女', value: '0'}
                                ]
                            },
                            other: '这里默认选择男'
                        },
                        {
                            type: 'radio',
                            name: 'sex2',
                            value: '',
                            item: {label: 'sex2：'},
                            control: {
                                data: [
                                    {text: '男', value: '1'},
                                    {text: '女', value: '0'}
                                ]
                            },
                            other: '没有默认值（这里的提示文字样式可通过加在form-group上）'
                        }
                    ],
                    [
                        {
                            type: 'checkbox',
                            name: 'checkbox',
                            value: ['a1', 'a3', 'a6'],
                            item: {label: 'checkbox：'},
                            control: {
                                data: [
                                    {text: '选项1', value: 'a1'},
                                    {text: '选项2', value: 'a2'},
                                    {text: '选项3', value: 'a3'},
                                    {text: '选项4', value: 'a4'},
                                    {text: '禁用', value: 'a5', disabled: true},
                                    {text: '勾选禁用', value: 'a6', disabled: true}
                                ]
                            }
                        },
                        {
                            type: 'checkbox',
                            name: 'checkbox2',
                            value: [],
                            item: {label: 'checkbox2：'},
                            control: {
                                data: [
                                    {text: '选项1', value: 'a1'},
                                    {text: '选项2', value: 'a2'},
                                    {text: '选项3', value: 'a3'},
                                    {text: '选项4', value: 'a4'}
                                ]
                            },
                            validate: [
                                {type: "required", msg: "checkbox2不能为空"}
                            ]
                        }
                    ],
                    [
                        {
                            type: 'select',
                            name: 'select',
                            value: '',
                            item: {label: 'select：'},
                            control: {
                                placeholder: '请选择',
                                option: [
                                    {text: '选项11', value: '1'},
                                    {text: '选项212', value: '2'},
                                    {text: '选项3123', value: '30', disabled: true},
                                    {text: '选项4', value: '4'},
                                    {text: '选项5', value: '5'},
                                    {text: '选项6', value: '7'},
                                    {text: '选项8', value: '8'},
                                    {text: '选项9', value: '9'}
                                ]
                            },
                            validate: [
                                {type: "required", msg: "select不能为空"}
                            ]
                        },
                        {
                            type: 'select',
                            name: 'select2',
                            value: '8',
                            item: {label: 'select2：'},
                            control: {
                                placeholder: '请选择',
                                option: [
                                    {text: '选项11', value: '1'},
                                    {text: '选项212', value: '2'},
                                    {text: '选项3123', value: '30', disabled: true},
                                    {text: '选项4', value: '4'},
                                    {text: '选项5', value: '5'},
                                    {text: '选项6', value: '7'},
                                    {text: '选项8', value: '8'},
                                    {text: '选项9', value: '9'}
                                ]
                            },
                            validate: [
                                {type: "required", msg: "select不能为空"}
                            ]
                        }
                    ],
                    [
                        {
                            type: 'textarea',
                            value: '',
                            name: 'textarea',
                            item: {label: 'textarea：', class: 'auto-height'},
                            control: {placeholder: "placeholder", width: '330px'}
                        }
                    ],
                    {
                        type: 'text',
                        value: '纯文本，纯文本时没有name属性',
                        item: {label: 'text：'},
                        control: {class: 'text'}
                    },
                    {
                        type: 'slot',
                        name: 'slotName'
                    },
                    {
                        type: 'slot',
                        name: 'slotForm'
                    },
                    {
                        type: 'datePicker',
                        value: '',
                        name: 'datePicker',
                        item: {label: 'datePicker：'},
                        control: {placeholder: '请选择日期'}
                    }
                ]
            },
            _input(k, v){
                // this[k] = v;
            },
            _inputCodeClick(){
                console.log('_inputCodeClick');
            },
            _imgCodeClick(){
                console.log('_imgCodeClick');
            },
            _buttonClick(){
                //触发表单提交事件
                this.$refs.form.submit();
            },
            _getValue(valueArray, tipArray){
                console.log(valueArray);
                console.log(tipArray);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>