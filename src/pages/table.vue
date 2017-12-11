<!--Created by 337547038 on 2017/12/11.-->
<template>
    <div class="demo">
        <h1>Table Demo</h1>
        <h2>使用</h2>
        <pre>
           import Table from '../components/table/index'
        </pre>
        <vTable class="fff" :columns="columns1" :data="data1" :hover="hover" :showHeader="showHeader"></vTable>
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
                <td>stripe</td>
                <td>Boolean | true</td>
                <td>是否显示间隔斑马纹。实际是在表格添加样式table-stripe，然后通过样式控制</td>
            </tr>
            <tr>
                <td>border</td>
                <td>Boolean | true</td>
                <td>表格竖向边框，也是添加样式table-border</td>
            </tr>
            <tr>
                <td>showHeader</td>
                <td>Boolean | true</td>
                <td>是否显示表头</td>
            </tr>
            <tr>
                <td>hover</td>
                <td>Boolean | true</td>
                <td>鼠标悬停时的高亮。同样是添加样式table-hover</td>
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
        </table>
    </div>
</template>
<script>
    import vTable from '../components/table/index'
    export default {
        name: 'table',
        path: '/table',
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: '200px',
                        className: 'first',
                        render:function (h,params) {
                            return h('div','render ok')
                        }
                        /*render:function (v) {
                            return v
                        }*/
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        align: 'center',
                        render:function (h,params) {
                            return h('div',params.age)
                        }
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        align: 'center',
                        width: '100px',
                        ellipsis: true
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ],
                stripe: true,//是否显示间隔斑马纹
                border: true,//是否显示纵向边框
                showHeader: true,//是否显示表头
                hover: true//鼠标悬停时的高亮
            }
        },
        components: {vTable},
        mounted(){
        },
        methods: {},
        computed: {},
        filters: {}
    }
</script>