<!--Created by 337547038 on 2017/12/17.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Menu Demo</h1>
        <h2>使用</h2>
        <pre>import MenuNav from '../components/menu/index'</pre>
        <pre>&lt;MenuNav :data="data" value="a3">&lt;/MenuNav></pre>
        <h3>说明</h3>
        <p>1、常用的菜单导航，只支持一级子菜单，非无限级；</p>
        <p>2、value=name时，当前项会添加类active；当value对应的name在子菜单里，父级当前项也会添加类active</p>
        <p>3、当child为真，当前项添加类has-child；</p>
        <p>4、当child为真及type=h，鼠标滑过添加类hover；type=v，展开添加类hover</p>
        <p>5、type=v时，当value=name时，默认为展开项</p>
        <p>6、通过css3实现交互效果动画</p>
        <h3>1、基本使用</h3>
        <MenuNav :data="data" value="a3"></MenuNav>
        <h3>2、下拉效果</h3>
        <MenuNav :data="data2" value="a6"></MenuNav>
        <h3>3、垂直方向，只允许展开一个</h3>
        <MenuNav :data="data3" value="a6" type="v" :accordion="true"></MenuNav>
        <h3>4、垂直方向，可同时展开多个</h3>
        <MenuNav :data="data3" value="a6" type="v"></MenuNav>
        <h3>5、点击触发事件</h3>
        <p>有跳转地址时，因点击后已跳转到对应页，不会响应这回调事件</p>
        <MenuNav :data="data3" :value="value5" type="v" :onSelect="onSelect"></MenuNav>
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
                <td>type</td>
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
                <td>点击回调，有跳转地址时没有回调，因点击后是跳到对应页面去了</td>
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
                    {title: '首页', href: '/', name: 'a1'},
                    {title: '产品中心', href: 'test/product.html', name: 'a2'},
                    {title: '关于我们', href: '', name: 'a3'},
                    {title: '联系我们', href: 'javascript:;', name: 'a4'}
                ],
                data2: [
                    {title: '首页', href: '/', name: 'a1'},
                    {
                        title: '产品中心', href: 'test/product.html', name: 'a2', child: [{title: '子菜单'}, {title: '子菜单2'}]
                    },
                    {title: '关于我们', href: 'javascript:;', name: 'a3'},
                    {
                        title: '联系我们', href: 'javascript:;', name: 'a4', child: [
                        {title: '联系地址1', href: ''},
                        {title: '联系地址2', href: '', name: 'a6'},
                        {title: '联系地址2', href: '', name: 'a7'}
                    ]
                    }
                ],
                data3: [
                    {title: '首页', href: '/', name: 'a1'},
                    {
                        title: '产品中心', name: 'a2', child: [{title: '子菜单',name:'a21'}, {title: '子菜单2',name:'a23'}]
                    },
                    {title: '关于我们', href: 'javascript:;', name: 'a3'},
                    {
                        title: '联系我们', href: 'javascript:;', name: 'a4', child: [
                        {title: '联系地址1', href: 'javascript:;',name:'a41'},
                        {title: '联系地址2', href: 'javascript:;', name: 'a6'},
                        {title: '联系地址2', href: 'javascript:;', name: 'a7'}
                    ]
                    }
                ],
                value5: 'a6'
            }
        },
        props: [],
        mounted(){
        },
        components: {MenuNav},
        methods: {
            onSelect(item){
                this.value5 = item.name;
            }
        },
        computed: {}
    }
</script>