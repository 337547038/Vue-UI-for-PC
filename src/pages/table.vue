<!--Created by 337547038 on 2017/12/11.-->
<template>
    <div class="demo">
        <h1>Table Demo</h1>
        <h2>使用</h2>
        <pre>
           import dateTable from '../components/table/index'
        </pre>
        <pre>
            &lt;dateTable :columns="columns1" :data="data1">&lt;/dateTable>
        </pre>
        <h3>1、基础用法</h3>
        <dateTable :columns="columns1" :data="data1"></dateTable>
        <h3>2、外观样式设置</h3>
        <p>stripe:false没有奇偶分隔</p>
        <p>hover:false鼠标经过不显示高亮</p>
        <p>border:false竖向没有边框</p>
        <dateTable :columns="columns1" :data="data1" :stripe="stripe" :border="border" :hover="hover"></dateTable>
        <h3>3、列设置</h3>
        <pre>
            //对单元格address设置<br>
            width:'100px',//设置单元格宽<br>
            className:'col',//为单元格设置样式<br>
            ellipsis:true//文本不换行<br>
            //对age添加单位<br>
            render: (h, v)=> {<br>
                            return h('div', v + '岁')//会创建一个div，也可以为创建的div添加一个样式return h('div',{attrs:{className:'aa'}}, v + '岁')<br>
                        }
        </pre>
        <p>render其实就是编译后的写法，如果是组件则</p>
        <pre>
             return h('Icon', {<br>
                             props: {//props为当前组件的参数<br>
                             type: 'person'<br>
                              }<br>
                            });
        </pre>
        <dateTable :columns="columns2" :data="data1"></dateTable>
        <h2>API</h2>
        <h3>Table</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td></td>
                <td>String</td>
                <td>表格原生的所有属性，如width,class...</td>
            </tr>
            <tr>
                <td>columns</td>
                <td>Array</td>
                <td>表格配置</td>
            </tr>
            <tr>
                <td>data</td>
                <td>Array</td>
                <td>结构数据</td>
            </tr>
            <tr>
                <td>showHeader</td>
                <td>Boolean | true</td>
                <td>是否显示表头</td>
            </tr>
            <tr>
                <td>stripe</td>
                <td>Boolean | true</td>
                <td>是否显示间隔斑马纹。实际是在表格添加样式table-stripe，然后通过样式控制。当然也可以直接通过在表格添加样式实现</td>
            </tr>
            <tr>
                <td>border</td>
                <td>Boolean | true</td>
                <td>表格竖向边框，也是添加样式table-border，同上</td>
            </tr>
            <tr>
                <td>hover</td>
                <td>Boolean | true</td>
                <td>鼠标悬停时的高亮。同样是添加样式table-hover，同上</td>
            </tr>
        </table>
        <h3>columns</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>title</td>
                <td>String</td>
                <td>列头显示文字</td>
            </tr>
            <tr>
                <td>key</td>
                <td>String</td>
                <td>对应列内容的字段名</td>
            </tr>
            <tr>
                <td>width</td>
                <td>String</td>
                <td>列宽。需带单位如px/%</td>
            </tr>
            <tr>
                <td>className</td>
                <td>String</td>
                <td>列的样式名称</td>
            </tr>
            <tr>
                <td>align</td>
                <td>String</td>
                <td>对齐方式，可选值为 left 左对齐、right 右对齐和 center 居中对齐</td>
            </tr>
            <tr>
                <td>ellipsis</td>
                <td>Boolean | false</td>
                <td>开启后，文本将不换行，超出部分显示为省略号</td>
            </tr>
            <tr>
                <td>render</td>
                <td>Function</td>
                <td>自定义渲染列，使用 Vue 的 Render 函数。传入两个参数，第一个是 h，第二个为当前单元格数据</td>
            </tr>
        </table>
    </div>
</template>
<script type="text/ecmascript-6">
    import dateTable from '../components/table/index'
    export default {
        name: 'table',
        path: '/table',
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    }
                ],
                data1: [
                    {
                        name: ' A John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'B Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'A Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'C Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ],
                showHeader: true,//是否显示表头
                stripe: false,//是否显示间隔斑马纹，下面三个也可以直接通过添加样式实现
                border: false,//是否显示纵向边框
                hover: false,//鼠标悬停时的高亮,
                columns2: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        render: (h, v)=> {
                            return h('div', v + '岁')
                        }
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width: '100px',//设置单元格宽
                        className: 'col',//为单元格设置样式
                        ellipsis: true//文本不换行
                    }
                ]
            }
        },
        components: {dateTable},
        mounted(){
        },
        methods: {},
        computed: {},
        filters: {}
    }
</script>
<style>
    .col{ background: #2d8cf0 !important; }
</style>