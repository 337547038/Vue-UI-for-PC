<!--Created by 337547038 on 2017/12/17.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Menu Demo</h1>
        <h2>使用</h2>
        <pre></pre>
        <pre></pre>
        <h3>1、基本使用</h3>
        <MenuNav :data="data" value="3"></MenuNav>
        <!--<div class="nav">
            <ul class="clearfix">
                <li class="active"><a href="#">首页</a></li>
                <li><a href="#">产品中心</a></li>
                <li><a href="#">联系我们</a></li>
                <li><a href="#">联系我们</a></li>
            </ul>
        </div>
        <div class="nav">
            <ul class="clearfix">
                <li class="active"><a href="#">首页</a></li>
                <li class="has-child show"><a href="#">产品中心</a>
                    <ul class="child">
                        <li><a href="">产品1</a></li>
                        <li><a href="">产品2</a></li>
                        <li><a href="">产品3</a></li>
                        <li><a href="">产品4</a></li>
                    </ul>
                </li>
                <li><a href="#">联系我们</a></li>
                <li><a href="#">联系我们</a></li>
            </ul>
        </div>-->
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
                <td></td>
            </tr>
            <tr>
                <td>mode</td>
                <td>String｜h</td>
                <td>菜单类型，可选值为 h（horizontal水平） 和 v（vertical垂直）</td>
            </tr>
            <tr>
                <td>data</td>
                <td>Array</td>
                <td>菜单数组</td>
            </tr>
            <tr>
                <td>value</td>
                <td>String</td>
                <td>激活菜单的 name 值</td>
            </tr>
            <tr>
                <td>accordion</td>
                <td>Boolean｜false</td>
                <td>是否开启手风琴模式，开启后每次至多展开一个子菜单，mode=v有效</td>
            </tr>
            <tr>
                <td>onSelect</td>
                <td>Function</td>
                <td>点击回调</td>
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
                <td>title</td>
                <td>String</td>
                <td>菜单名称</td>
            </tr>
            <tr>
                <td>href</td>
                <td>String</td>
                <td>链接url</td>
            </tr>
            <tr>
                <td>target</td>
                <td>String</td>
                <td>打开类型</td>
            </tr>
            <tr>
                <td>name</td>
                <td>String</td>
                <td>菜单项的唯一标识，不填写为当前数组序号</td>
            </tr>
            <tr>
                <td>child</td>
                <td>Array</td>
                <td>子菜单数组</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import MenuNav from '../components/menu/index'
    export default {
        name: 'menu',
        path: '/menu',
        data(){
            return {
                data: [
                    {title: '首页', href: '/'},
                    {
                        title: '产品中心', href: 'test/product.html', child: [{title: '子菜单'}, {title: '子菜单2'}]
                    },
                    {title: '关于我们', href: 'javascript:;'},
                    {title: '联系我们', href: 'javascript:;'}
                ]
            }
        },
        props: [],
        mounted(){
        },
        components: {MenuNav},
        methods: {},
        computed: {}
    }
</script>