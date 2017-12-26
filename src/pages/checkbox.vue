<!--Created by 337547038 on 2017/12/25.-->
<template>
    <div class="demo">
        <comHeader name="checkbox"/>
        <h1>Checkbox Demo</h1>
        <h2>Use</h2>
        <pre>import {Checkbox, CheckboxGroup} from '../components/checkbox/index'</pre>
        <pre>&lt;Checkbox v-model="value">text&lt;/Checkbox></pre>
        <h2>说明</h2>
        <p>1、要美化外观的再根据实际编写样式，这例子使用默认的</p>
        <p>1.）勾选状态会添加样式checked；2.）也可以是input:checked方式</p>
        <h3>1、基本使用</h3>
        <p>v-model的值可以是布尔值或是字符，点击后选中返回true，不选中返回false</p>
        <p>为true或是任意字符时为勾选状态</p>
        <div>
            <Checkbox v-model="v1">true</Checkbox>
            （{{v1}}）
        </div>
        <div>
            <Checkbox v-model="v2">false</Checkbox>
            （{{v2}}）
        </div>
        <div>
            <Checkbox text="数字字符" v-model="v3"></Checkbox>
            （{{v3}}）
        </div>
        <div>
            <Checkbox text="空值" v-model="v4"></Checkbox>
            （{{v4}}）
        </div>
        <div>
            <Checkbox text="禁用" :disabled='true' v-model="v5"></Checkbox>
            （{{v5}}）
        </div>
        <h3>2、组使用</h3>
        <p>勾选的值：{{group}}</p>
        <pre>&lt;CheckboxGroup :data="groupDate" v-model="group">&lt;/CheckboxGroup></pre>
        <pre>
        group: ['a1', 'a3', 'a6'],
        groupDate: [
           {text: '选项1', value: 'a1'},
           {text: '选项2', value: 'a2'},
           {text: '选项3', value: 'a3'},
           {text: '选项4', value: 'a4'},
           {text: '禁用', value: 'a5', disabled: true},
           {text: '勾选禁用', value: 'a6', disabled: true}
        ]</pre>
        <div>
            <CheckboxGroup :data="groupDate" v-model="group"></CheckboxGroup>
        </div>
        <h3>3、全选，反选，不选</h3>
        <p>这些就不在这实现，因为数据绑定是双向的，使用起来也很方便</p>
        <p>全选：遍历groupDate，取出所有value给group即可</p>
        <p>反选：遍历groupDate，判断当前value是否存在group里，存在则移除，不存在则添加</p>
        <p>不选：清空group</p>
        <h2>API</h2>
        <h3>Checkbox</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td>任意值</td>
                <td>通过v-model绑定，选中返回true，否则false。true为默认勾选状态</td>
            </tr>
            <tr>
                <td>text</td>
                <td>String</td>
                <td>文本值，也可以是slot形式</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>Boolean｜false</td>
                <td>禁用</td>
            </tr>
            <tr>
                <td>name</td>
                <td>String</td>
                <td>checkbox的name值</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>改变回调</td>
            </tr>
        </table>
        <h3>CheckboxGroup</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td>Array</td>
                <td>当前选中的值，对应于data中的value。通过v-model绑定</td>
            </tr>
            <tr>
                <td>data</td>
                <td>Array</td>
                <td>选项数据</td>
            </tr>
            <tr>
                <td>name</td>
                <td>String</td>
                <td>checkbox的name值</td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>改变回调</td>
            </tr>
        </table>
        <h3>CheckboxGroup data</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>text</td>
                <td>显示的文本值</td>
            </tr>
            <tr>
                <td>value</td>
                <td>当前项对应的值，对应于组的value</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>禁用</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import {Checkbox, CheckboxGroup} from '../components/checkbox/index'
    export default {
        name: 'checkbox',
        path: '/checkbox',
        data () {
            return {
                v1: true,
                v2: false,
                v3: '1',
                v4: '',
                v5: '',
                group: ['a1', 'a3', 'a6'],
                groupDate: [
                    {text: '选项1', value: 'a1'},
                    {text: '选项2', value: 'a2'},
                    {text: '选项3', value: 'a3'},
                    {text: '选项4', value: 'a4'},
                    {text: '禁用', value: 'a5', disabled: true},
                    {text: '勾选禁用', value: 'a6', disabled: true}
                ]
            }
        },
        props: {},
        components: {Checkbox, CheckboxGroup},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>