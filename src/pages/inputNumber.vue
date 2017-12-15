<!--Created by 337547038 on 2017/12/14.-->
<template>
    <div class="demo">
        <h1>InputNumber Demo</h1>
        <h2>使用</h2>
        <pre>import InputNumber from '../components/inputNumber/index'</pre>
        <pre>&lt;InputNumber v-model="value" :max="10">&lt;/InputNumber></pre>
        <h3>1、基本用法</h3>
        <InputNumber :max="10"></InputNumber>
        <h3>2、数据绑定</h3>
        <p>当前值：{{value}}</p>
        <p>通过change回调值：{{callBack}}</p>
        <InputNumber v-model="value" :change="change" :step="2" :max="10"></InputNumber>
        <h3>3、禁用状态</h3>
        <p>禁用时不显示控制按钮</p>
        <InputNumber :disabled="disabled"></InputNumber>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td>null</td>
                <td>div原生class</td>
            </tr>
            <tr>
                <td>value</td>
                <td>Number｜1</td>
                <td>文本值，通过v-model双向绑定</td>
            </tr>
            <tr>
                <td>min</td>
                <td>Number｜0</td>
                <td>最小值</td>
            </tr>
            <tr>
                <td>max</td>
                <td>Number｜0</td>
                <td>最大值</td>
            </tr>
            <tr>
                <td>step</td>
                <td>Number｜1</td>
                <td>每次增加或减少的数</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean｜false</td>
                <td>禁用状态</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>改变回调</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import InputNumber from '../components/inputNumber/index'
    export default {
        name: 'inputNumber',
        path: '/inputNumber',
        data(){
            return {
                value: 1,
                callBack: '',
                disabled:true
            }
        },
        props: [],
        mounted(){
        },
        components: {InputNumber},
        methods: {
            change(v){
                this.callBack = v
            }
        },
        computed: {}
    }
</script>