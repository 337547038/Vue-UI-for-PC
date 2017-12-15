<!--Created by 337547038 on 2017/12/13.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Switch Demo</h1>
        <h2>使用</h2>
        <pre>import Switch from '../components/switch/index'</pre>
        <pre>&lt;Switch v-model="checked">&lt;/Switch></pre>
        <h3>1、基本用法</h3>
        <vSwitch v-model="checked"></vSwitch>
        　选中状态：{{checked}}
        <h3>2、自定显示文本</h3>
        <pre>
         &lt;Switch>
         &lt;span slot="open">ON&lt;/span>
         &lt;span slot="close">OFF&lt;/span>
         &lt;Switch></pre>
        <vSwitch>
            <span slot="open">ON</span>
            <span slot="close">OFF</span>
        </vSwitch>
        <vSwitch>
            <span slot="open">开</span>
            <span slot="close">关</span>
        </vSwitch>
        <h3>3、触发事件</h3>
        <p>跟在页面监听v-model的值是一样的</p>
        <vSwitch :change="change" v-model="checked2"></vSwitch>
        {{checked2}}
        <h3>4、禁用状态</h3>
        <vSwitch :disabled="disabled"></vSwitch>
        <h2>API</h2>
        <h3>Switch props</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td></td>
                <td>添加样式名</td>
            </tr>
            <tr>
                <td>value</td>
                <td>Boolean｜false</td>
                <td>指定当前是否选中，使用 v-model 双向绑定数据</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean｜false</td>
                <td>禁用状态</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>触发事件</td>
            </tr>
        </table>
        <h3>Switch slot</h3>
        <table class="table-1">
            <tr>
                <th>名称</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>open</td>
                <td>自定义显示打开时的内容</td>
            </tr>
            <tr>
                <td>close</td>
                <td>自定义显示关闭时的内容</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import vSwitch from '../components/switch/index'
    export default {
        name: 'switch',
        path: '/switch',
        data () {
            return {
                checked: false,
                checked2: true,
                disabled: true
            }
        },
        components: {vSwitch},
        mounted(){
        },
        methods: {
            change(v){
                this.checked2 = v;
            }
        },
        computed: {},
        filters: {}
    }
</script>