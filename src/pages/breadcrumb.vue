<!--Created by 337547038 on 2018/1/30.-->
<template>
    <div class="demo">
        <comHeader name="breadcrumb"/>
        <h1>Breadcrumb Demo</h1>
        <h2>Use</h2>
        <pre>import Breadcrumb from '../components/breadcrumb/index'</pre>
        <pre>&lt;Breadcrumb :data="data" separator="&gt;">&lt;/Breadcrumb></pre>
        <h3>1、使用</h3>
        <Breadcrumb :data="data" separator="&gt;"></Breadcrumb>
        <h3>2、使用</h3>
        <Breadcrumb :data="data" separator="/"></Breadcrumb>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>data</td>
                <td>Array</td>
                <td>数据</td>
            </tr>
            <tr>
                <td>separator</td>
                <td>String</td>
                <td>分隔字符</td>
            </tr>
        </table>
        <h2>data</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>title</td>
                <td>String</td>
                <td>显示的名称</td>
            </tr>
            <tr>
                <td>href</td>
                <td>String</td>
                <td>链接地址</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Breadcrumb from '../components/breadcrumb/index'
    export default {
        name: 'breadcrumb',
        path:'/breadcrumb',
        data () {
            return {
                data:[
                    {title:'首页',href:'/'},
                    {title:'组件演示1',href:'/'},
                    {title:'组件演示2',href:'/'},
                    {title:'面包屑',href:'/breadcrumb'}
                ]
            }
        },
        props: {},
        components: {Breadcrumb},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>