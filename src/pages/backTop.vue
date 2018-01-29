<!--Created by 337547038 on 2018/1/29.-->
<template>
    <div class="demo">
        <comHeader name="backTop"/>
        <h1>BackTop</h1>
        <h2>Use</h2>
        <pre>import BackTop from '../components/backTop/index'</pre>
        <pre>&lt;BackTop @click="_click">&lt;/BackTop></pre>
        <h3>1、使用</h3>
        <p>往下滚动试试</p>
        <BackTop @click="_click"></BackTop>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>height</td>
                <td>Number|200</td>
                <td>页面滚动高度达到该值时才显示BackTop组件</td>
            </tr>
            <tr>
                <td>bottom</td>
                <td>Number|30</td>
                <td>组件距离底部的距离</td>
            </tr>
            <tr>
                <td>right</td>
                <td>Number|30</td>
                <td>组件距离右部的距离</td>
            </tr>
            <tr>
                <td>text</td>
                <td>String</td>
                <td>显示文本</td>
            </tr>
            <tr>
                <td>duration</td>
                <td>Number|1000</td>
                <td>滚动动画持续时间，单位毫秒</td>
            </tr>
        </table>
        <div style="height: 1000px;"></div>
    </div>
</template>
<script>
    import BackTop from '../components/backTop/index'
    export default {
        name: 'backTop',
        path:'/backTop',
        data () {
            return {}
        },
        props: {},
        components: {BackTop},
        methods: {
            _click(){
                console.log('click');
            }
        },
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>