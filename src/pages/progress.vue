<!--Created by 337547038 on 2017/12/14.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Progress Demo</h1>
        <h2>使用</h2>
        <pre>import ProgressBar from '../components/progress/index'</pre>
        <pre>&lt;ProgressBar :value="30" :radius="400" :border="10" color="#999" borderColor="#f60" type="line">&lt;/ProgressBar></pre>
        <h2>Line</h2>
        <h3>1、基本用法</h3>
        <div>
            <div class="demo-margin"></div>
            <div class="demo-margin">
                <ProgressBar :value="0" :radius="400" :border="10" color="#999" borderColor="#f60" :duration='3000'
                             type="line"></ProgressBar>
            </div>
            <div class="demo-margin">
                <ProgressBar :value="30" :radius="400" :border="10" color="#999" borderColor="#f60" type="line"
                             :duration='3000'></ProgressBar>
            </div>
            <div class="demo-margin">
                <ProgressBar :value="100" :radius="400" :border="10" color="#999" borderColor="#f60" type="line"
                             :duration='3000'></ProgressBar>
            </div>
            <h3>2、进度文字不跟随进度条</h3>
            <div class="demo-margin">可通过css控制在其它位置</div>
            <div class="demo-margin">
                <ProgressBar :value="50" :radius="400" :border="10" color="#999" borderColor="#f60" type="line"
                             :duration='3000' :follow="follow"></ProgressBar>
            </div>
        </div>
        <h2>Circle</h2>
        <h3>1、基本用法</h3>
        <div>
            <div class="inline">
                <ProgressBar :value="0" :radius="100" :border="10" color="#ddd" borderColor="#108ee9"
                             type="circle"></ProgressBar>
            </div>
            <div class="inline">
                <ProgressBar :value="30" :radius="100" :border="10" color="#ddd" borderColor="#f60"
                             type="circle"></ProgressBar>
            </div>
            <div class="inline">
                <ProgressBar :value="70" :radius="100" :border="10" color="#ddd" borderColor="#f00"
                             type="circle"></ProgressBar>
            </div>
            <div class="inline">
                <ProgressBar :value="100" :radius="100" :border="10" color="#ddd" borderColor="#108ee9"
                             type="circle"></ProgressBar>
            </div>
            <div class="inline">
                <ProgressBar :value="80" :radius="100" :border="10" color="#ddd" borderColor="#108ee9" type="circle">
                    <div class="content">这里是自定内容</div>
                </ProgressBar>
            </div>
            <div class="inline">
                <ProgressBar :value="80" :radius="100" :border="10" color="#ddd" borderColor="#108ee9" type="circle"
                             :showText="showText">
                    <div class="content">这里是自定内容，不显示进度数字</div>
                </ProgressBar>
            </div>
        </div>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>className</td>
                <td>null</td>
                <td>类名</td>
            </tr>
            <tr>
                <td>type</td>
                <td>String</td>
                <td>进度条类型，line直线、circle圆环</td>
            </tr>
            <tr>
                <td>value</td>
                <td>Number</td>
                <td>进度百分值</td>
            </tr>
            <tr>
                <td>radius</td>
                <td>Number</td>
                <td>圆环半径，单位px。line时为宽</td>
            </tr>
            <tr>
                <td>border</td>
                <td>Number</td>
                <td>进度条宽，单位px。line时为高</td>
            </tr>
            <tr>
                <td>color</td>
                <td>String</td>
                <td>背景颜色</td>
            </tr>
            <tr>
                <td>borderColor</td>
                <td>String</td>
                <td>进度颜色</td>
            </tr>
            <tr>
                <td>duration</td>
                <td>Number|1000</td>
                <td>持续时间，单位毫秒</td>
            </tr>
            <tr>
                <td>showText</td>
                <td>Boolean|true</td>
                <td>显示进度文字</td>
            </tr>
        </table>
        <h3>Line</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>follow</td>
                <td>Boolean｜true</td>
                <td>进度文字跟随进度的位置</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import ProgressBar from '../components/progress/index'
    export default {
        name: 'progress',
        path: '/progress',
        data () {
            return {
                follow: false,
                showText: false
            }
        },
        props: {},
        components: {ProgressBar},
        methods: {},
        computed: {},
        mounted(){
        },
        filters: {}
    }
</script>
<style scoped>
    .demo-margin{ margin-bottom: 30px }
    .inline{ display: inline-block; overflow: hidden; }
    .content{ position: absolute; text-align: center; top: 30px; width: 60%; left: 20% }
</style>