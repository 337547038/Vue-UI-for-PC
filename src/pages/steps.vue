<!--Created by 337547038 on 2018/1/29.-->
<template>
    <div class="demo">
        <comHeader name="steps"/>
        <h1>Steps demo</h1>
        <h2>Use</h2>
        <pre>import Steps from '../components/steps/index'</pre>
        <pre>&lt;Steps :data="stepsData" :active="active" @click="_click">&lt;/Steps></pre>
        <h3>1、使用</h3>
        <Steps :data="stepsData" :active="active" @click="_click"></Steps>
        <h3>2、使用icon</h3>
        <Steps :data="_stepsData2()" :active="active" class="steps-2"></Steps>
        <h3>3、使用</h3>
        <Steps :data="_stepsData3()" :active="active" class="steps-2"></Steps>
        <p class="steps-to">显示其它步骤效果：
            <span @click="_stepsTo(0)">0</span>
            <span @click="_stepsTo(1)">1</span>
            <span @click="_stepsTo(2)">2</span>
            <span @click="_stepsTo(3)">3</span></p>
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
                <td>步骤数组</td>
            </tr>
            <tr>
                <td>active</td>
                <td>Number</td>
                <td>设置激活步骤</td>
            </tr>
            <tr>
                <td>click</td>
                <td>Function</td>
                <td>选项点击事件</td>
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
                <td>icon</td>
                <td>String</td>
                <td>icon图标样式名</td>
            </tr>
            <tr>
                <td>title</td>
                <td>String</td>
                <td>显示的标题名</td>
            </tr>
            <tr>
                <td>description</td>
                <td>String</td>
                <td>描述</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import Steps from '../components/steps/index'
    export default {
        name: 'steps',
        path: "/steps",
        data () {
            return {
                active: 0,
                stepsData: [
                    {
                        title: '步骤1',
                        description: '描述',
                        icon: ''
                    },
                    {
                        title: '步骤2',
                        description: '描述',
                        icon: ''
                    },
                    {
                        title: '步骤3',
                        description: '描述',
                        icon: ''
                    }
                ]
            }
        },
        props: {},
        components: {Steps},
        methods: {
            _click(index){
                console.log(index + ' click');
            },
            _stepsTo(index){
                this.active = index;
            },
            _stepsData2(){
             return  [
                 {
                     title: '步骤1',
                     description: '描述',
                     icon: 'correct'
                 },
                 {
                     title: '步骤2',
                     description: '描述',
                     icon: 'error'
                 },
                 {
                     title: '步骤3',
                     description: '描述',
                     icon: 'user'
                 }
             ]
            },
            _stepsData3(){
                return  [
                    {
                        title: '步骤1',
                        icon: 'correct'
                    },
                    {
                        title: '步骤2',
                        icon: 'error'
                    },
                    {
                        title: '步骤3',
                        icon: 'user'
                    },
                    {
                        title: '步骤4',
                        icon: 'tips'
                    }
                ]
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
<style>
    .steps-to{ }
    .steps-to span{ display: inline-block; margin-right: 10px; cursor: pointer }
</style>