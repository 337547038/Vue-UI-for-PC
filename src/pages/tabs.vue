<!--Created by 337547038 on 2017/12/8.-->
<template>
    <div class="demo">
        <h1>Tabs Demo</h1>
        <h2>使用：</h2>
        <p>Tabs里的value对应于TabPane里的name，用于标识当前激活的是哪一项。也可以用v-model实现双向绑定；</p>
        <h3>1.最基本用法</h3>
        <pre>
            import {Tabs, TabPane} from '../components/tabs/index'
        </pre>
        <pre>
            &lt;Tabs value="t2"><br>
            &lt;TabPane label="tabs 1" name="t1">this is tabs 1 content&lt;/TabPane><br>
            &lt;TabPane label="tabs 2" name="t2">this is tabs 2 content&lt;/TabPane><br>
            &lt;TabPane label="tabs 3" name="t3">this is tabs 3 content&lt;/TabPane><br>
        &lt;/Tabs>
        </pre>
        <Tabs value="t2">
            <TabPane label="tabs 1" name="t1">this is tabs 1 content</TabPane>
            <TabPane label="tabs 2" name="t2">this is tabs 2 content</TabPane>
            <TabPane label="tabs 3" name="t3">this is tabs 3 content</TabPane>
        </Tabs>
        <h3>2.常见形式</h3>
        <Tabs class="tabs-2" value="1" tipMax="9">
            <TabPane label="tabs 1" tip="3" name="1">
                <p>数字小圆点通过tip="5"，可在Tabs里传入tipMax控制最大显示值，大于设定的最大值显示+号；</p>
                <p>禁用项为disabled="true"</p>
            </TabPane>
            <TabPane label="禁用项" disabled="true" name="2">this is tabs 2 content</TabPane>
            <TabPane label="tabs 3" name="3" tip="12">this is tabs 3 content</TabPane>
        </Tabs>
        <h3>3.前面带icon</h3>
        <Tabs class="tabs-3" value="1">
            <TabPane label="tabs 1" name="1">
                <p>如标签前面要带icon，这可以通过样式实现，样式能实现的优先使用样式实现了。</p>
                <p>为tabs添加一个class，然后通过背景或是伪类添加背景图片或是字体图标</p>
                <p>如添加class="tabs-3"</p>
                <pre>
                    .tabs-3 .tabs-tab:before{ content: ''; display: inline-block; vertical-align: middle; width: 15px; height: 15px; background: #f60; }<br>
    .tabs-3 .tabs-tab:nth-child(2):before{ background: #2d8cf0 }<br>
    .tabs-3 .tabs-tab:nth-child(3):before{ background: #4ca40b }
                </pre>
            </TabPane>
            <TabPane label="tabs 2" name="2">this is tabs 2 content</TabPane>
            <TabPane label="tabs 3" name="3">this is tabs 3 content</TabPane>
        </Tabs>
        <h3>4.切换回调；你点击的选项为name={{backIndex}}</h3>
        <Tabs value="1" :onChange="change">
            <TabPane label="tabs 1" name="1">
                <p>为tabs添加onChange回调事件即可，这里也可以通过v-model绑定实现数据双向绑定获取当前显示的是哪一项</p>
            </TabPane>
            <TabPane label="tabs 2" name="2">this is tabs 2 content</TabPane>
            <TabPane label="tabs 3" name="3">this is tabs 3 content</TabPane>
        </Tabs>
        <h3>5.通过css3实现切换动画</h3>
        <Tabs class="tabs-animation" value="1">
            <TabPane label="tabs 1" name="1">
                <p>当前项会添加样式名active，通过添加或删除样式名实现动画；</p>
                <p>可以实现哪些动画，就要看css3动画功力了</p>
            </TabPane>
            <TabPane label="tabs 2" name="2">this is tabs 2 content</TabPane>
            <TabPane label="tabs 3" name="3">this is tabs 3 content</TabPane>
        </Tabs>
        <h2>参数</h2>
        <h3>Tabs</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td>当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据</td>
            </tr>
            <tr>
                <td>class</td>
                <td>添加为当前Tabs的样式名</td>
            </tr>
            <tr>
                <td>onChange</td>
                <td>切换回调事件</td>
            </tr>
            <tr>
                <td>tipMax</td>
                <td>标签数字提示的最大值，超出显示+号</td>
            </tr>
        </table>
        <h3>TabPane</h3>
        <table class="table-1">
            <tr>
                <th>参数</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>class</td>
                <td>添加为当前TabPane的样式名</td>
            </tr>
            <tr>
                <td>label</td>
                <td>标签名称</td>
            </tr>
            <tr>
                <td>tip</td>
                <td>标签数字值</td>
            </tr>
            <tr>
                <td>disabled</td>
                <td>禁止点击选项</td>
            </tr>
            <tr>
                <td>name</td>
                <td>对应Tabs里的value，用于标识当前激活的选项</td>
            </tr>
        </table>
    </div>
</template>
<script>
    import {Tabs, TabPane} from '../components/tabs/index'
    export default {
        name: 'tabs',
        path: '/tabs',
        data(){
            return {
                backIndex: ''
            }
        },
        props: [],
        mounted(){
        },
        components: {Tabs, TabPane},
        methods: {
            change(index){
                this.backIndex = index
            }
        },
        computed: {}
    }
</script>
<style>
    .tabs{ }
    .tabs-content{ border: 1px solid #ddd; min-height: 100px; padding: 10px; margin: 0 0 20px; border-top: 0 }
    /*实现前面icon，这里可以是背景图片或是icon字体图标*/
    .tabs-3 .tabs-tab:before{ content: ''; display: inline-block; vertical-align: middle; width: 15px; height: 15px; background: #f60; }
    .tabs-3 .tabs-tab:nth-child(2):before{ background: #2d8cf0 }
    .tabs-3 .tabs-tab:nth-child(3):before{ background: #4ca40b }
    /*实现动画*/
    .tabs-animation{ }
    .tabs-animation .tabs-content{ overflow: hidden; }
    .tabs-animation .tab-pane.active{ animation: test 1s }
    @keyframes test{
        0%{ transform: translate(100%, 0); opacity: 0 }
        100%{ transform: translate(0, 0); opacity: 1 }
    }
</style>