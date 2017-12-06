<template>
    <div class="layer" :class="[className,{'active':visibility}]" :style="{zIndex:zIndex}" v-if="dialog">
        <div class="overlay" v-if="maskLayer" @click="_layerShadeClose"></div>
        <div class="layer-position" :style="layerStyle" v-drag="move">
            <div class="layer-body" :class="['layer-anim-'+animation]">
                <div class="auto-close" v-if="autoClose>0"><span v-text="autoTime"></span>秒后自动关闭</div>
                <a href="javascript:;" class="layer-close" v-if="showClose" @click="_close"></a>
                <div class="layer-header" v-text="title" :style="{cursor: move?'move':''}" ref="head"
                     v-if="title"></div>
                <div class="layer-scroll" :style="{height:scrollHeight}">
                    <div class="layer-content layer-content-text" v-if="content">
                        <div :class="['layer-text',{success:type==1},{failure:type==2}]" v-html="content"></div>
                    </div>
                    <div class="layer-content" v-else>
                        <slot/>
                    </div>
                    <div class="layer-footer" v-if="confirm||cancel">
                        <button class="btn btn-confirm" v-text="confirm" v-if="confirm" @click="_confirm"></button>
                        <button class="btn btn-cancel" v-text="cancel" v-if="cancel" @click="_cancel"></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'Layer',
        data () {
            return {
                visibility: this.show,
                layerHeight: parseInt(this.height),
                scrollHeight: '',
                zIndex: '',//多层时处理层级关系
                autoTime: '',//自动关闭时间
                clearTime: '',//定时器，用于清空
                dialog: true//dialog形式时，关闭后移除，因为也是动态插进来的
            }
        },
        mounted(){
            this.$nextTick(()=> {

            });
        },
        props: {
            show: {
                //show or hide the layer
                type: Boolean,
                default: false
            },
            title: String,
            content: String,//内容。通过参数传进content时，则不显示组件标签中的内容
            type: String,//两种特殊情况1:success,2:failure，仅content不为空时有效
            width: String,//一般情况下不需要设置，可在样式中控制
            height: String,//如果设置了高度，溢出将出现滚动条
            className: String,
            showClose: {
                //show close btn
                type: Boolean,
                default: true
            },
            autoClose: {
                //是否自动关闭窗口，数值型，单位为秒，默认为0不自动关闭；
                type: Number,
                default: 0
            },
            position: {
                //css样式位置，默认为fixed；只有absolute和fixed两种；
                type: String,
                default: 'fixed'
            },
            confirm: String,//确定按钮文本，默认为空即不显示；
            confirmBack: Function,//点击确定按钮后执行的函数，仅当confirm不为空时才会触发回调confirmback函数；当回调为空时，点击确定后默认关闭窗口；
            cancel: String,//取消按钮文本，默认为空即不显示；
            cancelBack: Function,//取消回调，跟确定一样
            closeBack: Function,//关闭按钮
            afterBack: Function,//窗口加载完时执行的函数
            move: {
                //允许窗口拖动，默认为true；点标题栏拖动窗口，因此仅当title有值时有效
                type: Boolean,
                default: true
            },
            maskLayer: {
                //显示遮罩层
                type: Boolean,
                default: true
            },
            shadeClose: {
                //默认为false;点击遮罩关闭 false不关闭，仅当maskLayer为true时有效
                type: Boolean,
                default: true
            },
            animation: {
                //弹出层css3动画效果，仅在支持的浏览器，默认为1。动画序号对应animation样式的layer-anim-**
                type: String,
                default: "1"
            }
        },
        methods: {
            open(){
                //对外提供的打开窗口方法
                this.visibility = true;
                this._completed();
            },
            close(){
                //对应于open，提供一个关闭的方法
                this._layerClose();
            },
            _layerClose(){
                //更新父组件show参数（因props是单向的，子组件修改props时不会同步到父组件）
                this.visibility = false;
                this.$emit('update:show', false);
                //清空计时器
                clearInterval(this.clearTime);
                //清空层级关系
                this.zIndex = '';
                //清空禁止滚动
                let index = document.querySelectorAll('.layer.active').length;
                if (index == 1) {
                    document.body.style.overflow = '';
                    document.body.style.paddingRight = '';
                }
                //如果content有值时，关闭后移除层
                this.content ? this.dialog = false : "";
            },
            _layerShadeClose(){
                //点击遮罩层是否关闭
                if (this.maskLayer && this.shadeClose) {
                    this._close();
                }
            },
            _completed(){
                //窗口加载完时
                this.dialog = true;
                if (typeof this.height != 'undefined') {
                    //如果设置了高，则在内容区添加高度,溢出时显示滚动条
                    // 如果窗口高度大于屏幕高度，即取窗口高度　
                    if (this.getHeight(window) < this.layerHeight) {
                        this.layerHeight = this.getHeight(window);
                    }
                    //滚动区域的高＝窗口的高－标题栏高
                    let headHeight = 0;
                    //要显示标题时
                    if (typeof this.title != 'undefined') {
                        headHeight = this.$refs.head.offsetHeight;
                    }
                    this.scrollHeight = this.layerHeight - headHeight + 'px';
                }
                //多层时简单下层级关系，遮罩层单独这里不共用
                let index = document.querySelectorAll('.layer.active').length;
                if (index > 1) {
                    //表示存在一个显示的层
                    this.zIndex = 1000 + index;
                }
                //加自动关闭
                this._autoClose();
                //禁止body滚动
                this._noScroll();
                //加载完成回调
                //this.$emit('afterBack');
                this.afterBack ? this.afterBack() : "";
            },
            _noScroll(){
                document.body.style.overflow = "hidden";
                if (this.getScrollTop() > 0) {
                    document.body.style.paddingRight = "20px";//滚动条大概的宽，防抖动
                }
            },
            _confirm(){
                //确定按钮点击时，如果没有回调方法confirmBack，则直接关闭弹层
                if (this.confirm && typeof this.confirmBack == 'function') {
                    this.confirmBack();
                } else {
                    this._layerClose();
                }
            },
            _cancel(){
                //取消按钮点击时，类同于confirm
                if (this.cancel && typeof this.cancelBack == 'function') {
                    this.cancelBack();
                } else {
                    this._layerClose();
                }
            },
            _close(){
                //关闭按钮
                if (typeof this.closeBack == 'function') {
                    this.closeBack();
                } else {
                    this._layerClose();
                }
            },
            _autoClose(){
                //自动关闭
                if (this.autoClose > 0) {
                    this.autoTime = this.autoClose;
                    this.clearTime = setInterval(()=> {
                        if (this.autoTime > 0) {
                            this.autoTime--;
                        } else {
                            this._close();
                        }
                    }, 1000);
                }
            }
        },
        directives: {
            //拖动指令
            drag(el, status){
                if (status.value) {
                    //如果允许拖动
                    let flag = false;
                    let head = el.querySelector('.layer-header');
                    if (head) {//要存在标题时
                        head.onmousedown = function (ev) {
                            //先将偏移百分比转为px
                            let offSet = this.getOffset(el);
                            let layerWidth = this.getWidth(el);//弹层宽
                            let layerHeight = this.getHeight(el);
                            let windowWidth = this.getWidth(window);//窗口宽
                            let windowHeight = this.getHeight(window);//窗口高
                            let scrollTop = this.scrollTop();//滚动条位置
                            let style = el.style;
                            style.width = layerWidth + 'px';
                            style.left = 0;
                            style.top = 0;
                            style.transform = 'translate(' + offSet.left + 'px,' + (offSet.top - scrollTop) + 'px)';
                            style.webkitTransform = 'translate(' + offSet.left + 'px,' + (offSet.top - scrollTop) + 'px)';
                            let x = ev.pageX - offSet.left;
                            let y = ev.pageY - offSet.top;
                            flag = true;
                            document.onmousemove = function (ev) {
                                if (flag) {
                                    let left = ev.pageX - x;
                                    let top = ev.pageY - y - scrollTop;
                                    if (left <= 0) {
                                        left = 0;//最左边
                                    } else if (left > windowWidth - layerWidth) {
                                        //最右边，窗口宽－弹层宽
                                        left = windowWidth - layerWidth;
                                    }
                                    if (top <= 0) {
                                        top = 0;
                                    } else if (top > windowHeight - layerHeight) {
                                        top = windowHeight - layerHeight;
                                    }
                                    style.transform = 'translate(' + left + 'px,' + top + 'px)';
                                    style.webkitTransform = 'translate(' + left + 'px,' + top + 'px)';
                                }
                                return false;
                            };
                            document.onmouseup = function () {
                                document.onmousemove = null;
                                document.onmouseup = null;
                                flag = false;
                            };
                        }
                    }
                }
            }
        },
        watch: {
            show(v){
                this.visibility = v;
                if (v) {
                    this.$nextTick(function () {
                        this._completed();
                    });
                }
            }
        },
        computed: {
            layerStyle(){
                return {
                    width: parseInt(this.width) + 'px',
                    height: this.layerHeight + 'px',//如果设置了高度，这个高度会根据屏幕大小发生变化
                    position: this.position
                }
            }
        }
    }
</script>