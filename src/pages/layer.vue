<template>
    <div class="demo">
        <comHeader name="layer"/>
        <h1>Layer Demo</h1>
        <pre>import Layer from '../components/layer/index'</pre>
        <ul class="list">
            <li><a href="javascript:;" @click="openLayer">1、最基本示例</a></li>
            <li><a href="javascript:;" @click="showLayer2=true">2、带有参数弹层</a></li>
            <li><a href="javascript:;" @click="showLayer3">3、支持多种方式显示弹层</a></li>
            <li><a href="javascript:;" @click="showLayer04=true">4、支持拖动</a></li>
            <li><a href="javascript:;" @click="showLayer4=true">5、支持多层弹层</a></li>
            <li><a href="javascript:;" @click="showLayer6=true">6、加载完成回调</a></li>
            <li><a href="javascript:;" @click="showLayer7=true">7、添加确定取消按钮</a></li>
            <li><a href="javascript:;" @click="showLayer8=true">8、回调事件</a></li>
            <li><a href="javascript:;" @click="showLayer9=true">9、弹层固定类型absolute</a></li>
            <li><a href="javascript:;" @click="showLayer10=true">10、自动关闭</a></li>
            <li><a href="javascript:;" @click="showLayer11=true">11、可传内容</a></li>
            <li><a href="javascript:;" @click="showLayer12=true">12、实现alert,confirm</a></li>
            <li><a href="javascript:;" @click="showLayer13=true">13、常见成功/失败提示</a></li>
        </ul>
        <Layer title="最基本示例" v-model="showLayer">
            <pre>&lt;layer title="最基本示例" v-model="showLayer"></pre>
            <p>通过v-model实现双向数据绑定</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
            <p>this is content</p>
        </Layer>
        <Layer v-model="showLayer2" class="layer-1" width="500" :animation="2" :maskLayer="false"
               height="300">
            <p>这是一个没标题栏的弹层</p>
            <pre>&lt;layer title="带有参数弹窗" v-model="showLayer2" class="layer-1" width="500" :animation="2" :maskLayer="false" height="300"></pre>
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
        <Layer title="支持多种方式打开" ref="layer" width="500">
            <pre>&lt;layer title="支持多种方式打开" ref="layer"><br>
            this.$refs.layer.open();
            </pre>
            <p>通过引用layer里的open()方法也可以显示弹出层，对应的this.$refs.layer.close();即可关闭</p>
            <p>当然了，用什么方法打开应用对应的方法来关闭，不能用一种方式打开，用另一种方式关闭</p>
            <p>&nbsp;</p>
            <h2>页面多个弹窗时</h2>
            <p>如果一个页面存在多个弹层时，像本例子在data里定义N个showLayer*="false"，这明显是比较笨的方法。稍微改进下：</p>
            <pre>
               &lt;a href="javascript:;" @click="showLayer3('layer')">3.支持多种方式显示弹层&lt;/a>
            </pre>
            <pre>
                showLayer3(layer){
                this.$refs[layer].open();
            }
            </pre>
            <p>点击时通过传参的方式，不需要定义showLayer*="false"</p>
        </Layer>
        <Layer title="支持拖动" v-model="showLayer04" width="500px" :move="false">
            <p>默认是可以拖动的，这里设置以move="false"不能拖动</p>
            <p>&nbsp;</p>
        </Layer>
        <Layer title="支持多层弹层" v-model="showLayer4" width="500px">
            <p>多层弹层示例，点击下面</p>
            <p><a href="javascript:;" @click="showLayer=true">再弹出示例1最基本示例</a></p>
        </Layer>
        <Layer title="加载完成回调" v-model="showLayer6" width="500px" :afterBack="afterBack">
            <pre>
                &lt;Layer title="加载完成回调" v-model="showLayer6" width="500px" :afterBack="afterBack"></pre>
                <pre>afterBack(){
                alert('the layer is ready');
            }
            </pre>
            <p>加载完成回调</p>
        </Layer>
        <Layer title="添加确定取消按钮" v-model="showLayer7" confirm="确定" cancel="取消">
            <pre>
                &lt;Layer title="添加确定取消按钮" v-model="showLayer7" confirm="确定" cancel="取消">
            </pre>
            <p>这两个按钮功能是为dialog提供的，类似于这种直接在页面添加Layer组件的方法，不建议使用；</p>
            <p>点击这两按钮默认是关闭弹层，如果存在回调则需要在回调事件里手动关闭，详见回调事件</p>
        </Layer>
        <Layer title="添加确定取消按钮" v-model="showLayer8" confirm="确定" cancel="取消" :confirmBack="confirmBack"
               :cancelBack="cancelBack" :closeBack="closeBack">
            <pre>
              &lt;Layer title="添加确定取消按钮" v-model="showLayer8" confirm="确定" cancel="取消" :confirmBack="confirmBack"
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
        <Layer title="弹层固定类型absolute" position="absolute" v-model="showLayer9">
            <p>this is content</p>
        </Layer>
        <Layer title="自动关闭" :autoClose="30" v-model="showLayer10">
            <pre>
                &lt;Layer title="自动关闭" :autoClose="30" v-model="showLayer10">
            </pre>
        </Layer>
        <Layer title="可传内容" v-model="showLayer11" content="这里参数形式传的内容，这时不会显示组件标签中的内容了" :type="2">
            <p>this is content</p>
        </Layer>
        <Layer title="实现alert,confirm" confirm="确定" content="alert提示内容，文字居中对齐，单行居中，多行居中向左对齐"
               v-model="showLayer12" width="100"></Layer>
        <Layer title="实现alert,confirm" :type="1" confirm="确定" content="常见成功/失败提示（失败为type=2）" v-model="showLayer13"
               width="500"></Layer>
        <p>在实际应用中，第11、12、13这种用法实际意义并不大，跟将content里的内容直接放组件标签中效果是一致的。更好的用法应该是不需要先在页面放一个Layer组件，类似于alert，详见layer另一种用法
            <router-link to="/dialog" style="color:red">dialog</router-link>
        </p>
        <p>目前这种方法还不够完善，比较理想的应该是将弹层内容移至body根节点下，下版实现。。。</p>
        <h3>参数：</h3>
        <table class="table-1">
            <tr>
                <th width="80">参数</th>
                <th width="120">默认</th>
                <th>说明</th>
            </tr>
            <tr>
                <td>value</td>
                <td>Boolean | false</td>
                <td>显示或隐藏弹层，也可以使用v-model实现双向绑定</td>
            </tr>
            <tr>
                <td>title</td>
                <td>String | null</td>
                <td>弹层标题</td>
            </tr>
            <tr>
                <td>content</td>
                <td>String | null</td>
                <td>弹层内容。通过参数传进content时，则不显示组件标签中的内容</td>
            </tr>
            <tr>
                <td>type</td>
                <td>Number | null</td>
                <td>两种特殊情况，用于显示成功/失败提示（通过样式控制）1:success,2:failure，仅content有值时有效</td>
            </tr>
            <tr>
                <td>width</td>
                <td>String | null</td>
                <td>弹层的宽度。一般情况下不需要设置，可在样式中控制；如设置请设置为偶数，弹出时也会强制转换为偶数，因为translate居中时，非偶数会出现字体模糊。</td>
            </tr>
            <tr>
                <td>height</td>
                <td>String | null</td>
                <td>弹层的高度。一般情况下不需要设置，如设置了高度，内容区溢出将出现滚动条，适合弹出内容比较多时；即使没有设置高度，但在高度非偶数时，会强制添加一个偶数值高度</td>
            </tr>
            <tr>
                <td>className</td>
                <td>String | null</td>
                <td>弹层的类名。为弹层添加一个样式方便控制，增加灵活性。也可以是class</td>
            </tr>
            <tr>
                <td>showClose</td>
                <td>Boolean | true</td>
                <td>是否显示关闭按钮</td>
            </tr>
            <tr>
                <td>autoClose</td>
                <td>Number | 0</td>
                <td>自动关闭时间，单位毫秒。0为不自动关闭</td>
            </tr>
            <tr>
                <td>position</td>
                <td>String | fixed</td>
                <td>弹层显示方式，fixed和absolute两种</td>
            </tr>
            <tr>
                <td>confirm</td>
                <td>String | null</td>
                <td>确定按钮。点击默认关闭弹层，当有回调时则需要在回调里手动关闭</td>
            </tr>
            <tr>
                <td>cancel</td>
                <td>String | null</td>
                <td>取消按钮。同confirm</td>
            </tr>
            <tr>
                <td>confirmBack</td>
                <td>Function | null</td>
                <td>确定回调方法；仅当confirm不为空时才会触发回调confirmBack函数；当回调为空时，点击确定后默认关闭窗口</td>
            </tr>
            <tr>
                <td>cancelBack</td>
                <td>Function | null</td>
                <td>同confirmBack</td>
            </tr>
            <tr>
                <td>closeBack</td>
                <td>Function | null</td>
                <td>关闭按钮回调。默认关闭弹层，有回调时执行回调，需在回调里执行关闭方法</td>
            </tr>
            <tr>
                <td>afterBack</td>
                <td>Function | null</td>
                <td>窗口加载完回调</td>
            </tr>
            <tr>
                <td>move</td>
                <td>Boolean | true</td>
                <td>允许拖动窗口</td>
            </tr>
            <tr>
                <td>maskLayer</td>
                <td>Boolean | true</td>
                <td>是否显示遮罩层</td>
            </tr>
            <tr>
                <td>shadeClose</td>
                <td>Boolean | true</td>
                <td>点击遮罩层是否关闭弹层，仅当maskLayer为true时有效</td>
            </tr>
            <tr>
                <td>animation</td>
                <td>Number | 1</td>
                <td>弹层显示的css3动画，定义了8种显示动画</td>
            </tr>
        </table>
        <p>&nbsp;</p>
    </div>
</template>
<script>
    import Layer from '../components/layer/index'
    export default {
        name:'layer',
        path:'/layer',
        data () {
            return {
                showLayer: false,
                showLayer2: false,
                showLayer04: false,
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
                //this.$refs[div].open();
            },
            confirmBack(){
                alert('您点击了确认，请在回调里关闭弹层');
                this.showLayer8 = false
            },
            cancelBack(){
                alert('您点击了取消，请在回调里关闭弹层');
                this.showLayer8 = false
            },
            closeBack(){
                alert('您点击了关闭，请在回调里关闭弹层');
                this.showLayer8 = false
            }
        },
        filters: {}
    }
</script>