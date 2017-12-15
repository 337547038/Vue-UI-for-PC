<!--Created by 337547038 on 2017/12/15.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Collapse Demo</h1>
        <h2>使用</h2>
        <pre>import {Collapse, Panel} from '../components/collapse/'</pre>
        <pre>
          &lt;Collapse value="1">
             &lt;Panel name="1">
                标题
                &lt;div slot="content">内容&lt;/div>
             &lt;/Panel>
             &lt;Panel name="2">
                标题2
             &lt;div slot="content">内容2&lt;/div>
             &lt;/Panel>
             &lt;Panel name="3">
                标题3
                &lt;div slot="content">内容3&lt;/div>
             &lt;/Panel>
           &lt;/Collapse></pre>
        <h3>1、基本使用</h3>
        <Collapse value="1">
            <Panel name="1">
                可同时展开多个
                <div slot="content">
                    <p>展开状态时，再点一次即可收起来</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                </div>
            </Panel>
            <Panel name="2">
                标题2
                <div slot="content">内容2</div>
            </Panel>
            <Panel name="3">
                标3
                <div slot="content">内容3</div>
            </Panel>
        </Collapse>
        <h3>2、手风琴效果</h3>
        <Collapse value="2" :accordion="true" :change="change">
            <Panel name="1">
                手风琴效果每次只能找开一个面板
                <div slot="content">内容</div>
            </Panel>
            <Panel name="2">
                change回调请在控制台查看
                <div slot="content">内容2</div>
            </Panel>
            <Panel name="3">
                标3
                <div slot="content">内容3</div>
            </Panel>
        </Collapse>
        <h2>API</h2>
        <h3>Collapse</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>value</td>
                <td>String</td>
                <td>当前激活的面板的，对应panel里的name</td>
            </tr>
            <tr>
                <td>accordion</td>
                <td>Boolean｜false</td>
                <td>风琴效果，开启后每次只能展开一个面板</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>切换回调</td>
            </tr>
        </table>
        <h3>Panel</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>name</td>
                <td>String</td>
                <td>对应Collapse里的value</td>
            </tr>
        </table>
        <h3>Panel slot</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>content</td>
                <td>描述内容</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import {Collapse, Panel} from '../components/collapse/'
    export default {
        name: 'collapse',
        path: '/collapse',
        data () {
            return {}
        },
        props: {},
        components: {Collapse, Panel},
        methods: {
            change(name){
                console.log('当前name=' + name);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>