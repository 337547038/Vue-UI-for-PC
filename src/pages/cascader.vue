<!--Created by 337547038 on 2017/12/26.-->
<template>
    <div class="demo">
        <comHeader name="cascader"/>
        <h1>Cascader Demo</h1>
        <h2>Use</h2>
        <pre>import Cascader from '../components/cascader/index'</pre>
        <pre>&lt;Cascader v-model="value">&lt;/Cascader></pre>
        <h2>说明</h2>
        <p>地区数据来源：使用网上省市三级联系的地区js数据</p>
        <h3>1、基本使用</h3>
        <p>当前选择：{{value1}}</p>
        <Cascader v-model="value1"></Cascader>
        <h3>2、有默认值时</h3>
        <p>当前值：{{value2}}</p>
        <Cascader v-model="value2"></Cascader>
        <h3>3、placeholder</h3>
        <p>当前值：{{value3}}</p>
        <Cascader v-model="value3" placeholder="请选择"></Cascader>
        <h3>4、disabled</h3>
        <Cascader v-model="value4" placeholder="请选择" :disabled="true"></Cascader>
        <h3>5、其它</h3>
        <pre>
            &lt;Cascader v-model="value3" placeholder="请选择" tipsText="这里提示文字" :selectText="selectText" :split="split">&lt;/Cascader>
           selectText: ['选择1', '选择2', '选择3'],
           split: [',', ',', '']</pre>
        <Cascader v-model="value5" placeholder="请选择" tipsText="这里提示文字" :selectText="selectText"
                  :split="split"></Cascader>
        <h3>6、change</h3>
        <Cascader v-model="value6" placeholder="请选择" :change="_change"></Cascader>
        <h3>7、自定义下拉数据</h3>
        <p>当前值：{{value7}}</p>
        <Cascader v-model="value7" placeholder="请选择" :data="data7"></Cascader>
        <pre>&lt;Cascader v-model="value7" placeholder="请选择" :data="data7">&lt;/Cascader></pre>
        <pre>
            data7: [
                    {
                        name: '广东', children: [
                        {
                            name: '广州', children: [
                            '天河', '白云', '越秀', '海珠'
                        ]
                        },
                        {name: '深圳'},
                        {name: '东莞'}
                    ]
                    },
                    {
                        name: '北京', children: [
                        {name: '东城区'},
                        {name: '西城区'},
                        {name: '朝阳区'},
                        {name: '丰台区'}
                    ]
                    },
                    {
                        name: '上海', children: [
                        {name: '黄浦区'},
                        {name: '卢湾区'},
                        {name: '徐汇区'},
                        {name: '长宁区'}
                    ]
                    },
                    {
                        name: '四川', children: [
                        {name: '成都'}
                    ]
                    }
                ]
        </pre>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td>Array</td>
                <td>v-model双向绑定</td>
            </tr>
            <tr>
                <td>placeholder</td>
                <td>String</td>
                <td></td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean|false</td>
                <td></td>
            </tr>
            <tr>
                <td>tipsText</td>
                <td>String</td>
                <td>下拉提示文字</td>
            </tr>
            <tr>
                <td>selectText</td>
                <td>Array</td>
                <td>选择提示，默认['请选择省', '请选择市', '请选择区']</td>
            </tr>
            <tr>
                <td>split</td>
                <td>Array｜null</td>
                <td>显示分隔符</td>
            </tr>
            <tr>
                <td>data</td>
                <td>Array</td>
                <td>自定义下拉数据</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>选择回调，相当于监听v-model的值</td>
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
                <td>name</td>
                <td>String</td>
                <td>选项名称</td>
            </tr>
            <tr>
                <td>children</td>
                <td>Array</td>
                <td>子级数据，第三级是没有name值的，见自定义数据格式</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Cascader from '../components/cascader/index'
    export default {
        name: 'cascader',
        path: '/cascader',
        data () {
            return {
                value1: [],
                value2: ['广东', '广州市', '天河区'],
                value3: [],
                value4: [],
                value5: [],
                value6: [],
                value7: [],
                selectText: ['选择1', '选择2', '选择3'],
                split: [',', ',', ''],
                data7: [
                    {
                        name: '广东', children: [
                        {
                            name: '广州', children: [
                            '天河', '白云', '越秀', '海珠'
                        ]
                        },
                        {name: '深圳'},
                        {name: '东莞'}
                    ]
                    },
                    {
                        name: '北京', children: [
                        {name: '东城区'},
                        {name: '西城区'},
                        {name: '朝阳区'},
                        {name: '丰台区'}
                    ]
                    },
                    {
                        name: '上海', children: [
                        {name: '黄浦区'},
                        {name: '卢湾区'},
                        {name: '徐汇区'},
                        {name: '长宁区'}
                    ]
                    },
                    {
                        name: '四川', children: [
                        {name: '成都'}
                    ]
                    }
                ]
            }
        },
        props: {},
        components: {Cascader},
        methods: {
            _change(v){
                console.log(v)
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>