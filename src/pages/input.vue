<!--Created by 337547038 on 2017/12/18.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Input Demo</h1>
        <h2>Use</h2>
        <pre>import Input from '../components/input/index'</pre>
        <pre>&lt;Input placeholder="双向绑定" v-model="value">&lt;/Input></pre>
        <p>在原生的基础上扩展了些功能</p>
        <p>添加文本框清空，密码框反显密码等</p>
        <p>&nbsp;</p>
        <h2>Demo</h2>
        <div class="input">
            <gInput placeholder="双向绑定" v-model="value"></gInput>
            {{value}}
        </div>
        <div class="input">
            <gInput placeholder="显示清空按钮" :icon="true" v-model="value2"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="显示清空按钮" :icon="true" value="显示清空按钮(默认有值时)"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="disabled" :disabled="true"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="readonly" :readonly="true"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="请输入密码" :icon="true" value="请输入密码" type="password"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="请输入密码" :icon="true" type="password"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="获得焦点事件(控制台输出)" @focus="_focus"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="失去焦点事件(控制台输出)" @blur="_blur"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="input事件(控制台输出)" @input="_input"></gInput>
        </div>
        <div class="input">
            <gInput placeholder="keyup，keydown事件(控制台输出)" @keyup="_keyup" @keydown="_keydown"></gInput>
        </div>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td></td>
                <td>input外层div类名</td>
            </tr>
            <tr>
                <td>type</td>
                <td>String｜text</td>
                <td>输入框类型，常见text、password</td>
            </tr>
            <tr>
                <td>value</td>
                <td>String</td>
                <td>绑定的值，使用v-model双向绑定</td>
            </tr>
            <tr>
                <td>placeholder</td>
                <td>String</td>
                <td></td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean｜false</td>
                <td>禁用</td>
            </tr>
            <tr>
                <td>readonly</td>
                <td>Boolean｜false</td>
                <td>只读</td>
            </tr>
            <tr>
                <td>maxlength</td>
                <td>Number｜50</td>
                <td>最大长度</td>
            </tr>
            <tr>
                <td>icon</td>
                <td>Boolean｜false</td>
                <td>text显示清除按钮，密码框时显示眼睛，点击可显示密码</td>
            </tr>
            <tr>
                <td>input</td>
                <td></td>
                <td>事件</td>
            </tr>
            <tr>
                <td>blur</td>
                <td></td>
                <td>事件</td>
            </tr>
            <tr>
                <td>focus</td>
                <td></td>
                <td>事件</td>
            </tr>
            <tr>
                <td>keyup</td>
                <td></td>
                <td>事件</td>
            </tr>
            <tr>
                <td>keydown</td>
                <td></td>
                <td>事件</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import gInput from '../components/input/index'
    export default {
        name: 'input',
        path: '/input',
        data(){
            return {
                value: 'v-model双向绑定',
                value2:'00'
            }
        },
        props: [],
        mounted(){
        },
        components: {gInput},
        methods: {
            _focus(e){
                console.log(e)
            },
            _blur(e){
                console.log(e)
            },
            _input(e){
                //todo 这input与其它的不太一致，直接就可以用？
                console.log(e)
            },
            _keyup(e){
                console.log(e)
            },
            _keydown(e){
                console.log(e)
            }
        },
        computed: {}
    }
</script>
<style scoped>
    .input{ margin-bottom: 10px }
</style>