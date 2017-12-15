<!--Created by 337547038 on 2017/12/13.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Page Demo</h1>
        <h2>使用</h2>
        <pre>import Page from '../components/page/index'</pre>
        <pre>&lt;Page :total="100">&lt;/Page></pre>
        <h3>1、基本用法</h3>
        <p>当前页：{{active}}</p>
        <Page :total="99" v-model="active"></Page>
        <h3>2、其它设置</h3>
        <pre>
            &lt;Page :total="9" :showElevator="false">
            &lt;span>共9条数据&lt;/span>
            &lt;Page></pre>
        <Page :total="9" :showElevator="showElevator">
            <span>共9条数据</span>
        </Page>
        <h3>API</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td>String｜null</td>
                <td>原生div类名</td>
            </tr>
            <tr>
                <td>value</td>
                <td>Number｜1</td>
                <td>当前页码，使用v-model实现双向绑定</td>
            </tr>
            <tr>
                <td>total</td>
                <td>Number｜0</td>
                <td>一共多少条数据</td>
            </tr>
            <tr>
                <td>pageSize</td>
                <td>Number｜10</td>
                <td>每页条数</td>
            </tr>
            <tr>
                <td>showElevator</td>
                <td>Boolean｜true</td>
                <td>显示快速切换到某一页</td>
            </tr>
            <tr>
                <td>showNum</td>
                <td>Number｜10</td>
                <td>点击折叠向前或向后一次跳多少页</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>页码改变的回调，返回改变后的页码。相当于监听当前页面的v-model</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>slot内容前勾子</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Page from '../components/page/index'
    export default {
        name: 'page',
        path: '/page',
        data () {
            return {
                active:1,
                showElevator:false
            }
        },
        components: {Page},
        mounted(){
        },
        methods: {},
        computed: {},
        filters: {}
    }
</script>