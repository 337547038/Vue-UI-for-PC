<!--Created by 337547038 on 2017/12/21.-->
<template>
    <div class="demo">
        <comHeader name="radio"/>
        <h1>Radio Demo</h1>
        <h2>Use</h2>
        <pre>import {Radio,RadioGroup} from '../components/radio/index'</pre>
        <pre>&lt;Radio v-model="true">选项&lt;/Radio></pre>
        <h3>1、单个应用</h3>
        <div>
            <p>v-model为空时，会返回false，选中返回true</p>
            <p>
                <Radio v-model="radio1">默认，v-model="false"</Radio>
                =>{{radio1}}
            </p>
            <p>
                <Radio v-model="radio2">默认选中，v-model="true"</Radio>
                =>{{radio2}}
            </p>
            <p>
                <Radio v-model="radio3">默认选中，v-model="a"</Radio>
                =>{{radio3}}
            </p>
            <p>
                <Radio v-model="radio4">v-model=""</Radio>
                =>{{radio4}}
            </p>
            <p>
                <Radio v-model="radio5" :disabled="true">禁用disabled="true"</Radio>
                =>{{radio5}}
            </p>
            <p>
                <Radio v-model="radio6" :change="radioChange">change回调，支持v-on和v-bind</Radio>
                =>{{radio6}}
            </p>
        </div>
        <h3>2、组应用</h3>
        <div>
            <pre>&lt;RadioGroup :data="data" v-model="a2">&lt;/RadioGroup></pre>
            <pre>
                data: [
                    {text: '选项1', value: 'a1'},
                    {text: '选项2', value: 'a2'},
                    {text: '选项3', value: 'a3'},
                    {text: '选项4', value: 'a4'},
                    {text: '禁用', value: 'a5', disabled: true}
                ]
            </pre>
            <p>选中值：{{groupValue}}</p>
            <RadioGroup :data="data" v-model="groupValue" :change="groupChange"></RadioGroup>
        </div>
        <h3>3、扩展其它外观</h3>
        <p>通过添加样式实现</p>
        <div class="clearfix">
            <RadioGroup :data="data" v-model="groupValue2" :change="groupChange" class="radio-style"></RadioGroup>
        </div>
        <h2>API</h2>
        <h3>Radio</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td>v-model双向绑定，有实际值时为选中状态，空值或false都为false</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>禁用</td>
            </tr>
            <tr>
                <td>change</td>
                <td>改变事件</td>
            </tr>
        </table>
        <h3>RadioGroup</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td>v-model双向绑定</td>
            </tr>
            <tr>
                <td>data</td>
                <td>选项数据，数组</td>
            </tr>
            <tr>
                <td>change</td>
                <td>改变事件</td>
            </tr>
        </table>
        <h3>RadioGroup data</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>text</td>
                <td>显示的文本</td>
            </tr>
            <tr>
                <td>value</td>
                <td>当前选项对应的值</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>禁用当前项</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import {Radio, RadioGroup} from '../components/radio/index'
    export default {
        name: 'radio',
        path: '/radio',
        data () {
            return {
                radio1: false,
                radio2: true,
                radio3: 'a',
                radio4: '',
                radio5: true,
                radio6: false,
                data: [
                    {text: '选项1', value: 'a1'},
                    {text: '选项2', value: 'a2'},
                    {text: '选项3', value: 'a3'},
                    {text: '选项4', value: 'a4'},
                    {text: '禁用', value: 'a5', disabled: true}
                ],
                groupValue: 'a2',
                groupValue2: 'a1'
            }
        },
        props: {},
        components: {Radio, RadioGroup},
        methods: {
            radioChange(v){
                console.log('radioChange' + v);
            },
            groupChange(v){
                console.log('groupChange' + v);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
<style>
    /*扩展外观*/
    .radio-style{ }
    .radio-style .radio-box{ display: block; position: relative; width: 70px; height: 25px; line-height: 25px; float: left; margin-right: 10px; text-align: center }
    .radio-style .radio-inner{ display: block; width: 100%; height: 25px; border: 1px solid #999; border-radius: 3px; position: absolute; left: 0; top: 0; }
    .radio-style .radio-text{ position: relative;z-index: 2}
    .radio-style .radio-box input:checked + .radio-inner{ border-color: #f60; }
    .radio-style .radio-box input:checked + .radio-inner:after{ opacity: 0 }
    .radio-style .radio-box input:disabled + .radio-inner{ cursor: not-allowed;background: #ccc }
</style>