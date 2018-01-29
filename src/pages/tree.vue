<!--Created by 337547038 on 2018/1/26.-->
<template>
    <div class="demo">
        <h1>Tree Demo</h1>
        <comHeader name="tree"/>
        <h2>Use</h2>
        <pre>import treeItem from './treeItem'</pre>
        <pre>&lt;Tree :data="treeData" @click="_click">&lt;/Tree></pre>
        <pre>[
                    {
                        name: '一级1',
                        children: [
                            {
                                name: '一级1-1',
                                children: [
                                    {name: '一级1-1-1'},
                                    {
                                        name: '一级1-1-2',
                                        children: [
                                            {name: '一级1-1-2-1'}
                                        ]
                                    },
                                    {name: '一级1-1-3'}
                                ]
                            },
                            {name: '一级1-2'},
                            {
                                name: '一级1-3',
                                children: [
                                    {name: '一级1-3-1'},
                                    {name: '一级1-3-2'},
                                    {name: '一级1-3-3'},
                                    {name: '一级1-3-4'},
                                    {name: '一级1-3-5'}
                                ]
                            }
                        ]
                    },
                    {
                        name: '一级2',
                        children: [
                            {name: '一级2-1'},
                            {name: '一级2-2'},
                            {name: '一级2-3'}
                        ]
                    },
                    {
                        name: '一级3',
                        children: [
                            {name: '一级3-1'},
                            {name: '一级3-2'},
                            {name: '一级3-3'}
                        ]
                    },
                    {
                        name: '一级4'
                    }
                ]</pre>
        <h3>1、使用</h3>
        <Tree :data="treeData" @click="_click"></Tree>
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
                <td>结构数据</td>
            </tr>
            <tr>
                <td>value</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>click</td>
                <td>Function</td>
                <td>点击事件</td>
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
                <td>name</td>
                <td>String</td>
                <td>显示的名称</td>
            </tr>
            <tr>
                <td>children</td>
                <td>Array</td>
                <td>子级数据</td>
            </tr>
            <tr>
                <td>show</td>
                <td>Boolean|false</td>
                <td>是否展开</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Tree from '../components/tree/index'
    export default {
        name: 'tree',
        path: '/tree',
        data () {
            return {
                treeData: [
                    {
                        name: '一级1',
                        show: "true",
                        children: [
                            {
                                name: '一级1-1',
                                children: [
                                    {name: '一级1-1-1'},
                                    {
                                        name: '一级1-1-2',
                                        children: [
                                            {name: '一级1-1-2-1'}
                                        ]
                                    },
                                    {name: '一级1-1-3'}
                                ]
                            },
                            {name: '一级1-2'},
                            {
                                name: '一级1-3',
                                children: [
                                    {name: '一级1-3-1'},
                                    {name: '一级1-3-2'},
                                    {name: '一级1-3-3'},
                                    {name: '一级1-3-4'},
                                    {name: '一级1-3-5'}
                                ]
                            }
                        ]
                    },
                    {
                        name: '一级2',
                        children: [
                            {name: '一级2-1'},
                            {name: '一级2-2'},
                            {name: '一级2-3'}
                        ]
                    },
                    {
                        name: '一级3',
                        children: [
                            {name: '一级3-1'},
                            {name: '一级3-2'},
                            {name: '一级3-3'}
                        ]
                    },
                    {
                        name: '一级4'
                    }
                ]
            }
        },
        props: {},
        components: {Tree},
        methods: {
            _click(name){
                console.log(name);
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>