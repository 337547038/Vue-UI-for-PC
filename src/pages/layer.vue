<template>
    <div class="demo">
        <h1>Layer Demo</h1>
        <ul class="list">
            <li><a href="javascript:;" @click="openLayer">1.最基本示例</a></li>
            <li><a href="javascript:;" @click="showLayer2=true">2.带有参数弹层</a></li>
            <li><a href="javascript:;" @click="showLayer3">3.支持多种方式显示弹层</a></li>
            <li><a href="javascript:;">4.支持拖动（留最后实现）</a></li>
            <li><a href="javascript:;" @click="showLayer4=true">5.支持多层弹层</a></li>
            <li><a href="javascript:;" @click="showLayer6=true">6.加载完成回调</a></li>
            <li><a href="javascript:;" @click="showLayer7=true">7.添加确定取消按钮</a></li>
            <li><a href="javascript:;" @click="showLayer8=true">8.回调事件</a></li>
            <li><a href="javascript:;" @click="showLayer9=true">9.弹层固定类型absolute</a></li>
            <li><a href="javascript:;" @click="showLayer10=true">10.自动关闭</a></li>
            <li><a href="javascript:;" @click="showLayer11=true">11.可传内容</a></li>
            <li><a href="javascript:;" @click="showLayer12=true">12.实现alert,confirm</a></li>
            <li><a href="javascript:;" @click="showLayer13=true">13.常见成功/失败提示</a></li>
        </ul>
        <Layer title="最基本示例" :show.sync="showLayer">
            <pre>&lt;layer title="最基本示例" :show.sync="showLayer"></pre>
            <p>点击时通过改变showLayer=true/false来显示或隐藏弹出层</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
        </Layer>
        <Layer title="带有参数弹窗" :show.sync="showLayer2" className="layer-1" width="500" animation="2" :maskLayer="false"
               height="300">
            <pre>&lt;layer title="带有参数弹窗" :show.sync="showLayer2" className="layer-1" width="500" animation="2" :maskLayer="false" height="300"></pre>
            <p>带各种参数的弹窗，如果指定了高度时，内容溢出时则显示滚动条</p>
            <p>参数类型为布尔值时，要通过v-bind的方式绑定，默认的字符，如:maskLayer="false"</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
        </Layer>
        <Layer title="支持多种方式打开" ref="layer">
            <pre>&lt;layer title="支持多种方式打开" ref="layer"><br>
            this.$refs.layer.open();
            </pre>
            <p>通过引用layer里的open()方法也可以显示弹出层，对应的this.$refs.layer.close();即可关闭</p>
            <p>当然了，用什么方法打开应用对应的方法来关闭，不能用一种方式打开，用另一种方式关闭</p>
        </Layer>
        <Layer title="支持多层弹层" :show.sync="showLayer4" width="500px">
            <p>多层弹层示例，点击下面</p>
            <p><a href="javascript:;" @click="showLayer=true">再弹出示例1最基本示例</a></p>
        </Layer>
        <Layer title="加载完成回调" :show.sync="showLayer6" width="500px" :afterBack="afterBack">
            <pre>
                &lt;Layer title="加载完成回调" :show.sync="showLayer6" width="500px" :afterBack="afterBack"></pre>
                <pre>afterBack(){
                alert('the layer is ready');
            }
            </pre>
            <p>加载完成回调</p>
        </Layer>
        <Layer title="添加确定取消按钮" :show.sync="showLayer7" confirm="确定" cancel="取消">
            <pre>
                &lt;Layer title="添加确定取消按钮" :show.sync="showLayer7" confirm="确定" cancel="取消">
            </pre>
            <p>这两个按钮功能是为dialog提供的，类似于这种直接在页面添加Layer组件的方法，不建议使用；</p>
            <p>点击这两按钮默认是关闭弹层，如果存在回调则需要在回调事件里手动关闭，详见回调事件</p>
        </Layer>
        <Layer title="添加确定取消按钮" :show.sync="showLayer8" confirm="确定" cancel="取消" :confirmBack="confirmBack"
               :cancelBack="cancelBack" :closeBack="closeBack">
            <pre>
              &lt;Layer title="添加确定取消按钮" :show.sync="showLayer8" confirm="确定" cancel="取消" :confirmBack="confirmBack"
                     :cancelBack="cancelBack" :closeBack="closeBack">
            </pre>
            <pre>
                confirmBack(){
                alert('您点击了确认，请在回调里关闭弹层');
                this.showLayer8=false
            },
            cancelBack(){
                alert('您点击了取消，请在回调里关闭弹层');
                this.showLayer8=false
            },
            closeBack(){
                alert('您点击了关闭，请在回调里关闭弹层');
                this.showLayer8=false
            }
            </pre>
        </Layer>
        <Layer title="弹层固定类型absolute" position="absolute" :show.sync="showLayer9">
            <p>this is content</p>
        </Layer>
        <Layer title="自动关闭" :autoClose="30" :show.sync="showLayer10">
            <pre>
                &lt;Layer title="自动关闭" :autoClose="30" :show.sync="showLayer10">
            </pre>
        </Layer>
        <Layer title="可传内容" :show.sync="showLayer11" content="这里参数形式传的内容，这时不会显示组件标签中的内容了" type="2">
            <p>this is content</p>
        </Layer>
        <Layer title="实现alert,confirm" type="0" confirm="确定" content="alert提示内容，文字居中对齐，单行居中，多行居中向左对齐" :show.sync="showLayer12" width="100"></Layer>
        <Layer title="实现alert,confirm" type="1" confirm="确定" content="常见成功/失败提示（失败为type=2）" :show.sync="showLayer13" width="500"></Layer>
    </div>
</template>
<script>
    import Layer from '../components/layer.vue'
    export default {
        data () {
            return {
                showLayer: false,
                showLayer2: false,
                showLayer4: false,
                showLayer6: false,
                showLayer7: false,
                showLayer8: false,
                showLayer9: false,
                showLayer10: false,
                showLayer11: false,
                showLayer12: false,
                showLayer13: false
            }
        },
        components: {Layer},
        mounted(){
        },
        methods: {
            openLayer(){
                this.showLayer = true;
            },
            afterBack(){
                alert('the layer is ready');
            },
            showLayer3(){
                this.$refs.layer.open();
            },
            confirmBack(){
                alert('您点击了确认，请在回调里关闭弹层');
                this.showLayer8=false
            },
            cancelBack(){
                alert('您点击了取消，请在回调里关闭弹层');
                this.showLayer8=false
            },
            closeBack(){
                alert('您点击了关闭，请在回调里关闭弹层');
                this.showLayer8=false
            }
        },
        filters: {}
    }
</script>