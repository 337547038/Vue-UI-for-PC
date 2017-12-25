<!--Created by 337547038 on 2017/12/24.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>TextArea Demo</h1>
        <h2>Use</h2>
        <pre>import gTextArea from '../components/textarea/index'</pre>
        <pre>&lt;gTextArea placeholder="placeholder" v-model="value">&lt;/gTextArea></pre>
        <h2>说明</h2>
        <p>1、添加了自动高的功能</p>
        <h3>1、基本用法</h3>
        <p>当前值：{{value}}</p>
        <gTextArea placeholder="placeholder" v-model="value"></gTextArea>
        <h3>2、禁用</h3>
        <gTextArea placeholder="placeholder" :disabled="true"></gTextArea>
        <h3>3、其他</h3>
        <gTextArea placeholder="placeholder" class="abc" width="80%" height="120px"
                   v-model="value3" :autoHeight="false"></gTextArea>
        <h3>4、事件</h3>
        <gTextArea placeholder="placeholder" v-model="value4" @focus="focus" :focus="focus2"></gTextArea>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>原生属性</td>
                <td></td>
                <td>class、placeholder、disabled、readonly...</td>
            </tr>
            <tr>
                <td>value</td>
                <td>String</td>
                <td>绑定的值，使用v-model双向绑定</td>
            </tr>
            <tr>
                <td>width</td>
                <td>String｜100%</td>
                <td>要带单位px/%</td>
            </tr>
            <tr>
                <td>height</td>
                <td>String｜80px</td>
                <td></td>
            </tr>
            <tr>
                <td>autoHeight</td>
                <td>Boolean｜true</td>
                <td></td>
            </tr>
            <tr>
                <td>change</td>
                <td>Function</td>
                <td>事件，同时支持v-on和v-bind</td>
            </tr>
            <tr>
                <td>focus</td>
                <td>Function</td>
                <td>同上</td>
            </tr>
            <tr>
                <td>blur</td>
                <td>Function</td>
                <td>同上</td>
            </tr>
            <tr>
                <td>keyup</td>
                <td>Function</td>
                <td>同上</td>
            </tr>
            <tr>
                <td>keydown</td>
                <td>Function</td>
                <td>同上</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import gTextArea from '../components/textarea/index'
    export default {
        name: 'textarea',
        path: '/textarea',
        data(){
            return {
                value: '',
                value3: 'width="80%";height="120px";autoHeight="false"\n内容增加将出现滚动条',
                value4: '<gTextArea placeholder="placeholder" v-model="value4" @focus="focus" :focus="focus2"></gTextArea>'
            }
        },
        props: [],
        mounted(){
        },
        components: {gTextArea},
        methods: {
            focus(){
                console.log('focus');
            },
            focus2(){
                console.log('focus2');
            },
            _event(){
                console.log('_event');
            }
        },
        computed: {}
    }
</script>