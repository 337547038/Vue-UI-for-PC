<!--Created by 337547038 on 2018/1/30.-->
<template>
    <div class="demo">
        <h1>Transfer Demo</h1>
        <comHeader name="transfer"/>
        <h2>Use</h2>
        <pre>import Transfer from '../components/transfer/index'</pre>
        <pre>&lt;Transfer :data="data" v-model="value" :titles="['列表左','列表右']">&lt;/Transfer></pre>
        <pre>
            [
                {
                   key: 1,
                   name: '选项1',
                   disabled: false
                },
                {
                   key: 2,
                   name: '选项2',
                   disabled: true
                }
            ]</pre>
        <h3>1、使用</h3>
        <p>选中值：{{value}}</p>
        <Transfer :data="_transferData()" v-model="value" :titles="['列表左','列表右']"></Transfer>
        <h3>2、使用</h3>
        <Transfer :data="_transferData()" v-model="value2" :titles="['列表1','列表2']" :btnText="['向右','向左']" @change="_change"></Transfer>
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
                <td>列表数据</td>
            </tr>
            <tr>
                <td>value</td>
                <td>Array</td>
                <td>选项值，通过v-model绑定</td>
            </tr>
            <tr>
                <td>titles</td>
                <td>Array</td>
                <td>列表标题文本</td>
            </tr>
            <tr>
                <td>btnText</td>
                <td>Array</td>
                <td>方向控制文本</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>切换事件，带两个参数（方向(0向左,1向右)，value）</td>
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
                <td>key</td>
                <td>String</td>
                <td>选项对应唯一值</td>
            </tr>
            <tr>
                <td>name</td>
                <td>String</td>
                <td>选项名称</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean|false</td>
                <td>是否禁用</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Transfer from '../components/transfer/index'
    export default {
        name: 'transfer',
        path: '/transfer',
        data () {
            return {
                value: [1, 4],
                value2: [4]
            }
        },
        props: {},
        components: {Transfer},
        methods: {
            _transferData(){
                let data = [];
                for (let i = 1; i < 15; i++) {
                    data.push({
                        key: i,
                        name: `选项${i}`,
                        disabled: i % 4 === 0
                    })
                }
                return data;
            },
            _change(d,v){
                console.log(d);
                console.log(v);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>