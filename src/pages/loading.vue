<!--Created by 337547038 on 2017/12/11.-->
<template>
    <div class="demo">
        <comHeader/>
        <h1>Dialog Demo</h1>
        <h2>使用</h2>
        <pre>
           import Loading from '../components/loading/index'</pre>
        <pre>
           &lt;Loading>&lt;/Loading></pre>
        <h3>示例1</h3>
        <p>在需要展示loading的位置放置一个组件标签，并根据需求添加相关参数；因为loading是通过absolute定位，因此请不要忘记给loading的父元素添加relative</p>
        <div class="demo-1">
            <Loading></Loading>
        </div>
        <h3>示例2</h3>
        <p>还可以在组件标签内添加一些提示文字，也可以添加一个遮罩层</p>
        <div class="demo-1">
            <Loading :maskLayer="true"><p class="tips">正在努力加载</p></Loading>
        </div>
        <h3>示例3</h3>
        <p>在组件内添加一些标签，实现多样效果；为了实现多种还可以添加nodeNum创建标签，实现不同的动画，当然也可以直接将标签写在组件内</p>
        <div class="demo-1">
            <Loading class="style-2" :nodeNum="3"></Loading>
        </div>
        <h3>示例4</h3>
        <p>很多时候是整个页面加载的，而不是其中的某一模块，这时可以通过this.$loading()的方法显示loading。实际使用应该是放在页面加载前，示例这里使用点击触发</p>
        <div class="demo-1">
            <p @click="openLoading"><a href="javascript:;">点击弹出带遮罩层的整页loading</a></p>
            <p>5秒后关闭，调用this.$loading.close()即可关闭，演示代码如下：</p>
            <pre>openLoading(){<br>
                this.$loading({<br>
                    className: 'abc',<br>
                    maskLayer:true<br>
                });<br>
               setTimeout(()=>{<br>
                   this.$loading.close()<br>
               },5000)
            }</pre>
        </div>
        <h2>API</h2>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>show</td>
                <td>Boolean | true</td>
                <td>显示或隐藏</td>
            </tr>
            <tr>
                <td>maskLayer</td>
                <td>Boolean | false</td>
                <td>显示遮罩层</td>
            </tr>
            <tr>
                <td>nodeNum</td>
                <td>Number | 0</td>
                <td>为方便实现不同的动画而在标签里创建标签的个数</td>
            </tr>
            <tr>
                <td>className</td>
                <td>String</td>
                <td>为方便实现不同动画而添加的样式，也可以是class</td>
            </tr>
        </table>
    </div>
</template>
<script type="text/ecmascript-6">
    //已全局注册，这里可以不用导进来
    //import Loading from '../components/loading/index'
    export default {
        name: 'loading',
        path: "/loading",
        data () {
            return {
            }
        },
        components: {},
        mounted(){
            //this.$loading({className: 'abc'})
        },
        methods: {
            openLoading(){
                this.$loading({
                    className: 'abc',
                    maskLayer:true
                });
               setTimeout(()=>{
                   this.$loading.close()
               },5000)
            }
        },
        computed: {},
        filters: {}
    }
</script>
<style>
    .demo-1{ width: 100%; min-height: 120px; border: 1px solid #ddd; position: relative; }
    .demo-1 .tips{ text-align: center; padding-top: 80px; }
    /*自定效果示例*/
    .style-2{ text-align: center }
    .style-2:before{ display: none }
    .style-2 .loading-content > span{ width: 30px; height: 30px; background-color: #67CF22; border-radius: 100%; display: inline-block; animation: bouncedelay 1.4s infinite ease-in-out both; }
    .style-2 span:nth-child(1){ animation-delay: -0.32s; }
    .style-2 span:nth-child(2){ animation-delay: -0.16s; }
    @keyframes bouncedelay{
        0%, 80%, 100%{
            transform: scale(0.0);
        }
        40%{
            transform: scale(1.0);
        }
    }
</style>